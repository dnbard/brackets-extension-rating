//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Downloads',
        hide: 'Ausblenden',
        more: 'mehr',
        oneMoreVersion: '<div>... und eine weitere Version.</div>',
        sortby: 'Sortieren nach ...',
        author: 'Autor',
        update: 'Letzte Aktualisierung',
        trending: 'Trending', //0.3.0
        name: 'Name',
        daily: 'Downloads gestern', //0.3.0
        stars: 'Stars', //0.4.0
        forks: 'Forks', //0.4.0
        themes: 'Themes', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Erweiterung von Adobe',

        badge100k: '100k Downloads',
        badge100kTitle: 'Erste Erweiterung mit 100.000 Downloads',

        badge200kTitle: 'Erste Erweiterung mit 200.000 Downloads', // 0.6.1

        badgeTop: 'Top',
        badgeTopTitle: 'Sehr beliebte Erweiterung',

        badgeTrend: 'Trending',
        badgeTrendTitle: 'Aktuell beliebte Erweiterung',

        badgeNew: 'Neu',
        badgeNewTitle: 'Neue Erweiterung',

        badgeStarsTitle: 'Sehr beliebt auf GitHub', //0.4.0
        badgeForksTitle: 'Oft geforkt auf GitHub', //0.4.0

        themeTitle: 'Theme für Brackets',
        /*END of BADGES*/

        onlineTitle: 'Anzahl der Benutzer, die diese Erweiterung installiert haben. Klicken, um zu erfahren, wie diese Nummer berechnet wird.', //0.5.0
        maxUsersTitle: 'Gesamtanzahl der Benutzer', //0.5.0

        //Detailed info about ##
        'click-more': 'Detailinformationen über', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Verfügbar seit <b>${days} Tagen</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} Downloads pro Tag</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} seit ${date} - ${downloads} Downloads</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... und ${count} weitere Versionen.</div>',

        //0.5.4
        colorDark: 'dunkel',
        colorLight: 'hell',

        //0.6.0
        click_for_more: 'Klicken, um mehr zu erfahren.'
    };
});
