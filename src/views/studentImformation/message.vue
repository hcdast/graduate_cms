<template>
  <div class="app-container calendar-list-container">
    <div class="tab-container">
        <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
            <el-tab-pane v-model="labels" :label="labels.officeLa" name="first">
                <keep-alive>
                <tabPane1></tabPane1>
                </keep-alive>
            </el-tab-pane>
            <el-tab-pane v-model="labels" :label="labels.academyLa" name="second">
                <keep-alive>
                <tabPane2></tabPane2>
                </keep-alive>
            </el-tab-pane>
            <el-tab-pane v-model="labels" :label="labels.classLa" name="third">
                <keep-alive>
                <tabPane3></tabPane3>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getStudentListParam, getStudentListClass} from '../../newapi/studentMessage'
import tabPane1 from './components/tabPane1'
import tabPane2 from './components/tabPane2'
import tabPane3 from './components/tabPane3'
import { getAcademys, getMajors, getClasses } from '../../filters/contentfilters'

export default {
  name: 'tab',
  components: { tabPane1, tabPane2, tabPane3 },
  data() {
    return {
      total:null,
      searchList:{
        page: '1',
        size: '10',
        academeId:'',
        majorId:'',
        classId:'',
        checkStatus:''
      },
      activeName: '',
      academys:[],
      majors:[],
      classes:[],
      labels:{
          officeLa:'',
          academyLa:'',
          classLa:'',
      },
      officeNum:'',
      academyNum:'',
      classNum:'',
      officeForm:{
          checkStatus: 2,
          academeId:'',
          classId: ''
      },
      academyForm:{
          checkStatus: 1,
          academeId:'',
          classId: ''
      },
      classForm:{
          checkStatus: 3,
          academeId:'',
          classId: ''
      },
      classsform1: {
          adminId: '',
          checkStatus: 2,
      },
      classsform2: {
          adminId: '',
          checkStatus: 1,
      },
      classsform3: {
          adminId: '',
          checkStatus: 3,
      },
      premisson:null,
    }
    },
    methods: {

        //  获取已上报教务的数量
        getStudentForOffice(){
            this.premisson = this.roles[0];
            if(this.premisson == 3) {
                this.classsform1.adminId = this.aid;
                return new Promise(resolve => {
                    getStudentListClass(this.classsform1).then( (res) => {
                        if(res.status!=200) {
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                                if(!res.data||res.data.code !=0){
                                    this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                }else{
                                    this.officeNum = res.data.message;
                                    this.labels.officeLa = `已上报教务(${this.officeNum}）`;
                                }
                            }
                    })
                })
            } else{
                this.officeForm.academeId = this.academeIdOfStore;
                this.officeForm.classId = this.classIdOfStore;
                return new Promise( resolve => {
                    getStudentListParam(this.officeForm).then( (res) => {
                        if(res.status!=200) {
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                                if(!res.data||res.data.code !=0){
                                    this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                }else{
                                    this.officeNum = res.data.message;
                                    this.labels.officeLa = `已上报教务(${this.officeNum}）`;
                                }
                            }
                    })
                    resolve()
                })
            }
        },
        //  获取待院系处理的数量
        getStudentForAcademy(){
            this.premisson = this.roles[0];
            if(this.premisson == 3) {
                this.classsform2.adminId = this.aid;
                return new Promise(resolve => {
                    getStudentListClass(this.classsform2).then( (res) => {
                        if(res.status!=200) {
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                                if(!res.data||res.data.code !=0){
                                    this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                }else{
                                    this.academyNum = res.data.message;
                                    this.labels.academyLa = `待院系处理(${this.academyNum}）`;
                                }
                            }
                    })
                })
            } else {
                this.academyForm.academeId = this.academeIdOfStore;
                this.officeForm.classId = this.classIdOfStore;
                return new Promise( resolve => {
                    getStudentListParam(this.academyForm).then( (res) => {
                        if(res.status!=200) {
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                                if(!res.data||res.data.code !=0){
                                    this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                }else{
                                    this.academyNum = res.data.message;
                                    this.labels.academyLa = `待院系处理(${this.academyNum}）`;
                                }
                            }
                    })
                    resolve()
                })
                }
        },
        //  获取待班级处理的数量
        getStudentForClass(){
            this.premisson = this.roles[0];
            if(this.premisson == 3) {
                this.classsform3.adminId = this.aid;
                return new Promise(resolve => {
                    getStudentListClass(this.classsform3).then( (res) => {
                        if(res.status!=200) {
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                                if(!res.data||res.data.code !=0){
                                    this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                }else{
                                    this.classNum = res.data.message;
                                    this.labels.classLa = `待班级处理(${this.classNum}）`;
                                }
                            }
                    })
                })
            } else {
                this.classForm.academeId = this.academeIdOfStore;
                this.officeForm.classId = this.classIdOfStore;
                return new Promise( resolve => {
                    getStudentListParam(this.classForm).then( (res) => {
                        if(res.status!=200) {
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                                if(!res.data||res.data.code !=0){
                                    this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                }else{
                                    this.classNum = res.data.message;
                                    this.labels.classLa = `待班级处理(${this.classNum}）`;
                                }
                            }
                    })
                    resolve()
            })
            }
        },
    },
    created() {
        this.getStudentForClass();
        this.getStudentForAcademy();
        this.getStudentForOffice();
        // console.log(this.roles[0])
        if(this.roles[0] == 1) {
            this.activeName = 'first'
        } else if( this.roles[0] == 2 ) {
            this.activeName = 'second'
        } else if( this.roles[0] == 3 ) {
            this.activeName = 'third'
        }
    },
    computed : {
        ...mapGetters ( [
            'aid',
            'roles',
            'academeIdOfStore',
            'classIdOfStore'
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
      text-align: right;
      margin-bottom: 10px;
  }
  .filter-item{
      vertical-align: top;
  }
  .filter-container{
      margin-left: 30px;
  }
</style>
