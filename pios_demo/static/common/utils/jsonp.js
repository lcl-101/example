/**
 * 
 * 
 * @param {object} request 
 * {
 *    url:  String,  必传，本次发起jsonp的url,不带callback的 eg: '/h5/api/auth/islogin'
 *    [data: Object], 选传，需要携带的参数
 *    [callback: String], 选传，本次请求的与服务端协商好的callback名称，不传默认 ‘jsonp_随机数’
 *    [timeout: Number]  选传，本次请求的超时时间，默认20000ms
 *     
 *    正常return {
 *      body: Object, //接口返回体
 *      status: Number, //返回状态码
 *      statusText: String //返回状态文案
 *    }
 * 
 *    异常return一个 new Error
 * }
 * 
 */
const jsonp = (request) => {
    return new Promise((resolve, reject) => {
        let _url = request.url,
            callbackName = request.callback || ('jsonp_' + Math.random()).replace(".", ""),
            params = request.data ? '&' + formatParams(request.data) : '',
            finalUrl = getUrl(_url) + (~_url.indexOf('?') ? '&' : '?') + 'callback=' + callbackName + params,
            timeout = request.timeout || 20000,
            body = null,
            handler, script, timer
        
        window[callbackName] = result => {
            clearTimeout(timer)
            body = result
        };
        
        handler = ({type}) => {
            let status = 0, statusText

            if (type === 'load' && body !== null) {
                status = 200
                statusText = 'OK'
            } else if (type === 'error') {
                status = 500
                statusText = 'error load'
            } else if (type === 'abort') {
                status = 400
                statusText = 'timeout'
                reject(new Error(`JSONP request to ${finalUrl} timed out`))
            }

            if (status && window[callbackName]) {
                delete window[callbackName]
                document.head.removeChild(script)
            }
            resolve(resolve({body, status, statusText}));
        }

        //超时处理        
        timer = setTimeout(function () {
            window[callbackName] = null
            document.head.removeChild(script)
            handler({type: 'abort'})
        }, timeout);

        script = document.createElement('script');
        script.src = finalUrl;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.head.appendChild(script);
    })

}

const getUrl = (url) => {
    if(!~url.indexOf('http') && ~url.indexOf('.com')){
        return window.location.protocol + url
    }
    return url
}

const formatParams = (data) => {
    let arr = [];
    for (let name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}


export default jsonp