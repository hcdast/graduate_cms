<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-card class="box-card tip">
            <div class="tip-message">当前系统状态</div>
            <el-row style="position:relative;height:50px;line-height:50px;">
            <el-tag class="tip-tag" type="info" v-if="this.init === 0">未初始化</el-tag>
            <el-tag class="tip-tag" type="success" v-else>初始化已完成({{this.addOperationForm.graduateYear}})</el-tag>
            <a href="http://api.dobell.me/files/系统信息初始化表.xls"><el-button type="primary" class="tip-button">下载初始化信息表格模板</el-button></a>
            </el-row>
            <el-row style="margin-top:15px;">
                <InitUpload style="display:inline-block;" v-if="this.init === 0"></InitUpload>
                <!-- <span>/</span> -->
                <el-button type="primary" @click="dialogVisible = true" v-if="this.init === 1">格式化系统</el-button>
            </el-row>
            <el-row style="margin-top:10px;font-size:14px;">
                <i class="el-icon-warning"></i>
                <span>请下载右上角初始化信息表格模板，按照格式填写相关数据，完成系统初始化。</span>
            </el-row>
            <el-dialog
                title="确认格式化系统"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>当前系统内部数据全部将会被清空,请谨慎操作</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="comfirmDelete">确 定</el-button>
                </span>
            </el-dialog>
            </el-card>
        </div>
        <!-- 操作历史记录 -->
        <el-row style="margin-top:30px;">
            <el-card class="box-card">
            <div class="tip-message">操作历史</div>
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                >
                <el-table-column align="center" label="序号" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
                </el-table-column>
                <el-table-column align="center" label="记录ID" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
                </el-table-column>
                <el-table-column align="center" label="毕业年届" width="180px">
                    <template slot-scope="scope">
                        <span>{{scope.row.graduateYear}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态" min-width="180px">
                    <template slot-scope="scope">
                        <span>{{scope.row.record | recordFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作时间" min-width="180px">
                    <template slot-scope="scope">
                        <span>{{scope.row.gmtCreate | timeFilter}}</span>
                    </template>
                </el-table-column>
                </el-table>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InitUpload from '@/components/Upload/startUploadExcle'
import { timestamp2normal } from '../../utils/index'
import { getOperationList, deleteAllMessage,addOperation } from '../../newapi/initizlize'
import { STATUS_CODES } from 'http';

export default {
    name:'initalize',
    components: { InitUpload },
    data() {
        return {
        dialogVisible: false,
        searchList:{
            page:1,
            size:100,
        },
        tableData: [],
        addOperationForm:{
            graduateYear:'',
            adminId:'',
            record:0,
        }
        }
      },
      filters: {
        recordFilter(status){
            return status == 0 ? '格式化系统' : status == 1 ? '初始化系统' : '未知错误'
        },
        timeFilter(timestamp){
            return timestamp2normal(timestamp)
        },
      },
      methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 获取操作记录
        getOperationLists(){
            return new Promise(resolve => {
                getOperationList(this.searchList).then((res) => {
                    if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                    }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            this.tableData = res.data.data;
                            // console.log(this.tableData)
                            // console.log(this.tableData[this.tableData.length - 1].graduateYear)
                            // 获取一个当前初始化的年
                            this.addOperationForm.graduateYear = this.tableData[this.tableData.length - 1].graduateYear
                        }
                    }
                })
                resolve();
            })
        },
        // 格式化
        comfirmDelete(){
            this.dialogVisible = false;
            return new Promise( resolve => {
                deleteAllMessage().then( (res) => {
                    if(res.status!= 200){
                        this.$message.error('请求失败，网络原因请重试！');
                    }else {
                        if(!res.data||res.data.code !=0){
                            this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                        }else{
                            this.$message({
                                message:'系统格式化成功！',
                                type:'success'
                            })
                            this.$store.commit ( 'SET_INIT', 0 );
                            this.addOperationForm.adminId = this.aid;
                            addOperation(this.addOperationForm).then(res => {
                                if(res.status = 200){
                                        // console.log('操作记录添加成功')
                                        this.getOperationLists()
                                }else{
                                        // console.log('操作记录添加失败')
                                }
                            })
                        }
                    }
                })
                resolve()
            })
        },
        },
        created() {
            this.getOperationLists();
            // console.log(this.aid)
            // console.log(localStorage.graduateYear)
        },
        computed : {
            ...mapGetters ( [
                'aid',
                'init'
            ] )
        },
    }
</script>

<style scoped>
.text {
    font-size: 14px;
  }

.item {
padding: 18px 0;
}

.filter-container{
    height: 200px;
}
.tip {
    height: 200px;
}
.tip-message{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.tip-tag{
    height: 32px !important;
    line-height: 32px !important;
    padding: 0 30px !important;
}

.tip-button{
    position: absolute;
    right: 10px;
    /* top: 6px; */
}
</style>

