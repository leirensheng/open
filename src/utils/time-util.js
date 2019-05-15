/**
 * 仿照 moment 的接口，简单实现 formatDate
 * @param   {Number} timeStamp    待格式化的 unix 时间戳
 * @param   {String} pattern      转化格式
 * @return  {String}              格式化后的日期字符串
 */

export function formatDate(timeStamp, pattern) {
  const str = typeof pattern === 'string' ? pattern : 'yyyy-MM-dd hh:mm:ss';
  const date = new Date(timeStamp);
  const fixLen = function (num, len) {
    let r = `${num}`;
    while (r.length < len) {
      r = `0${r}`;
    }
    return r;
  };
  if (!isNaN(date.getTime())) {
    return str
      .replace(/yyyy/i, fixLen(date.getFullYear(), 4))
      .replace(/MM/, fixLen(date.getMonth() + 1, 2))
      .replace(/dd/i, fixLen(date.getDate(), 2))
      .replace(/hh/i, fixLen(date.getHours(), 2))
      .replace(/mm/, fixLen(date.getMinutes(), 2))
      .replace(/ss/i, fixLen(date.getSeconds(), 2));
  }
  return '';
}


export function sec2time(millisecond) {
  if (!millisecond || millisecond < -1) return '00:00:00';
  const s = millisecond / 1000;
  let t;
  const hour = Math.floor(s / 3600);
  const min = Math.floor((s / 60) % 60);
  const sec = Math.ceil(s % 60);
  t = hour < 10 ? `0${hour}:` : `${hour}:`;
  t += min < 10 ? `0${min}:` : `${min}:`;
  t += sec < 10 ? `0${sec}` : sec;
  return t;
}
