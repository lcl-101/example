$(function(){
    $.ajax({
        type: "post",
        url: "/api/common/summary",
        dataType: "json",
        success:function(data){
            var lixi=$.number(data.jiaoyie/100000000,2,',','');
            var jiaoyie=$.number(data.lixi/10000,0,',','');
            $('.quan-data-left p').html(lixi+'<span>亿元</span>');
            $('.quan-data-right p').html(jiaoyie+'<span>万元</span>');
        }
    })
})