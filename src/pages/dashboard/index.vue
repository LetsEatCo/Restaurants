<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i 
          class="el-icon-setting" 
          style="margin-right: 15px"
        />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>

    <el-main>
      <el-table :data="tableData">
        <el-table-column 
          prop="date" 
          label="Date" 
          width="140"
        />
        <el-table-column 
          prop="name" 
          label="Name" 
          width="120"
        />
        <el-table-column 
          prop="address" 
          label="Address"
        />
      </el-table>
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}

	.main-container {
		height: 100vh;
		overflow-y: scroll;
	}
</style>

<script>
	export default {
		layout: 'Dashboard/DashboardLayout',
		data() {
			const item = {
				date: '2016-05-02',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles'
			};
			return {
				tableData: Array(20).fill(item)
			};
		}
	};
</script>
