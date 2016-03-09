$(function() {
	var awardList_invite="";//成功邀请排行榜 html
	var awardList_invest="";//投资总额排行榜 html
	var htmlTemp_J = "<p class='list_246'>"
	var htmlTemp_O = "<p class='list_135'>"
	var htmlTemp = "<span class='sp1'>2</span><span class='sp2'>m***m</span><span class='sp3'>72人</span><span class='sp4'>866,562元</span></p>";
	var islogin = $("#islogin").val();
	var shareCode;//分享吗
	var avl_mnum=5;//可用M值

	//弹出登录按钮
	$(".login_user .p2,.login_user .p1").on("click",function(){

		if(islogin=="0"){
			$("#zhuantilogin").show();
		}
		else{
			// doSignIn();
		}
	})

	//隐藏登陆框
	$("#loginclose").on("click",function(){
		$(".overlay").hide();

	})

	//登陆确定按钮
	$("#login-btn").on("click",function(){
		$("#loginerror").html("");
		var username=$("#loginname").val();
		var password=$("#loginpwd").val();
		if(username=="" || password==""){
			$("#loginerror").html("用户名和密码不能为空！");
		}
		else{
			$("#login-btn").text("提交中").prop("disabled",true);
			$.ajax({
				type: 'POST',
				url: "/index/login",
				data: {name: username, pass: password},
				dataType: 'text',
				success: function(data) {
					if (data == "yes") {
						$('.login_user a').css({display:'block'});
						location.reload();
						//location.href = location.href;
					} else {
						var html = '用户名或密码错误！';
						$("#loginerror").html(html);
						$("#login-btn").text("确 定").prop("disabled",false);
					}
				}
			});
		}
	});

	var getAwardList=function(type){
		var type = type;//排行榜类型 1=成功邀请排行榜；2=投资总额排行榜

		$.ajax({
				type: 'GET',
				url: "/Active/activeYaoqingGetAwardList",
				data: {type: type},
				dataType: 'json',
				success: function(data) {
					 //alert(data);
			  		// data = [
							//     {
							// 		"id": 1,				//名次
							//         "yaoqing_uid": "3077",	//邀请用户ID
							//         "username": "n***8",	//被邀请用户名
							//         "total_money": "4991784.8952",	//被邀请人投资总额        
							//         "yaoqing_num": "2"		//成功邀请
							//     },
							//     {
							// 		"id": 2,				//名次
							//         "yaoqing_uid": "3077",	//邀请用户ID
							//         "username": "n***89",	//被邀请用户名
							//         "total_money": "4991784.8952",	//被邀请人投资总额        
							//         "yaoqing_num": "2"		//成功邀请
							//     }
							// ];

			        if(data.length>0){
			        	$.each(data, function (i, item) {
							// alert(item.id + ","  + item.username);
							var id=item.id;//名次
							var username = item.username;//被邀请用户名
							var total_money = item.total_money;//被邀请人投资总额
							var yaoqing_num = item.yaoqing_num;//成功邀请

							var html;
							if(i%2 == 0){
								html=htmlTemp_O;
							}else{
								html=htmlTemp_J;
							}
							if(i==0){
								html+="<span class='sp1 num_1'><img src='/template/default/Public/images/zhuanti/28/num_1.png' /></span>";
							}else if(i==1){
								html+="<span class='sp1 num_2'><img src='/template/default/Public/images/zhuanti/28/num_2.png' /></span>";
							}else if(i==2){
								html+="<span class='sp1 num_3'><img src='/template/default/Public/images/zhuanti/28/num_3.png' /></span>";
							}else{
								html+="<span class='sp1'>"+id+"</span>";
							}

							html+="<span class='sp2'>"+username+"</span><span class='sp3'>"+yaoqing_num+"人</span><span class='sp4'>"+total_money+"元</span></p>";

							if(type==1){
								//1 成功邀请排行榜
								awardList_invite+=html;
							}else{
								//2 投资总额排行榜
								awardList_invest+=html;
							}
						});
				        if(type==1){
				        	//1 成功邀请排行榜
				        	$(".paihang_list div").html(awardList_invite);
				        }
				        // alert(awardList_invite);
			        }else{
			        	//列表数据为空
			        }
			        
				}
			});
	};

	getAwardList(1);
	getAwardList(2);
	

	//排行切换
    $(".tz_qiehuan").mouseover(function(){
		//alert(awardList_invest);
		//alert(awardList_invite);

		$(".paihang_list div").html(awardList_invest);

        $(".paihang_qiehuan").addClass("qihuanhover");
        $(".paihang_list .sp3").css("color","#8e8e98");
        $(".paihang_list .sp4").css("color","#c42322");
    }).mouseout(function(){

    	$(".paihang_list div").html(awardList_invite);

        $(".paihang_qiehuan").removeClass("qihuanhover");
        $(".paihang_list .sp3").css("color","#c42322");
        $(".paihang_list .sp4").css("color","#8e8e98");
    });


    //M值点击换背景色
	// $(".jiangpin dd").mouseover(function(){
	//     $(this).addClass("ddhover");
	// });
	// $(".jiangpin dd").mouseout(function(){
	//     $(this).removeClass("ddhover");
	// });
	// $(".jiangpin dd").mousedown(function(){
	//     $(this).addClass("ddactive");
	// });
	//  $(".jiangpin dd").mouseup(function(){
	//     $(this).removeClass("ddactive");
	// });
	$(".jd_50_dh,.xiaomi_dh,.djq_dh,.jd_300_dh").mouseover(function(){
            $(this).addClass("ddhover").mouseout(function(){
            $(this).removeClass("ddhover");
            });
    });
    $(".jd_50_dh,.xiaomi_dh,.djq_dh,.jd_300_dh").mousedown(function(){
            $(this).addClass("ddactive").mouseup(function(){
            $(this).removeClass("ddactive");
        });
    });
	//经过遮罩层出现
	$(".jiangpin dt").mouseover(function(){
	    $(this).parent().find("dt").eq(1).css("display","block");
	});
	$(".jiangpin dt").mouseout(function(){
	    $(this).parent().find("dt").eq(1).css("display","none");
	});
	//确定按钮滑过按下
	$(".submit_01").mouseover(function(){
	    $(this).addClass("submithover");
	});
	$(".submit_01").mouseout(function(){
	    $(this).removeClass("submithover");
	});
	$(".submit_01").mousedown(function(){
	    $(this).addClass("submitactive");
	});
	$(".submit_01").mouseup(function(){
	    $(this).removeClass("submitactive");
	});

	var getUserInfo=function(){
		$.ajax({
			type: 'POST',
			url: "/Active/activeGetYqCodeAndMnum",
			dataType: 'json',
			success: function(data) {
		  		 data = {
						     "content": {
						     	"username": "yabusai",
						         "yq_code": "pKi36E",	//邀请码
						         "avl_mnum": 1,			//可用M值
						         "icon": ""  //用户头像
						     },
						     "code": 0,
						     "title": "",
						     "message": ""
						 };


		        if(data!=undefined && data!=null){
		        	if(data.code=="0"){
		        		avl_mnum = data.content.avl_mnum;
		        		shareCode = data.content.yq_code;//邀请码
		        		var shareUrl = "https://www.wangcaigu.com/user/reg/code-"+shareCode;
		        		$(".share_link").html(shareUrl);
			        	$("#copy-button").attr("data-clipboard-text",shareUrl);
			        	generateQrCode();
			        	if(avl_mnum>0){
			        		$(".login_user .p2").html("兑换值："+data.content.avl_mnum);
			        	}else{
			        		$(".login_user .p2").hide();
			        		$(".login_user .no_dhz").show();
			        	}
			        	$(".login_user .p1").html(data.content.username);
			        	if(data.content.icon==""){
			        		$(".login_user img").attr("src","/template/default/Public/images/zhuanti/28/touxiang.png");
			        	}else{
			        		$(".login_user img").attr("src",data.content.icon);
			        	}

			        	//设置兑换按钮状态
			        	setExchangeBtnStatus();
		        	}else{
		        		alert(data.message);
		        	}
		        	
		        }else{
		        	//列表数据为空
		        }
		        
			}
		});
	};

	//var btObjects = $(".jiangpin .jiangpin_dd button");
    //
	//btObjects.each(function( index ) {
	//	//console.log( index + ": "" + $(this).text() );
	//	//alert($(this).html());
	//	if(index<=2){
	//		if(avl_mnum<=0){
	//			alert(1);
	//			$(this).addClass("jiangpin_dlzbg");
	//			$(this).attr("disabled","true");
	//		}else{
	//			$(this).removeAttr("disabled");//启用按钮
	//			$(this).removeClass("jiangpin_dlzbg");
	//		}
	//	}else{
	//		if(avl_mnum<5){
    //
	//			$(this).addClass("jiangpin_dlzbg");
	//			$(this).attr("disabled","true");
	//		}else{
	//			$(this).removeAttr("disabled");//启用按钮
	//			$(this).removeClass("jiangpin_dlzbg");
	//		}
	//	}
	//});

	if(islogin=="1"){
		getUserInfo();
	}else{
		//马上登录账户，复制邀请链接~邀请好友走起~
		$(".share_link").html("马上登录账户，复制邀请链接~邀请好友走起~");
	}


	//分享****************************************************

	function generateQrCode(){
		//生成二维码
	    $(".qrcode-img").qrcode({
	        "render": "div",
	        "size": 200,
	        "color": "#3a3",
	        //"text":  '888.wangcaigu.cn/user/wxshare?code=9NhYIT'
	         "text":  'https://m.wangcaigu.com/active/wxshare?code='+shareCode
	    });
	}

	//分享-微信
	$(".weixin").click(function(){
		if(islogin=="0"){
			$("#zhuantilogin").show();
		}else{
			$(".mask_layder,.weixin_dialog").addClass("disblock");
		}
	})
	//分享-微博
	$(".share_list .weibo").click(function(){
		if(islogin=="0"){
			$("#zhuantilogin").show();
		}else{
			var shareUrl = 'https://www.wangcaigu.com/user/registershow/code-'+shareCode+'?from=yq';
    		window.open('http://service.weibo.com/share/share.php?title=旺财谷给您发红包了，打开链接'+shareUrl+'即可获得30元投资代金劵 &pic=https://www.wangcaigu.com/template/defau__TPL__Public/images/sharelogo.jpg?1428573578416&ralateUid=5261134212');
		}
	});
	//分享－粘贴
	if(islogin=="1"){
        var clip = new ZeroClipboard(document.getElementById("copy-button")); 
    }

    $(".copy_link").click(function(){
        if(islogin=="1"){
            alert('内容已复制到剪贴板');
        }else{
            $("#zhuantilogin").show();
        }
    });

    //M值兑换****************************************************

    var active_id;//活动ID， 从兑换奖品接口返回值获取
    var draw_record_id;//奖品兑换记录ID， 从兑换奖品接口返回值获取

    var InterValObj_50; //timer变量，控制时间
    var curCount_50;//当前剩余秒数

    var InterValObj_300; //timer变量，控制时间
    var curCount_300;//当前剩余秒数

	var count = 5; //间隔函数，1秒执行
	

    $(".yzm").click(function(){
    	var mobile;//手机号
    	var isJD50=true;

    	if($(this).attr("id")=="btn_yzm_50"){
    		//50元京东卡
    		mobile=$("#txt_mobile_50").val();
    	}else{
    		//300元京东卡
    		isJD50 = false;
    		mobile=$("#txt_mobile_300").val();
    	}

    	if(""!=$.trim(mobile)){
    		$(this).addClass("yzm_send");
    		$(this).attr("disabled","true");
    		if(isJD50){
    			curCount_50 = count;
            	$(this).text("重新发送("+curCount_50+")");
             	InterValObj_50 = window.setInterval(SetRemainTime_50, 1000); //启动计时器，1秒执行一次
    		}else{
    			curCount_300 = count;
            	$(this).text("重新发送("+curCount_300+")");
             	InterValObj_300 = window.setInterval(SetRemainTime_300, 1000); //启动计时器，1秒执行一次
    		}

    		$.ajax({
				type: 'POST',
				url: "/Active/activeSendVcode",
				data: {phone: mobile},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						//发送成功
					}else{
						alert(data.message);
					}
					
				}
			});
    	}else{
    		alert("请输入手机号！")
    	}


    });

    function SetRemainTime_50() {
       if (curCount_50 == 0) {                
        	window.clearInterval(InterValObj_50);//停止计时器
        	$("#btn_yzm_50").removeAttr("disabled");//启用按钮
			$("#btn_yzm_50").removeClass("yzm_send");
            $("#btn_yzm_50").text("重新发送");
        }
        else {
            curCount_50--;
            $("#btn_yzm_50").text("重新发送("+curCount_50+")");
        }
   }

   function SetRemainTime_300() {
       if (curCount_300 == 0) {                
        	window.clearInterval(InterValObj_300);//停止计时器
        	$("#btn_yzm_300").removeAttr("disabled");//启用按钮
			$("#btn_yzm_300").removeClass("yzm_send");
            $("#btn_yzm_300").val("重新发送");
        }
        else {
            curCount_300--;
            $("#btn_yzm_300").val("重新发送("+curCount_300+")");
        }
   }

    //M值兑换－京东50
	$(".jd_50_dh").click(function(){
		avl_mnum--;
		setExchangeBtnStatus();
		//if(islogin=="0"){
		//	$("#zhuantilogin").show();
		//}else{
		//	$(this).addClass("jiangpin_dlzbg");
		//	$.ajax({
		//		type: 'POST',
		//		url: "/Active/activeExchangeAward",
		//		data: {awardsn: "jde_50"},
		//		dataType: 'json',
		//		success: function(data) {
		//			if(data.code==0){
		//				$(".mask_layder,.hj_jd_50").addClass("disblock");
	    	//			// 活动Id， 保存地址信息时，需要提交此ID
		//				active_id = data.content.activeid;
		//				// 兑换奖品记录Id， 保存地址信息时，需要提交此ID
		//				draw_record_id = data.content.draw_record_id;
        //
        //
		//				//兑换成功，M值减1，充值兑换按钮状态
	    	//			avl_mnum--;
	    	//			setExchangeBtnStatus();
		//			}else{
		//				alert(data.message);
		//				//test
		//				// $(".mask_layder,.hj_jd_50").addClass("disblock");
	    	//			// $(".jd_ecard_300").html("50元京东E卡");
		//			}
		//
		//		}
		//	});
		//}
	});
	$("#btn_jd_coupon_50").click(function(){
		var username;//姓名
    	var mobile;//手机号
    	var vericode;//验证码

    	username = $("#txt_username_50").val();
    	mobile = $("#txt_mobile_50").val();
    	vericode = $("#txt_yzm_50").val();
    	if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(vericode)==""){
    		alert("请完整填写信息");
    	}else{
    		//uid=501&user_real_name=张三&user_mobile=18911418249&active_id=1&draw_record_id=6
    		$.ajax({
				type: 'POST',
				url: "/Active/activeSaveAwardAddress",
				data: {user_real_name:username,user_mobile:mobile,active_id:active_id,draw_record_id:draw_record_id,vcode:vericode},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						//成功
					}else{
						alert(data.message);
					}
					
				}
			});
    	}


	});
	//M值兑换－小米插线板
	$(".xiaomi_dh").click(function(){
		if(islogin=="0"){
			$("#zhuantilogin").show();
		}else{
			$(this).prop("disabled",true);
			$.ajax({
				type: 'POST',
				url: "/Active/activeExchangeAward",
				data: {awardsn: "mi_cxban"},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						$(".mask_layder,.xiaomi_jp").addClass("disblock");
						// 活动Id， 保存地址信息时，需要提交此ID
						active_id = data.content.activeid;
						// 兑换奖品记录Id， 保存地址信息时，需要提交此ID
						draw_record_id = data.content.draw_record_id;

						//兑换成功，M值减1，充值兑换按钮状态
						avl_mnum--;
	    				setExchangeBtnStatus();
					}else{
						alert(data.message);
						//test
						// $(".mask_layder,.xiaomi_jp").addClass("disblock");
					}
					
				}
			});
			
		}
	});
	$("#btn_xiaomi_cxb").click(function(){
		var username;//姓名
    	var mobile;//手机号
    	var vericode;//验证码

    	username = $("#txt_username_xiaomi").val();
    	mobile = $("#txt_mobile_xiaomi").val();
    	vericode = $("#txt_addr_xiaomi").val();
    	if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(vericode)==""){
    		alert("请完整填写信息");
    	}else{
    		//uid=501&user_real_name=张三&user_mobile=18911418249&active_id=1&draw_record_id=6
    		$.ajax({
				type: 'POST',
				url: "/Active/activeSaveAwardAddress",
				data: {user_real_name:username,user_mobile:mobile,active_id:active_id,draw_record_id:draw_record_id,vcode:vericode},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						//成功
					}else{
						alert(data.message);
					}
					
				}
			});
    	}
	});
	//M值兑换－66代金券
	$(".djq_dh").click(function(){

		setExchangeBtnStatus();
		if(islogin=="0"){
			$("#zhuantilogin").show();
		}else{
			$(this).prop("disabled",true);
			$.ajax({
				type: 'POST',
				url: "/Active/activeExchangeAward",
				data: {awardsn: "coupon_66"},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						$(".mask_layder,.hj_djq").addClass("disblock");
	    				$(".djq_txt_01").html("您已经成功兑换<span>66元旺财谷代金券</span>一张");
	    				$(".djq_txt_02").html("系统会在2个小时内发放到您旺财谷账户中");
	    				// 活动Id， 保存地址信息时，需要提交此ID
						active_id = data.content.activeid;
						// 兑换奖品记录Id， 保存地址信息时，需要提交此ID
						draw_record_id = data.content.draw_record_id;

	    				//兑换成功，M值减1，充值兑换按钮状态
						avl_mnum--;
	    				setExchangeBtnStatus();
					}else{
						alert(data.message);
						//test
						// $(".mask_layder,.hj_djq").addClass("disblock");
	    	// 			$(".djq_txt_01").html("您已经成功兑换<span>66元旺财谷代金券</span>一张");
	    	// 			$(".djq_txt_02").html("系统会在2个小时内发放到您旺财谷账户中");
					}

				}
			});
			
		}
	});
	//M值兑换－京东300
  	$(".jd_300_dh").click(function(){
  		if(islogin=="0"){
			$("#zhuantilogin").show();
		}else{
			$(this).prop("disabled",true);
			$.ajax({
				type: 'POST',
				url: "/Active/activeExchangeAward",
				data: {awardsn: "jde_300"},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						$(".mask_layder,.hj_jd_300").addClass("disblock");
	    				// 活动Id， 保存地址信息时，需要提交此ID
						active_id = data.content.activeid;
						// 兑换奖品记录Id， 保存地址信息时，需要提交此ID
						draw_record_id = data.content.draw_record_id;

	    				//兑换成功，M值减1，充值兑换按钮状态
						avl_mnum-=5;
	    				setExchangeBtnStatus();
					}else{
						alert(data.message);
						//test
						// $(".mask_layder,.hj_jd_300").addClass("disblock");
	    				// $(".jd_ecard_300").html("300元京东E卡");
	    				//兑换成功，M值减1，充值兑换按钮状态
					}
					
				}
			});
		}
	});
	$("#btn_jd_coupon_300").click(function(){
		var username;//姓名
    	var mobile;//手机号
    	var vericode;//验证码

    	username = $("#txt_username_300").val();
    	mobile = $("#txt_mobile_300").val();
    	vericode = $("#txt_yzm_300").val();
    	if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(vericode)==""){
    		alert("请完整填写信息");
    	}else{
    		//uid=501&user_real_name=张三&user_mobile=18911418249&active_id=1&draw_record_id=6
    		$.ajax({
				type: 'POST',
				url: "/Active/activeSaveAwardAddress",
				data: {user_real_name:username,user_mobile:mobile,active_id:active_id,draw_record_id:draw_record_id,vcode:vericode},
				dataType: 'json',
				success: function(data) {
					if(data.code==0){
						//成功
					}else{
						alert(data.message);
					}
					
				}
			});
    	}
	});

	//关闭遮罩
	$(".closed").click(function(){
	    $(".mask_layder,.hj_dialog,.weixin_dialog").removeClass("disblock");
	});
	//关闭代金券
	$(".submit_djq").click(function(){
	    $(".mask_layder,.hj_dialog").removeClass("disblock");
	});
	//确定按钮－关闭京东小米
	$(".submit_gg").click(function(){
	    $(".hj_djq").addClass("disblock");
	    $(".xiaomi_jp,.hj_jd_50").removeClass("disblock");
	    $(".djq_txt_01").html("您的信息我们已经收到");
	    $(".djq_txt_02").html("奖品会在两个工作日内将以短信形式发送到您手机上");
	});
	//验证码颜色
	$(".yzm").mouseover(function(){
	    $(this).addClass("yzmhover");
	}).mouseout(function(){
	    $(this).removeClass("yzmhover");
	});
	$(".yzm").mousedown(function(){
	    $(this).addClass("yzmactive");
	}).mouseup(function(){
	    $(this).removeClass("yzmactive");
	});

	//设置按钮状态
	var setExchangeBtnStatus=function(){
		//判断兑换吗是否大于当前奖品兑换值
		var btnObjects = $(".jiangpin .jiangpin_dd button");

		btnObjects.each(function( index ) {
		  	 //console.log( index + ": "" + $(this).text() );
		  	 //alert($(this).html());
		  	if(index<=2){
		  		if(avl_mnum<=0){
		  			$(this).addClass("jiangpin_dlzbg");
		  			$(this).attr("disabled","true");
		  		}else{
		  			$(this).removeAttr("disabled");//启用按钮
		  			$(this).removeClass("jiangpin_dlzbg");
		  		}
		  	}else{
				if(avl_mnum<5){
		  			$(this).addClass("jiangpin_dlzbg");
		  			$(this).attr("disabled","true");
		  		}else{
					$(this).removeAttr("disabled");//启用按钮
		  			$(this).removeClass("jiangpin_dlzbg");
		  		}
		  	}
		});

	};


	//邀请详情窗口
	$('.login_user a').click(function(){
		var mark=$("<div>");
		var cw=document.documentElement.clientWidth;
		var ch=document.documentElement.clientHeight;
		$(mark)[0].style.cssText="width:"+cw+"px;height:"+ch+"px;background:#333;opacity:0.5;filter:alpha(opacity=60);position:fixed;left:0px;top:0px";
		$(document.body).append(mark);

		$('.logined-in').css({display:'block'});
		$('.logined-list .btn').click(function(){
			$(mark).remove();
			$('.logined-in').css({display:'none'});
		})
	})

	$.ajax({
		type: 'POST',
		url: "/Active/activeGetYaoList",
		dataType: 'json',
		success: function(data) {
			data={
				"content": [
					{
						"uid": "6222",
						"username": "tse513",
						"isorder": "--",
						"no": 1
					},
					{
						"uid": "5482",
						"username": "陈军权",
						"isorder": "--",
						"no": 2
					}
				],
				"code": 0,
				"title": "",
				"message": ""
			}
			var lists=$('.logined-list ul li');
			var num=0;
			for(var i=0;i<lists.length;i++){
				num++;
				$('.logined-list ul li .num').eq(num-1).html(num);
				if(i%2==0){
					$(lists).eq(i).css({background:'#efefef'});
				}

			}
		}
	});



	//获取邀请明细

	//var lists=$('.logined-list ul li');
	//var num=0;
	//for(var i=0;i<lists.length;i++){
	//	num++;
	//	$('.logined-list ul li .num').eq(num-1).html(num);
	//	if(i%2==0){
	//		$(lists).eq(i).css({background:'#efefef'});
	//	}
	//}

	function getYaoQingList(){

		$.ajax({
			type: 'POST',
			url: "/Active11/getShengWangBangList",
			dataType: 'json',
			success: function(data) {
				data={
					"content": [
						{
							"uid": "6222",
							"username": "tse513",
							"isorder": "--",
							"no": 1
						},
						{
							"uid": "5482",
							"username": "陈军权",
							"isorder": "--",
							"no": 2
						}
					],
					"code": 0,
					"title": "",
					"message": ""
				}
				if(data.content.length>0){
					var lists=$('.logined-list ul li');
					var num=0;
					for(var i=0;i<data.content.length;i++){
						num++;
						$('.logined-list ul li .num').eq(num-1).html(num);
						if(i%2==0){
							$(lists).eq(i).css({background:'#efefef'});
						}
					}
				}else{

				}
			}
		});
	};
});



