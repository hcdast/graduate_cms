<template>
  <div>
    <div class="filter-container">

        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
            <el-option v-for="item in academys" :key="item.id" :label="item.key" :value="item.val">
            </el-option>
        </el-select>

        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.majorId" placeholder="全部专业">
            <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.academeId == item.acaid">
            </el-option>
        </el-select>

        <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.classId" placeholder="全部班级">
            <el-option v-for="item in classes" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.majorId == item.majid">
            </el-option>
        </el-select>

        <el-input @keyup.enter.native="getForm" style="width: 200px;" class="filter-item" placeholder="搜索学生学号" v-model="searchList.account">
        </el-input>

        <el-button class="filter-item" type="primary"  icon="search" @click="getForm" >搜索</el-button>
        <div class="button-gr"  v-if="role && role == 2">
        <el-button class="filter-item" type="primary" @click="upToOffice" style="background:white;color:#20a0ff;">已选上报教务</el-button>
        <!-- <el-button class="filter-item" type="primary" @click="upToOfficeAll">全部上报教务</el-button> -->
        <el-button class="filter-item" type="primary" @click="getMessageToClass">已选驳回班级</el-button>
        <!-- <el-button class="filter-item" type="primary" @click="getMessageToClassAll">全部驳回班级</el-button> -->
        </div>
    </div>
    <div class="choose">
            <el-select clearable style="width: 200px" class="filter-item" v-model="filename" placeholder="必须选择表名才可以打印">
                <el-option v-for="item in exForm" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </el-select>
            <el-button class="filter-item" type="primary" @click="handleDownload" :loading="downloadLoading">打印已选</el-button>
            <el-button class="filter-item" type="primary" @click="handleDownloadAll" :loading="downloadLoading">打印所有</el-button>
            <div class="button-gr"  v-if="role && role == 2">
            <!-- <el-button class="filter-item" type="primary" @click="upToOffice">已选上报教务</el-button> -->
            <el-button class="filter-item" type="primary" @click="upToOfficeAll" style="background:white;color:#20a0ff;">全部上报教务</el-button>
            <!-- <el-button class="filter-item" type="primary" @click="getMessageToClass">已选驳回班级</el-button> -->
            <el-button class="filter-item" type="primary" @click="getMessageToClassAll">全部驳回班级</el-button>
            </div>
    </div>
    <el-table :data="tab2" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">

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

    <el-table-column width="180px" label="所属行政班">
      <template slot-scope="scope">
         <span>{{classesFilter(scope.row.classId)}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="学号">
      <template slot-scope="scope">
        <span>{{scope.row.account}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="姓名">
      <template slot-scope="scope">
        <span>{{scope.row.realName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="年级">
      <template slot-scope="scope">
       <span>{{scope.row.year}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="毕业批次" width="95">
      <template slot-scope="scope">
        <span>{{scope.row.graduateBatch | mapGraduateBatch}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="毕业结论" width="95">
      <template slot-scope="scope">
        <span>{{scope.row.graduateConclusion | mapGraduateConclusion}}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="是否授予学位" width="110">
      <template slot-scope="scope">
        <span>{{scope.row.isDegree | mapDegree}}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="是否有学籍表" width="110">
      <template slot-scope="scope">
        <span>{{scope.row.isSchoolForm | mapSchoolForm}}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="状态" width="110">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusTypeFilter">{{scope.row.status | statusFilter}}</el-tag>
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

<script scoped>
import { mapGetters } from 'vuex'
import {getStudentListParam, updateStudent} from '../../../newapi/studentMessage'
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
        checkStatus: 1,
        academeId:'',
        majorId:'',
        classId:'',
        account:''
      },
      tab2:[],
      academys:[],
      majors:[],
      classes:[],
      multipleSelection: '',
      loading: false,
      downloadLoading: false,
      filename:'',
      exForm:[
          { val:'打印毕业一览表', key: '打印毕业一览表'},
          { val:'打印分会审批一览表', key: '打印分会审批一览表'},
      ],
      allSelect:[],
      exportData1: [],
      exportData2: [],
      wopts : {
                bookType : 'xlsx',
                bookSST : true,
                type : 'binary'
            }
    }
  },
  filters: {
    statusTypeFilter( status ) {
        const statusMap = {
            1 : 'success',
            0 : 'danger'
        }
        return statusMap[ status ]
    },
    statusFilter( status ) {
        const statusMap = {
            1 : '正常',
            0 : '已停用'
        }
        return statusMap[ status ]
    },
    mapGraduateBatch(status) {
        return status == 1 ? '第一批次' : status == 2 ? '第二批次' : status == 3 ? '延期毕业' : '待填写'
    },
    mapGraduateConclusion(status){
        return status == 1 ? '拟肄业' : status == 2 ? '拟结业' : status == 3 ? '拟毕业' : '待填写'
    },
    mapDegree(status){
        return status == 0 ? '待填写' : status == 1 ? '拟授予' : status == 2 ? '拟不授予' : '待填写'
    },
    mapSchoolForm(status){
        return status == 0 ? '待填写' : status == 1 ? '有' : status == 2 ? '无' : '待填写'
    },
  },
  methods: {
    getForm(){
        return new Promise( resolve => {
            getStudentListParam(this.searchList).then( (res) => {
                if(res.status!=200) {
                    this.$message.error('请求失败，网络原因请重试！');
                }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            this.tab2 = res.data.data;
                            if(this.searchList.page==1){
                                this.total = parseInt(res.data.message);
                            }
                        }
                    }
            })
            resolve()
        })
    },
    // 上报教务操作
    upToOffice(){
        this.multipleSelection.forEach(element => {
            element.checkStatus = 2
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
    // 驳回班级操作
    getMessageToClass(){
        this.multipleSelection.forEach(element => {
            element.checkStatus = 3
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
                            if(this.allSelect.length) {
                                for(var i =0;i<this.allSelect.length;i++){
                                    // console.log(this.multipleSelection[i])
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
                                    element.graclusionname = element.graduateConclusion == 0 ? '待填写' : element.graduateConclusion == 1 ? '拟肄业' : element.graduateConclusion == 2 ? '拟结业' : element.graduateConclusion == 3 ? '拟毕业' : '待填写'
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
                                if(this.filename == '打印分会审批一览表'){
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
                                            };
                                        Excel2.id = element.id;
                                        // console.log(element.id)
                                        Excel2.account = element.account;
                                        Excel2.realName = element.realName;
                                        Excel2.majorname = element.majorname;
                                        Excel2.reason = element.reason;
                                        Excel2.sexname = element.sexname;
                                        Excel2.studentsign = '';
                                        Excel2.acadesign = '';
                                        this.exportData2.push(Excel2)
                                    });
                                    import('@/vendor/ExportExcelForMy2').then(excel => {
                                    this.exportData2.unshift({});
                                    this.exportData2.unshift({});
                                    this.exportData2.unshift({});
                                    this.exportData2.unshift({});
                                    this.exportData2.push({id:'说明：'});
                                    this.exportData2.push({id:'《安徽大学普通教育本科生学士学位授予工作实施细则》（校政〔2008〕1号）规定：'});
                                    this.exportData2.push({id:'“第六条  修业期间有下列情形之一者，不予授予学士学位：'});
                                    this.exportData2.push({account:'一、违反国家法律受到刑事处罚；        二、违反校规受到记过及以上处分；'});
                                    this.exportData2.push({account:'三、考试舞弊受到严重警告及以上处分；  四、修业期满，平均学分绩点低于1.5；'});
                                    this.exportData2.push({account:'五、毕业论文（设计、创作）成绩不及格；六、修业期间，退学警告累计达到三次及以上的；'});
                                    this.exportData2.push({account:'七、修业期满，仍未修满毕业最低要求学分”。'});
                                    const data1 = this.exportData2;
                                    const length = data1.length;
                                    // console.log(data1.length)
                                    excel.export_json_to_excel(
                                        data1,
                                        this.filename,
                                        this.wopts,
                                        length
                                    );
                                    this.$refs.multipleTable.clearSelection();
                                    this.exportData2 = [];
                                    this.downloadLoading = false
                                    })
                                } else if(this.filename == '打印毕业一览表') {
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
                                        // console.log(element.id)
                                        Excel1.account = element.account;
                                        Excel1.realName = element.realName;
                                        Excel1.majorname = element.majorname;
                                        Excel1.graclusionname = element.graclusionname;
                                        Excel1.degreename = element.degreename;
                                        Excel1.schoolformname = element.schoolformname;
                                        Excel1.detailmessage = '';
                                        this.exportData1.push(Excel1)
                                    })
                                    import('@/vendor/ExportExcelForMy1').then(excel => {
                                    this.exportData1.unshift({})
                                    this.exportData1.unshift({})
                                    const data = this.exportData1;
                                    excel.export_json_to_excel(
                                        data,
                                        this.filename,
                                        this.wopts);
                                    this.exportData1 = [];
                                    this.downloadLoading = false
                                    })
                                }
                                } else {
                                    this.$message({
                                        message: '请选择要导出的人物信息',
                                        type: 'warning'
                                    })
                                }
                                            }
                                        }
                })
    },
    // 部分表格导出
    handleDownload(){
        if(this.multipleSelection.length) {
            for(var i =0;i<this.multipleSelection.length;i++){
                // console.log(this.multipleSelection[i])
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
                element.graclusionname = element.graduateConclusion == 0 ? '待填写' : element.graduateConclusion == 1 ? '拟肄业' : element.graduateConclusion == 2 ? '拟结业' : element.graduateConclusion == 3 ? '拟毕业' : '待填写'
            })
            // 遍历出是否学士
            this.multipleSelection.forEach(element => {
                element.degreename = element.isDegree == 1 ? '拟授予' : element.isDegree == 2 ? '拟不授予' : '待填写'
            })
            // 遍历有无学籍表
            this.multipleSelection.forEach(element => {
                element.schoolformname = element.isSchoolForm == 1 ? '有' : element.isSchoolForm == 2 ? '无' : '待填写'
            })
            this.downloadLoading = true;
            if(this.filename == '打印分会审批一览表'){
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
                        };
                    Excel2.id = element.id;
                    // console.log(element.id)
                    Excel2.account = element.account;
                    Excel2.realName = element.realName;
                    Excel2.majorname = element.majorname;
                    Excel2.reason = element.reason;
                    Excel2.sexname = element.sexname;
                    Excel2.studentsign = '';
                    Excel2.acadesign = '';
                    this.exportData2.push(Excel2)
                });
                import('@/vendor/ExportExcelForMy2').then(excel => {
                this.exportData2.unshift({});
                this.exportData2.unshift({});
                this.exportData2.unshift({});
                this.exportData2.unshift({});
                this.exportData2.push({id:'说明：'});
                this.exportData2.push({id:'《安徽大学普通教育本科生学士学位授予工作实施细则》（校政〔2008〕1号）规定：'});
                this.exportData2.push({id:'“第六条  修业期间有下列情形之一者，不予授予学士学位：'});
                this.exportData2.push({account:'一、违反国家法律受到刑事处罚；        二、违反校规受到记过及以上处分；'});
                this.exportData2.push({account:'三、考试舞弊受到严重警告及以上处分；  四、修业期满，平均学分绩点低于1.5；'});
                this.exportData2.push({account:'五、毕业论文（设计、创作）成绩不及格；六、修业期间，退学警告累计达到三次及以上的；'});
                this.exportData2.push({account:'七、修业期满，仍未修满毕业最低要求学分”。'});
                const data1 = this.exportData2;
                const length = data1.length;
                // console.log(data1.length)
                excel.export_json_to_excel(
                    data1,
                    this.filename,
                    this.wopts,
                    length
                );
                this.$refs.multipleTable.clearSelection();
                this.exportData2 = [];
                this.downloadLoading = false
                })
            } else if(this.filename == '打印毕业一览表') {
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
                    // console.log(element.id)
                    Excel1.account = element.account;
                    Excel1.realName = element.realName;
                    Excel1.majorname = element.majorname;
                    Excel1.graclusionname = element.graclusionname;
                    Excel1.degreename = element.degreename;
                    Excel1.schoolformname = element.schoolformname;
                    Excel1.detailmessage = '';
                    this.exportData1.push(Excel1)
                })
                import('@/vendor/ExportExcelForMy1').then(excel => {
                this.exportData1.unshift({})
                this.exportData1.unshift({})
                const data = this.exportData1;
                excel.export_json_to_excel(
                    data,
                    this.filename,
                    this.wopts);
                this.$refs.multipleTable.clearSelection();
                this.exportData1 = [];
                this.downloadLoading = false
                })
            }
            } else {
                this.$message({
                    message: '请选择要导出的人物信息',
                    type: 'warning'
                })
            }
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
    handleSizeChange(){
        this.getForm()
    },
    handleCurrentChange(){
        this.getForm()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 全选驳回
    getMessageToClassAll(){
        this.$confirm('此操作将全部驳回给院系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
                            element.checkStatus = 3
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
            message: '已取消删除'
          });
        });
    },
    // 全部上报
    upToOfficeAll(){
        this.$confirm('此操作将全部驳回给院系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
                            element.checkStatus = 2
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
            message: '已取消删除'
          });
        });
    },

    // 解析json
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
    })
  },
  computed : {
        ...mapGetters ( [
            'aid',
            'roles'
        ] )
    },
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

