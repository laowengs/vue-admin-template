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
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }],
    meta: { title: 'Dashboard', icon: 'dashboard', menuId: 9 }
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/user',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-s-help', menuId: 2 },
    children: [
      {
        path: 'table',
        name: '用户列表',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'table', menuId: 3 }
      },
      {
        path: 'tree',
        name: '权限控制',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限控制', icon: 'tree', menuId: 4 }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name: 'Form',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'insert', icon: 'form', menuId: 6 }
      }
    ],
    meta: { title: 'Form', icon: 'form', menuId: 5 }
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
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
        path: 'https://www.baidu.com/',
        meta: { title: 'baidu', menuId: 19 }
      }
    ],
    meta: { title: 'External Link', icon: 'link', menuId: 16 }
  },
  {
    path: '/docker',
    component: Layout,
    redirect: '/docker/terminal',
    name: 'Docker',
    children: [{
      path: 'terminal',
      name: 'Terminal',
      component: () => import('@/views/docker/terminal/index'),
      meta: { title: 'Terminal', icon: 'dashboard', menuId: 18 }
    }],
    meta: { title: 'Docker', icon: 'dashboard', menuId: 17 }
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
