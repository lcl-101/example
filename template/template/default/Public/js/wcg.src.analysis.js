void function(){
function main(){
    
    var config = [] ;
    config.push(['www.baidu.com','wd']);
    config.push(['www.haosou.com','q']);
    config.push(['www.sogou.com','query']);
    config.push(['wcg.t','wd']);
    var urlparm=GetRequest();
    var keyword='';
    var hostname='';
    for(var j = 0; j < config.length; j ++) {
        if(config[j][0]===urlparm['hostname']){
            keyword=urlparm[config[j][1]];
            hostname=config[j][0];
            break;
        }    
    }
    
    if(keyword==='' && hostname===''){      
		if(typeof($.cookie('wcg_src_analysis_keyword'))==='undefined'  && typeof($.cookie('wcg_src_analysis_referrer'))==='undefined'  ){       
			setCookie("wcg_src_analysis_keyword",'');
			setCookie("wcg_src_analysis_referrer",document.referrer);
		}
    }else {
        if(typeof(keyword)==="undefined"){ 
            keyword='';
        }
        setCookie("wcg_src_analysis_keyword",keyword);
        setCookie("wcg_src_analysis_referrer",hostname);
    }
}

function GetRequest() {
    var urls = document.referrer.split('?'); //获取url中"?"符后的字串            
    //var url = decodeURI(urls[1]);
    var url = (urls[1]);
    var theRequest = new Object();
    var str = url;
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
    theRequest['hostname']=(urls[0].split('//')[1]).split('/')[0];
    return theRequest;
} 

function setCookie(name,value)
{   
    document.cookie = name + "="+ escape (value) + ";";//会话有效
}
main();


}();//据说效率最高~ 