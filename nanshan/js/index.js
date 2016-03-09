$(function(){
	//菜单栏
	var btn=$(".btn div");
	for(var i=0;i<btn.length;i++){
		tab(btn[i]);
	}
	function tab(btn){
		$(btn).hover(function(){
			$(btn).children("img").eq(0).css({display:"none"});
		},function(){
			$(btn).children("img").eq(0).css({display:"block"});
		})
	}
	//轮播图
	var flag=true;
	var t=setInterval(move,3000);
	function move(){
		$(".imgs img").last().animate({opacity:0},1000,function(){
			$(".imgs img").last().css({opacity:1});
			$(".imgs img").last().prependTo($(".imgs"));
			flag=true;
		});
	}
	function move2(){
		$(".imgs img").first().appendTo($(".imgs"));
		$(".imgs img").last().css({opacity:0});
		$(".imgs img").last().animate({opacity:1},1000,function(){
			flag=true;
		});
	}
	//左右按钮
	$(".btnl,.btnr").hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(move,3000);
	})
	$(".btnl").click(function(e){
		if(!flag){
			return;
		}
		flag=false;
		move();
	})
	$(".btnr").click(function(e){
		if(!flag){
			return;
		}
		flag=false;
		move2();
	})
})