$(function(){
    var islogin = $("#islogin").val();
    islogin=1;
    var pageCount1=0;
    var pageIndex1 = 0;     //页面索引初始值
    var pageSize = 5;     //每页显示条数初始化，修改显示条数，修改这里即可
    function nextPage(pageCount)
    {
        $("#projectListPagination").pagination(pageCount, {
            num_edge_entries: 1,        //两侧首尾分页条目数
            num_display_entries: 4,    //连续分页主体部分分页条目数
            link_to:"javascript:;",
            callback: PageCallback,
            items_per_page: pageSize,  //显示条数
            current_page: pageIndex1,   //当前页索引
            prev_text: '上一页',       //上一页按钮里text
            next_text: '下一页'       //下一页按钮里text
        });
    }
    //二维码
    $('.code-close').on('click',function(){
        $('.code-box').css({display:'none'});
        $('.mask').css({display:'none'});
    })

    function generateQrCode(code){
        //生成二维码
        $(".code-ma").qrcode({
            "render": "div",
            "size": 128,
            "color": "#3a3",
            //"text":  '888.wangcaigu.cn/user/wxshare?code=9NhYIT'
            "text":code
        });
    }

    //翻页调用
    function PageCallback(pageindex1,jq){
        InitTable(pageindex1,0);
    }
    function InitTable(pageindex1,flag){
        $.ajax({
            type: "post",
            dataType: "text",
            //url:'/ActivePChongbao/hongbaoDetail',
            data: "pageIndex=" + pageindex1 + "&pageSize=" + pageSize,
            success: function (data) {
                data= {
                    "code": 0,
                    "message": "",
                    "content": [
                        {
                            "title": "11111e111sdsdfsdfsdfsdfsdfsdsdfsdfsdfsdffdsdffsdfsdfsfdfsdf",
                            "deal_number": "20150617101802190876",
                            "order_time": "0",
                            "status": 0,
                            "url": "http://wapwcgtest.wangcaigu.cn/active/coupon/index?dealOrderNum=20150617101802190876"
                        },
                        {
                            "title": "tq105",
                            "deal_number": "20150617112446612296",
                            "order_time": "0",
                            "status": 0,
                            "url": "http://wapwcgtest.wangcaigu.cn/active/coupon/index?dealOrderNum=20150617112446612296"
                        },
                        {
                            "title": "tq202",
                            "deal_number": "20150617132415204400",
                            "order_time": "0",
                            "status": 0,
                            "url": "http://wapwcgtest.wangcaigu.cn/active/coupon/index?dealOrderNum=20150617132415204400"
                        },
                        {
                            "title": "提前还款--101",
                            "deal_number": "20150624150542500951",
                            "order_time": "0",
                            "status": 0,
                            "url": "http://wapwcgtest.wangcaigu.cn/active/coupon/index?dealOrderNum=20150624150542500951"
                        },
                        {
                            "title": "提前还款--101",
                            "deal_number": "20150624150542780002",
                            "order_time": "0",
                            "status": 0,
                            "url": "http://wapwcgtest.wangcaigu.cn/active/coupon/index?dealOrderNum=20150624150542780002"
                        }
                    ],
                    "pageCount": "10"
                }
                var pageCount1 = data.pageCount;
                if (flag == 1) {
                    pageCount1 = pageCount1;
                    nextPage(pageCount1, 0);
                }
                if(data.code==0) {
                    if (data.content.length > 0) {
                        $('.bottom-hongbao').css({display: 'block'});

                        var html = '';
                        $.each(data.content, function (i, item) {
                            var projectname = item.title;
                            var touzi_time = item.order_time;
                            var hongbao_status = item.status;
                            var url=item.url;
                            var className = (i%2==0)?"":"hui";
                            if (hongbao_status == 1) {
                                html += '<div class="bottom-hongbao-content1 '+className+'"> <div class="bottom-hongbao-xiangmu"> <img src="images/lingquhou.png" alt=""> <span>' + projectname + '</span> </div> <div class="bottom-hongbao-time">' + touzi_time + '</div> <div class="bottom-hongbao-qing">已领取</div> </div>';
                            } else if (hongbao_status == 0) {
                                html += '<div class="bottom-hongbao-content1 '+className+'"> <div class="bottom-hongbao-xiangmu"> <img src="images/lingquqian.png" alt=""> <span>' + projectname + '</span> </div> <div class="bottom-hongbao-time">' + touzi_time + '</div> <div class="bottom-hongbao-qing lan" codeimg="'+url+'">点击领取</div> </div>';
                            }
                            $('#projectListInfo').html(html);
                            $('.bottom-top div').on('click',function(){
                                var index=$('.bottom-top div').index(this);
                                $('.bottom-top div').css({background:'#8dc878',color:'#fff'});
                                $('.bottom-top div').eq(index).css({background:'#fff',color:'#595757'});
                                if(index==0){
                                    $('.rule-box').css({display:'none'});
                                    $('.bottom-hongbao').css({display:'block'});
                                }else if(index==1){
                                    $('.rule-box').css({display:'block'});
                                    $('.bottom-hongbao').css({display:'none'});
                                }
                            })
                            $('.lan').on('click',function(){
                                $('.code-box').css({display:'block'});
                                $('.mask').css({display:'block'});
                                var index=$('.lan').index(this);
                                var imgurl=$('.lan').eq(index).attr('codeimg');
                                $('.code-ma').empty();
                                console.log(imgurl);
                                generateQrCode(imgurl);
                            })
                        })
                    } else if (data.content.length == 0) {
                        $(".bottom-bottom-content1").css({display: 'block'});
                        $('.bottom-top div').on('click',function(){
                            var index=$('.bottom-top div').index(this);
                            $('.bottom-top div').css({background:'#8dc878',color:'#fff'});
                            $('.bottom-top div').eq(index).css({background:'#fff',color:'#595757'});
                            if(index==0){
                                $('.rule-box').css({display:'none'});
                                $(".bottom-bottom-content1").css({display: 'block'});
                            }else if(index==1){
                                $('.rule-box').css({display:'block'});
                                $(".bottom-bottom-content1").css({display: 'none'});
                            }
                        })
                    }
                }
            }
        })
    }
    if(islogin=="0"){
        $('.bottom-bottom-login').css({display: 'block'});
        $('.bottom-login-btn').on('click',function(){
            $('#zhuantilogin').css({display:'block'});
        })
        $('.bottom-top div').on('click',function(){
            var index=$('.bottom-top div').index(this);
            $('.bottom-top div').css({background:'#8dc878',color:'#fff'});
            $('.bottom-top div').eq(index).css({background:'#fff',color:'#595757'});
            if(index==0){
                $('.rule-box').css({display:'none'});
                $('.bottom-bottom-login').css({display: 'block'});
                $('.bottom-login-btn').on('click',function(){
                    $('#zhuantilogin').css({display:'block'});
                })
            }else if(index==1){
                $('.rule-box').css({display:'block'});
                $('.bottom-bottom-login').css({display: 'none'});
            }
        })
    }else{
        InitTable(0,1)
    }
})