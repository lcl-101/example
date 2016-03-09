function person(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=0;
    this.y=200;
    this.angle1=30;
    this.angle2=-30;
    this.angle3=30;
    this.angle4=-30;
    this.speedA=10;
    this.speed=3;
    this.width=20;
    this.height=80;
}
person.prototype={
    init:function(){
        var cobj=this.cobj;
        cobj.lineCap='round';
    },
    draw:function(angle1,angle2,angle3,angle4){
        var cobj=this.cobj;
        //»ŒŒÒ“∆∂Ø
        cobj.save();
        cobj.translate(this.x,this.y);
        this.init();
        //ª≠Õ∑≤ø
        cobj.save();
        cobj.beginPath();
        cobj.translate(12,12);
        cobj.arc(0,0,10,0,Math.PI*2);
        cobj.fill();
        cobj.closePath();
        cobj.restore();

        //ª≠…ÌÃÂ
        cobj.save();
        cobj.beginPath();
        cobj.translate(9,21);
        cobj.rotate(10*Math.PI/180);
        cobj.fillRect(0,0,6,25);
        cobj.fill();
        cobj.closePath();
        cobj.restore();

        //ª≠◊Û±€
        cobj.save();
        cobj.beginPath();
        cobj.translate(9,21);
        cobj.rotate(angle1*Math.PI/180);
        cobj.fillRect(0,0,4,25);
        cobj.fill();
        cobj.closePath();
        cobj.restore();

        //ª≠”“±€
        cobj.save();
        cobj.beginPath();
        cobj.translate(9,21);
        cobj.rotate(angle2*Math.PI/180);
        cobj.fillRect(0,0,4,25);
        cobj.fill();
        cobj.closePath();
        cobj.restore();

        //ª≠◊ÛÕ»
        cobj.save();
        cobj.beginPath();
        cobj.translate(6,43);
        cobj.rotate(angle3*Math.PI/180);
        cobj.fillRect(0,0,4,28);
        cobj.fill();
        cobj.closePath();
        cobj.restore();

        //ª≠”“Õ»
        cobj.save();
        cobj.beginPath();
        cobj.translate(6,43);
        cobj.rotate(angle4*Math.PI/180);
        cobj.fillRect(0,0,4,28);
        cobj.fill();
        cobj.closePath();
        cobj.restore();

        cobj.restore();
    }
};

function rect(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.clientW=canvas.width;
    this.x=this.clientW;
    this.y=0;
    this.width=20;
    this.height=70;
}
rect.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.fillRect(0,0,20,70);
        cobj.restore();
    }
};