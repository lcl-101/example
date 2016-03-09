$(function(){
//下拉菜单
	var links=$(".bar",$(".top-bar")[0]);
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			var linkmore=$(".submenu",this)[0];
			if(linkmore){
				linkmore.style.display="block";
			}
		}
		links[i].onmouseout=function(){
			var linkmore=$(".submenu",this)[0];
			if(linkmore){
				linkmore.style.display="none";
			}
		}
	}
//右侧固定导航鼠标滑过效果
	var mouselink=$("a",$("#fixed-right"));
	for(var i=0;i<mouselink.length;i++){
		mouselink[i].onmouseover=function(){
				var mousemenu=$(".mousemenu",this)[0];
				var menuleft=parseInt(mousemenu.offsetWidth);
				if(mousemenu){
					mousemenu.style.display="block";
						animate(mousemenu,{left:-menuleft},200);
				}
			}
			mouselink[i].onmouseout=function(){
				var mousemenu=$(".mousemenu",this)[0];
				if(mousemenu){					
						animate(mousemenu,{left:0},200,function(){
							mousemenu.style.display="none";
						});		
				}
			}

	}
//返回顶部按钮
	var backtop=$(".fixed-icon6",$("#fixed-right"))[0];
	var doc=document.body.scrollTop?document.body:document.documentElement;
	backtop.onclick=function(){			
		animate(doc,{scrollTop:0},800);
	}
//楼层按需加载
	var floors=$(".floor");
	var fltops=[];	
	var fixedleft=$(".fixedleft")[0];
	var leftlis=$("li",fixedleft);//楼层跳转
	window.onscroll=function(){
		doc=document.body.scrollTop?document.body:document.documentElement;
		var stop=doc.scrollTop;
		var ch=document.documentElement.clientHeight;
		
		if(stop>1000){//左侧导航显示隐藏
			fixedleft.style.display="block";
		}else{
			fixedleft.style.display="none";
		}
		
		for(var i=0;i<floors.length;i++){
			fltops.push(floors[i].offsetTop);//各楼层的top值给了一个数组
		}
		// for(var i=0;i<floors.length;i++){
		// 	if(stop+200>fltops[i]){
		// 		var liimg=$(".liimg",leftlis[i])[0];
		// 		var lifont=$(".lifont",leftlis[i])[0];
		// 		liimg.style.zIndex=50;
		// 		lifont.style.zIndex=55;
		// 	}
		// }
		for(var i=0;i<leftlis.length;i++){
			leftlis[i].index=i;
			leftlis[i].onclick=function(){
				animate(doc,{scrollTop:fltops[this.index]-100},500);
			}

		leftlis[i].onmouseover=function(){
			var liimg=$(".liimg",this)[0];
			var lifont=$(".lifont",this)[0];
			liimg.style.zIndex=50;
			lifont.style.zIndex=55;
		}
		leftlis[i].onmouseout=function(){
			var liimg=$(".liimg",this)[0];
			var lifont=$(".lifont",this)[0];
			liimg.style.zIndex=55;
			lifont.style.zIndex=50;
		}
		}
		for(var i=0;i<floors.length;i++){
			var floimgs=$("img",floors[i]);
			if(stop+ch>fltops[i]){
				for(var j=0;j<floimgs.length;j++){
					floimgs[j].src=floimgs[j].getAttribute("asrc");
				}
			}
		}
	}
	


//
	var imgs=$("a",$(".bannermove")[0]);
	imgs[0].style.zIndex=20;
	var ban=$("#banner");
	var bleft=$(".left",$(".banner-pic")[0])[0];
	var bright=$(".right",$(".banner-pic")[0])[0];
	var arrcolor=["#03B1FA","#FF35B5","#FF556F","#013B92","#02BCE2","#F8F1DF","#390124","#F4F3EF"]
	var t=setInterval(move,2000);
	var num=0;
	function move(){
		num++;
		if(num==imgs.length){
			num=0;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.display="none";
		}
		imgs[num].style.display="block";
		ban.style.background=arrcolor[num];	
	}
