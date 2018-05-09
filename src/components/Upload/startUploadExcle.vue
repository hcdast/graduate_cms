<template>
    <div class="upload-container">
        <el-button type="primary" @click="outerVisible = true">开始初始化</el-button>
        <!-- 弹框 -->
        <el-dialog
            title="系统初始化"
            :visible.sync="outerVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" label-position="top">
                <el-form-item label="毕业生年级">
                    <el-input v-model="form.graduateYear"></el-input>
                </el-form-item>
                <el-form-item label="上传初始化数据文件">
                    <el-upload
                        class="upload-demo"
                        action="http://graduation.dobell.me/graduation/graduation/file/upload"
                        :multiple="false"
                        :data="uploadParam"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleSuccess"
                        :show-file-list="true"
                        name="file">
                        <el-button size="small" type="primary" icon='upload'>点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <el-form-item label="操作人">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 成功弹出 -->
        <el-dialog
                width="20%"
                title="扫描成功"
                :visible.sync="innerVisible1">
                <el-card class="box-card">
                    <div>
                        本次初始化数据扫描完成，未发现数据错误
                        <div>1.院系 {{this.successData.academeNum}}个</div>
                        <div>2.专业 {{this.successData.majorNum}}个</div>
                        <div>3.行政班 {{this.successData.schoolClassNum}}个</div>
                        <div>4.学生 {{this.successData.studentNum}}人</div>
                        是否确认使用本次数据进行初始化？
                    </div>
                </el-card>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="innerVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="openMessage">确 定</el-button>
                </div>
            </el-dialog>
        <!-- 失败的弹出 -->
        <el-dialog
            width="30%"
            title="扫描错误"
            :visible.sync="innerVisible2">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    本次初始化数据扫描，未发现多处数据错误，分别为：
                    <div><i class="errorHead">身份证号错误：</i><section v-for="item in IDError" :key="item.id">
                        姓名：{{item.name}}&#x3000;&#x3000;身份证号：{{item.idCardNumber}}&#x3000;&#x3000;学号：{{item.account}}
                        </section></div>
                    <div><i class="errorHead">学号错误：</i><section v-for="item in accountError" :key="item.id">
                        姓名：{{item.name}}&#x3000;&#x3000;身份证号：{{item.idCardNumber}}&#x3000;&#x3000;学号：{{item.account}}
                        </section></div>
                </div>
                <div>

                </div>
            </el-card>
            <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="innerVisible2 = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { initialize, checkForm, addOperation } from '../../newapi/initizlize'
export default {
    name:'startUploadExcle',
    data() {
        return {
          outerVisible: false,
          innerVisible1: false,
          innerVisible2: false,
          successData: '',
          form: {
              graduateYear:'',
              adminId:'',
              record:1,
              name:'',
          },
          uploadParam: {},
          accountError:[],
          IDError:[]
        }
      },
      methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        handleSuccess() {

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleSubmit() {
            this.outerVisible = false;
            return new Promise( resolve => {
                    checkForm().then( (res) => {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.innerVisible2 = true;
                                this.accountError = res.data.data[1];
                                this.IDError = res.data.data[0]
                                // console.log(this.accountError)
                                // console.log(this.IDError)
                            }else{
                                this.innerVisible1 = true;
                                this.$message({
                                   message:res.data.message,
                                   type:'success'
                                })
                                this.successData = res.data.data;
                            }
                        }
                    })
                    resolve()
            })

        },
        openMessage(){
            this.innerVisible1 = false;
            return new Promise((resolve) => {
                initialize().then((res) => {
                    if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                               this.$message({
                                   message:res.data.message,
                                   type:'success'
                               });
                               this.$store.commit ( 'SET_INIT', 1 );
                               this.form.adminId = this.aid;
                               addOperation(this.form).then(res => {
                                   if(res.status!= 200){
                                        this.$message.error('请求失败，网络原因请重试！');
                                    }else {
                                        if(!res.data||res.data.code !=0){
                                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                                        }else{
                                            // console.log(res)
                                            // console.log('添加操作记录成功')
                                            location.reload();
                                        }}
                               })
                            }
                        }
                }).catch(err => {
                    this.$notify.error({
                        title: '错误',
                        message: '表格数据中出现逻辑错误,初始化失败请检查！！'
                    });
                })
            })
        }
      },
      created(){
          this.form.name = this.realName
      },
      computed : {
            ...mapGetters ( [
                'aid',
                'realName',
                'init'
            ] )
        },
    }
</script>
<style scoped>
    .errorHead{
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
    }
</style>

