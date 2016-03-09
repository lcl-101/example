window.onload=function(){
	mui.plusReady(function(){
		var curr=plus.webview.currentWebview();
		var header=plus.webview.create("_www/model/index_header.html","model/index_header.html",
		{width:"100%",height:"44px"});
		header.addEventListener("loaded",function(){
			curr.append(header);
		},false)
		
		var con=plus.webview.create("model/index_con.html","index_con.html",
		{width:"100%",top:"44px",bottom:"44px"})
		con.addEventListener("loaded",function(){
			setTimeout(function(){
				document.getElementsByClassName("wait")[0].style.display="none";
				curr.append(con);
			},2000)			
		},false)
		
		con.addEventListener("loading",function(){
			document.getElementsByClassName("wait")[0].style.display="block";
		},false)
		
		var footer=plus.webview.create("_www/model/index_footer.html","model/index_footer.html",
		{width:"100%",height:"44px",left:0,bottom:0});
		footer.addEventListener("loaded",function(){
			curr.append(footer);
		},false)
})
}
