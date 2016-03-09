$(function(){
	$(".tab img").css({display:"none"});
	$(".tab img").eq(0).css({display:"block"});
	$(".tab a").eq(0).css({color:"white"});
	$(".tab a").hover(function(){
		var index=$(".tab a").index(this);
		$(".tab img").eq(index).css({display:"block"});
		$(".tab a").eq(index).css({color:"white"});
	},function(){
		var index=$(".tab a").index(this);
		$(".tab img").eq(index).css({display:"none"});
		$(".tab a").eq(index).css({color:"black"});
		$(".tab img").eq(0).css({display:"block"});
		$(".tab a").eq(0).css({color:"white"});
	})
})