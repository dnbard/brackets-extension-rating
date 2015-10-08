//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: '下載次數',
        hide: '隱藏',
        more: '更多',
        oneMoreVersion: '<div>... 及 1 個版本。</div>',
        sortby: '排序條件...',
        author: '作者',
        update: '更新時間',
        trending: '趨勢', //0.3.0
        name: '名稱',
        daily: '下載次數 (昨日)', //0.3.0
        stars: '星星數', //0.4.0
        forks: 'Fork 數', //0.4.0
        themes: '佈景主題', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Adobe 官方擴充功能',

        badge100k: '10 萬次下載',
        badge100kTitle: '第一個達到 10 萬次下載的擴充功能',

        badge200kTitle: '第一個達到 20 萬次下載的擴充功能', // 0.6.1

        badgeTop: '熱',
        badgeTopTitle: '最受歡迎的擴充功能',

        badgeTrend: '夯',
        badgeTrendTitle: '最近熱門趨勢上升的擴充功能',

        badgeNew: '新',
        badgeNewTitle: '新的擴充功能',

        badgeStarsTitle: 'GitHub 上最受歡迎的擴充功能', //0.4.0
        badgeForksTitle: 'GitHub 上被 Fork 最多次的擴充功能', //0.4.0

        badgeJS: 'JS', //0.7.0
        badgeJSTitle: 'JavaScript 擴充功能', //0.7.0

        badgeCSS: 'CSS', //0.7.0
        badgeCSSTitle: 'CSS/LESS/SASS 擴充功能', //0.7.0

        badgeHTML: 'HTML', //0.7.0
        badgeHTMLTitle: 'HTML 擴充功能', //0.7.0

        badgeLint: 'Linter', //0.7.0
        badgeLintTitle: 'Linter 擴充功能', //0.7.0

        badgeGit: 'Git', //0.7.0
        badgeGitTitle: 'Git 儲存庫擴充功能', //0.7.0

        themeTitle: 'Brackets 佈景主題',
        /*END of BADGES*/

        onlineTitle: '目前正在使用這個擴充功能的使用者數。點一下深入了解數據計算方式。', //0.5.0
        maxUsersTitle: '擴充功能的使用者總數', //0.5.0

        //Detailed info about ##
        'click-more': '詳細說明', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>上線 <b>${days} 天</b>，<b>${daily} ${str_daily}</b>, <b>${dpd} 次日下載</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>${version} 版從 ${date} 以來已被下載 ${downloads} 次</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... 及 ${count} 個版本</div>',

        //0.5.4
        colorDark: '暗色系',
        colorLight: '亮色系',

        //0.6.0
        click_for_more: '點一下查看詳情'
    }
});

/* Last translated for abafccbe04145f4289b61e4a389c5344560811cd */
