<template>
  <div>
    <el-table
      v-if="newList.length!==0"
      :data="computedNewsList"
      height="350"
      border
      style="width: 100%;margin-top:20px"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column
        v-for="item in tableLable"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>

      <el-table-column label="内容" width="450">
        <template slot-scope="scope">
          <span class="text-overflow">{{ scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <span>{{ parseInt(scope.row.createDate)*1000|dataFormat}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDetailEdit(scope.$index, scope.row)"
          >编辑详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" class="row-bg" justify="space-between" style="margin-top: 20px">
      <el-col :span="2">
        <el-button
          type="danger"
          plain
          @click="deleteSelected"
          :disabled="multipleSelectionButtonDisable"
        >批量删除</el-button>
      </el-col>
      <pagination :pagination-data="paginationData"></pagination>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>
<script>
import { getNewsList, deleteNews } from "@/network/api";
import { mapMutations } from "vuex";
export default {
  name: "InfoIndexTable",
  props: {
    options: {
      type: Array
    }
  },
  data() {
    return {
      newList: [],
      tableLable: [
        { prop: "title", label: "标题", width: 350 },
        // { prop: "content", label: "内容", width: 450 },
        { prop: "categoryName", label: "分类名称" }
        // { prop: "createDate", label: "创建时间" }
      ],
      multipleSelection: [],
      multipleSelectionButtonDisable: true,
      pageNumber: 1,
      pageSize: 100,

      // 传给全局Pagnation组件的props值
      paginationData: {
        total: 0,
        currentPage: 1,
        pageSize: 3,
        pageSizes: [3, 6, 9]
      },
      loading: true
    };
  },
  computed: {
    computedNewsList() {
      // paginationData对象里面任何一个数据发生变化，都有触发

      return this.newList.slice(
        (this.paginationData.currentPage - 1) * this.paginationData.pageSize,
        this.paginationData.currentPage * this.paginationData.pageSize
      );
    }
  },
  methods: {
    ...mapMutations({
      saveNewsId: "saveNewsId"
    }),

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteSelected() {
      if (this.multipleSelection.length == 0) {
        return this.$message.error("您还没勾选要批量删除的数据");
      }
      this._confirm(
        "批量删除数据不可恢复，是否继续?",
        this.deleteSelectedComfirm
      );
    },
    deleteSelectedComfirm() {
      const categoryIDArr = this.multipleSelection.map(e => parseInt(e.id));
      deleteNews({ id: categoryIDArr })
        .then(data => {
          this.$message.success("删除成功");
          this.newList = this.newList.filter(
            e => !categoryIDArr.includes(parseInt(e.id))
          );
          this.paginationData.total = this.newList.length;
        })
        .catch(() => this.$message.error("删除失败"));
    },
    handleEdit(index, row) {
      console.log(index, row);
      // params参数丢失问题：name在router.js路由path中并没有配置， path: "/infoDetailed/:newsId",
      //自己强行加进去，跳转到新页面，第一次会存在，但是一旦刷新，name参数直接丢失。而newsId无此问题。
      // this.$router.push({ name: "InfoDetailed", params: { newsId: row.id,name:'zs' } });
    },
    handleDetailEdit(index, row) {
      let id = row.id;
      this.saveNewsId({ newsId: id });
      this.$router.push({
        name: "InfoDetailed",
        params: { newsId: id }
      });
    },
    handleDelete(index, row) {
      this._confirm("删除此条数据不可恢复，是否继续?", () => {
        this.handleDeleteConfirm(index, row);
      });
    },
    handleDeleteConfirm(index, row) {
      deleteNews({ id: [parseInt(row.id)] }).then(data => {
        this.newList = this.newList.filter(e => e !== row);
        this.paginationData.total = this.newList.length;
      });
    },
    findById(categoryId) {
      if (this.options.length !== 0) {
        return this.options.find(e => e.value == categoryId).label;
      }
      return 100;
    },
    _getNewsList() {
      getNewsList({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
        .then(data => {
          const res = data.data;
          // this.paginationData.total = res.total;
          this.paginationData.total = res.data.length;
          res.data.forEach(e => (e.categoryName = this.findById(e.categoryId)));
          this.newList = res.data.map(e => {
            return {
              title: e.title,
              content: e.content,
              id: e.id,
              createDate: e.createDate,
              categoryId: e.categoryId,
              categoryName: e.categoryName
            };
          });
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  filters: {},
  watch: {
    multipleSelection: {
      handler(newVal) {
        this.multipleSelectionButtonDisable = newVal.length == 0 ? true : false;
      }
    }
  },
  mounted() {
    this._getNewsList();
  }
};
</script>
<style lang="scss" scoped>
</style>
