function $(selector) {
    if(typeof selector === 'string'){
        if(selector.charAt(0) === '.'){
            return getClass(selector.slice(1));
        }else if(selector.charAt(0) === '#'){

        }
    }else if(typeof selector === 'function'){
        window.onload = function () {
            selector();
        }
    }
}

function getClass(classname) {
    if(document.getElementsByClassName){
        return document.getElementsByClassName(classname);
    }else {
        var tags = document.getElementsByTagName('*');
        var arr = [];
        for(var i = 0; i < tags.length; i++){
            if(checkClass(tags[i].className, classname)){
                arr.push(tags[i]);
            }
        }
        return arr;
    }
}

function checkClass(objclass, classname) {
    var obj = objclass.split(' ');
    var flag = false;
    for(var i = 0; i < obj.length; i++){
        if(obj[i] === classname){
            flag = true;
        }
    }
    return flag;
}