/**
 * Created by Nemo on 2018/1/11.
 */
/*
* 根据图片类型和图片名获取图片链接
* */
export function getSourcefileURL (type, fileName) {
    const base = 'http://driver-master.oss-cn-hangzhou.aliyuncs.com/';
    const typeMap = {
        1 : 'head/',
        2 : 'background/',
        3 : 'microblog/',
        4 : 'HDhead/',
        5 : 'HDmicroblog/',
        6 : 'captcha/',
        7 : 'icon/',
        8 : 'video/',
        9 : 'audio/',
        10 : 'exercise/',
        11 : 'resource/'
    };
    return base + typeMap[type] + fileName + '?x-oss-process=image/resize,w_140,h_100';
}
