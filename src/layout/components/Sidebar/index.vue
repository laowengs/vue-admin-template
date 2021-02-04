<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { getMenuInfo } from '@/api/menu'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // routes: {
    //   get() {
    //     return this.getMenuInfoList()
    //   },
    //   set() {
    //     return this.getMenuInfoList()
    //   }
    // },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.getMenuInfoList()
  },
  data() {
    return {
      routes: null
    }
  },
  methods: {
    getMenuInfoList() {
      const menuRoutes = []
      this.loading = true
      getMenuInfo().then(response => {
        const menuList = response.data
        const routeConfigs = this.$router.options.routes
        dealMenu(menuRoutes, menuList, routeConfigs)
        // console.log(menuRoutes)
        this.loading = false
        this.routes = menuRoutes
      })
    }
  }
}
function dealMenu(menuRoutes, menuList, routeConfigs) {
  menuList.forEach(menu => {
    const mss = routeConfigs.filter(item => {
      return menu.menuId === item.meta.menuId
    })
    // 父级菜单
    if (mss && mss.length > 0) {
      // console.log('处理菜单', mss[0].meta.menuId, mss)
      const childrenMenuRoutes = []
      // 子级菜单
      const routerChildren = mss[0].children
      if (routerChildren && routerChildren.length > 0) {
        const childrenMenuList = menu.childrenMenuList
        if (childrenMenuList && childrenMenuList.length > 0) {
          dealMenu(childrenMenuRoutes, childrenMenuList, routerChildren)
          // console.log('子菜单', childrenMenuRoutes)
        }
      }
      mss[0].children = childrenMenuRoutes
      menuRoutes.push(mss[0])
    }
  })
}
</script>
