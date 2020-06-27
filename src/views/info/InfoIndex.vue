<template>
  <div>
    <info-index-form :dialog-visible.sync="dialogVisible" @receiveOptions="receiveOptions"></info-index-form>
    <info-index-table :options="options" ref="infoIndexTable"></info-index-table>
    <info-index-dialog :dialog-visible.sync="dialogVisible" :options="options" @refresh="refresh"></info-index-dialog>
  </div>
</template>
<script>
import InfoIndexForm from "@/components/info/InfoIndexForm";
import InfoIndexTable from "../../components/info/InfoIndexTable";
import InfoIndexDialog from "@/components/info/InfoIndexDialog";
export default {
  name: "InfoIndex",
  components: {
    InfoIndexForm,
    InfoIndexTable,
    InfoIndexDialog
  },
  data() {
    return {
      dialogVisible: false,
      options: []
    };
  },
  computed: {},
  methods: {
    receiveOptions(options) {
      this.options = options;
    },
    refresh() {
      this.$refs["infoIndexTable"]._getNewsList();
    }
  }
};
</script>
<style lang="scss" scoped></style>
