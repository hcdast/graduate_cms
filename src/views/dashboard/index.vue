<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin/index'
import editorDashboard from './editor/index'
//import
export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.indexOf(1) >= 0 || this.roles.indexOf(2) >= 0) {
      return
    }
    this.currentRole = 'editorDashboard'
  }
}
</script>
