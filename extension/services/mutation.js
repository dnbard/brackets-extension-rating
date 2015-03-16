define(function (require, exports, module){
    var _ = require('thirdparty/lodash'),
        target = $('body')[0],
        config = require('../config'),
        locale = require('./locale'),
        registry = require('./registry'),
        dialogId = '.extension-manager-dialog.modal',
        extensionService = require('./extensions'),
        downloadsTemplate = require('text!../templates/downloads.html'),
        ThemeAchievement = require('../achievements/theme'),
        selectTemplate = _.template(require('text!../templates/sortButton.html'),{
            author: locale.get('author'),
            downloads: locale.get('downloads'),
            update: locale.get('update'),
            trending: locale.get('trending'),
            name: locale.get('name'),
            stars: locale.get('stars'),
            forks: locale.get('forks')
        });

    function init(){
        var observer = new MutationObserver(function(mutations){
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length === 1){
                    dialogAddedMutation(mutation);
                }
            });
        }),
            observerConfig = config.mutationObserverConfig;
        observer.observe(target, observerConfig);
    }

    function dialogAddedMutation(mutation){
        var waitForRegistry = true;

        function registryUpdateAction(){
            waitForRegistry = false;
        }

        extensionService.updateRegistry()
            .then(registryUpdateAction, registryUpdateAction);

        var target = $(mutation.addedNodes[0]),
            token;

        if (target.find(dialogId).length === 1){
            mutateSortButton(target);
            mutateTabButtons(target);

            token = setInterval(function(){
                var extensions = target.find('#registry tr, #installed tr, #themes tr'),
                    extensionCount = extensions.length;
                if (extensionCount < 200 || waitForRegistry){
                    return;
                }

                clearInterval(token);
                mutateExistingExtensions(extensions);
            }, 100);

            //Set default sorting filter on tab change
            target.find('ul.nav > li > a').on('click', function(event){
                if ($(event.target).hasClass('installed')){
                    target.find('select.ext_rating').val('name');
                } else {
                    target.find('select.ext_rating').val('update');
                }
            });
        }
    }

    function mutateTabButtons(target){
        target.find('.nav-tabs li').click(function(){
            returnPanelToNorm();
        });
    }

    function mutateExistingExtensions(targets){
        if (targets.length === 0) return;

        $('#registry, #installed, #themes').click(function(event){
            var $t = $(event.target),
                $parent = $(event.currentTarget);

            if ($t.attr('class') === 'ext-link_more'){
                var id = $t.attr('data-extension-id'),
                    extension = extensionService.get(id);

                if ($parent.find('.ext-panel_more').length > 0){
                    $parent.find('.ext-panel_more').remove();
                    returnPanelToNorm();
                } else {
                    $parent.find('tr').hide();
                    var insert = createMorePanelContent(id, extension, $parent);
                    $parent.find('tr[data-extension-id="' + id + '"]')
                        .show()
                        .after(insert);
                }
            }
        });

        _.each(targets, function(target){
            var $t = $(target),
                id = $t.find('[data-extension-id]').attr('data-extension-id'),
                extension = extensionService.get(id),
                registryEntry = registry.get(id),
                stars = registryEntry ? registryEntry.stars : 'NA',
                forks = registryEntry ? registryEntry.forks : 'NA',
                online = registryEntry && registryEntry.online ? registryEntry.online : 0,
                maxUsers = registryEntry && registryEntry.maxUsers ? registryEntry.maxUsers : 0,
                totalDownloads = extension && extension.totalDownloads? extension.totalDownloads : 0,
                dailyDownloads = registryEntry ? registryEntry.dailyDownloads : 0,
                badgeHolder;

            if (registryEntry.faked){
                return true;
            }

            $t.attr('data-extension-id', id);

            $t.find('.ext-info').append(_.template(downloadsTemplate, {
                downloads: totalDownloads,
                str_downloads: locale.get('downloads'),
                str_more: locale.get('more'),
                str_daily: locale.get('daily'),
                str_online: locale.get('onlineTitle'),
                str_max_users: locale.get('maxUsersTitle'),
                str_click_more: locale.get('click-more') + ' ' + registryEntry? registryEntry.title : '',
                id: id,
                daily: dailyDownloads ? dailyDownloads : '',
                path: config.root,
                stars: stars,
                forks: forks,
                online: online,
                max_users: maxUsers,
                click_for_more: locale.get('click_for_more')
            }));

            if (registryEntry.authorAvatar){
                $t.find('.ext-author > a').prepend('<img class="ext-avatar" src="'+ registryEntry.authorAvatar +'s=20"/>');
            }

            //hide daily downloads counter for extensions without daily downloads
            if (!dailyDownloads) { $t.find('.ext-daily').hide(); }

            //hide stars counter for extensions without stars on GitHub
            if (!stars) { $t.find('.ext-stars').hide(); }

            //hide forks counter for extensions without forks on GitHub
            if (!forks) { $t.find('.ext-forks').hide(); }

            if (!online) { $t.find('.ext-users').hide(); }

            if (registryEntry.badge && registryEntry.badge.length > 0){
                badgeHolder = $('<div class="ext-badges"></div>');
                $t.find('.ext-info').append(badgeHolder);
                for (var i = 0; i < registryEntry.badge.length; i ++){
                    var badge = registryEntry.badge[i],
                        tag = badge.achievement.getTag(badge.rank, $t);
                    badgeHolder.append(tag);
                }
            }

            $t.attr('data-extension-loads', totalDownloads);
            $t.attr('data-extension-yesterday', dailyDownloads? dailyDownloads : 0);
            $t.attr('data-extension-stars', stars);
            $t.attr('data-extension-forks', forks);

            if (ThemeAchievement.extensions[id]){
                $t.attr('data-extension-theme', true);
            }
        });
    }

    function returnPanelToNorm(parent){
        $('.ext-panel_more').remove();
        if (parent){
            parent.find('tr').show();
        } else {
            $('#registry tr, #installed tr, #themes tr').show();
        }
    }

    function daysBetween(first, second) {
        var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;

        return Math.abs(Math.ceil(days));
    }

    function createMorePanelContent(id, extension, parent){
        var panel = $('<tr class="ext-panel_more"></tr>'),
            holder = $('<td colspan="2"></td>'),
            hide = $(_.template('<td class="ext-action"><a title="${click_for_more}" href="http://brackets.dnbard.com/extension/${str_id}" class="btn fa fa-globe"></a><button class="btn primary">${str_hide}</button></td>', {
                str_hide: locale.get('hide'),
                str_id: id,
                click_for_more: locale.get('click_for_more')
            })),
            registryEntry = registry.get(id);

        panel.append(holder);

        if (_.isArray(extension.versions)){
            var versions = extension.versions.slice().reverse(),
                showLines = 3;

            if (extension.totalDownloads){
                var maxDate = new Date(),
                    minDate = new Date(versions[versions.length - 1].published),
                    diffDays = daysBetween(maxDate, minDate) || 1,
                    dailyDownloads = registryEntry.dailyDownloads || 0;

                holder.append(_.template(locale.get('statusTemplate'), {
                    days: diffDays,
                    daily: dailyDownloads,
                    str_daily: locale.get('daily'),
                    dpd: (extension.totalDownloads / diffDays).toFixed(0)
                }));
            }

            _.each(versions, function(info, index){
                holder.append(_.template(locale.get('versionTemplate'),{
                    version: info.version,
                    date: new Date(info.published).toLocaleDateString(brackets.getLocale(), {
                        "year": "numeric",
                        "month": "2-digit",
                        "day": "2-digit"
                    }),
                    downloads: info.downloads || 0
                }));
                if (index >= showLines - 1 && versions.length > showLines) {
                    var count = versions.length - (showLines);
                    if (count === 1) {
                        holder.append(locale.get('oneMoreVersion'));
                    } else {
                        holder.append(_.template(locale.get('moreVersionsTemplate'),{ count : count }));
                    }
                    return false;
                }
            });
        }

        hide.click(function(){
            returnPanelToNorm(parent);
        });

        panel.append(hide);

        return panel;
    }

    function mutateSortButton(target){
        var $header = target.find('.modal-header'),
            $select = $(selectTemplate);

        $select.on('change', function(event){
            if (typeof this.value === 'string'){
                sort(this.value, target);
            }
        });
        $header.append($select);
    }

    var sortHandlers = {
        'downloads': function(elements){
            return _.sortBy(elements, function(el){
                return -parseInt($(el).attr('data-extension-loads'));
            });
        },
        'author': function(elements){
            return _.sortBy(elements, function(el){
                return $(el).find('.ext-author a').text();
            });
        },
        'name': function(elements){
            return _.sortBy(elements, function(el){
                return $(el).find('.ext-name').text();
            });
        },
        'update': function(elements){
            return _.sortBy(elements, function(el){
                return - new Date($(el).find('.ext-date').text().replace(' - ', ''));
            });
        },
        'trending' : function(elements){
            return _.sortBy(elements, function(el){
                return -parseInt($(el).attr('data-extension-yesterday'));
            });
        },
        'stars' : function(elements){
            return _.sortBy(elements, function(el){
                return -parseInt($(el).attr('data-extension-stars'));
            });
        },
        'forks' : function(elements){
            return _.sortBy(elements, function(el){
                return -parseInt($(el).attr('data-extension-forks'));
            });
        }
    };

    var workaroundHandlers = {
        'default': function(elements){
            $(elements).show();
            return true;
        },
        'themes': function(elements){
            _.each(elements, function(element){
                var $e = $(element);
                if ($e.attr('data-extension-theme') != 'true'){
                    $e.hide();
                }
            });
        },
        'update': function(elements, target){
            if (target.find('.extension-list.active').attr('id') !== 'installed'){
                $('ul.nav > li.active > a').click();
                return false;
            } else {
                return true;
            }
        },
        'name': function(elements, target){
            if (target.find('.extension-list.active').attr('id') === 'installed'){
                $('ul.nav > li.active > a').click();
                return false;
            } else {
                return true;
            }
        }
    };

    function sort(criteria, target){
        var handler = sortHandlers[criteria],
            workaroundHandler = workaroundHandlers[criteria] || workaroundHandlers.default;
            holder = $(dialogId).find('.extension-list.active tbody'),
            elements = holder.find('tr');

        if (!workaroundHandler(elements, target)){
            return;
        }

        if (typeof handler !== 'function'){
            return;
        }

        holder.empty();
        elements = handler(elements);
        holder.append(elements);
    }

    exports.init = init;
});
