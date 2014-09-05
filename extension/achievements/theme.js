define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions'),
        image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaklEQVR42p2Sf2iUdRzHvwT5RyrlaoglqBSBDksi+rVsOXU07I47KsEE3eBicxWBehTVZJttjVs3k7vKTdncdmNuu82bzgmSO5dw262TgacVPNtipdW53d1ueN1zz/P9ft49zwO7cVr/9IUX38/n/cCL7/fzfNmRI6ysuppNf3d6E4UXTtEk+g3Gk3V0/OdlVNqzmlZYi4jtNBk8aLZRjq2FHj9wkjbZ3fN5h92dGw+517GGr3Onui4Up88HSvDLQg9+w2WMztdgOPIpPu634ED7OyisrMHL9sYMxfV9KPyiC3l2N56pbFG2dgQd7ERbHl2dqkKCZkAkQBDgpIALBWlVR4ViwJfgXMs5ukevY8tRD4rOTybZ2O9f0o1YBwRxBINBtLa2ZhEOhzExMXFfHgqFoHIB27lreD00BybBq53le0PU1NQEk8mUhdfrhcfjuS/XZbqo9qco8m9xsLDSTKPzR42rLIpsNhtqa2sNAoEARkZGMn1paWlGxIWK8dsu9N6pB/vx73oa+vNdqELOiJxOJ2ZnZzE3N4dkMmmg13qmyxZFJNJAwgLMPw/WNLmazvyanyVyuVzg2kCJKAs9czgcSyKuABP7gLGdYFXBZdQmbc4Sud1uCCFw79KzhoaGbNGVMuCiGWzN/gKyOPYgraT/n2jcDsw4wB7YtZc2l30EWVkadmNjI+LxOBKJBGRZRiqVMmo9y5qRcbXPtTm1gz1SfpJe/OyUJlIzIrPZDKvVauDz+dDd3Z3p9W9Lw1aBm98AbWVga+uuUoFrDLL67++ot7f3P98RCQ5M+YDKN8Fe6rpBr3muYzqewl+RCCRJyiIajRq//t589k4EFJkGOg9CqdkFVjwoUeHQDEp++APH4jK+TalIys1QUyegJrzgC2fBE2e1egCqfBuqEjfgMU3SUg44LRgrfwWs4lJfbPetGN7WTnQldQzTih08+QlI526VhhMkh7T9JuiC1vcchNBYaH4Pl9/YiL7tT2Pf+py7rH9w++lBf0G6PVCBawMmSAPbIPkskC7ugRSuhBTUOH4IUvWHkGxbIZW8gA5zHuq2PYX3N6zCW2tWKsW5y+uZv++JtcO+dTXDnU9Gh6ufE/5FvioQ/qHDwn/mA+G3Piv8+RsyVKzPEUW5K8SOx5bHdjz6UN2rD7NV/wATxK/x0owARwAAAABJRU5ErkJggg==',
        dark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACTElEQVR42pWU3YsSYRSHR1NSJ0s2nLb1A8dxIKgluqgbgyKNZc3N1h1JliWC6ANW/4G8CEmvulmCLsLQWWdcL81/orrrSyV256otit3MZSEvO73n3ZzVLNKBH5w573memfcdGIbpu7T5Y1wj4pwcJW/JLPPn9SZ61NWcd603F9wwThrXXBuvZifcVAIMY3wfd31qxl0/X84dh/IF50jBWWSQRQfzLs750f6CLLAHDLDn/n9wFhlk0cG8XnCKeINPMRqNUKlUBhIOhyEWiw30CoUCnV0lDN3iVWdgQGSz2aBer0OtVgNVVWkikQhIkqTf41q1WgWLxfIXkUREF/dFxWIRAoEACIIADoeDBmtRFKFcLlOR1WqFVcIgS0UtImpJHlD6RPjqZrMZDIb9M8Mae7Is6yJ8OLK/RW6xlRgWmUymoQPG3pCIsI2Ee0/04boXKpe4sUUqYZDVeqL1RR7WwpO6qFQqgc/nA4/HAyzLgt1upzXP86Aoii5CBlkq0hb9onZDgOrMlC7qTzQahWQyOdDriZBBVlsSiOimX/x4+wQ8j3npYjabhXw+T5PL5SAYDEIoFKJ1r5/JZOjnrxEG2c1bRLT58LL4JT0Nn1PTcN5DtsBNgH+Ko+FJnIdtwB1had3re8lMkMwig+zWg5kAsyPfEdqP5qBz/yzs6DnXl3/3kEEWHczG49mD28ry7venS/BjJQrdlSsjBWeR2VZSu+igf4C2vHzym5rqttU0jJdU9+uze6cG/klbTxKHOsrd05219JmRQmaR6fG/AGApdlIzrXOIAAAAAElFTkSuQmCC',
        light = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACXUlEQVR42pWUz4sSYRjHh2BZ2BVdqF0WVqJ2nDYoiKg/oGOCHirTmUT0GlGdwry4HYM2LKHosC3l7opOrVihRK23OlYHQ0yN8Ve7boH4CwVFn97nFUenQ+jAF573eZ/PZ2bew8swIw8bKi0cE6XFccKGMgvMv4/2ZWGJC2RTJ8UcTBIukEsvbaW1fcsqHDoRlIorYq53LpQDfncfhNj/gzM4iwyy6GC47dwy2s+TjUqrA91ud6zgLMrolxEHs7yd4XAhkLe0Wi0wm82KRCIREEVR0bPb7XT2GmGQZcWCri8K9kXVahUMBgMYjUbgeZ4mHA6D3++X17hnMpmgVqv1RcER0UowS/57TxbZbDaIx+OQSCSgVCrRYI09QRBkkUAYZIeiABF9HIocDgc0Gg1ot9vQ6XRosK7X62C1WociwiArizi/BJYPvxQiPAM81F6vR4N1s9lUiHjCIMtuomgjw7FbP+Hq++LEIjNhkGU3MzpGu5Hgjr9IgSmSV5xRKpUCSZKgUqlAuVymdTKZpAc+ECGDrJaKniW4o+tJuPw2K4tGEwqFwOfzKXoDETLIateJaP7xN27xaRwuvkpTkcvlAqfTKScWi0E0GlX03G43FekJg+z8k+86Rn3nHXd47QscWfsKu+k/kMnvw49sUU7hdxkKB2VFL53fo7PIIKu++0bHaCxeVnXrNcysfoKZe58nC2FUt3cAHQyjvzmtsXhqs47nMHV9B6ZuhMcLmUVGw3tqjN47TS8A1ZX7p9S8pzknPIJJgozq0oPTykvpwqpq1vLwzBzvPTtOcBaZAf4X160ZGAxLuAkAAAAASUVORK5CYII=',
        extensionsAffected = {};

    function ThemeAchievement(){
        this.calculate = function(extensions){
            var regexp = /theme/;

            _.each(extensions, _.bind(function(extension){
                var bracketsExtension = ExtensionsService.get(extension._id);
                if (bracketsExtension && bracketsExtension.metadata && bracketsExtension.metadata.theme){
                    extensionsAffected[extension._id] = true;
                    this.writeBadge(bracketsExtension.metadata.theme.dark ? 'dark' : 'light', extension);
                }
            }, this));
        }

        this.getTag = function(type, element){
            var badge = null;

            if (type === 'dark'){
                //TODO: change to dark icon
                badge = dark;
            } else if (type === 'light'){
                //TODO: change to light icon
                badge = light;
            } else {
                badge = image;
            }

            return _.template('<span title="${title}" class="ext-badge ext-badge-theme"><img src="${badge}" /></span>',{
                badge: badge,
                title: locale.get('themeTitle')
            });
        }
    }

    ThemeAchievement.extensions = extensionsAffected;
    ThemeAchievement.prototype = Achievement;
    module.exports = ThemeAchievement;
});
