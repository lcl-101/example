$(function(){
    var img=$(".bannerright img");
    var iw=img[0].offsetWidth;
    var box=$(".bannerright")[0];
    var tab=$(".tab li");
    for(var i=0;i<img.length;i++){
        img[i].style.opacity=0;
        tab[i].style.background="#757575";
    }
    img[0].style.opacity=1;
    tab[0].style.background="#ff8201";
    var index=0;
    var next=0;
    var t;
    t=setInterval(move,3000);
    function move(){
        for(var i=0;i<img.length;i++){
            img[i].style.left=0;
        }
        next++;
        if(next==img.length){
            next=0;
        }
        animate(img[index],{opacity:0},1000);
        animate(img[next],{opacity:1},1000);
        tab[index].style.background="#757575";
        tab[next].style.background="#ff8201";
        index=next;
    }
    box.onmouseover=function(){
        for(var i=0;i<img.length;i++){
            img[i].style.left=iw+"px";
            tab[i].style.background="#757575";
        }
        img[next].style.left=0;
        tab[next].style.background="#ff8201";
        clearInterval(t);
    }
    box.onmouseout=function(){

        for(var i=0;i<img.length;i++){
            img[i].style.opacity=0;
            img[i].style.left=0;
            tab[i].style.background="#757575";
        }
        img[index].style.opacity=1;
        tab[index].style.background="#ff8201";
        t=setInterval(move,3000);
    }

    for(var i=0;i<tab.length;i++){
        tab[i].index=i;
        tab[i].onclick=function(){
            for(var i=0;i<img.length;i++){
                img[i].style.opacity=1;
            }
            if(index==this.index){
                return;
            }
            img[this.index].style.left=iw+"px";
            animate(img[this.index],{left:0},300);
            animate(img[index],{left:-iw},300);
            tab[index].style.background="#757575";
            tab[this.index].style.background="#ff8201";
            next=index=this.index;
        }
    }

    var pei=$(".select");
    var peidan=$(".peitan");
    for(var i=0;i<pei.length;i++){
        pei[i].index=i;
        pei[i].onmouseover=function(){
            animate(peidan[this.index],{bottom:0},200);
        }
        pei[i].onmouseout=function(){
            animate(peidan[this.index],{bottom:-76},200);
        }
    }
})