define(function (require, exports, module){
    var _ = require('../vendor/lodash.min'),
        target = $('body')[0],
        config = require('../config'),
        locale = require('./locale'),
        registry = require('./registry'),
        dialogId = '.extension-manager-dialog.modal',
        extensionService = require('./extensions'),
        downloadsTemplate = require('text!../templates/downloads.html'),
        selectTemplate = _.template(require('text!../templates/sortButton.html'),{
            sortby: locale.get('sortby'),
            author: locale.get('author'),
            downloads: locale.get('downloads'),
            update: locale.get('update'),
            trending: locale.get('trending'),
            name: locale.get('name')
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
                var extensions = target.find('#registry tr, #installed tr'),
                    extensionCount = extensions.length;
                if (extensionCount < 200 || waitForRegistry){
                    return;
                }

                clearInterval(token);
                mutateExistingExtensions(extensions);
            }, 100);
        }
    }

    function mutateTabButtons(target){
        target.find('.nav-tabs li').click(function(){
            returnPanelToNorm();
        });
    }

    function mutateExistingExtensions(targets){
        if (targets.length === 0) return;

        $('#registry, #installed').click(function(event){
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
                totalDownloads = extension && extension.totalDownloads? extension.totalDownloads : 0,
                dailyDownloads = registryEntry ? registryEntry.dailyDownloads : 0,
                badgeHolder;

            $t.attr('data-extension-id', id);

            $t.find('.ext-info').append(_.template(downloadsTemplate, {
                downloads: totalDownloads,
                str_downloads: locale.get('downloads'),
                str_more: locale.get('more'),
                str_daily: locale.get('daily'),
                str_click_more: locale.get('click-more') + ' ' + registryEntry? registryEntry.title : '',
                id: id,
                daily: dailyDownloads ? dailyDownloads : '',
                path: config.root
            }));

            //hide daily downloads counter for extensions without daily downloads
            if (!dailyDownloads) { $t.find('.ext-daily').hide(); }

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
        });
    }

    function returnPanelToNorm(parent){
        $('.ext-panel_more').remove();
        if (parent){
            parent.find('tr').show();
        } else {
            $('#registry tr, #installed tr').show();
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
            hide = $(_.template('<td class="ext-action"><button class="btn primary">${str_hide}</button></td>', {
                str_hide: locale.get('hide')
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
                    var count = versions.length - (showLines - 1);
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
                sort(this.value);
            }
        });
        $header.append($select);
    }

    var sortHandlers = {
        'downloads': function(elements){
            return elements = _.sortBy(elements, function(el){
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
                return $(el).find('.ext-author').text();
            });
        },
        'update': function(elements){
            return _.sortBy(elements, function(el){
                return - new Date($(el).find('.ext-date').text().replace(' - ', ''));
            });
        },
        'trending' : function(elements){
            return elements = _.sortBy(elements, function(el){
                return -parseInt($(el).attr('data-extension-yesterday'));
            });
        }
    }

    function sort(criteria){
        var handler = sortHandlers[criteria],
            holder = $(dialogId).find('.extension-list.active tbody'),
            elements = holder.find('tr');

        if (typeof handler !== 'function'){ return; }

        holder.empty();
        elements = handler(elements);
        holder.append(elements);
    }

    exports.init = init;
});
