//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Téléchargements',
        hide: 'Cacher',
        more: 'plus',
        oneMoreVersion: '<div>... et une version supplémentaire.</div>',
        sortby: 'Trier par...',
        author: 'Auteur',
        update: 'Dernière màj',
        trending: 'Tendance', //0.3.0
        name: 'Nom',
        daily: 'téléchargements hier', //0.3.0
        stars: 'Favoris', //0.4.0
        forks: 'Fourches', //0.4.0
        themes: 'Thèmes', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Extension d\'Adobe',

        badge100k: '100k Téléchargements',
        badge100kTitle: 'Première extension a avoir 100k téléchargements',

        badgeTop: 'Top',
        badgeTopTitle: 'Extension la plus populaire',

        badgeTrend: 'Tendance',
        badgeTrendTitle: 'Extension la plus tendance',

        badgeNew: 'Nouveau',
        badgeNewTitle: 'Nouvelle extension',

        badgeStarsTitle: 'Extension la plus populaire sur GitHub', //0.4.0
        badgeForksTitle: 'Extension la plus fourchée sur GitHub', //0.4.0

        themeTitle: 'Thème Brackets',
        /*END of BADGES*/

        onlineTitle: 'Nombre d\'utilisateurs qui utilisent l\'extension en ce moment. Cliquez pour connaître le calcul derrière ce chiffre.', //0.5.0
        maxUsersTitle: 'Nombre d\'utilisateurs de l\'extension', //0.5.0

        //Detailed info about ##
        'click-more': 'Infos détaillées', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>En ligne depuis <b>${days} jours</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} téléchargements par jour</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} du ${date} - ${downloads} téléchargements</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... et ${count} versions supplémentaires</div>',
        
        //0.5.4
        colorDark: 'Foncé',
        colorLight: 'Clair',
        
        //0.6.0
        click_for_more: 'Cliquez pour en savoir plus.'
    }
});
