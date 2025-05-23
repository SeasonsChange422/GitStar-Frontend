/*
 * @Author: Dhx
 * @Date: 2025-02-27 16:31:34
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\utils\time.ts
 */

export function getTimeAgo(timeString:string) {
  if(timeString == ''||timeString==null)return ''
  const targetDate = new Date(timeString);
  const currentDate = new Date();
  // 校验日期有效性
  if (isNaN(targetDate.getTime())) {
    throw new Error("Invalid time string");
  }

  const delta = currentDate - targetDate;

  // 处理未来时间情况
  if (delta < 0) {
    return this.formatDate(targetDate);
  }

  const seconds = Math.floor(delta / 1000);

  // 时间间隔判断
  if (seconds < 60) {
    return "刚刚";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}分钟前`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}小时前`;
  } else if (seconds <= 172800*180) { // 360天内的秒数
    const days = Math.floor(seconds / 86400);
    return `${days}天前`;
  } else {
    return formatDate(targetDate);
  }
}

/**
 * 格式化日期为 yyyy-MM-dd HH:mm:ss
 * @param {Date} date - 需要格式化的日期对象
 * @returns {string} 格式化后的时间字符串
 */
function formatDate(date) {
  const pad = num => String(num).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-") + " " + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join(":");
}
