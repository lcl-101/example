module.exports = {
    plugins: [
        require('postcss-cssnext')({
            features:{
                rem:false  //这里设置false 关闭 px 和 rem转换
            }
        })
    ]
}