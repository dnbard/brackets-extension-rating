//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Descarregues',
        hide: 'Amagar',
        more: 'm\u00e9s',
        oneMoreVersion: '<div>... i una versi&#243; m&#233;s.</div>',
        sortby: 'Ordenar per ...',
        author: 'Autor',
        update: '\u00daltima actualizaci\u00f3',
        trending: 'Tend\u00e8ncia', //0.3.0
        name: 'Nom',
        daily: 'descarregues ahir', //0.3.0
        stars: 'Estrelles', //0.4.0
        forks: 'Forks', //0.4.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: "Complement d'Adobe",

        badge100k: '100.000 Descarregues',
        badge100kTitle: 'El primer complement que va tenir 100.000 descarregues',

        badgeTop: 'Popular',
        badgeTopTitle: 'El complement m\u00e9s popular',

        badgeTrend: 'Tend\u00e8ncia',
        badgeTrendTitle: 'El complement amb m\u00e9s tend\u00e8ncia',

        badgeNew: 'Nou',
        badgeNewTitle: 'Nou complement',

        badgeStarsTitle: 'El complement m\u00e9s popular de GitHub', //0.4.0
        badgeForksTitle: 'El complement amb m\u00e9s forks en GitHub', //0.4.0
        /*END of BADGES*/

        //Detailed info about ##
        'click-more': 'Informaci\u00f3 detallada sobre', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>En l&#237;nia des de fa <b>${days} dies</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} descarregues per dia</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} del ${date} - ${downloads} descarregues</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... i ${count} m&#233;s versions</div>'
    }
});
