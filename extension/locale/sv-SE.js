//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Nedladdningar',
        hide: 'Dölj',
        more: 'mer',
        oneMoreVersion: '<div>...och ytterligare en version.</div>',
        sortby: 'Sortera efter...',
        author: 'Författare',
        update: 'Senaste uppdatering',
        trending: 'Trending', //0.3.0
        name: 'Namn',
        daily: 'nedladdningar igår', //0.3.0
        stars: 'Stjärnmarkeringar', //0.4.0
        forks: 'Forks', //0.4.0
        themes: 'Teman', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Tillägg från Adobe',

        badge100k: '100k nedladdningar',
        badge100kTitle: 'Första tillägg som laddades ner 100k gånger',

        badgeTop: 'Topp',
        badgeTopTitle: 'Mest populära tillägg',

        badgeTrend: 'Trending',
        badgeTrendTitle: 'Mest trendande tillägg',

        badgeNew: 'Nytt',
        badgeNewTitle: 'Nya tillägg',

        badgeStarsTitle: 'Mest populära tillägg på GitHub', //0.4.0
        badgeForksTitle: 'Mest forkade tillägg GitHub', //0.4.0

        themeTitle: 'Brackets-tema',
        /*END of BADGES*/

        onlineTitle: 'Antal användare som använder tillägget just nu. Klicka för att ta reda på hur detta räknas ut.', //0.5.0
        maxUsersTitle: 'Totalt antal användare av tillägget', //0.5.0

        //Detailed info about ##
        'click-more': 'Detaljerad information om', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Upplagd <b>${days} dagar</b> sedan, <b>${daily} ${str_daily}</b>, <b>${dpd} nedladdningar per dag</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} sedan ${date} - ${downloads} nedladdningar</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>...och ytterligare ${count} versioner</div>'
    }
});
