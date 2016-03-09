/**
 * Created by lcl on 2015/11/16.
 */
$(function(){
    //footer

    $('.load').click(function(){


    })
    getlist();
})

//
function getlist(){
    $.ajax({
        type: 'GET',
        url: "/site/indexresult",
        dataType: 'json',
        success: function(data) {
            // data = {
            //         adv: [
            //             {
            //                 link: "/",               //点击广告去向
            //                 description: "广告1",    //广告描述
            //                 image: "path"           //广告路径
            //             }
            //         ],
            //         deals: [
            //             {
            //                 num: "1000001",         //标的编号
            //                 title: "金服通1号",       //标的名称
            //                 yr: "10.50%",              //年化
            //                 status: "预告期",          //状态
            //                 qixian: 200,              //期限【天】
            //                 fp: 0                    //完成比例
            //             }
            //         ],
            //         code: 0,                       //返回状态值【0正常  其他见文档】
            //         message: "消息返回"            //内容加载提示
            //     };

            if(data.code==0){
                var html='';
                $.each(data.deals,function(i,item){
                    var title=item.title;
                    var yr=item.yr;
                    var status=item.status;
                    var qixian=item.qixian;
                    var fq=item.fq;
                    var sn=item.num;
                    html+='<div class="row column dealdata" data-index="'+sn+'"> <div class="hidden-xs col-sm-1"></div> <div class="col-xs-12 col-sm-10 column-title">'+title+'</div> <div class="column-title-rg">'+status+'</div> <div class="container"> <ul class="row column-content"> <li class="col-xs-4"> <div>'+yr+'<span class="column-lu">%</span></div> <span>年化收益率</span> </li> <li class="col-xs-4"> <div>'+qixian+'<span class="column-lu">天</span></div> <span>期限</span> </li> <li class="col-xs-4"> <div class="column-clock"><span>明日</span>15:00</div> </li> </ul> </div> <div class="hidden-xs col-sm-1"></div> </div>';

                })
                $('.slideBox').after(html);
                $('.dealdata').bind('click', function () {
                    location.href='/deal/deal/detail?sn='+$(this).attr('data-index');
                })
            }
        }
    });
}