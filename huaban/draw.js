/*画板*/
function draw(canvas,cobj){
    //画布对象
    this.canvas=canvas;
    //画布宽高
    this.width=canvas.width;
    this.height=canvas.height;
    //2d对象
    this.obj=cobj;
    //图形样式
    this.style={};
    this.style.strokeColor='#000';
    this.style.fillColor="#000";
    this.style.lineWidth='1';
    //保存状态的数组
    this.dataArr=[];
    //保存状态的属性
    this.data={};
    //画图的方式
    this.drawStyle='stroke';
    //画图类型
    this.type='pencil';
}
draw.prototype={
    init:function(){
        this.obj.fillStyle=this.style.fillColor;
        this.obj.strokeStyle=this.style.strokeColor;
        this.obj.lineWidth=this.style.lineWidth;
    },
    drawfun:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.layerX;
            var starty= e.layerY;
            if(that.type=='pencil'){
                that[that.type](startx,starty);
                return;
            }
            that.data=that.obj.getImageData(0,0,that.width,that.height);
            that.dataArr.push(that.data);
            that.canvas.onmousemove=function(e){
                that.obj.clearRect(0,0,that.width,that.height);
                that.obj.putImageData(that.data,0,0);
                var movex= e.layerX;
                var movey= e.layerY;
                if(!that.type){
                    return;
                }
                that[that.type](startx,starty,movex,movey);
            };
            that.canvas.onmouseup=function(e){
                that.canvas.onmousemove=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.obj.beginPath();
        that.init();
        that.obj.moveTo(x,y);
        that.obj.lineTo(x1,y1);
        that.obj.stroke();
        that.obj.closePath();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.obj.beginPath();
        var w=x1-x;
        var h=y1-y;
        that.obj.rect(x,y,w,h);
        that.obj[that.drawStyle]();
        that.obj.closePath();
    },
    arc:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.obj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        that.obj.arc(x,y,r,0,2*Math.PI);
        that.obj[that.drawStyle]();
        that.obj.closePath();
    },
    pencil:function(x,y){
        var that=this;
        that.obj.beginPath();
        that.obj.moveTo(x,y);
        that.data=that.obj.getImageData(0,0,that.width,that.height);
        that.dataArr.push(that.data);
        that.canvas.onmousemove=function(e){
            that.obj.clearRect(0,0,that.width,that.height);
            that.obj.putImageData(that.data,0,0);
            var movex= e.layerX;
            var movey= e.layerY;
            that.init();
            that.obj.lineTo(movex,movey);
            that.obj.stroke();
        };
        that.canvas.onmouseup=function(e){
            that.canvas.onmousemove=null;
        }
    },
    pop:function(){
        var that=this;
        if(that.dataArr.length==0){
            alert('no-element');
            return;
        }
        var datas=that.dataArr.pop();
        that.obj.putImageData(datas,0,0);
    }
}