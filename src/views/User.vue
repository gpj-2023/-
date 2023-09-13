<template>
  <div class="user-manager">
    <el-dialog
      title="更新用户"
      :visible.sync="dialogVisible"
      width="55%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        :inline="true"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="名字:" prop="name" placeholder="请选择名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age" placeholder="请选择年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            style="width: 100%"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址:" prop="addr" placeholder="请选择地址">
          <el-input v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="user-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="search">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="搜索"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="user-container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{ scope.row.sex === 1 ? "男" : "女" }}
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <div class="user-footer">
      <el-pagination     
      layout="prev, pager, next"
      @current-change="changePage"     
      :total="total">   
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import {
  getUserList,
  createUser,
  deleteUser,
  batchremove,
  updateUser,
} from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名字" }],
        age: [{ required: true, message: "请输入年龄" }],
        birth: [{ required: true, message: "请输入日期" }],
        sex: [{ required: true, message: "请输入性别" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modelType: 0, //0为新增，1为编辑
      total:0,
      pageData:{
        page:1,
        limit:10,
      },
      formInline:{
        name:''
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid);
        if (valid == true) {
          // console.log(this.form);
          if (this.modelType === 0) {
            createUser(this.form).then(() => {
              this.handleClose();
              // this.dialogVisible = false;
              this.getList();
            });
          } else {
            // this.form = JSON.parse(JSON.stringify())
            updateUser(this.form).then(() => {
              // this.dialogVisible = false;
              this.handleClose();
              this.getList();
            });
          }
        }
      });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.modelType = 1;
      this.dialogVisible = true;
      // this.dialogVisible = true;

      // console.log(row.sex)
      this.form = JSON.parse(JSON.stringify(row));
      // console.log(this.form)
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(row)
          const id = row.id;
          deleteUser({ id }).then(() => {
            this.dialogVisible = false;
            this.getList();
          });
          // console.log(row.id)
          // this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    getList() {
      getUserList({params:{...this.pageData,...this.formInline}}).then(({ data }) => {
        // const nsex=data.list.map(item=>item.sex===1?'男':'女')
        // console.log(nsex)
        // console.log(data)
        this.total= data.count || 0
        this.tableData = data.list;
        // this.tableData.forEach(item=>item.sex===1?'男':'女')
        // console.log(this.tableData.forEach(item=>console.log(item.sex===1?'男':'女')))
      });
    },
    changePage(val){
      // console.log(val)
      this.pageData.page = val
      this.getList()
    },
    onSubmit(){
      this.getList()
    }
  },
  mounted() {
    this.getList();
    // this.tableData.sex===1?'男':'女'
    // console.log(this.tableData)
  },
};
</script>

<style lang="less" scoped>
.user-manager {
  height:90vh;
  .user-header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    .search{
      box-sizing:border-box;
      display:flex; 
      align-items:center;
    }
  }
  .user-container  {
    height:90%;
    overflow-y:scroll;
  }
}
</style>