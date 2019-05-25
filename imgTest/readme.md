## 关于将图片缩放至140大小,图片失帧率最优方案

!!注意,查看实验效果,需要心在index.html查看,下面展示图片仅做参考

#### 一, 测试环境 1080p 显示器
> 材料孔网首页好书推荐封面图

1. 左边是480的原图,右边是通过样式将480缩小到140的图,可以看出图片很明面变模糊了

![img_1](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/1.png)

2.  测试在将不同分辨的图片,缩小至140后,清晰度最高的图片,实验图片分辨率为,480,240,200,140

![img_2](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/2.png)

从结果中可以看出,200像素是最清晰的一张,原本猜测是不是2倍图会更清晰,结果还是有点差异的.

3. 将最清晰的一张图与原图(480)直接对比

![img_3](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/3.png)

#### 二, macbook retina 显示器
> 材料孔网首页好书推荐封面图

1. 将480缩放至140后,发现清晰度有所提高

![img_4](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/1.png)

2. 测试在将不同分辨的图片,缩小至140后,清晰度最高的图片,实验图片分辨率为,480,240,200,140

![img_5](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/2.png)

从结果中可以看出,清晰度逐渐递减

3. 480与280 对比

![img_6](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/3.png)


#### 三, 其他家图片选取方法

1. 淘宝首页图片与外框大小一致,没有缩放

![img_7](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/taobao1.png)
![img_8](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/taobao2.png)

2. 京东图片与外框大小一致,没有缩放

![img_9](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/jd1.png)
![img_10](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/jd2.png)

3. 豆瓣图片与外框大小一致,没有缩放

![img_11](https://raw.githubusercontent.com/lcl-101/example/master/imgTest/douban1.png)
