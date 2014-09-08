//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Загрузки',
        hide: 'Скрыть',
        more: 'ещё',
        oneMoreVersion: '<div>... и ещё одна версия.</div>',
        sortby: 'Сортировать по ...',
        author: 'Автор',
        update: 'Обновление',
        trending: 'Тренд', //0.3.0
        name: 'Название',
        daily: 'загрузок за день', //0.3.0
        stars: 'Звёзды', //0.4.0
        forks: 'Форки', //0.4.0
        themes: 'Темы', //0.5.0

        /*BADGES - 0.3.2*/
        badgeAdobe: 'Adobe',
        badgeAdobeTitle: 'Расширение от Adobe',

        badge100k: '100 тыс. загрузок',
        badge100kTitle: 'Первое расширение, набравщее 100 тыс. загрузок',

        badgeTop: 'Лучшее',
        badgeTopTitle: 'Самое популярное расширение',

        badgeTrend: 'Трендовое',
        badgeTrendTitle: 'Самое трендовое расширение',

        badgeNew: 'Новое',
        badgeNewTitle: 'Новое расширение',

        badgeStarsTitle: 'Самое популярное расширение на GitHub`е', //0.4.0
        badgeForksTitle: 'Расширение, больше всего раз форкнутое на GitHub`е', //0.4.0

        themeTitle: 'Тема для Brackets',
        /*END of BADGES*/

        onlineTitle: 'Количество пользователей, которые используют это расширение сейчас. Нажмите, чтобы узнать как это число вычисляется.', //0.5.0
        maxUsersTitle: 'Общее количество пользователей, использующих это расширение.', //0.5.0

        //Detailed info about ##
        'click-more': 'Подробная информация о', //0.3.0

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>В сети <b>${days} дней</b>, <b>${daily} ${str_daily}</b>, <b>${dpd} загрузок за день</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} от ${date} - ${downloads} загрузок</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... и ${count} ещё версий</div>',
        
        //0.5.4
        colorDark: 'тёмная',
        colorLight: 'светлая'
    }
});
