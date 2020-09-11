function $(selector) {
    if(typeof selector === "string"){
        if(selector.charAt(0) === '.'){
            return getClass(selector.slice(1))
        }else if(selector.charAt(0) === '#'){
            return document.getElementById(selector.slice(1));
        }
    }else if(typeof selector === "function"){
        window.onload = function () {
            selector();
        }
    }
}

function getClass(classname) {
    if(document.getElementsByClassName === undefined){
        var tags = document.getElementsByTagName('*');
        var arr = [];
        for(var i = 0; i < tags.length; i++){
            if(checkClass(tags[i].className, classname)){
                arr.push(tags[i])
            }
        }
        return arr;
    }else {
        return document.getElementsByClassName(classname);
    }
}

function checkClass(objclass, newclass) {
    var arr = objclass.split(' ');
    var flag = false;
    for(var i=0;i<arr.length;i++){
        if(objclass[i] === newclass){
            flag = true;
        }
    }
    return flag;
}