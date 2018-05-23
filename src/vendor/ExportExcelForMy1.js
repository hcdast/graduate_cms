require('script-loader!file-saver');
require('script-loader!@/vendor/Blob');
import XLSX from 'xlsx'

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
};
function s2ab( s ) {
    if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer ( s.length );
        let view = new Uint8Array ( buf );
        for ( let i = 0 ; i != s.length ; ++ i ) view[ i ] = s.charCodeAt ( i ) & 0xFF;
        return buf;
    } else {
        let buf = new Array ( s.length );
        for ( let i = 0 ; i != s.length ; ++ i ) buf[ i ] = s.charCodeAt ( i ) & 0xFF;
        return buf;
    }
};
function saveAs( obj, fileName ) {//当然可以自定义简单的下载文件实现方式
    let tmpa = document.createElement ( "a" );
    tmpa.download = fileName || "下载";
    tmpa.href = URL.createObjectURL ( obj ); //绑定a标签
    tmpa.click (); //模拟点击实现下载
    setTimeout ( function () { //延时释放
        URL.revokeObjectURL ( obj ); //用URL.revokeObjectURL()来释放这个object URL
    }, 100 );
};

export function export_json_to_excel(data, filename,wopts) {
    // data = XLSX.utils.json_to_sheet ( data );

    // console.log(data)
    // console.log(filename)
    // console.log(wopts)
    let wb = { SheetNames: ['Sheet1'], Sheets:{}, Props: {}}
    data = XLSX.utils.json_to_sheet ( data );
    // console.log(data);
    // 单元格数据填充
    data[ "A1" ] = { t : "s", v : "安徽大学2015  届(夏)毕业生一览表"};
    data[ "A2" ] = { t : "s", v : "院系（印章）" };
    data[ "C2" ] = { t : "s", v : "领导签字：" };
    data[ "E2" ] = { t : "s", v : "填表人：" };
    data[ "F2" ] = { t : "s", v : "   " };
    data[ "G2" ] = { t : "s", v : "年    月    日" };
    data[ "A3" ] = { t : "s", v : "序号" }
    data[ "B3" ] = { t : "s", v : "学号" }
    data[ "C3" ] = { t : "s", v : "姓名" }
    data[ "D3" ] = { t : "s", v : "专业" }
    data[ "E3" ] = { t : "s", v : "毕业结论" }
    data[ "F3" ] = { t : "s", v : "是否授予学士" }
    data[ "G3" ] = { t : "s", v : "有无学籍表" }
    data[ "H3" ] = { t : "s", v : "备注" }
    // 合并单元格
    data[ "!merges" ] = [
        {
            s : {
                c : 0,//开始列
                r : 0//开始行
            },
            e : {
                c : 7,//结束列
                r : 0//结束行
            }
        }, {
            s : {
                c : 0,//开始列
                r : 1//开始行
            },
            e : {
                c : 1,//结束列
                r : 1//结束行
            }
        },{
            s : {
                c : 2,//开始列
                r : 1//开始行
            },
            e : {
                c : 3,//结束列
                r : 1//结束行
            }
        },
        {
            s : {
                c : 6,//开始列
                r : 1//开始行
            },
            e : {
                c : 7,//结束列
                r : 1//结束行
            }
        }
    ];
    // 单元格居中对齐

    // 单元格加粗

    // 单元格宽度
    data['!cols'] = [
        {wpx: 30},
        {wpx: 70,},
        {wpx: 60,},
        {wpx: 120,},
        {wpx: 60},
        {wpx: 90},
        {wpx: 80},
        {wpx: 90}
    ];
    data['!rows'] = [
        {hpx:30},
        {hpx:20},
        {hpx:25}
    ]
    wb.Sheets[ 'Sheet1' ] = data;
    saveAs ( new Blob ( [ s2ab ( XLSX.write ( wb, wopts ) ) ], { type : "application/octet-stream" } ), filename + '.' + (wopts.bookType == "biff2" ? "xls":wopts.bookType) );

}
