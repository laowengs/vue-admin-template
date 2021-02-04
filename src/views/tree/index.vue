<template>
  <div class="app-container">
<!--    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />-->

<!--    <el-tree-->
<!--      ref="tree2"-->
<!--      :data="menuList"-->
<!--      show-checkbox-->
<!--      node-key="id"-->
<!--      :default-checked-keys="checkedIdList"-->
<!--      :props="defaultProps"-->
<!--      :filter-node-method="filterNode"-->
<!--      class="filter-tree"-->
<!--      default-expand-all-->
<!--      @check-change="checkChange"-->
<!--    />-->

    <el-row :gutter="40">
      <el-col :span="8">
        <el-input v-model="filterText" placeholder="输入菜单名称" style="margin-bottom:30px;" />
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
          @check-change="checkChange"
        />
      </el-col>
      <el-col :span="15">
        <h3>新增权限</h3>
        <el-row :gutter="20">
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
          <el-tag closable>标签一</el-tag>
        </el-row>
        <br><br>
        <h3>删除权限</h3>
        <el-row :gutter="20">
          <el-tag closable type="danger">标签四1111111111111111111111111111111111</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
          <el-tag closable type="danger">标签四</el-tag>
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
      menuList: [],
      // 新增的菜单信息
      addMenuList: [],
      // 删除的菜单信息
      removeMenuList: [],
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
      getAllMenuInfo().then(response => {
        const allMenuInfo = response.data
        allMenuInfo.forEach(menuInfo => {
          allMenuInfoTree.push({
            id: menuInfo.menuId,
            label: menuInfo.menuName,
            children: dealMenu(menuInfo, checkId)
          })
          // if (menuInfo.isAuth === 1) {
          //   this.checkedIdList.push(menuInfo.menuId)
          // }
          // menuInfo.isAuth
          // menuInfo.childrenMenuList
        })
        this.menuList = allMenuInfoTree
        this.checkedIdList = checkId
      })
    },
    checkChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    }
  }
}
function dealMenu(menuInfo, checkId) {
  const menuInfoTree = []
  if (menuInfo) {
    const childrenMenuList = menuInfo.childrenMenuList
    if (childrenMenuList && childrenMenuList.length > 0) {
      childrenMenuList.forEach(menuInfo => {
        menuInfoTree.push({
          id: menuInfo.menuId,
          label: menuInfo.menuName,
          children: dealMenu(menuInfo.childrenMenuList, checkId)
        })
        if (menuInfo.isAuth === 1) {
          checkId.push(menuInfo.menuId)
        }
      })
    }
  }
  return menuInfoTree
}
</script>

<style scoped>
.el-tag{
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
