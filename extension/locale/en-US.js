//Read http://lodash.com/docs#template to understand what is "${whatever}" is.
//TLDR: do not change ids inside of ${...}

//Value can be a string or function that will return a string

define(function (require, exports, module){
    module.exports = {
        downloads: 'Downloads',
        hide: 'Hide',
        more: 'more',
        oneMoreVersion: '<div>... and one more version.</div>',
        sortby: 'Sort by ...',
        author: 'Author',
        update: 'Last Update',
        name: 'Name',

        //Online for ## days, ## downloads per day
        statusTemplate: '<div>Online for <b>${days} days</b>, <b>${dpd} downloads per day</b></div>',

        //v ## from ## - ## downloads</div>
        versionTemplate: '<div>v ${version} from ${date} - ${downloads} downloads</div>',

        //... and ## more versions
        moreVersionsTemplate: '<div>... and ${count} more versions</div>'
    }
});
