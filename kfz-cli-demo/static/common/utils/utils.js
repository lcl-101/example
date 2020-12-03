export const timeReduce = (t) => {
  let day = parseInt(t / 86400);
  let s = t % 86400;
  let hours = parseInt(s / 3600);
  let w = s % 3600;
  let min = parseInt(w / 60);
  let secs = w % 60;
  if (+day) {
    return day + "天" + hours + "时" + min + "分";
  } else if (+hours) {
    return hours + "时" + min + "分";
  } else if (+min) {
    return min + "分";
  }
};

//千分位计算
export const comma = (num) => {
  var source = String(num).split("."); //按小数点bai分成2部分
  source[0] = source[0].replace(new RegExp("(\\d)(?=(\\d{3})+$)", "ig"), "$1,"); //只将整数部分进行都好分割du
  return source.join("."); //再将小数部分合并进来
};
