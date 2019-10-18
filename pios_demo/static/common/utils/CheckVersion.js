/**
 *  版本比较
 *  @param nowVersion   当前的版本
 *  @param goalVersion   参照的版本
 *  @param type   比较运算符
 */
let compareVersion =  function (nowVersion, goalVersion, type) {
    let nowStr = '',
        goalStr = '',
        nowArr = nowVersion.split('.'),
        goalArr = goalVersion.split('.');
    let result = false;
    let STRLEN = 4;
    let PrefixInteger = function (num, n) { // num传入的数字，n需要的字符长度
        return (Array(n).join(0) + num).slice(-n);
    }
    for (let i = 0; i < Math.max(nowArr.length, goalArr.length); i++) {
        nowStr += PrefixInteger(~~nowArr[i], STRLEN);
        goalStr += PrefixInteger(~~goalArr[i], STRLEN);
    }
    switch (type) {
        case "==":
            (parseInt(nowStr) == parseInt(goalStr)) && (result = true)
            break;
        case ">":
            (parseInt(nowStr) > parseInt(goalStr)) && (result = true)
            break;
        case ">=":
            (parseInt(nowStr) >= parseInt(goalStr)) && (result = true)
            break;
        case "<":
            (parseInt(nowStr) < parseInt(goalStr)) && (result = true)
            break;
        case "<=":
            (parseInt(nowStr) <= parseInt(goalStr)) && (result = true)
            break;
        default:
            // statements_def
            break;
    }
    return result;
};
export default compareVersion;