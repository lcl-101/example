$(function(){
//下拉菜单
	var links=$("li",$(".top-r")[0]);
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			var linkmore=$(".linkmore",this)[0];
			if(linkmore){
				linkmore.style.display="block";
			}
		}
		links[i].onmouseout=function(){
			var linkmore=$(".linkmore",this)[0];
			if(linkmore){
				linkmore.style.display="none";
			}
		}
	}
//右侧固定导航鼠标滑过效果
	var mouselink=$("a",$(".nav-right")[0]);
	for(var i=0;i<mouselink.length;i++){
		if(i==8){
			mouselink[i].onmouseover=function(){
				var mousefloat=$(".mousefloat",this)[0];
				if(mousefloat){
					mousefloat.style.display="block";		
						animate(mousefloat,{left:-175},200);
				}
			}
			mouselink[i].onmouseout=function(){
				var mousefloat=$(".mousefloat",this)[0];
				if(mousefloat){					
						animate(mousefloat,{left:-190},200,function(){
							mousefloat.style.display="none";
						});		
				}
			}
		}else{
				mouselink[i].onmouseover=function(){
				var mousefloat=$(".mousefloat",this)[0];
				if(mousefloat){
					mousefloat.style.display="block";
					if(i==8){
						animate(mousefloat,{left:-175},200);
					}else{
						animate(mousefloat,{left:-90},200);
					}
					
				}
			}
			mouselink[i].onmouseout=function(){
				var mousefloat=$(".mousefloat",this)[0];
				if(mousefloat){
					if(i==8){
						animate(mousefloat,{left:-190},200,function(){
							mousefloat.style.display="none";
						});
					}else{
						animate(mousefloat,{left:-110},200,function(){
							mousefloat.style.display="none";
						});
					}				
				}
			}
		}
	
	}
//右侧导航窗口变动事件
	// window.onresize=function(){
	// 	var rightfixed=$(".nav-right")[0];
	// 	var resize=(".resize",rightfixed);
	// 	var winht=document.documentElement.clientHeight;
	// 	var winwt=document.documentElement.clientWidth;
	// 	if(winht<570||winwt<1250){
	// 		rightfixed.style.display="none";
	// 		for(var i=0;i<resize.length;i++)
	// 			resize[i].style.display="block";
	// 			// resize[i].style.zIndex=1000000;
	// 	}else{
	// 		rightfixed.style.display="block";
	// 		for(var i=0;i<resize.length;i++)
	// 			resize[i].style.display="block";
	// 			// resize[i].style.zIndex=1000000;
	// 	}
	// }
//banner轮播
	var imgs=$(".img",$(".bannermove")[0]);
	var bg=$("#banner");
	var ns=$("a",$(".number")[0]);
	var arrcolor=["#1F35A2","#DDDDDD","#DBDBDB","#CBD3EA","#DCDCDC"];
	imgs[0].style.zIndex=20;
	var t;
	t=setInterval(move,2000);
	var num=0;
	function move(){
		num++;
		if(num==imgs.length){
			num=0;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.zIndex=10;
			ns[i].className="";	
		}
		imgs[num].style.zIndex=20;
		ns[num].className="numb";
		bg.style.background=arrcolor[num];	
	}
	for(var i=0;i<ns.length;i++){
		ns[i].ind=i;
		ns[i].onmouseover=function(){
			clearInterval(t);
			num=this.ind;		
			for(var j=0;j<imgs.length;j++){
				imgs[j].style.zIndex=10;
				ns[j].className="";	
			}
			imgs[this.ind].style.zIndex=20;
			ns[this.ind].className="numb";
			bg.style.background=arrcolor[this.ind];	
		}
		ns[i].onmouseout=function(){
			t=setInterval(move,2000);
		}
	}
//banner-left
	var lis=$("p",$(".ban-l")[0]);
	var libox=$(".l-li1",$(".ban-l")[0]);
	var arrows=$("i",$(".ban-l")[0]);
	var lists=$("div",$(".mouse-overcontainer")[0]);
	var baimgs=$("div",$(".bannerimg")[0]);
	var imgbg=["#1F35A2","#7A0B94","#8E959F","#35CECC","#DF3A86","#2263CB","#FFC289","#D7B65E","#093D64","#F11866","#34CED8","#B5C9D4","#01C2E1","#01C2E1","#C73132","#E9AEAC"];
	lis[0].onmouseover=function(){
		for(k=0;k<baimgs.length;k++){
			baimgs[k].style.zIndex=10;
		}
		baimgs[0].style.zIndex=50;
	}
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onmouseover=function(){
			if(this.index==0){
				t=setInterval(move,2000);
			}else{
				clearInterval(t);
			}
			for(k=0;k<baimgs.length;k++){

				baimgs[k].style.zIndex=10;
				lists[k].style.display="none";	
				animate(lists[k],{left:-10},60);
				libox[k].style.background="";
				animate(lis[k],{left:0},100);
				arrows[k].style.display="none";
			}
			libox[this.index].style.background="#A90000";
			animate(lis[this.index],{left:10},100);
			bg.style.background=imgbg[this.index];
			arrows[this.index].style.display="block";
			lists[this.index].style.display="block";
			animate(lists[this.index],{left:0},60);
			baimgs[this.index].style.zIndex=50;

		}
		lis[i].onmouseout=function(){
			if(this.index==0){
				clearInterval(t);
			}
			
			//animate(lis[this.index],{left:0},200);

			// animate(lis[this.index],{left:0},200,function(){
			// 	libox[this.index].style.background="#4A4A4A";
			// });
		}
		lists[i].onmouseover=function(){
			
		}
	}

