window.onload=function(){
	mui.plusReady(function(){
		var link=document.getElementsByClassName("abc");
		for(var i=0;i<link.length;i++){
			link[i].onclick=function(e){
				var url=this.href;
				var newwin=plus.webview.create("_www/model/list.html","list.html");
//				newwin.show("slide-in-right");
								
			var con=plus.webview.create(url,"list_con.html",
		{width:"100%",top:"44px"});
		newwin.appendJsFile("_www/js/list.js")
				return false;
			} 
		}
		
		var links=document.getElementsByClassName("abcd");
		for(var i=0;i<links.length;i++){
			links[i].onclick=function(e){
				var url=this.href;
				var newwin=plus.webview.create("_www/model/show.html","show.html");
//				newwin.show("slide-in-right");
								
			var con=plus.webview.create(url,"show_con.html",
		{width:"100%",top:"44px"});
		newwin.appendJsFile("_www/js/show.js")
				return false;
			} 
		}
	})
}
