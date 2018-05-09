<template>
    <div class="upload-container">
        <el-button icon='upload' :style="{background:color,borderColor:color}" @click=" dialogVisible=true"
                   type="primary">外链视频
        </el-button>
        <el-dialog v-model="dialogVisible">
            <el-input v-model="sourceUrl" style="margin: 32px 0">
                <template slot="prepend">外链视频地址</template>
            </el-input>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </el-dialog>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name : 'extraLink',
        props : {
            color : {
                type : String,
                default : '#20a0ff'
            }
        },
        computed: {
            ...mapGetters([
                'aid'
            ])
        },
        data() {
            return {
                dialogVisible : false,
                sourceUrl: '',
            }
        },
        methods : {
            handleSubmit(){
                this.$emit ( 'successCBK', this.sourceUrl )
            }
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .upload-container {
        .editor-slide-upload {
            margin-bottom: 20px;
        }
    }
</style>
