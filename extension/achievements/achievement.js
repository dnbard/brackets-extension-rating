define(function(require, exports, module){
    var badgeRanks = {
        gold: 0,
        silver: 1,
        bronze: 2
    }

    function Achievement(){
        this.name = null;
        this.ranks = badgeRanks;
    }

    Achievement.prototype.writeBadge = function(rank, element, achievement){
        if (!element){
            throw new Error('Element must be defined');
        }

        if (element.badge === undefined){
            element.badge = [];
        }

        element.badge.push({
            rank: rank,
            achievement: this
        });
    }

    module.exports = new Achievement();
});
