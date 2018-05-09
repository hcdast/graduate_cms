<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse" :default-openeds="opens"  background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
    data(){
      return {
          opens: []
      }
    },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style>
</style>
