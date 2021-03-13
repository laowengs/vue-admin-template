import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { menuId: -1 }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: { menuId: -1 }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }],
    meta: { title: '首页', icon: 'dashboard', menuId: 9 }
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/user',
    name: '用户',
    meta: { title: '用户', icon: 'el-icon-user', menuId: 2 },
    children: [
      {
        path: 'table',
        name: '用户管理',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'table', menuId: 3 }
      },
      {
        path: 'tree',
        name: '权限管理',
        component: () => import('@/views/user/menuTree'),
        meta: { title: '权限管理', icon: 'el-icon-menu', menuId: 4 }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/user/userRole'),
        meta: { title: '角色管理', icon: 'table', menuId: 23 }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name: 'ElstaticSearch',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'insert', icon: 'form', menuId: 6 }
      }
    ],
    meta: { title: 'ElstaticSearch', icon: 'form', menuId: 5 }
  },

  {
    path: '/cicd',
    component: Layout,
    redirect: '/cicd/menu1',
    name: 'CI/CD',
    meta: {
      title: 'CI/CD',
      icon: 'nested',
      menuId: 7
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', menuId: 8 },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1', menuId: 10 }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2', menuId: 11 },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1', menuId: 12 }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2', menuId: 13 }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3', menuId: 14 }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2', menuId: 15 }
      }
    ]
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.yuque.com/laowengs/learn',
        meta: { title: '个人博客', menuId: 19 }
      }
    ],
    meta: { title: '外链', icon: 'link', menuId: 16 }
  },
  {
    path: '/docker',
    component: Layout,
    redirect: '/docker/terminal',
    name: '容器管理',
    children: [{
      path: 'terminal',
      name: 'Terminal',
      component: () => import('@/views/docker/terminal/index'),
      meta: { title: 'Terminal', icon: 'el-icon-monitor', menuId: 18 }
    }, {
      path: 'images',
      name: 'Images',
      component: () => import('@/views/docker/image/index'),
      meta: { title: 'Images', icon: 'el-icon-monitor', menuId: 30 }
    }, {
      path: 'containers',
      name: 'Containers',
      component: () => import('@/views/docker/container/index'),
      meta: { title: 'Containers', icon: 'el-icon-monitor', menuId: 31 }
    }],
    meta: { title: '容器管理', icon: 'el-icon-dessert', menuId: 17 }
  },

  {
    path: '/dispatch',
    component: Layout,
    redirect: '/dispatch/dispatch',
    name: '调度管理',
    meta: { title: '调度管理', icon: 'el-icon-position', menuId: 21 },
    children: [
      {
        path: 'node',
        name: '节点列表',
        component: () => import('@/views/dispatch/index'),
        meta: { title: '节点列表', icon: 'el-icon-s-platform', menuId: 22 }
      },
      {
        path: 'schedule',
        name: '定时任务',
        component: () => import('@/views/dispatch/index'),
        meta: { title: '定时任务', icon: 'el-icon-timer', menuId: 29 }
      }
    ]
  },
  {
    path: '/microservice',
    component: Layout,
    redirect: '/microservice/microservice',
    name: '微服务',
    meta: { title: '微服务', icon: 'el-icon-cloudy', menuId: 24 },
    children: [
      {
        path: 'register',
        name: '注册中心',
        component: () => import('@/views/dispatch/index'),
        meta: { title: '注册中心', icon: 'el-icon-files', menuId: 25 }
      },
      {
        path: 'router',
        name: '服务路由',
        component: () => import('@/views/dispatch/index'),
        meta: { title: '服务路由', icon: 'el-icon-rank', menuId: 26 }
      },
      {
        path: 'config',
        name: '配置中心',
        component: () => import('@/views/dispatch/index'),
        meta: { title: '配置中心', icon: 'el-icon-document', menuId: 27 }
      },
      {
        path: 'level',
        name: '服务降级',
        component: () => import('@/views/dispatch/index'),
        meta: { title: '服务降级', icon: 'el-icon-s-flag', menuId: 28 }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*',
    redirect: '/404',
    hidden: true,
    meta: { menuId: '-1' }
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
