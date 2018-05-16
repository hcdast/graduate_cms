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

export function export_json_to_excel(data, filename, wopts, length) {
    let wb = { SheetNames: ['Sheet1'], Sheets:{}, Props: {}}
    data = XLSX.utils.json_to_sheet ( data );
    const length1 = length;

    data[ "A1" ] = { t : "s", v : "201  届（夏）毕业生授予学士学位分会审批一览表"};
    data[ "A2" ] = { t : "s", v : "院系（印）" };
    data[ "F2" ] = { t : "s", v : "填表人（签名）：" };
    data[ "H2" ] = { t : "s", v : "年    月    日" };
    data[ "A3" ] = { t : "s", v : "同意授予      等    位同学学士学位。具体名单另附。" };
    data[ "G3" ] = { t : "s", v : "分会主任签字：" };
    data[ "A4" ] = { t : "s", v : "同意授予      等    位同学学士学位。具体名单另附。" };
    data[ "G4" ] = { t : "s", v : "分会主任签字：" };
    data[ "A5" ] = { t : "s", v : "序号" };
    data[ "B5" ] = { t : "s", v : "学号" };
    data[ "C5" ] = { t : "s", v : "姓名" };
    data[ "D5" ] = { t : "s", v : "性别" };
    data[ "E5" ] = { t : "s", v : "专业" };
    data[ "F5" ] = { t : "s", v : "不授予原因" };
    data[ "G5" ] = { t : "s", v : "学生签字" };
    data[ "H5" ] = { t : "s", v : "分会主任签字" };
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
                c : 4,//结束列
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
        },
        {
            s : {
                c : 0,//开始列
                r : 2//开始行
            },
            e : {
                c : 5,//结束列
                r : 2//结束行
            }
        },
        {
            s : {
                c : 6,//开始列
                r : 2//开始行
            },
            e : {
                c : 7,//结束列
                r : 2//结束行
            }
        },
        {
            s : {
                c : 0,//开始列
                r : 3//开始行
            },
            e : {
                c : 5,//结束列
                r : 3//结束行
            }
        },
        {
            s : {
                c : 6,//开始列
                r : 3//开始行
            },
            e : {
                c : 7,//结束列
                r : 3//结束行
            }
        },
        {
            s : {
                c : 0,//开始列
                r : length1 - 6 //开始行
            },
            e : {
                c : 1,//结束列
                r : length1 - 6//结束行
            }
        },
        {
            s : {
                c : 0,//开始列
                r : length1 - 5 //开始行
            },
            e : {
                c : 6,//结束列
                r : length1 - 5//结束行
            }
        },
        {
            s : {
                c : 0,//开始列
                r : length1 - 4 //开始行
            },
            e : {
                c : 6,//结束列
                r : length1 - 4//结束行
            }
        },
        {
            s : {
                c : 1,//开始列
                r : length1 - 3 //开始行
            },
            e : {
                c : 7,//结束列
                r : length1 - 3//结束行
            }
        },
        {
            s : {
                c : 1,//开始列
                r : length1 - 2 //开始行
            },
            e : {
                c : 7,//结束列
                r : length1 - 2//结束行
            }
        },
        {
            s : {
                c : 1,//开始列
                r : length1 - 1 //开始行
            },
            e : {
                c : 7,//结束列
                r : length1 - 1//结束行
            }
        },
        {
            s : {
                c : 1,//开始列
                r : length1 //开始行
            },
            e : {
                c : 7,//结束列
                r : length1//结束行
            }
        },

    ];

    wb.Sheets[ 'Sheet1' ] = data;
    saveAs ( new Blob ( [ s2ab ( XLSX.write ( wb, wopts ) ) ], { type : "application/octet-stream" } ), filename + '.' + (wopts.bookType == "biff2" ? "xls":wopts.bookType) );

}
