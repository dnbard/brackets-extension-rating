//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Download',
        hide: 'Nascondi',
        more: 'più',
        oneMoreVersion: '<div>... e una o più versioni.</div>',
        sortby: 'Ordina per ...',
        author: 'Autore',
        update: 'Ultimo Aggiornamento',
        trending: 'Tendenza', //0.3.0
        name: 'Nome',
        daily: 'download di ieri', //0.3.0
        
        /*BADGES*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Estensione da Adobe'
        badge100k: 'Download 100k',
        badge100kTitle: 'Prima estensione che ha 100k download',

        badgeTop: 'Meglio',
        badgeTopTitle: 'Estensione molto diffusa',

        badgeTrend: 'Di tendenza',
        badgeTrendTitle: 'Estensione molto di tendenza',

        badgeNew: 'Nuova',
        badgeNewTitle: 'Nuova estensione',
        /*END of BADGES*/

        //Detailed info about ##
        'click-more': 'Detailed info about', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Online da <b>${days} giorni</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} download giornalieri</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} da ${date} - ${downloads} download</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... e ${count} altre versioni</div>'
    }
});
