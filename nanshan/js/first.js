$(function(){
	//²Ëµ¥Ñ¡Ïî
	var btn=$(".fix img");
	var box=$(".tab")[0];
	$(".fix p").css({display:"none"});
	$(".tab span").css({display:"none"});
	$(btn).hover(function(){
		var index=$(btn).index(this);
		$(box).css({height:170});
		$(".tab span").css({display:"none"});
		$(".fix p").css({display:"none"});
		$(btn).css({marginTop:-48});
		$(btn).eq(index).css({marginTop:0});
		$(".tab span").eq(index).css({display:"block"});
		$(".fix p").eq(index).css({display:"block"});
	})
	//ÂÖ²¥
	var ban=$(".ban");
	var point=$(".dian li");
	var bw=$(ban).width();
	var blength=$(ban).length;
	$(".banner-box").css({width:bw*blength});
	var t=setInterval(move,3000);
	var num=0;
	$(point).eq(0).css({background:"#d3840b"});
	var flag=true;
	function move(){
		$(".banner-box").animate({marginLeft:-bw},1000,function(){
			$(".ban").eq(0).appendTo(".banner-box");
			$(".banner-box").css({marginLeft:0});
			flag=true;
		})
		num++;
		if(num==point.length){
			num=0;
		}
		$(point).eq(num-1).css({background:""});
		$(point).eq(num).css({background:"#d3840b"});
	}
	function move2(){
		$(".ban").last().prependTo(".banner-box");
		$(".banner-box").css({marginLeft:-bw});
		$(".banner-box").animate({marginLeft:0},1000,function(){
			flag=true;
		})
		num++;
		if(num==point.length){
			num=0;
		}
		$(point).eq(num-1).css({background:""});
		$(point).eq(num).css({background:"#d3840b"});
	}
	$(".left,.right").hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(move,3000);
	})
	$(".left").click(function(){
		if(!flag){
			return;
		}
		flag=false;
		move();
	})
	$(".right").click(function(){
		if(!flag){
			return;
		}
		flag=false;
		move2();
	})

	//footer
	$(".footer p").css({opacity:0});
	$(".footer img").hover(function(){
		var index=$(".footer img").index(this);
		$(".footer p").eq(index).animate({opacity:1},500);
	},function(){
		var index=$(".footer img").index(this);
		$(".footer p").eq(index).animate({opacity:0},500);
	})
})