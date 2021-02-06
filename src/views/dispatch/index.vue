<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="请输入节点信息" style="margin-bottom:30px;" />
    <el-table
      ref="user_table"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Ip地址" width="130">
        <template slot-scope="scope">
          {{ scope.row.ipaddr }}
        </template>
      </el-table-column>
      <el-table-column label="主机名称" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hostname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="集群名称" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.clusterName }}
        </template>
      </el-table-column>
      <el-table-column label="实例配置" align="center">
        <template slot-scope="scope">
          {{ scope.row.instanceConfig }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <div id="opera">
          <div>
            <el-link icon="el-icon-edit" :underline="false">编辑</el-link>
            <el-link :underline="false">查看<i class="el-icon-view el-icon--right" ></i> </el-link>
          </div>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      filterText: '',
      list: [{
        id: 1,
        ipaddr: '127.0.0.1',
        hostname: 'wengjp-pc-01',
        clusterName: 'develop-pc',
        instanceConfig: '1核 2GB 1Mbps \n 系统盘：高性能云硬盘',
        status: 0,
        createDate: '2020-02-09 11:22:33'
      },{
        id: 1,
        ipaddr: '127.0.0.1',
        hostname: 'wengjp-pc-01',
        clusterName: 'develop-pc',
        instanceConfig: '1核 2GB 1Mbps \n 系统盘：高性能云硬盘',
        status: 0,
        createDate: '2020-02-09 11:22:33'
      },{
        id: 1,
        ipaddr: '127.0.0.1',
        hostname: 'wengjp-pc-01',
        clusterName: 'develop-pc',
        instanceConfig: '1核 2GB 1Mbps \n 系统盘：高性能云硬盘',
        status: 0,
        createDate: '2020-02-09 11:22:33'
      },{
        id: 1,
        ipaddr: '127.0.0.1',
        hostname: 'wengjp-pc-01',
        clusterName: 'develop-pc',
        instanceConfig: '1核 2GB 1Mbps \n 系统盘：高性能云硬盘',
        status: 0,
        createDate: '2020-02-09 11:22:33'
      }],
      listLoading: true,
      activeNames: ['1']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
    }
  }
}
</script>

<style>
.el-link{
  padding-left: 10px;
}
</style>
