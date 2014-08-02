define(function(require, exports, module){
    var Achievement = require('./achievement'),
        config = require('../config'),
        _ = require('../vendor/lodash.min'),
        locale = require('../services/locale'),
        ExtensionsService = require('../services/extensions'),
        image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaklEQVR42p2Sf2iUdRzHvwT5RyrlaoglqBSBDksi+rVsOXU07I47KsEE3eBicxWBehTVZJttjVs3k7vKTdncdmNuu82bzgmSO5dw262TgacVPNtipdW53d1ueN1zz/P9ft49zwO7cVr/9IUX38/n/cCL7/fzfNmRI6ysuppNf3d6E4UXTtEk+g3Gk3V0/OdlVNqzmlZYi4jtNBk8aLZRjq2FHj9wkjbZ3fN5h92dGw+517GGr3Onui4Up88HSvDLQg9+w2WMztdgOPIpPu634ED7OyisrMHL9sYMxfV9KPyiC3l2N56pbFG2dgQd7ERbHl2dqkKCZkAkQBDgpIALBWlVR4ViwJfgXMs5ukevY8tRD4rOTybZ2O9f0o1YBwRxBINBtLa2ZhEOhzExMXFfHgqFoHIB27lreD00BybBq53le0PU1NQEk8mUhdfrhcfjuS/XZbqo9qco8m9xsLDSTKPzR42rLIpsNhtqa2sNAoEARkZGMn1paWlGxIWK8dsu9N6pB/vx73oa+vNdqELOiJxOJ2ZnZzE3N4dkMmmg13qmyxZFJNJAwgLMPw/WNLmazvyanyVyuVzg2kCJKAs9czgcSyKuABP7gLGdYFXBZdQmbc4Sud1uCCFw79KzhoaGbNGVMuCiGWzN/gKyOPYgraT/n2jcDsw4wB7YtZc2l30EWVkadmNjI+LxOBKJBGRZRiqVMmo9y5qRcbXPtTm1gz1SfpJe/OyUJlIzIrPZDKvVauDz+dDd3Z3p9W9Lw1aBm98AbWVga+uuUoFrDLL67++ot7f3P98RCQ5M+YDKN8Fe6rpBr3muYzqewl+RCCRJyiIajRq//t589k4EFJkGOg9CqdkFVjwoUeHQDEp++APH4jK+TalIys1QUyegJrzgC2fBE2e1egCqfBuqEjfgMU3SUg44LRgrfwWs4lJfbPetGN7WTnQldQzTih08+QlI526VhhMkh7T9JuiC1vcchNBYaH4Pl9/YiL7tT2Pf+py7rH9w++lBf0G6PVCBawMmSAPbIPkskC7ugRSuhBTUOH4IUvWHkGxbIZW8gA5zHuq2PYX3N6zCW2tWKsW5y+uZv++JtcO+dTXDnU9Gh6ufE/5FvioQ/qHDwn/mA+G3Piv8+RsyVKzPEUW5K8SOx5bHdjz6UN2rD7NV/wATxK/x0owARwAAAABJRU5ErkJggg==";

    function ThemeAchievement(){
        this.calculate = function(extensions){
            var regexp = /theme/;

            _.each(extensions, _.bind(function(extension){
                var bracketsExtension = ExtensionsService.get(extension._id);
                if (bracketsExtension && bracketsExtension.metadata && bracketsExtension.metadata.theme){
                    this.writeBadge(null, extension);
                    console.log(extension._id);
                }
            }, this));
        }

        this.getTag = function(rating, element){
            return _.template('<span title="${title}" class="ext-badge ext-badge-theme"><img src="${badge}" /></span>',{
                badge: image,
                title: locale.get('themeTitle')
            });
        }
    }

    ThemeAchievement.prototype = Achievement;
    module.exports = ThemeAchievement;
});
