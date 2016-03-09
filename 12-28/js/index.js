$(function(){
    var islogin = $("#islogin").val();
    islogin=0;
    if(islogin==1){
        $('.part1big-btn img').on('click',function(){
            $('#zhuantilogin').css({display:'block'});
        })
        $('.part1big-btn span').on('click',function(){
            $('#zhuantilogin').css({display:'block'});
        })
    }else {
        $('.part1big-btn img').on('click',function(){
            $('#part1big-award-box').stop(true,false).slideToggle();
        })
        $('.part1big-btn span').on('click',function(){
            $('#part1big-award-box').stop(true,false).slideToggle();
        })
    }
    $('.part1-btn img').on('click',function(){
        $('#part1-award-box').stop(true,false).slideToggle();
    })
    $('.part1-btn span').on('click',function(){
        $('#part1-award-box').stop(true,false).slideToggle();
    })

    //倒计时
    $.ajax({
        type: "post",
        dataType: "text",
        //url:'/active/purchasecoupon/get-time',
        success: function (data) {
            data={
                "code": 0,
                "status": "success",
                "message": "成功",
                "data": {
                    "result": "success",
                    "msg": "成功",
                    "content": {
                        "is_start": 1,//  0=>未开始，1=>已开始，2=>代金券派发完毕
                        "next_time": 560349,  //时间戳
                        "active_end":1 // 1=>活动已经结束  0=>活动未结束
                    }
                }
            }
            if(data.code==0){
                var is_start=data.data.content.is_start;
                if(is_start==0){
                    $('.part2-limit-title span').html('1小时限时抢购');
                    $('.runstop1')[0].src='images/runstop.png';
                    function daojishi(){
                        var next_time=data.data.content.next_time;
                        var resultd=parseInt(next_time/60/60/24);
                        var resultt=parseInt(next_time/60/60%24);
                        var resultf=parseInt(next_time/60%60);
                        var results=parseInt(next_time%60);
                        //pc
                        $('.partbig2-btn').val(resultd+"天"+resultt+"时"+resultf+"分"+results+"秒");
                        //wap
                        $('.part2-btn').val(resultd+"天"+resultt+"时"+resultf+"分"+results+"秒");
                        var t=setInterval(function(){
                            next_time--;
                            var resultd=parseInt(next_time/60/60/24);
                            var resultt=parseInt(next_time/60/60%24);
                            var resultf=parseInt(next_time/60%60);
                            var results=parseInt(next_time%60);
                            //pc
                            $('.partbig2-btn').val(resultd+"天"+resultt+"时"+resultf+"分"+results+"秒");
                            //wap
                            $('.part2-btn').val(resultd+"天"+resultt+"时"+resultf+"分"+results+"秒");
                            if(next_time==0){
                                //pc
                                $('.partbig2-btn').val('立即抢购');
                                //wap
                                $('.part2-btn').val('立即抢购');
                                clearInterval(t);
                            }
                        },1000)
                    }
                    daojishi()
                }else if(is_start==1){
                    //pc
                    $('.partbig2-btn').val('立即抢购');
                    //wap
                    $('.part2-btn').val('立即抢购');

                    $('.runstop1')[0].src='images/runstop.png';
                    $('.partbig2-btn').on('click',function(){
                        ////wap
                        //$('.runstop1').css({display:'none'});
                        ////pc
                        //$('.runstop').css({display:'none'});
                        //$('.run').css({display:'block'});

                        setTimeout(function(){
                            //$('.run').css({display:'none'});
                            //$('.runout').css({display:'block'});
                            //$('.active-end').css({display:'none'});

                            $('.runstop1')[0].src='images/runstop.png';
                            $(".part2-btn").attr({"disabled":true});


                            $(".partbig2-btn").attr({"disabled":true});
                            $('.partbig2-btn').val('');
                            $(".partbig2-btn").css({background:'url(images/hui.png) no-repeat 0 0'});
                            lijiqianggou();
                        },5000);
                    })


                    var next=3600;
                    setInterval(function(){
                        next--;
                        var resultts=parseInt(next/60/60%24);
                        var resultfs=parseInt(next/60%60);
                        var resultss=parseInt(next%60);
                        $('.part2-limit-title span').html(resultts+"时"+resultfs+"分"+resultss+"秒");
                    },1000);

                    $('.part2-btn').on('click',function(){
                        //wap
                        //$('.runstop1').css({display:'none'});
                        ////pc
                        //$('.runstop').css({display:'none'});
                        //$('.run').css({display:'block'});

                        $('.runstop1')[0].src='images/run.gif';

                        setTimeout(function(){
                            //$('.run').css({display:'none'});
                            //$('.runout').css({display:'block'});
                            //$('.active-end').css({display:'none'});
                            $('.runstop1')[0].src='images/runout.png';

                            $(".part2-btn").attr({"disabled":true});
                            $('.part2-btn').val('');
                            $('.part2-btn').val('已抓住红包君');
                            $(".part2-btn").css({background:'url(images/hui.png) no-repeat 0 center',backgroundSize:'100%'});

                            $(".partbig2-btn").attr({"disabled":true});
                            lijiqianggou();
                        },5000);
                    })
                }else if(is_start==2){
                    $('.part2-limit-title span').html('1小时限时抢购');
                    $('.runstop1')[0].src='images/active-end.png';
                    //$('.run').css({display:'none'});
                    //$('.runout').css({display:'none'});
                    //$('.active-end').css({display:'block'});
                    daojishi();
                }
            }
        }
    })
    //立即抢购
    function lijiqianggou(){
        $.ajax({
            type: "post",
            dataType: "text",
            //url:'/active/purchasecoupon/purchase-coupon',
            success: function (data) {
                data={
                    "code": 0,
                    "status": "success",
                    "message": "成功",
                    "data": {
                        "result": "success",
                        "msg": "成功",
                        "content": {
                            "coupon_money": 88  //代金券金额
                        }
                    }
                }
                if(data.code==0){
                    //pc
                    $('.partbig2-juan').css({display:'block'});
                    $('.partbig2-juan').html(data.data.content.coupon_money+'<span>元</span><div>代金券</div>');
                    //wap
                    $('.part2-juan').css({display:'block'});
                    $('.part2-juan').html(data.data.content.coupon_money+'<span>元</span><div>代金券</div>');
                }
            }
        })
    }
    //活动1
    $.ajax({
        type: "post",
        dataType: "text",
        //url:'/active/purchasecoupon/purchase-coupon',
        success: function (data) {
            data={
                "code": 0,
                "content": {
                    "touziTotal": "375,511.00",		//投资总计（以千位分隔符方式显示数字）

                    //shouhuodizhi为收货地址信息，有收货地址：address_status为0，其他均有数据
                    //没有收货地址：address_status为1，其他shouhuo_name、shouhuo_address、mobile为空字符串

                    "shouhuodizhi": {
                        "address_status": 0, 		// 0： 有收货地址；1：没有收货地址
                        "address_url": '', 		// 保存收货地址；没有收货地址时为空字符串
                        "shouhuo_name": "qingmu",	//收货人姓名
                        "shouhuo_address": "hunan",	//收获地址
                        "mobile": "18710020772"		//移动电话
                    },
                    "is_tankuang":1,   //0：表示弹框；1：不弹框
                    "prizeList": [
                        {
                            "title": "投资额度：5k",
                            "is_get": 0,			//是否填写过收货地址，0：是；1：没有
                            "pic": "/active/laxincuhuo/5kr.png" 	//奖品图片，带r的为彩色图片；不带r的为灰白图片
                        },
                        {
                            "title": "投资额度：1w",
                            "is_get": 0,
                            "pic": "/active/laxincuhuo/1wr.png"
                        },
                        {
                            "title": "投资额度：3w",
                            "is_get": 0,
                            "pic": "/active/laxincuhuo/3wr.png"
                        },
                        {
                            "title": "投资额度：5w",
                            "is_get": 0,
                            "pic": "/active/laxincuhuo/5wr.png"
                        },
                        {
                            "title": "投资额度：10w",
                            "is_get": 0,
                            "pic": "/active/laxincuhuo/10wr.png"
                        },
                        {
                            "title": "投资额度：20w",
                            "is_get": 0,
                            "pic": "/active/laxincuhuo/20wr.png"
                        },
                        {
                            "title": "投资额度：30w",
                            "is_get": 0,
                            "pic": "/active/laxincuhuo/30wr.png"
                        },
                        {
                            "title": "投资额度：40w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/40w.png" 	//奖品图片，带r的为彩色图片；不带r的为灰白图片
                        },
                        {
                            "title": "投资额度：60w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/60w.png"
                        },
                        {
                            "title": "投资额度：80w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/80w.png"
                        },
                        {
                            "title": "投资额度：100w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/100w.png"
                        },
                        {
                            "title": "投资额度：150w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/150w.png"
                        },
                        {
                            "title": "投资额度：200w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/200w.png"
                        },
                        {
                            "title": "投资额度：250w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/250w.png"
                        },
                        {
                            "title": "投资额度：300w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/300w.png"
                        },
                        {
                            "title": "投资额度：400w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/400w.png"
                        },
                        {
                            "title": "投资额度：450w",
                            "is_get": 1,
                            "pic": "/active/laxincuhuo/450w.png"
                        }
                    ]
                }
            }
            if(data.code==0){
                $('.part1big-money').html(data.content.touziTotal+'<span>元</span>');
                //投资总额
                if(data.content.is_tankuang==0){
                    $('.mark').css({display:'block'});
                    //wap
                    $('.address').css({display:'block'});
                    //pc
                    $('.address-pc').css({display:'block'});
                }else if(data.content.is_tankuang==1){
                    $('.mark').css({display:'none'});
                    //wap
                    $('.address').css({display:'none'});
                    //pc
                    $('.address-pc').css({display:'none'});
                }
                var address_status=data.content.shouhuodizhi.address_status;
                //收货地址
                var shouhuo_name=data.content.shouhuodizhi.shouhuo_name;
                var shouhuo_address=data.content.shouhuodizhi.shouhuo_address;
                var mobile=data.content.shouhuodizhi.mobile;
                if(address_status==0){
                    //pc
                    $('.part1big-address').css({display:'block'});
                    //wap
                    $('.part1-address').css({display:'block'});

                    $('.shouhuo_name input').val(shouhuo_name);
                    $('.mobile input').val(mobile);
                    $('.shouhuo_address input').val(shouhuo_address);
                }else if(address_status==1){
                    //pc
                    $('.part1big-address').css({display:'none'});
                    //wap
                    $('.part1-address').css({display:'none'});
                }
                //奖品
                var html='';
                var aa='';
                $.each(data.content.prizeList,function(i,item){
                    var title=item.title;
                    var is_get=item.is_get;
                    var pic=item.pic;
                    if(is_get==0){
                        //wap
                        html+='<div class="part1-award-content"> <p>'+title+'</p> <img src="'+pic+'" alt=""> <div><img src="images/star.png" alt="">已获得</div> </div>';
                        //pc
                        aa+='<div class="part1big-award-content"> <p>'+title+'</p> <img src="'+pic+'" alt=""> <div><img src="images/star.png" alt="">已获得</div> </div>';
                    }else if(is_get==1){
                        //wap
                        html+='<div class="part1-award-content"> <p class="ju">'+title+'</p> <img src="'+pic+'" alt=""> <div class="hui">未获得</div> </div>';
                        //pc
                        aa+='<div class="part1big-award-content"> <p class="ju">'+title+'</p> <img src="'+pic+'" alt=""> <div class="hui">未获得</div> </div>';
                    }
                })
                //wap
                $('#part1-award-box').html(html);
                //pc
                $('#part1big-award-box').html(aa);
            }
        }
    })
    //收货地址
    //wap
    $('.part1-address a').on('click',function(){
        $('.mark').css({display:'block'});
        $('.address').css({display:'block'});
    })
    //pc
    $('.part1big-address a').on('click',function(){
        $('.mark').css({display:'block'});
        $('.address-pc').css({display:'block'});
    })

    //地址提交
    //pc
    $('.address-pc-commit').on('click',function(){
        var username;//姓名
        var mobile;//手机号
        var address;//地址
        username = $("#txt_username span").val();
        mobile = $("#txt_mobile span").val();
        address = $("#txt_address span").val();
        if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(address)==""){
            $('.tishi').css({display:'block'});
        }else{
            $.ajax({
                type: 'GET',
                //url: "https://888.wangcaigu.cn/ActiveLaxincuhuo/saveAddress",
                //data: {username:username,mobile:mobile,address:address},
                dataType: 'text',
                success: function(data) {
                    data=	{
                        "code": 0,
                        "message": "success"
                    }
                    if(data.code==0){

                    }else {

                    }
                }
            })
        }
    })
    //wap
    $('.address-commit').on('click',function(){
        var username;//姓名
        var mobile;//手机号
        var address;//地址
        username = $("#txt_username1 input").val();
        mobile = $("#txt_mobile1 input").val();
        address = $("#txt_address1 input").val();
        if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(address)==""){
            $('.tishi').css({display:'block'});
        }else{
            $.ajax({
                type: 'GET',
                //url: "https://wapwcgtest.wangcaigu.cn/active/laxincuhuo/saveaddress",
                //data: {username:username,mobile:mobile,address:address},
                dataType: 'text',
                success: function(data) {
                    data=	{
                        "code": 0,
                        "message": "success"
                    }
                    if(data.code==0){

                    }else {

                    }
                }
            })
        }
    })
    $('.mark').on('click',function(){
        $('.mark').css({display:'none'});
        //wap
        $('.address').css({display:'none'});
        //pc
        $('.address-pc').css({display:'none'});
    })
})