//hot brand
	var tags=$(".title",$(".hot-top-r")[0]);
	var brands=$("div",$(".hot-btm-center")[0]);
	tab(tags,brands);
	function tab(tg,br){
		for(var i=0;i<tg.length;i++){
			tg[i].index=i;
			tg[i].onclick=function(){
				for(var j=0;j<br.length;j++){
					br[j].style.display="none";
					tg[j].style.color="#666";
					tg[j].style["border-bottom"]="2px solid #F5F5F5";
				}
				this.style.color="#000";
				this.style["border-bottom"]="2px solid #000";
				br[this.index].style.display="block";
			}
		}
	}
//floor-left
		// for(var j=0;j<$(".floor-l-mid-inbox").length;j++){
			
			var flbox=$(".floor-l-mid-inbox")[0];
			var fllast=$(".last",$(".floor-l-mid")[0])[0];
			var flnext=$(".next",$(".floor-l-mid")[0])[0];
			var flimgs=$(".floor-l-mid-in1",$(".floor-l-mid-inbox")[0]);
			var iw=parseInt(getStyle(flimgs[0],"width"));
			var nu=0;
			var index=0;
			var flg=true;
			for(var i=0;i<flimgs.length;i++){
				if(i==0){continue;}
				flimgs[i].style.left=iw+"px";
			}
			var s=setInterval(mov,1000);
			function mov(){
				if(!flg){return;}
				flg=false;
				nu++;
				if(nu==flimgs.length){
				nu=0;
				}
				flimgs[nu].style.left=iw+"px";
				animate(flimgs[nu],{left:0},500,function(){
						flg=true;
					});
				animate(flimgs[index],{left:-iw},500,function(){
						flg=true;
					});
				index=nu;
			}
			flnext.onclick=function(){
				mov();
			}
			fllast.onclick=function(){

				if(!flg){return;}
				flg=false;
				nu--;

				if(nu<0){
					nu=flimgs.length-1;
				}
				flimgs[nu].style.left=-iw+"px";
				animate(flimgs[nu],{left:0},500,function(){
						flg=true;
					});
				animate(flimgs[index],{left:iw},500,function(){
						flg=true;
					});
				index=nu;
			}
			flnext.onmouseover=fllast.onmouseover=function(){
				clearInterval(s);
			}
			flnext.onmouseout=fllast.onmouseout=function(){
				s=setInterval(mov,1000);
			}
		// }

	/*#tophidden*/ /*left fixed*/ /*backtop*/

	var tophidden=$("#tophidden");
	var doc;
	var leftul=$("#fixedlf");
	var leftlis=$("li",leftul);
	var floors=$(".floor");
	var fltops=[];
	var backtop=$(".backtop")[0];
	
	window.onscroll=function(){
		doc=document.body.scrollTop?document.body:document.documentElement;
		var stop=doc.scrollTop;
		if(stop>900){
			leftul.style.display="block";
		}else{
			leftul.style.display="none";
		}
		checktop(stop);
		for(var i=0;i<floors.length;i++){
			fltops.push(floors[i].offsetTop);//各楼层的top值给了一个数组
		}

		for(var i=0;i<floors.length;i++){
			if(stop+200>fltops[i]){
				for(var j=0;j<floors.length;j++){
					leftlis[j].style.color="#fff";	
				}
				leftlis[i].style.color="#C40000";
			}
		}
		
		for(var i=0;i<leftlis.length;i++){
		leftlis[i].index=i;
		leftlis[i].onclick=function(){
			animate(doc,{scrollTop:fltops[this.index]-100},500);
		}
		leftlis[i].onmouseover=function(){
			this.style.background="#C40000";
			this.style.color="#fff";
		}
		leftlis[i].onmouseout=function(){
			this.style.background="#ccc";
			// this.style.color="#C40000";
		}
		}
		//按需加载
		var ch=document.documentElement.clientHeight;
		for(var i=0;i<floors.length;i++){
			var floimgs=$("img",floors[i]);
			if(stop+ch>fltops[i]){
				for(var j=0;j<floimgs.length;j++){
					floimgs[j].src=floimgs[j].getAttribute("asrc");
				}
			}
		}
	}
	var flag=true;
	function checktop(stop){
		if(!flag){return;}
		flag=false;
			if(stop>800){
				animate(tophidden,{top:0},200,function(){
					flag=true;
				});
			}else{
				animate(tophidden,{top:-50},200,function(){
					flag=true;
				});
			}
		}
	backtop.onclick=function(){
		animate(doc,{scrollTop:0},1000);
	}

})