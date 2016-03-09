//解决getClassName在IE6-8的兼容问题
/*
	简写
	简化获取的操作和window.onload=function(){}
	1.函数 函数的重载
*/
// function $(selector,obj){
// 	if(typeof selector==="string"){
// 		var obj=obj||document;
// 		if(selector.charAt(0)==="."){
// 			return getClass(selector.slice(1),obj);
// 		}else if(){

// 		}else if(){
// 			obj
// 		}
// 	}else if(typeof selector==="function"){
// 		window.onload=function(){
// 			selector();
// 		}
// 	}
// }
function $(selector,obj){
	//简化获取元素操作
	if(typeof selector==="string"){
		obj=obj||document
		if(selector.charAt(0)==="."){
			return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)==="#"){
			return document.getElementById(selector.slice(1));
		}else if(/^[a-z|1-6]{1,10}/.test(selector)){
			return obj.getElementsByTagName(selector);
		}
	}else if(typeof selector==="function"){
		//简化window.onload
		window.onload=function(){
			selector();
		}
		
	}
}
/*function getClass(classname){
	if(!(document.getElementsByClassName==undefined)){//等于undefined不支持getClass,非就是支持getClassName,直接返回
		// alert("正常");
		return document.getElementsByClassName(classname);
	}
	else{
		// alert("IE6-8");
		var tags=document.getElementsByTagName('*');//先取出html所有标签，*:通用选择器
		var arr=[];
		for(var i=0;i<tags.length;i++){
			if(tags[i].className==classname){//判断标签类名与参数相同就传给一个数组
				arr.push(tags[i]);
			}
			
		}
		return arr;//将结果传给数组
	}
}
*/
//类下面的类
/*function getClass(classname,obj){
	var obj=obj||document;
	if(!(document.getElementsByClassName==undefined)){//等于undefined不支持getClass,非就是支持getClassName,直接返回
		// alert("正常");
		return obj.getElementsByClassName(classname);
	}
	else{
		// alert("IE6-8");
		var tags=obj.getElementsByTagName('*');//先取出html所有标签，*:通用选择器
		var arr=[];
		for(var i=0;i<tags.length;i++){
			if(tags[i].className==classname){//判断标签类名与参数相同就传给一个数组
				arr.push(tags[i]);
			}
			
		}
		return arr;//将结果传给数组
	}
}*/

//一个标签包含多个类名,将每个类名与参数进行比较
function getClass(classname,obj){
	var obj=obj||document;
	if(!(document.getElementsByClassName==undefined)){//等于undefined不支持getClass,非就是支持getClassName,直接返回
		// alert("正常");
		return obj.getElementsByClassName(classname);
	}
	else{
		// alert("IE6-8");
		var tags=obj.getElementsByTagName('*');//先取出html所有标签，*:通用选择器
		var arr=[];
		for(var i=0;i<tags.length;i++){
			if(checkClass(tags[i].className,classname)){//判断标签类名与参数相同就传给一个数组
				arr.push(tags[i]);
			}	
		}
		return arr;//将结果传给数组
	}
}
/*objclass  标签获取的class*/
function checkClass(objclass,newclass){
	var arr=objclass.split(" ");
	//[two,one,three,four]
	var flag=false;//开关
	for(var i=0;i<arr.length;i++){
		if(arr[i]==newclass){
			flag=true;
		}
	}
	return flag;
}

/*获取内容 innerText和textContent
	obj  要获取的对象
	val  要修改的内容
	对象不支持某个属性的时候返回值是undefined
	boolean 转换规则  隐式转换
*/
function getText(obj,val){
	//obj.innerText 获取 "" 或"内容"；不支持的时候获取的是undefined；布尔转换都是false
	if(obj.innerText!=undefined){  //不能直接写if(obj.innerText),这样会忽略空字符串的情况
		if(val==undefined){//判断有没有第二个参数，并且排除了空的情况
			return obj.innerText;//没有第二个参数，就不改变，直接返回
		}else{
			obj.innerText=val;//有第二个参数就改变文本内容
		}
		
	}else{
		if(val==undefined){
			return obj.textContent; 
		}else{
			obj.textContent=val;
		}
		
	}
}
function getStyle(obj,attr){//参数  对象和属性
	if(obj.currentStyle){
	return obj.currentStyle[attr];//IE  attr传过来是个字符串，需要用[]括起来
	}else{
		return getComputedStyle(obj,null)[attr];//Chrome  FF
	}
}
//鼠标移入移除事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {

			if(checkHover(e,obj)){
				overfun.call(obj,getEvent(e));
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,getEvent(e));
			}
		}
	}
}
//获得事件对象
function getEvent (e) {
	return e || window.event;
}