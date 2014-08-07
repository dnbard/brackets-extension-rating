//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Descargas',
        hide: 'Esconder',
        more: 'm\u00e1s',
        oneMoreVersion: '<div>... y una versi&#243;n m&#225;s.</div>',
        sortby: 'Ordenar por ...',
        author: 'Autor',
        update: '\u00daltima actualizaci\u00f3n',
        trending: 'Tendencia', //0.3.0
        name: 'Nombre',
        daily: 'descargas ayaer', //0.3.0
        stars: 'Estrellas', //0.4.0
        forks: 'Forks', //0.4.0
        themes: 'Temas', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Complemento de Adobe',

        badge100k: '100.000 Descargas',
        badge100kTitle: 'El primer complemento que tuvo 100.000 descargas',

        badgeTop: 'Popular',
        badgeTopTitle: 'El complemento m\u00e1s popular',

        badgeTrend: 'Tendencia',
        badgeTrendTitle: 'El complemento con m\u00e1s tendencia',

        badgeNew: 'Nuevo',
        badgeNewTitle: 'Nuevo complemento',

        badgeStarsTitle: 'El complemento m\u00e1s popular de GitHub', //0.4.0
        badgeForksTitle: 'El complemento con m\u00e1s forks en GitHub', //0.4.0
        
        themeTitle: 'Tema Brackets',
        /*END of BADGES*/

        onlineTitle: 'El número de usuarios que usan este complemento ahora mismo. Pulsa para conocer cómo ha sido calculado este número.', //0.5.0
        maxUsersTitle: 'El recuento general de usuarios del complemento', //0.5.0

        //Detailed info about ##
        'click-more': 'Informaci\u00f3n detallada sobre', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>En l&#105;nea desde hace <b>${days} d&#105;as</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} descargas por d&#105;a</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} del ${date} - ${downloads} descargas</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... y ${count} m&#225;s versiones</div>'
    }
});
