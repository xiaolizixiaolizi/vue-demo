<template>
  <div>
    <el-menu
      :default-active="routerPath"
      mode="vertical"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#f56c6c"
      router
      unique-opened
    >
      <el-submenu v-for="item in sideData" :key="item.title" :index="item.title">
        <template slot="title">
          <icon :name="item.icon" :w="18" :h="18"></icon>
          <span>{{ item.title }}</span>
        </template>
        <template v-if="item.subItem">
          <el-menu-item
            v-for="(itemY, index) in item.subItem"
            :key="index"
            :index="itemY.routerpath"
            @click="setRouterPath({ routerPath: itemY.routerpath })"
          >{{ itemY.name }}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CompConsoleAside",
  data() {
    return {
      sideData: [
        {
          title: "控制台",
          icon: "console",
          subItem: [
            { routerpath: "/2-1", name: "工作1" },
            { routerpath: "/2-2", name: "工作2" },
            { routerpath: "/2-3", name: "工作3" }
          ]
        },
        {
          title: "信息管理",
          icon: "info",
          subItem: [
            { routerpath: "/infoIndex", name: "信息列表" },
            { routerpath: "/infoCategory", name: "信息分类" }
            // { routerpath: "/infoDetailed", name: "信息详情" }
          ]
        },
        {
          title: "用户管理",
          icon: "user",
          subItem: [{ routerpath: "/userIndex", name: "用户列表" }]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      routerPath: "routerPath",
      newsId: "newsId"
    })
  },
  methods: {
    ...mapMutations({
      setRouterPath: "setRouterPath"
    })
  },
  watch: {
    newsId: {
      handler(val) {
        if (val) {
          this.sideData[1].subItem.splice(2, 1, {
            routerpath: `/infoDetailed/${val}`,
            name: "信息详情"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
  .demo {
    font-weight: 700;
  }
}
</style>
