//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Downloads',
        hide: 'Nascondi',
        more: 'più',
        oneMoreVersion: '<div>... e una o più versioni.</div>',
        sortby: 'Ordina per ...',
        author: 'Autore',
        update: 'Ultimo aggiornamento',
        name: 'Nome',

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Online per <b>${days} giorni</b>, <b>${dpd} downloads per giorno</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} da ${date} - ${downloads} downloads</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... e ${count} più versioni</div>'
    }
});
