<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <!-- 三级联动 -->
            <span v-if="this.storeList.academeId == 0 || !this.storeList.academeId">
                <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
                    <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
                    </el-option>
                </el-select>

                <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.majorId" placeholder="全部专业">
                    <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val">
                    </el-option>
                </el-select>

                <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.classId" placeholder="全部班级">
                    <el-option v-for="item in classes" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.majorId == item.majid">
                    </el-option>
                </el-select>
            </span>
            <span v-else>
                <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.majorId" placeholder="全部专业">
                    <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val">
                    </el-option>
                </el-select>

                <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.classId" placeholder="全部班级">
                    <el-option v-for="item in classes" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.majorId == item.majid">
                    </el-option>
                </el-select>
            </span>


            <el-input @keyup.enter.native="getClassAdmins" style="width: 200px;" class="filter-item" placeholder="搜索管理员名称" v-model="searchList.classAdminName">
            </el-input>

            <el-button class="filter-item" type="primary"  icon="search" @click="getClassAdmins">搜索</el-button>

            <el-button  class="filter-item" type="primary"  icon="plus" @click="handleCreate()">新增班级管理员</el-button>
        </div>

        <el-dialog title="新增班级管理员" v-model="addFormVisible" width="20%" size="tiny">
            <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px" label-position="top">
                <el-form-item label="管理员工号" label-width="100px" prop="account">
                    <el-input v-model="addForm.account"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="100px" prop="realName">
                    <el-input v-model="addForm.realName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" label-width="100px" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="100px" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <span v-if="this.storeList.academeId == 0 || !this.storeList.academeId">
                <el-form-item label="所属学院" label-width="100px" prop="academeId">
                    <el-select v-model="addForm.academeId" placeholder="请选择">
                        <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属专业" label-width="100px" prop="majorId">
                    <el-select v-model="addForm.majorId" placeholder="请选择">
                        <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val" v-if="addForm.academeId == item.acaid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属班级" label-width="100px" prop="classId">
                    <el-select v-model="addForm.classId" placeholder="请选择">
                        <el-option v-for="item in classes" :key="item.key" :label="item.key" :value="item.val" v-if="addForm.majorId == item.majid" ></el-option>
                    </el-select>
                </el-form-item>
                </span>
                <span v-else>
                <el-form-item label="所属专业" label-width="100px" prop="majorId">
                    <el-select v-model="addForm.majorId" placeholder="请选择">
                        <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属班级" label-width="100px" prop="classId">
                    <el-select v-model="addForm.classId" placeholder="请选择">
                        <el-option v-for="item in classes" :key="item.key" :label="item.key" :value="item.val" v-if="addForm.majorId == item.majid" ></el-option>
                    </el-select>
                </el-form-item>
                </span>
                <el-form-item label="操作人" label-width="100px">
                    <el-input v-model="addForm.createdMen" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('addForm')">确认新增</el-button>
            </div>

        </el-dialog>

        <el-table  :data="pagingData" element-loading-text="正在努力加载中......" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="70px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="登录账号" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.account}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="姓名" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.realName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号" width="130">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="最近登录时间" min-width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtModified | timeFilter}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="类型" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.authority | authorityFilter}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="学院" min-width="150">
                <template slot-scope="scope">
                    <span>{{academyFilter(scope.row.academeId)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="专业" min-width="150">
                <template slot-scope="scope">
                    <span>{{majorFilter(scope.row.majorId)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="行政班" width="150">
                <template slot-scope="scope">
                    <span>{{classesFilter(scope.row.classId)}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="90">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isDeleted | statusTypeFilter">{{scope.row.isDeleted | statusFilter}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isDeleted == 1 " size="small" type="success" @click="handleDeblocking(scope.$index,scope.row)">启用
                    </el-button>
                    <el-button v-if="scope.row.isDeleted == 0 " size="small" type="danger" @click="handleBlocking(scope.$index, scope.row)">停用
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchList.page"
                            :page-size="this.pagesize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 前往初始化弹框 -->
        <el-dialog
            title="初始化通知"
            :visible.sync="initializeVisible"
            size="tiny"
            :show-close="false"
            :close-on-click-modal="false">
            <span>院系及班级信息尚未初始化，无法进行管理</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleInitialize">前往初始化信息</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getClassAdmin,createdClassAdmin, updateClassAdmin } from '../../newapi/community'
    import { timestamp2normal } from '../../utils/index'
    import { getAcademys, getMajors, getClasses } from '../../filters/contentfilters'
    import { isvalidPhone } from '../../utils/validate'

    //定义一个全局的变量，谁用谁知道
    var validPhone =(rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入电话号码'))
        }else  if (!isvalidPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
        }else {
            callback()
        }
    }

    export default {
       name:'class',
        data() {
            return {
                listLoading : true,
                total : null,
                blockFormVisible : false,
                addFormVisible : false,
                deblockVisible: false,
                initializeVisible:false,
                classs:[],
                addForm : {
                    aid : '',
                    account : '',
                    passwd : '',
                    realName : '',
                    phone : '',
                    academeId:'',
                    majorId:'',
                    classId:'',
                    authority: 3,
                    createdMen:'',
                },
                rules:{
                    account: [
                        {required: true, message: '请输入管理员公号', trigger: 'blur'},
                        { min: 1, message: '长度至少1个字符', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 1, message: '长度至少1个字符', trigger: 'blur'}
                    ],
                    realName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        { min:2, max:6, message: '长度在2到6个字符之间', trigger: 'blur'}
                    ],
                    academeId: [
                        {required: true, message: '请选择所属学院'},
                    ],
                    majorId: [
                        {required: true, message: '请选择所属专业'},
                    ],
                    classId: [
                        {required: true, message: '请选择所属班级'},
                    ],
                    phone: [
                        {required: true, message: '请输入正确格式的11位手机号', validator: validPhone},//这里需要用到全局变量
                    ],
                },
                searchList : {
                    aid : null,
                    id: null,
                    realName: '',
                    phone: '',
                    size : 10000,
                    page : 1,
                    academeId:'',
                    majorId:'',
                    classId:'',
                    classAdminName:''
                },
                blockIndex: null,
                academys:[],
                majors:[],
                classes:[],
                deblockForm: {
                    aid:'',
                    classId:'',
                    isDeleted:''
                },
                storeList: {
                    academeId:''
                },
                pagingData:[],
                pagesize: 10,
            }
        },
        filters : {
            statusTypeFilter( status ) {
                const statusMap = {
                    0 : 'success',
                    1 : 'danger'
                }
                return statusMap[ status ]
            },
            statusFilter( status ) {
                const statusMap = {
                    1 : '已停用',
                    0 : '正常'
                }
                return statusMap[ status ]
            },
            timeFilter(timestamp){
                return timestamp2normal(timestamp)
            },
            authorityFilter(status){
                return status == 1 ? '教务管理员' : status == 2 ? '学院管理员' : status == 3 ? '班级管理员' : '未知'
            },
        },
        methods : {
            handleCreate(){
                this.initform ();// //每次都初始化
                this.addFormVisible = true;
                this.addForm.createdMen = this.realName;
            },
            initform(){
                this.addForm = {
                    account:'',
                    password : '',
                    realName : '',
                    academeId:'',
                    majorId:'',
                    classId:'',
                    phone : '',
                    createdMen:'',
                    authority: '3',
                }
            },
            handleSubmit(formName){
                if(this.academeIdOfStore == 0){
                    console.log('教务管理员')
                } else{
                    this.addForm.academeId = this.academeIdOfStore;
                }
                console.log(this.addForm.academeId)
                console.log(this.addForm)
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        // this.addFormVisible = false;
                        return new Promise( resolve => {
                            createdClassAdmin(this.addForm).then( (res) => {
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
                                        this.getClassAdmins();
                                    }
                                }
                            })
                            resolve()
                        })
                    } else {
                        this.$notify ( {
                                    title : '失败',
                                    message : `表单验证失败请检查`,
                                    type : 'error'
                                } );
                    }
                })

            },
            handleInitialize(){
                this.initializeVisible = false;
                this.$router.push('/initialize/initialize');
            },

            getClassAdmins(){
                if(this.academeIdOfStore == 0) {
                    // console.log(213)
                }else {
                    this.searchList.academeId = this.academeIdOfStore;
                }
                this.searchList.aid = this.aid;
                if(this.init === 1){
                    this.initializeVisible = false;
                    getClassAdmin(this.searchList).then((res) => {
                        // console.log(res)
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                this.classs = res.data.data;
                                if(this.searchList.page==1){
                                    this.total = parseInt(res.data.message);
                                }
                                this.sptypehand();
                                this.listLoading = false;
                            }
                        }
                    })
                }else {
                    this.initializeVisible = true;
                }
            },
            handleSizeChange(){
                this.getClassAdmins ();
            },
            handleCurrentChange(){
                this.getClassAdmins ();
            },
            handleBlocking( index, row ){
                this.deblockForm.aid = row.id;
                this.deblockForm.classId = row.classId;
                this.deblockForm.isDeleted = 1;
                console.log(this.deblockForm)
                return new Promise( resolve => {
                    updateClassAdmin(this.deblockForm).then( (res) => {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                               this.$message({
                                   message:res.data.message,
                                   type:'success'
                               })
                               this.getClassAdmins()
                            }
                        }
                    })
                    resolve()
                })
            },
            handleDeblocking(index,row ){
                this.deblockForm.aid = row.id;
                this.deblockForm.classId = row.classId;
                this.deblockForm.isDeleted = 0;
                return new Promise( resolve => {
                    updateClassAdmin(this.deblockForm).then( (res) => {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                               this.$message({
                                   message:res.data.message,
                                   type:'success'
                               })
                               this.getClassAdmins()
                            }
                        }
                    })
                    resolve()
                })

            },

            // 手动分页
            sptypehand(){
               var offset = (this.searchList.page - 1)*this.pagesize;
               this.pagingData = (offset + this.pagesize) >= this.classs.length ? this.classs.slice(offset, this.classs.length) : this.classs.slice(offset, offset + this.pagesize)
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
            }
        },
        created() {
            this.storeList.academeId = this.academeIdOfStore;
            if(this.storeList.academeId == 0 || !this.storeList.academeId){
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
                    this.getClassAdmins();
                })
            }else {
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
                setMajors().then(majors => {
                    majors.forEach(element => {
                        if(element.acaid == this.academeIdOfStore){
                            this.majors.push(element)
                        }
                    });
                    return setClasses();
                }).then(classes => {
                    this.classes = classes;
                    this.getClassAdmins();
                })
                setAcademys().then(academys => {
                    this.academys = academys;
                })
            }
        },
        computed : {
            ...mapGetters ( [
                'aid',
                'init',
                'realName',
                'academeIdOfStore'
            ] )
        },
    }

</script>
<style scoped>

</style>

