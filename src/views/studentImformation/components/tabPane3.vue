<template>
<div>
    <div class="filter-container">
        <span v-if="this.academeIdOfStore == 0 && this.classIdOfStore == 0">
        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
            <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
            </el-option>
        </el-select>
        </span>

        <span v-if="this.academeIdOfStore !== 0 && this.classIdOfStore == 0">
        <el-select disabled clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
            <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
            </el-option>
        </el-select>
        </span>

        <span v-if="this.academeIdOfStore !== 0 && this.classIdOfStore !== 0">
        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
            <span v-if="this.permison == 3">
                <el-option v-for="item in academysClasss" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </span>
            <span v-else>
                <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </span>
        </el-select>
        </span>

        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.majorId" placeholder="全部专业">
            <span v-if="this.permison == 3">
                <el-option v-for="item in majorsClasss" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.academeId == item.acaid">
                </el-option>
            </span>
            <span v-else>
                <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.academeId == item.acaid">
                </el-option>
            </span>
        </el-select>

        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.classId" placeholder="全部班级">
            <span v-if="this.permison == 3">
                <el-option v-for="item in classesClasss" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.majorId == item.majid">
                </el-option>
            </span>
            <span v-else>
                <el-option v-for="item in classes" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.majorId == item.majid">
                </el-option>
            </span>
        </el-select>

        <el-input @keyup.enter.native="getForm" style="width: 200px;" class="filter-item" placeholder="搜索学生学号" v-model="searchList.account">
        </el-input>

        <el-button class="filter-item" type="primary"  icon="search" @click="getForm" >搜索</el-button>
        <div class="button-gr" v-if="role && role == 3">
            <!-- <el-button class="filter-item" type="primary" @click="upToAcademy">已选上报院系</el-button> -->
            <!-- <el-button class="filter-item" type="primary" @click="upToAcademyAll">全部上报院系</el-button> -->
        </div>
    </div>
    <div class="choose">
            <el-select clearable style="width: 200px" class="filter-item" v-model="filename" placeholder="必须选择表名才可以打印">
                <el-option v-for="item in exForm" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </el-select>
            <el-button class="filter-item" type="primary" @click="handleDownload" :loading="downloadLoading">打印已选</el-button>
            <el-button class="filter-item" type="primary" @click="handleDownloadAll" :loading="downloadLoading">打印所有</el-button>
            <div class="button-gr" v-if="role && role == 3">
            <el-button class="filter-item" type="primary" @click="upToAcademy">已选上报院系</el-button>
            <el-button class="filter-item" type="primary" @click="upToAcademyAll">全部上报院系</el-button>
            </div>
            </div>
    <el-table :data="tab3" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">

    <el-table-column align="center" label="序号" width="80px">
        <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
        </template>
    </el-table-column>

    <el-table-column align="center" label="院系" width="180"  v-loading="loading"
    element-loading-text="请给我点时间！">
      <template slot-scope="scope">
        <span>{{academyFilter(scope.row.academeId)}}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="专业">
      <template slot-scope="scope">
        <span>{{majorFilter(scope.row.majorId)}}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="所属行政班">
      <template slot-scope="scope">
        <span>{{classesFilter(scope.row.classId)}}</span>
      </template>
    </el-table-column>

    <el-table-column width="140px" align="center" label="学号">
      <template slot-scope="scope">
        <span>{{scope.row.account}}</span>
      </template>
    </el-table-column>

    <el-table-column width="140px" align="center" label="姓名">
      <template slot-scope="scope">
        <span>{{scope.row.realName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" width="120px" label="年级">
      <template slot-scope="scope">
       <span>{{scope.row.year}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="毕业批次" width="160">
      <template slot-scope="scope">
        <!-- <span>{{scope.row.pageviews}}</span> -->
        <el-select v-model="scope.row.graduateBatch" placeholder="待填写">
            <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.key"
            :value="item.val">
            </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column align="center" label="毕业结论" width="160">
      <template slot-scope="scope">
        <!-- <span>{{scope.row.pageviews}}</span> -->
        <el-select v-model="scope.row.graduateConclusion" placeholder="待填写">
            <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.key"
            :value="item.val">
            </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="是否授予学位" width="160">
      <template slot-scope="scope">
        <!-- <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag> -->
        <el-select v-model="scope.row.isDegree" placeholder="待填写">
            <el-option
            v-for="item in options3"
            :key="item.id"
            :label="item.key"
            :value="item.val">
            </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="是否有学籍表" width="160">
      <template slot-scope="scope">
        <el-select v-model="scope.row.isSchoolForm" placeholder="待填写">
            <el-option
            v-for="item in options4"
            :key="item.id"
            :label="item.key"
            :value="item.val">
            </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column
      type="selection"
      width="55"
      fixed="right">
    </el-table-column>

  </el-table>
    <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchList.page"
                        :page-size="searchList.size" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
</div>
</template>

<script  scoped>
import { mapGetters } from 'vuex'
import {getStudentListParam, updateStudent, getStudentListClass} from '../../../newapi/studentMessage'
import { exportGraduateListParam, exportJudeListParam } from '../../../newapi/exportExe'
import { getAcademys, getMajors, getClasses } from '../../../filters/contentfilters'
export default {
  props: {
    type: {
      type: String,
      default: 'frist'
    }
  },
  data() {
    return {
      total:null,
      role:'',
      searchList: {
        page:1,
        size:10,
        checkStatus: 3,
        academeId:'',
        majorId:'',
        classId:'',
        account:'',
        graduateBatch:'',
        graduateConclusion:'',
        isDegree:'',
        isSchoolForm:'',
        middleData :''
      },
      tab3:[],
      value:'',
      options1: [
        //   要注意后端给的数据是init还是string，如果是init这里的数据val就不能加引号
        {
          val: 0,
          key: '待填写',
        },
        {
          val: 1,
          key: '第一批',
        },{
          val: 2,
          key: '第二批',
        },{
          val: 3,
          key: '延迟毕业',
        }
      ],
      options2: [
        {
          val: 0,
          key: '待填写'
        },
        {
          val: 1,
          key: '拟毕业'
        },{
          val: 2,
          key: '拟结业'
        },{
          val: 3,
          key: '拟肄业'
        }
      ],
      options3: [
        {
          val: 0,
          key: '待填写'
        },{
          val: 1,
          key: '拟授予'
        },{
          val: 2,
          key: '拟不授予'
        },
      ],
      options4: [
        {
          val: 0,
          key: '待填写'
        },{
          val: 1,
          key: '有'
        },{
          val: 2,
          key: '无'
        },
      ],
      loading: false,
      downloadLoading: false,
      academys:[],
      majors:[],
      classes:[],
      multipleSelection: '',
      filename:'',
      exForm:[
          { val:'毕业一览表', key: '毕业一览表'},
          { val:'分会审批一览表', key: '分会审批一览表'},
      ],
      allSelect:[],
      exportData1: [],
      exportData2: [],
      exportFenhuiExe: {
        successName : "",
        successNum : "",
        failName: "",
        failNum: "",
        list:[]
      },
      wopts : {
                bookType : 'xlsx',
                bookSST : true,
                type : 'binary'
            },
      permison: '',
      classsget: {
          adminId : '',
          page: 1,
          size:100000
      },
      academysClasss:[],
      majorsClasss:[],
      classesClasss:[],
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    graduateBatchFilter(status) {
        return status == 0 ? '待填写' : status == 1 ? '第一批' : status == 2 ? '第二批' : status == 3 ? '延迟毕业' : '未知'
    }

  },

  methods: {
    getForm(){
        this.permison = this.roles[0];
        if(this.permison == 3){
            this.searchList.adminId = this.aid;
             return new Promise( resolve => {
                getStudentListClass(this.searchList).then( (res) => {
                    if(res.status != 200) {
                        this.$message.error('请求失败，网络原因请重试！');
                    }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                this.tab3 = res.data.data;
                                if(this.searchList.page==1){
                                    this.total = parseInt(res.data.message);
                                }
                            }
                        }
                        // this.initform();
                })
                resolve()
            })
        } else {
            if(this.academeIdOfStore ==0 && this.classIdOfStore == 0) {
            // console.log(213)
        }else if(this.academeIdOfStore !==0 && this.classIdOfStore == 0){
            this.searchList.academeId = this.academeIdOfStore;
        }else{
            // this.searchList.academeId = this.academeIdOfStore;
            // this.searchList.classId = this.classIdOfStore;
        }
        return new Promise( resolve => {
            getStudentListParam(this.searchList).then( (res) => {
                if(res.status!=200) {
                    this.$message.error('请求失败，网络原因请重试！');
                }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            this.tab3 = res.data.data;
                            // console.log(res.data.data)
                            if(this.searchList.page==1){
                                this.total = parseInt(res.data.message);
                            }
                        }
                    }
                // this.initform();
            })
            resolve()
        })
        }
    },
    // 清空
    initform(){
        this.searchList.academeId = '';
        this.searchList.classId = ''
    },
    // 上报学院操作
    upToAcademy(){
        this.multipleSelection.forEach(element => {
            element.checkStatus = 1
        });
        let data = this.multipleSelection
        return new Promise((resolve) => {
             updateStudent(data).then((res) => {
                 if(res.status!= 200){
                        this.$message.error('请求失败，网络原因请重试！');
                    }else {
                        if(!res.data||res.data.code !=0){
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }else{
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            location.reload()
                        }
                    }
             })
             resolve()
        })

    },

    // 通过方法将id转为名称
    academyFilter(academeId){
        for(var i=0;i<this.academys.length;i++){
            if(this.academys[i].val === academeId){
                return this.academys[i].key
            }
        }
        return
    },
    majorFilter(majorId){
        for(var i=0;i<this.majors.length;i++){
            if(this.majors[i].val === majorId){
                return this.majors[i].key
            }
        }
        return
    },
    classesFilter(classId){
        for(var i=0;i<this.classes.length;i++){
            if(this.classes[i].val === classId){
                return this.classes[i].key
            }
        }
        return
    },
    // 一些页面细节操作
    handleSizeChange(){
        this.getForm()
    },
    handleCurrentChange(){
        this.getForm()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 全选上报
    upToAcademyAll(){
        this.$confirm('此操作将全部上报给院系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '上报成功!'
          });
          this.searchList.size = this.total;
          getStudentListParam(this.searchList).then( (res) => {
                if(res.status!=200) {
                    this.$message.error('请求失败，网络原因请重试！');
                }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            this.allSelect = res.data.data;
                            this.allSelect.forEach(element => {
                                element.checkStatus = 1
                            });
                            return new Promise((resolve) => {
                            updateStudent(this.allSelect).then((res) => {
                                if(res.status!= 200){
                                    this.$message.error('请求失败，网络原因请重试！');
                                }else {
                                    if(!res.data||res.data.code !=0){
                                        this.$message({
                                            message: res.data.message,
                                            type: 'error'
                                        });
                                    }else{
                                        this.$message({
                                            message: res.data.message,
                                            type: 'success'
                                        });
                                        location.reload()
                                }
                    }
             })
             resolve()
        })
                        }
                    }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上报'
          });
        });
    },
    // 全部表格导出
    handleDownloadAll(){
        this.searchList.size = this.total;
        getStudentListParam(this.searchList).then( (res) => {
                if(res.status!=200) {
                    this.$message.error('请求失败，网络原因请重试！');
                }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            this.allSelect = res.data.data;
                            if(this.allSelect.length && !!this.filename) {
                                for(var i =0;i<this.allSelect.length;i++){
                                    // // console.log(this.multipleSelection[i])
                                    this.allSelect[i].id = i+1
                                }
                                // 遍历出专业名
                                this.allSelect.forEach(element => {
                                    for(var i=0;i<this.majors.length;i++){
                                        if(this.majors[i].val === element.majorId){
                                            return element.majorname = this.majors[i].key
                                        }
                                    }
                                    return
                                })
                                // 遍历出性别
                                this.allSelect.forEach(element => {
                                    element.sexname = element.sex == 1 ? '女' : element.sex == 0 ? '男' : '未知'
                                })
                                // 遍历出毕业结论
                                this.allSelect.forEach(element => {
                                    element.graclusionname = element.graduateConclusion == 0 ? '待填写' : element.graduateConclusion == 1 ? '拟毕业' : element.graduateConclusion == 2 ? '拟结业' : element.graduateConclusion == 3 ? '拟肄业' : '待填写'
                                })
                                // 遍历出是否学士
                                this.allSelect.forEach(element => {
                                    element.degreename = element.isDegree == 1 ? '拟授予' : element.isDegree == 2 ? '拟不授予' : '待填写'
                                })
                                // 遍历有无学籍表
                                this.allSelect.forEach(element => {
                                    element.schoolformname = element.isSchoolForm == 1 ? '有' : element.isSchoolForm == 2 ? '无' : '待填写'
                                })
                                this.downloadLoading = true;
                                if(this.filename == '分会审批一览表'){
                                    this.allSelect.forEach(element =>{
                                        let Excel2 = {
                                                id: '',
                                                account: '',
                                                realName: '',
                                                sexname: '',
                                                majorname: '',
                                                reason: '',
                                                studentsign: '',
                                                acadesign:'',
                                                degreename:'',
                                                graclusionname: '',
                                                schoolformname: ''
                                            };
                                        Excel2.id = element.id;
                                        // // console.log(element.id)
                                        Excel2.account = element.account;
                                        Excel2.realName = element.realName;
                                        Excel2.majorname = element.majorname;
                                        Excel2.reason = element.reason;
                                        Excel2.sex = element.sexname;
                                        Excel2.degreename = element.degreename;
                                        Excel2.graclusionname = element.graclusionname;
                                        Excel2.schoolformname = element.schoolformname;
                                        Excel2.studentsign = '';
                                        Excel2.acadesign = '';
                                        this.exportData2.push(Excel2)
                                    });
                                    for(let i =0;i<this.exportData2.length;i++){
                                        if(this.exportData2[i].degreename == '待填写') {
                                            this.middleData = '待填写'
                                        }
                                    }
                                    if(this.middleData == '待填写'){
                                        this.$notify({
                                            title: '警告',
                                            message: '请先完善是否毕业信息再来全部导出',
                                            type: 'warning'
                                            });
                                    }else {
                                        let paramData = {
                                            jsonData : JSON.stringify(this.exportData2),
                                        }
                                        // 请求数据jsonData，
                                        exportJudeListParam(paramData).then(res => {
                                            var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                                            var downloadElement = document.createElement('a');
                                            var href = window.URL.createObjectURL(blob); //创建下载的链接
                                            downloadElement.href = href;
                                            downloadElement.download = '分会审批表.xlsx'; //下载后文件名
                                            document.body.appendChild(downloadElement);
                                            downloadElement.click(); //点击下载
                                            document.body.removeChild(downloadElement); //下载完成移除元素
                                            window.URL.revokeObjectURL(href); //释放掉blob对象
                                            this.exportData2 = [];
                                            this.downloadLoading = false;
                                        })
                                    }
                                } else if(this.filename == '毕业一览表') {
                                    this.allSelect.forEach(element =>{
                                        let Excel1 = {
                                                id: '',
                                                account: '',
                                                realName: '',
                                                majorname: '',
                                                graclusionname: '',
                                                degreename: '',
                                                schoolformname:'',
                                                detailmessage: ''
                                            };
                                        Excel1.id = element.id;
                                        // // console.log(element.id)
                                        Excel1.account = element.account;
                                        Excel1.realName = element.realName;
                                        Excel1.majorname = element.majorname;
                                        Excel1.graclusionname = element.graclusionname;
                                        Excel1.degreename = element.degreename;
                                        Excel1.schoolformname = element.schoolformname;
                                        Excel1.detailmessage = '';
                                        this.exportData1.push(Excel1)
                                    })
                                    let paramData = {
                                            jsonData : JSON.stringify(this.exportData1),
                                        }
                                    // 请求数据jsonData，
                                    // console.log(JSON.stringify(this.exportData1))
                                    exportGraduateListParam(paramData).then(res => {
                                        var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                                        var downloadElement = document.createElement('a');
                                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                                        downloadElement.href = href;
                                        downloadElement.download = '毕业一览表.xlsx'; //下载后文件名
                                        document.body.appendChild(downloadElement);
                                        downloadElement.click(); //点击下载
                                        document.body.removeChild(downloadElement); //下载完成移除元素
                                        window.URL.revokeObjectURL(href); //释放掉blob对象
                                        this.exportData1 = [];
                                        this.downloadLoading = false
                                    })
                                }
                                } else {
                                    this.$message({
                                        message: !!this.filename ? '请选择要导出的人物信息':'请选择要导出的文件',
                                        type: 'warning'
                                    })
                                }
                                            }
                                        }
                })
    },
    // 部分表格导出
    handleDownload(){
        if(this.multipleSelection.length && !!this.filename) {
            for(var i =0;i<this.multipleSelection.length;i++){
                // // console.log(this.multipleSelection[i])
                this.multipleSelection[i].id = i+1
            }
            // 遍历出专业名
            this.multipleSelection.forEach(element => {
                for(var i=0;i<this.majors.length;i++){
                    if(this.majors[i].val === element.majorId){
                        return element.majorname = this.majors[i].key
                    }
                }
                return
            })
            // 遍历出性别
            this.multipleSelection.forEach(element => {
                element.sexname = element.sex == 1 ? '女' : element.sex == 0 ? '男' : '未知'
            })
            // 遍历出毕业结论
            this.multipleSelection.forEach(element => {
                element.graclusionname = element.graduateConclusion == 0 ? '待填写' : element.graduateConclusion == 1 ? '拟毕业' : element.graduateConclusion == 2 ? '拟结业' : element.graduateConclusion == 3 ? '拟肄业' : '待填写'
            })
            // 遍历出是否学士
            this.multipleSelection.forEach(element => {
                element.degreename = element.isDegree == 1 ? '拟授予' : element.isDegree == 2 ? '拟不授予' : '待填写'
            })
            //加入原因
            this.multipleSelection.forEach(element => {
                element.reason = '符合“校政（2008）1号”第六条第  款的规定'
            })
            // 遍历有无学籍表
            this.multipleSelection.forEach(element => {
                element.schoolformname = element.isSchoolForm == 1 ? '有' : element.isSchoolForm == 2 ? '无' : '待填写'
            })
            this.downloadLoading = true;
            if(this.filename == '分会审批一览表'){
                this.multipleSelection.forEach(element =>{
                    let Excel2 = {
                            id: '',
                            account: '',
                            realName: '',
                            sexname: '',
                            majorname: '',
                            reason: '',
                            studentsign: '',
                            acadesign:'',
                            degreename:'',
                            graclusionname: '',
                            schoolformname: ''
                        };
                        Excel2.id = element.id;
                        // // console.log(element.id)
                        Excel2.account = element.account;
                        Excel2.realName = element.realName;
                        Excel2.majorname = element.majorname;
                        Excel2.reason = element.reason;
                        Excel2.sex = element.sexname;
                        Excel2.degreename = element.degreename;
                        Excel2.graclusionname = element.graclusionname;
                        Excel2.schoolformname = element.schoolformname;
                        Excel2.studentsign = '';
                        Excel2.acadesign = '';
                        this.exportData2.push(Excel2)
                    });
                    for(let i =0;i<this.exportData2.length;i++){
                        if(this.exportData2[i].degreename == '待填写') {
                            this.middleData = '待填写'
                        }
                    }
                    if(this.middleData == '待填写'){
                        this.$notify({
                            title: '警告',
                            message: '请先完善是否毕业信息再来导出',
                            type: 'warning'
                            });
                    }else {
                        let paramData = {
                            jsonData : JSON.stringify(this.exportData2),
                        }
                        // 请求数据jsonData，
                        exportJudeListParam(paramData).then(res => {
                            var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                            var downloadElement = document.createElement('a');
                            var href = window.URL.createObjectURL(blob); //创建下载的链接
                            downloadElement.href = href;
                            downloadElement.download = '分会审批表.xlsx'; //下载后文件名
                            document.body.appendChild(downloadElement);
                            downloadElement.click(); //点击下载
                            document.body.removeChild(downloadElement); //下载完成移除元素
                            window.URL.revokeObjectURL(href); //释放掉blob对象
                            this.$refs.multipleTable.clearSelection();
                            this.exportData2 = [];
                            this.downloadLoading = false;
                        })
                    }
            } else if(this.filename == '毕业一览表') {
                this.multipleSelection.forEach(element =>{
                    let Excel1 = {
                            id: '',
                            account: '',
                            realName: '',
                            majorname: '',
                            graclusionname: '',
                            degreename: '',
                            schoolformname:'',
                            detailmessage: ''
                        };
                    Excel1.id = element.id;
                    // // console.log(element.id)
                    Excel1.account = element.account;
                    Excel1.realName = element.realName;
                    Excel1.majorname = element.majorname;
                    Excel1.graclusionname = element.graclusionname;
                    Excel1.degreename = element.degreename;
                    Excel1.schoolformname = element.schoolformname;
                    Excel1.detailmessage = '';
                    this.exportData1.push(Excel1)
                })
                let paramData = {
                        jsonData : JSON.stringify(this.exportData1),
                    }
                // 请求数据jsonData，
                exportGraduateListParam(paramData).then(res => {
                    var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = '毕业一览表.xlsx'; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                    this.$refs.multipleTable.clearSelection();
                    this.exportData1 = [];
                    this.downloadLoading = false
                })
            }
            } else {
                this.$message({
                    message: !!this.filename ? '请选择要导出的人物信息':'请选择要导出的文件',
                    type: 'warning'
                })
            }
    },
    // 解析json
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 当班级管理员登录时获取对应的学院专业班级
    getImformationForClasss() {
        this.classsget.adminId = this.aid;
        return new Promise( resolve => {
            getStudentListClass(this.classsget).then((res) => {
                if(res.status != 200) {
                        this.$message.error('请求失败，网络原因请重试！');
                    }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            let data = res.data.data;
                            let data1 = [];
                            let data2 = [];
                            let data3 = [];
                            for(let i =0;i< data.length;i++){
                                data1.push(data[i].academeId);
                                data2.push(data[i].majorId);
                                data3.push(data[i].classId);
                            }
                            // 进行数组去重
                            let simpleData1 = [...new Set(data1)];
                            let simpleData2 = [...new Set(data2)];
                            let simpleData3 = [...new Set(data3)];
                            // 遍历出学院
                            for(let i=0;i<simpleData1.length;i++){
                                for(let j = 0;j<this.academys.length;j++){
                                    if(simpleData1[i] == this.academys[j].val){
                                        let eldata = this.academys[j]
                                        this.academysClasss.push(eldata)
                                    }
                                }
                            }
                            // 遍历出专业
                            for(let i=0;i<simpleData2.length;i++){
                                for(let j =0;j<this.majors.length;j++){
                                    if(simpleData2[i] == this.majors[j].val){
                                        let eldata = this.majors[j]
                                        this.majorsClasss.push(eldata)
                                    }
                                }
                            }
                            // 遍历出班级
                            for(let i=0;i<simpleData3.length;i++){
                                for(let j =0;j<this.classes.length;j++){
                                    if(simpleData3[i] == this.classes[j].val){
                                        let eldata = this.classes[j]
                                        this.classesClasss.push(eldata)
                                    }
                                }
                            }

                        }
                    }
            })
            resolve();
        })
    },

  },
  created() {
    this.role = this.roles;
    function setAcademys () {
        return new Promise((resolve,reject) => {
            getAcademys(academys => {
                resolve(academys)
            })
        })
    };
    function setMajors () {
        return new Promise((resolve,reject) => {
            getMajors(majors => {
                resolve(majors)
            })
        })
    };
    function setClasses () {
        return new Promise((resolve,reject) => {
            getClasses(classes => {
                resolve(classes)
            })
        })
    };
    setAcademys().then(academys => {
        this.academys = academys;
        return setMajors();
    }).then(majors => {
        this.majors = majors;
        return setClasses();
    }).then(classes => {
        this.classes = classes;
        this.getForm();
        this.getImformationForClasss();
    })
  },
  computed : {
        ...mapGetters ( [
            'aid',
            'roles',
            'academeIdOfStore',
            'classIdOfStore'
        ] )
    }
}
</script>
<style scoped>
  .tab-container{
    margin: 30px;
  }
  .tab-container{
      position: relative;
  }
  .choose{
      position: relative;
      text-align: left;
      margin-bottom: 10px;
  }
  .filter-item{
      vertical-align: top;
  }
  .button-gr{
      display: inline-block;
      float: right;
  }
</style>

