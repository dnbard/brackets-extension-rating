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
        badge100kTitle: '100 bin indirmeye sahip ilk uzantı',

        badge200kTitle: '200 bin indirmeye sahip ilk uzantı', // 0.6.1

        badgeTop: 'Popüler',
        badgeTopTitle: 'En popüler uzantılar',

        badgeTrend: 'Gündem',
        badgeTrendTitle: 'Gündemdeki uzantılar',

        badgeNew: 'Yeni',
        badgeNewTitle: 'Yeni uzantılar',

        badgeStarsTitle: 'GitHub\'ta en popüler uzantı', //0.4.0
        badgeForksTitle: 'GitHub\'ta en çok çatallanan uzantı', //0.4.0

        badgeJS: 'JS', //0.7.0
        badgeJSTitle: 'JavaScript Eklentisi', //0.7.0

        badgeCSS: 'CSS', //0.7.0
        badgeCSSTitle: 'CSS/LESS/SASS Eklentisi', //0.7.0

        badgeHTML: 'HTML', //0.7.0
        badgeHTMLTitle: 'HTML Eklentisi', //0.7.0

        badgeLint: 'Linter', //0.7.0
        badgeLintTitle: 'Linter Eklentisi', //0.7.0

        badgeGit: 'Git', //0.7.0
        badgeGitTitle: 'Git repository\'leri için Eklenti', //0.7.0

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
        moreVersionsTemplate: '<div>... ve ${count} diğer versiyon</div>',

        //0.5.4
        colorDark: 'koyu',
        colorLight: 'açık',

        //0.6.0
        click_for_more: 'Daha fazla bilgi için tıklayın.'
    }
});
