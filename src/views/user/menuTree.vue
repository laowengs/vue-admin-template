<template>
  <div class="app-container">
    <el-row :gutter="40">
      <el-col :span="8">
        <el-input v-model="filterText" placeholder="输入菜单名称" style="margin-bottom:30px;"/>
        <el-tree
          ref="tree2"
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedIdList"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          default-expand-all
          :expand-on-click-node="false"
          @check="checkChange"
        >
<!--          扩展tree-->
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
               <el-button
                 type="text"
                 size="mini"
                 @click="() => appendSameLevel(node, data)"
               >
                +同级
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)"
              >
                +子级
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                -删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="15">
        <h3>操作</h3>
        <el-row :gutter="20">
          <el-button type="primary" @click="commit">提交修改</el-button>
          <el-button type="warning" plain @click="reset">还原权限</el-button>
        </el-row>
        <h3>新增权限</h3>
        <el-row :gutter="20">
          <el-tag
            v-for="menu in addMenuList"
            :key="menu.menuId"
            closable
          >
            {{ menu.menuName }}
          </el-tag>
        </el-row>
        <h3>删除权限</h3>
        <el-row :gutter="20">
          <el-tag
            v-for="menu in removeMenuList"
            :key="menu.menuId"
            type="danger"
            closable
          >
            {{ menu.menuName }}
          </el-tag>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllMenuInfo } from '@/api/menu'

export default {
  data() {
    return {
      filterText: '',
      checkedIdList: [],
      firstCheckedIdList: [],
      initCheckedIdList: [],
      menuList: [],
      // 新增的菜单信息
      addMenuList: [],
      // 删除的菜单信息
      removeMenuList: [],
      menuInfoList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
    this.getAllMenuInfo()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getAllMenuInfo() {
      const allMenuInfoTree = []
      const checkId = []
      const menuInfoList = []
      getAllMenuInfo().then(response => {
        const allMenuInfo = response.data
        allMenuInfo.forEach(menuInfo => {
          allMenuInfoTree.push({
            id: menuInfo.menuId,
            label: menuInfo.menuName,
            children: this.dealMenu(menuInfo, checkId, menuInfoList)
          })
          if (menuInfo.isAuth === 1) {
            this.firstCheckedIdList.push(menuInfo.menuId)
          }
          // menuInfo.isAuth
          // menuInfo.childrenMenuList
        })
        this.menuList = allMenuInfoTree
        this.checkedIdList = checkId
        this.initCheckedIdList = checkId
        this.menuInfoList = menuInfoList
        console.log(menuInfoList)
      })
    },
    checkChange(node, data) {
      // const menuId = data.checkedKeys.filter(id => {
      //   return id === node.id
      // })
      // console.log(menuId)
      // if (menuId && menuId.length > 0) {
      //
      // } else {
      //
      // }
      const addMenu = []
      const mvMenu = []
      const result = this.checkMenuId()
      result.addMenuId.forEach(id => {
        const menuName = this.menuInfoList.filter(menu => {
          return menu.menuId === id
        })
        addMenu.push({
          menuId: id,
          menuName: menuName[0].menuName
        })
      })
      this.addMenuList = addMenu
      result.deleteMenuId.forEach(id => {
        const menuName = this.menuInfoList.filter(menu => {
          return menu.menuId === id
        })
        mvMenu.push({
          menuId: id,
          menuName: menuName[0].menuName
        })
      })
      this.removeMenuList = mvMenu
    },
    reset() {
      this.$refs.tree2.setCheckedKeys([])
      const checkedIdListReset = []
      this.initCheckedIdList.concat(this.firstCheckedIdList).forEach(id => {
        checkedIdListReset.push(id)
      })
      this.checkedIdList = checkedIdListReset
      this.addMenuList = []
      this.removeMenuList = []
    },
    checkMenuId() {
      const currMenuIdList = this.$refs.tree2.getCheckedKeys().concat(this.$refs.tree2.getHalfCheckedKeys())
      console.log('当前的权限点:', currMenuIdList)
      console.log('初始化的二级权限点:', this.initCheckedIdList)
      const initMenuIdList = [].concat(this.initCheckedIdList).concat(this.firstCheckedIdList)
      console.log('初始化的权限点:', initMenuIdList)

      const deleteMenuId = []
      initMenuIdList.forEach(initMenuId => {
        const result = currMenuIdList.filter(currMenuId => {
          return currMenuId === initMenuId
        })
        if (result && result.length <= 0) {
          deleteMenuId.push(initMenuId)
        }
      })
      console.log('删除的权限点:', deleteMenuId)
      const addMenuId = []
      currMenuIdList.forEach(currMenuId => {
        const result = initMenuIdList.filter(initMenuId => {
          return currMenuId === initMenuId
        })
        if (result && result.length <= 0) {
          addMenuId.push(currMenuId)
        }
      })
      console.log('新增的权限点:', addMenuId)
      return { addMenuId: addMenuId, deleteMenuId: deleteMenuId }
    },
    commit() {
    },
    dealMenu(menuInfo, checkId, menuInfoList) {
      const menuInfoTree = []
      if (menuInfo) {
        menuInfoList.push({
          menuId: menuInfo.menuId,
          menuName: menuInfo.menuName
        })
        const childrenMenuList = menuInfo.childrenMenuList
        if (childrenMenuList && childrenMenuList.length > 0) {
          childrenMenuList.forEach(menuInfo => {
            menuInfoTree.push({
              id: menuInfo.menuId,
              label: menuInfo.menuName,
              children: this.dealMenu(menuInfo, checkId, menuInfoList)
            })
            if (menuInfo.isAuth === 1) {
              checkId.push(menuInfo.menuId)
            }
          })
        }
      }
      return menuInfoTree
    },
    append(data) {
      const newChild = { id: 1, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    appendSameLevel(node, data) {
      const newChild = { id: 1, label: 'testtest', children: [] }
      const parent = node.parent
      const children = parent.data.children || parent.data
      children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}

</script>

<style scoped>
.el-tag {
  margin-bottom: 20px;
  margin-left: 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
