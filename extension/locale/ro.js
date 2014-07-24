//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Desc\u0103rc\u0103ri',
        hide: 'Ascunde',
        more: 'mai multe',
        oneMoreVersion: '<div>... &#537;i &#238;nc&#259; o versiune.</div>',
        sortby: 'Ordoneaz\u0103 dup\u0103 ...',
        author: 'Autor',
        update: 'Ultima actualizare',
        trending: '\u00cen trend', //0.3.0
        name: 'Nume',
        daily: 'desc\u0103rc\u0103ri ieri', //0.3.0
        stars: 'Stele', //0.4.0
        forks: 'Forks', //0.4.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Extensie de la Adobe',

        badge100k: '100.000 Desc\u0103rc\u0103ri',
        badge100kTitle: 'Prima extensie care a avut 100.000 de desc\u0103rc\u0103ri',

        badgeTop: '\u00cen top',
        badgeTopTitle: 'Cea mai popular\u0103 extensie',

        badgeTrend: '\u00cen trend',
        badgeTrendTitle: 'Cea mai \u00een trend extensie',

        badgeNew: 'Nou\u0103',
        badgeNewTitle: 'Extensie nou\u0103',

        badgeStarsTitle: 'Cea mai popular\u0103 extensie pe GitHub', //0.4.0
        badgeForksTitle: 'Extensia cu cele mai multe Fork pe GitHub', //0.4.0
        /*END of BADGES*/

        //Detailed info about ##
        'click-more': 'Informa\u021bie detaliat\u0103 despre', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Online de <b>${days} zile</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} desc&#259;rc&#259;ri pe zi</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} din ${date} - ${downloads} desc&#259;rc&#259;ri</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... &#537;i ${count} mai multe versiuni</div>'
    }
});
