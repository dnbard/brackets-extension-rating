//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Pobrań',
        hide: 'Ukryj',
        more: 'więcej',
        oneMoreVersion: '<div>... i jedna wersja więcej.</div>',
        sortby: 'Sortuj według ...',
        author: 'Autor',
        update: 'Ostatnia aktualizacja',
        trending: 'Modne', //0.3.0
        name: 'Nazwa',
        daily: 'pobrań wczoraj', //0.3.0
        stars: 'Gwiazdki', //0.4.0
        forks: 'Forki', //0.4.0
        themes: 'Motywy', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Rozszerzenie od Adobe',

        badge100k: '100k Pobrań',
        badge100kTitle: 'Pierwsze rozszerzenie, które zyskało 100k pobrań',

        badge200kTitle: 'Pierwsze rozszerzenie, które zyskało 200k pobrań', // 0.6.1

        badgeTop: 'Top',
        badgeTopTitle: 'Najpopularniejsze rozszerzenie',

        badgeTrend: 'Modne',
        badgeTrendTitle: 'Najmodniejsze rozszerzenie',

        badgeNew: 'Nowe',
        badgeNewTitle: 'Nowe rozszerzenie',

        badgeStarsTitle: 'Najpopularniejsze rozszerzenie na Githubie', //0.4.0
        badgeForksTitle: 'Najbardziej forkowane rozszerzenie na Githubie', //0.4.0

        badgeJS: 'JS', //0.7.0
        badgeJSTitle: 'Rozszerzenie JavaScript', //0.7.0

        badgeCSS: 'CSS', //0.7.0
        badgeCSSTitle: 'Rozszerzenie CSS/LESS/SASS', //0.7.0

        badgeHTML: 'HTML', //0.7.0
        badgeHTMLTitle: 'Rozszerzenie HTML', //0.7.0

        badgeLint: 'Linter', //0.7.0
        badgeLintTitle: 'Rozszerzenie typu Linter', //0.7.0

        badgeGit: 'Git', //0.7.0
        badgeGitTitle: 'Rozszerzenie dla repozytoriów Gita', //0.7.0

        themeTitle: 'Motyw Brackets',
        /*END of BADGES*/

        onlineTitle: 'Liczba użytkowników używająca to rozszerzenie teraz. Wciśnij, aby zobaczyć jak ta liczba jest obliczana.', //0.5.0
        maxUsersTitle: 'Ogólna liczba użytkowników rozszerzenia', //0.5.0

        //Detailed info about ##
        'click-more': 'Szczegółowe informacje o', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Online przez <b>${days} dni</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} pobrań na dzień</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>wer. ${version} z ${date} - ${downloads} pobrań</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... i ${count} więcej wersji</div>',

        //0.5.4
        colorDark: 'ciemny',
        colorLight: 'jasny',

        //0.6.0
        click_for_more: 'Wciśnij, aby dowiedzieć się więcej.'
    }
});
