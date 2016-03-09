window.onload=function(){
	mui.plusReady(function(){
			
			var curr=plus.webview.currentWebview();
			var header=plus.webview.create("_www/model/list_header.html","list_header.html",
		{width:"100%",height:"44px"});
		header.addEventListener("loaded",function(){				
							curr.append(header);
							curr.show("slide-in-right")
				},false)
										
					var con=plus.webview.create("show_con.html","show_con.html",
		{width:"100%",top:"44px"});
					con.addEventListener("loaded",function(){	
						
				setTimeout(function(){
					document.getElementsByClassName("wait")[0].style.display="none";
					curr.append(con);
				},1000)														
				},false)
	})				
	}