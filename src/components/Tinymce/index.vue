<template>
    <div class='tinymce-container editor-container'>
        <textarea class='tinymce-textarea' :id="tinymceId"></textarea>
        <div class="editor-custom-btn-container">
            <editorVedio color="#20a0ff" class="vedio-upload-btn" @successCBK="videoSuccessCBK"></editorVedio>
            <extraLink color="#20a0ff" class="extra-link-btn" @successCBK="extraLinkCBK"></extraLink>
            <editorImage color="#20a0ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
        </div>
    </div>
</template>

<script>
    import editorImage from './components/editorImage'
    import editorVedio from './components/editorVedio'
    import extraLink from './components/extraLink'
    export default {
        name : 'tinymce',
        components : { editorImage ,editorVedio,extraLink},
        props : {
            id : {
                type : String
            },
            value : {
                type : String,
                default : ''
            },
            toolbar : {
                type : Array,
                required : false,
                default() {
                    return [ 'removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright' ]
                }
            },
            menubar : {
                default : ''
            },
            height : {
                type : Number,
                required : false,
                default : 360
            }
        },
        data() {
            return {
                hasChange : false,
                hasInit : false,
                tinymceId : this.id || 'vue-tinymce-' + + new Date ()
            }
        },
        watch : {
            value( val ) {
                if (! this.hasChange && this.hasInit) {
                    this.$nextTick ( () => window.tinymce.get ( this.tinymceId ).setContent ( val ) )
                }
            }
        },
        mounted() {
            const _this = this
            window.tinymce.init ( {
                language:'zh_CN',
                selector : `#${this.tinymceId}`,
                height : this.height,
                body_class : 'panel-body ',
                object_resizing : false,
                toolbar : this.toolbar,
                menubar : this.menubar,
                plugins : 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools',
                end_container_on_empty_block : true,
                powerpaste_word_import : 'clean',
                code_dialog_height : 450,
                code_dialog_width : 1000,
                advlist_bullet_styles : 'square',
                advlist_number_styles : 'default',
                block_formats : '普通标签=p;小标题=h2;',
                imagetools_cors_hosts : [ 'wpimg.wallstcn.com', 'wallstreetcn.com' ],
                imagetools_toolbar : 'watermark',
                default_link_target : '_blank',
                link_title : false,
                init_instance_callback : editor => {
                    if (_this.value) {
                        editor.setContent ( _this.value )
                    }
                    _this.hasInit = true
                    editor.on ( 'NodeChange Change KeyUp', () => {
                        this.hasChange = true
                        this.$emit ( 'input', editor.getContent ( { format : 'raw' } ) )
                    } )
                },

                setup( editor ) {
                    editor.addButton ( 'h2', {
                        title : '小标题', // tooltip text seen on mouseover
                        text : '小标题',
                        onclick() {
                            editor.execCommand ( 'mceToggleFormat', false, 'h2' )
                        },
                        onPostRender() {
                            const btn = this
                            editor.on ( 'init', () => {
                                editor.formatter.formatChanged ( 'h2', state => {
                                    btn.active ( state )
                                } )
                            } )
                        }
                    } )
                    editor.addButton ( 'p', {
                        title : '正文',
                        text : '正文',
                        onclick() {
                            editor.execCommand ( 'mceToggleFormat', false, 'p' )
                        },
                        onPostRender() {
                            const btn = this
                            editor.on ( 'init', () => {
                                editor.formatter.formatChanged ( 'p', state => {
                                    btn.active ( state )
                                } )
                            } )
                        }
                    } )
                }
            } )
        },
        methods : {
            setContent( value ) {
                window.tinymce.get ( this.tinymceId ).setContent ( value )
            },
            getContent() {
                window.tinymce.get ( this.tinymceId ).getContent ()
            },
            extraLinkCBK(url){
                const _this = this
                window.tinymce.get ( _this.tinymceId ).insertContent ( `<p>&nbsp;</p><div style="max-width: 650px;" data-ephox-embed-iri="${url}"><video style="width: 100%;" controls="controls"><source src="${url}" type="video/mp4">你的浏览器暂不支持此视频</video></div><p>&nbsp;</p>` )
            },
            imageSuccessCBK( arr ) {
                const _this = this
                arr.forEach ( v => {
                    window.tinymce.get ( _this.tinymceId ).insertContent ( `<img class="wscnph" src="${v.url}" >` )
                } )
            },
            videoSuccessCBK(arr){
                const _this = this
                arr.forEach ( v => {
                    window.tinymce.get ( _this.tinymceId ).insertContent ( `<p>&nbsp;</p><div style="max-width: 650px;" data-ephox-embed-iri="${v.url}"><video style="width: 100%;" controls="controls"><source src="${v.url}" type="video/mp4">你的浏览器暂不支持此视频</video></div><p>&nbsp;</p>` )
//                    window.tinymce.get ( _this.tinymceId ).insertContent ( `<vedio class="wscnph" src="${v.url}" >` )
                } )
            }
        },
        destroyed() {
            window.tinymce.get ( this.tinymceId ).destroy ()
        }
    }
</script>

<style scoped>
    .tinymce-container {
        position: relative
    }

    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }

    .editor-custom-btn-container {
        position: absolute;
        right: 15px;
        /*z-index: 2005;*/
        top: 18px;
    }
    .extra-link-btn {
        display: inline-block;
    }
    .vedio-upload-btn {
        display: inline-block;
    }
    .editor-upload-btn {
        display: inline-block;
    }
</style>
