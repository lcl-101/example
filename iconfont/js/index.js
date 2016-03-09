/**
 * Created by lcl on 2015/10/10.
 */
$(function () {
    var lists=$("ul[data-role=list][list-style=horizontal]");
    lists.each(function (index,obj) {
        var li=$(obj).children("li");
        li.css({width:100/li.length+"%",float:"left"});
    })
})