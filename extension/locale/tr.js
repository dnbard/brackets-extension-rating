//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'İndirmeler',
        hide: 'Gizle',
        more: 'daha fazla',
        oneMoreVersion: '<div>... ve diğer versiyonlar.</div>',
        sortby: 'Sırala ...',
        author: 'Geliştirici',
        update: 'Son Güncelleme',
        trending: 'Gündem', //0.3.0
        name: 'Ad',
        daily: 'dün indirme', //0.3.0
        stars: 'Yıldız', //0.4.0
        forks: 'Çatal', //0.4.0
        themes: 'Temalar', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Adobe Uzantısı',

        badge100k: '100bin İndirme',
        badge100kTitle: 'İlk uzantı 100bin indirme',

        badgeTop: 'Popüler',
        badgeTopTitle: 'En popüler uzantılar',

        badgeTrend: 'Gündem',
        badgeTrendTitle: 'Gündemdeki uzantılar',

        badgeNew: 'Yeni',
        badgeNewTitle: 'Yeni uzantılar',

        badgeStarsTitle: 'GitHub\'ta en popüler uzantı', //0.4.0
        badgeForksTitle: 'GitHub\'ta en çok çatallanan uzantı', //0.4.0

        themeTitle: 'Brackets Tema',
        /*END of BADGES*/

        onlineTitle: 'Bu uzantıyı kullanan kullanıcıların sayısı. Nasıl hesaplandığını öğrenmek için tıklayın.', //0.5.0
        maxUsersTitle: 'Uzantıyı kullanan sayısı', //0.5.0

        //Detailed info about ##
        'click-more': 'Hakkında detaylı bilgi', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Çevrim içi <b>${days} gün</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} bir günde indirme</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} - ${date} - ${downloads} indirme</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... ve ${count} diğer versiyon</div>'
    }
});
