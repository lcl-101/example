$(function(){
    var islogin = $("#islogin").val();
    islogin=0;
    //倒计时
    $.ajax({
        type: "post",
        //dataType: "test",
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
                        "is_start": 0,//  0=>未开始，1=>已开始，2=>代金券派发完毕
                        "next_time": 560349,  //时间戳
                        "active_end":1, // 1=>活动已经结束  0=>活动未结束
                        "is_send":1,  // 1=>已发放  0=>未发放
                        "coupon_money" : 88 // 如果已经抢过了 返回 抢购的金额
                    }
                }
            }
            if(data.code==0){
                var is_start=data.data.content.is_start;
                var active_end=data.data.content.active_end;
                var is_send=data.data.content.is_send;
                //倒计时
                function daojishi(){
                    var next_time=data.data.content.next_time;
                    var resultd=parseInt(next_time/60/60/24);
                    var resultt=parseInt(next_time/60/60%24);
                    var resultf=parseInt(next_time/60%60);
                    var results=parseInt(next_time%60);
                    //wap
                    $('.part2-btn').val(resultd+"天"+resultt+"时"+resultf+"分"+results+"秒");
                    var t=setInterval(function(){
                        next_time--;
                        var resultd=parseInt(next_time/60/60/24);
                        var resultt=parseInt(next_time/60/60%24);
                        var resultf=parseInt(next_time/60%60);
                        var results=parseInt(next_time%60);
                        //wap
                        $('.part2-btn').val(resultd+"天"+resultt+"时"+resultf+"分"+results+"秒");
                        if(next_time==0){
                            //wap
                            $('.part2-btn').val('立即抢购');
                            clearInterval(t);
                        }
                    },1000)
                }

                if(is_start==0){
                    $('.part2-limit-title span').html('1小时限时抢购');
                    $('.runstop1')[0].src='images/runstop.png';
                    daojishi();
                }else if(is_start==1){
                    $('.runstop1')[0].src='../images/runstop.png';
                    if(islogin==0) {
                        $('.part2-btn').val('请先登陆');
                        $('.part2-btn').on('click',function(){
                            location.href='/user/login?from=/active/purchasecoupon';
                        })
                    }else {
                        $('.part2-btn').val('立即抢购');
                        $('.part2-btn').on('click',function(){
                            //wap
                            lijiqianggou();
                        })
                    }
                    var next=data.data.content.next_time;
                    setInterval(function(){
                        next--;
                        var resultts=parseInt(next/60/60%24);
                        var resultfs=parseInt(next/60%60);
                        var resultss=parseInt(next%60);
                        $('.part2-limit-title span').html(resultts+"时"+resultfs+"分"+resultss+"秒");
                    },1000);
                    //  是否领到红包
                    if(is_send==1){
                        $('.runstop1')[0].src='images/runout.png';
                        $('.part2-juan').css({display:'block'});
                        $('.part2-juan').html(data.data.content.coupon_money+'<span>元</span><div>代金券</div>');
                        $(".part2-btn").attr({"disabled":true});
                        $('.part2-btn').val('已抓住红包君');
                        $(".part2-btn").css({background:'url(images/hui.png) no-repeat 0 center',backgroundSize:'100%'});
                    }else if(is_send==0){

                    }

                }else if(is_start==2){
                    $('.part2-limit-title span').html('1小时限时抢购');
                    $('.runstop1')[0].src='images/active-end.png';
                    daojishi();
                }
                if (active_end==1){
                    $('.part2-limit-title span').html('1小时限时抢购');
                    $(".part2-btn").attr({"disabled":true});
                    $('.part2-btn').val('活动已结束');
                    $(".part2-btn").css({background:'url(images/hui.png) no-repeat 0 center',backgroundSize:'100%'});
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
                    //wap

                    //$('.runstop1').css({display:'none'});
                    //$('.run').css({display:'block'});

                    $('.runstop1')[0].src='images/run.gif';
                    setTimeout(function(){
                        //$('.run').css({display:'none'});
                        //$('.runout').css({display:'block'});

                        $('.runstop1')[0].src='images/runout.png';
                        $(".part2-btn").attr({"disabled":true});
                        $('.part2-btn').val('已抓住红包君');
                        $(".part2-btn").css({background:'url(images/hui.png) no-repeat 0 center',backgroundSize:'100%'});


                        if(data.data.content.code=='7'){
                            $('.part2-juan').css({display:'block'});
                            $('.part2-juan').html(data.data.content.message);
                        }else if(data.data.content.code=='8'){
                            $('.part2-juan').css({display:'block'});
                            $('.part2-juan').html(data.data.content.coupon_money+'<span>元</span><div>代金券</div>');
                        }
                    },5000);



                }
            }
        })
    }
    //活动1
    $.ajax({
        type: "get",
        dataType: "text",
        //url:'images/list',
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
                            "title": "投资：5k",
                            "is_get": 0,			//是否填写过收货地址，0：是；1：没有
                            "pic": "images/5kr.jpg" 	//奖品图片，带r的为彩色图片；不带r的为灰白图片
                        },
                        {
                            "title": "投资：1w",
                            "is_get": 0,
                            "pic": "images/1wr.jpg"
                        },
                        {
                            "title": "投资：3w",
                            "is_get": 0,
                            "pic": "images/3wr.jpg"
                        },
                        {
                            "title": "投资：5w",
                            "is_get": 0,
                            "pic": "images/5wr.jpg"
                        },
                        {
                            "title": "投资：10w",
                            "is_get": 0,
                            "pic": "images/10wr.jpg"
                        },
                        {
                            "title": "投资：20w",
                            "is_get": 0,
                            "pic": "images/20wr.jpg"
                        },
                        {
                            "title": "投资：30w",
                            "is_get": 0,
                            "pic": "images/30wr.jpg"
                        },
                        {
                            "title": "投资：40w",
                            "is_get": 1,
                            "pic": "images/40w.jpg"
                        },
                        {
                            "title": "投资：60w",
                            "is_get": 1,
                            "pic": "images/60w.jpg"
                        },
                        {
                            "title": "投资：80w",
                            "is_get": 1,
                            "pic": "images/80w.jpg"
                        },
                        {
                            "title": "投资：100w",
                            "is_get": 1,
                            "pic": "images/100w.jpg"
                        },
                        {
                            "title": "投资：150w",
                            "is_get": 1,
                            "pic": "images/150w.jpg"
                        },
                        {
                            "title": "投资：200w",
                            "is_get": 1,
                            "pic": "images/200w.jpg"
                        },
                        {
                            "title": "投资：250w",
                            "is_get": 1,
                            "pic": "images/250w.jpg"
                        },
                        {
                            "title": "投资：300w",
                            "is_get": 1,
                            "pic": "images/300w.jpg"
                        },
                        {
                            "title": "投资：400w",
                            "is_get": 1,
                            "pic": "images/400w.jpg"
                        },
                        {
                            "title": "投资：450w",
                            "is_get": 1,
                            "pic": "images/500w.jpg"
                        }
                    ]
                }
            }
            if(data.code==0){
                if(islogin==0){

                }else if(islogin==1){

                }
                //投资总额

                if(data.content.is_tankuang==0){
                    $('.mark').css({display:'block'});
                    //pc
                    $('.address').css({display:'block'});
                }else if(data.content.is_tankuang==1){
                    $('.mark').css({display:'none'});
                    //pc
                    $('.address').css({display:'none'});
                }

                var address_status=data.content.shouhuodizhi.address_status;
                //收货地址
                var shouhuo_name=data.content.shouhuodizhi.shouhuo_name;
                var shouhuo_address=data.content.shouhuodizhi.shouhuo_address;
                var mobile=data.content.shouhuodizhi.mobile;
                if(address_status==0){
                    //wap
                    $('.part1-address').css({display:'block'});

                    $('.shouhuo_name input').val(shouhuo_name);
                    $('.mobile input').val(mobile);
                    $('.shouhuo_address input').val(shouhuo_address);
                }else if(address_status==1){
                    //wap
                    $('.part1-address').css({display:'none'});
                }
                //奖品
                var html='';
                $.each(data.content.prizeList,function(i,item){
                    var title=item.title;
                    var pic=item.pic;
                    html+='<li> <img src="'+pic+'" alt=""> <div class="part1-juan-title ju">'+title+'</div> </li>';
                });
                $('#part1-content').html(html);
            }
        }
    })
    //收货地址
    //wap
    $('.part1-address a').on('click',function(){
        $('.mark').css({display:'block'});
        $('.address').css({display:'block'});
    })

    //地址提交
    //wap
    $('.address-commit').on('click',function(){
        var username;//姓名
        var mobile;//手机号
        var address;//地址
        username = $("#txt_username1 input").val();
        mobile = $("#txt_mobile1 input").val();
        address = $("#txt_address1 input").val();
        if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(address)==""){
            alert('请补全信息');
        }else{
            $.ajax({
                type: 'get',
                //url: "images/saveaddress",
                //data: {shouhuo_name:username,mobile:mobile, shouhuo_address:address},
                dataType: 'test',
                success: function(data) {
                    if(data.code==0){
                        $('.mark').css({display:'none'});
                        $('.address').css({display:'none'});
                    }else {
                    }
                }
            })
        }
    })
    $('.address-close').on('click',function(){
        $('.mark').css({display:'none'});
        //wap
        $('.address').css({display:'none'});
    })

    //close
    $('.login-close').on('click',function(){
        $('.mark').css({display:'none'});
        //wap
        $('.login-box').css({display:'none'});
    })
    //立即参与
    $('.part1-btn').on('click',function(){
        if(islogin==1){
            $('.part1-btn a')[0].href='/site/getlists';
        }else if(islogin==0){
            $('.mark').css({display:'block'});
            $('.login-box').css({display:'block'});
            login();
        }
    })
    function login(){
        $('.login-commit').on('click',function(){
            var username;//姓名
            var password;//密码
            username = $(".login-username").val();
            password = $(".user-password").val();
            if($.trim(username)=="" || $.trim(password)==""){
                alert('请补全信息');
            }else {
                $.ajax({
                    type: 'post',
                    //url: "/user/login/login",
                    //data: {username: username, password: password},
                    dataType: 'json',
                    success: function (data) {
                        data=
                        {
                            "code": 0,		//0表示登录成功，1表示登录失败
                            "message": "",
                            "content": ""
                        }
                        if(data.code==0){
                            $('.login-commit')[0].href='/site/getlists';
                        }
                    }
                })
            }
        })
    }

})