// 获取压缩图片
export function getSmallURL ( fileName) {
    const base = 'http://driver-master.oss-cn-hangzhou.aliyuncs.com/microblog/';
    return base + fileName;
}

// 获取原图
export function getBigURL ( fileName) {
    const base = 'http://driver-master.oss-cn-hangzhou.aliyuncs.com/HDmicroblog/';
    return base + fileName;
}