//floor 选项卡
	var tabs=$(".tab");
	var divs=$(".floor-main-clo");
	for(var i=0;i<tabs.length;i++){
 		tab($("li",tabs[i]),$("ul",divs[i]));
 	}
 	function tab(ts,ds){
	 	for(var i=0;i<ts.length;i++){
	 		ts[i].index=i;
	 		ts[i].onmouseover=function(){
	 			for(var j=0;j<ts.length;j++){
	 				ds[j].style.display="none";
	 				ts[j].className="tab1";
	 			}
	 			ds[this.index].style.display="block";
	 			this.className="tab2";
	 		}
	 	}
 	}
 	bleft.onclick=function(){
 		num--;
		if(num<0){
			num=imgs.length-1;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.display="none";
		}
		imgs[num].style.display="block";
		ban.style.background=arrcolor[num];	
 	}
 	bright.onmouseover=bleft.onmouseover=function(){
 		clearInterval(t);
 	}
 	bright.onmouseout=bleft.onmouseout=function(){
 		t=setInterval(move,2000);
 	}
 	bright.onclick=function(){
 		move();
 	}
 //banner-left hover
 	var lis=$(".li",$(".banner-list")[0]);
 	var lists=$(".list1",$(".list")[0]);
 	var liscon=$(".list")[0];
 	for(var i=0;i<lis.length;i++){
 		lis[i].ind=i;
 		lis[i].onmouseover=function(){
 			for(var j=0;j<lis.length;j++){
 				lists[j].style.display="none";
 			}
 			lists[this.ind].style.display="block";
 			liscon.style.display="block";
 		}
 	}
 	liscon.onmouseover=function(){
 		liscon.style.display="nine";
 	}
 //public 选项卡
    var pbleft=$(".puleft")[0];
    var pbright=$(".puright")[0];
    var contain=$(".pubcon")[0];
    var dmove=$(".public-main-right1");
    var divlen=parseInt(getStyle(dmove[0],"width"));
    var parpers=$("span",$(".parper")[0]);
    var nu=0;
 	var index=0;
 	var flg=true;
 	for(var i=0;i<dmove.length;i++){
 		if(i==0){continue;}
		dmove[i].style.left=divlen+"px";
 	}
 	parpers[0].className="ihot";
 	
    pbleft.onclick=function(){
    	if(!flg){return;}
    	flg=false;
    	nu--;
		if(nu<0){
			nu=dmove.length-1;
		}
		dmove[nu].style.left=divlen+"px";
		animate(dmove[nu],{left:0},800,function(){
			flg=true;
		});
		animate(dmove[index],{left:-divlen},800,function(){
			flg=true;
		});
		parpers[index].className="";
		parpers[nu].className="ihot";
		index=nu;
    }
     pbright.onclick=function(){
     	if(!flg){return;}
 		flg=false;
 		nu++;
 		if(nu==dmove.length){
 			nu=0;
 		}
 		dmove[nu].style.left=-divlen+"px";
 		animate(dmove[nu],{left:0},800,function(){
 			flg=true;
 		});
 		animate(dmove[index],{left:divlen},800,function(){
 			flg=true;
 		});
 		parpers[index].className="";
 		parpers[nu].className="ihot";
 		index=nu;
     }
     for(var i=0;i<parpers.length;i++){
     	parpers[i].inde=i;
     	parpers[i].onmouseover=function(){
     		if(index==this.inde){return;}
     		if(!flg){return;}
			flg=false;
			dmove[this.inde].style.left=divlen+"px";
			animate(dmove[this.inde],{left:0},800,function(){
				flg=true;
			});
			animate(dmove[index],{left:-divlen},800,function(){
				flg=true;
			});
			parpers[index].className="";
			parpers[this.inde].className="ihot";
			index=this.inde;
     	}
     }
})