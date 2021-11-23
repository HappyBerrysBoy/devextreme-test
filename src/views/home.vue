<template>
  <div>
    <h2 class="content-block">HITOPS3 WEB</h2>

    <DxBox direction="row" width="100%" :height="500">
      <DxItem :ratio="1">
        <template #default>
          <h5>Recent</h5>
        </template>
      </DxItem>
      <DxItem :ratio="1">
        <template #default>
          <h5>Short Cut</h5>
        </template>
      </DxItem>
    </DxBox>
  </div>
</template>

<style>
/* .dx-box-flex.dx-box {
  padding: 20px;
}

.dx-box-flex.dx-box .dx-item:first-child {
  border-right: 1px solid #ddd;
} */
</style>

<script>
import axios from "axios";
import { DxBox, DxItem } from "devextreme-vue/box";

import notify from "devextreme/ui/notify";

export default {
  components: { DxBox, DxItem },
  data() {
    return {
      programId: "HITOPS3-WEB-COM-S-LSTCNTINFO",
      CNTR_NO: "AAAU4000406",
      TMN_COD: "H",
      gridSource: {},
      accordionData: [
        {
          title: "Personal Data",
          text: "Name: John Smith, Birth Year: 1986",
        },
        {
          title: "Contacts",
          text: "Phone: (555)555-5555, Email: John.Smith@example.com",
        },
      ],
    };
  },
  methods: {
    callAPI() {
      console.log(`this.CNTR_NO:${this.CNTR_NO}, this.TMN_COD:${this.TMN_COD}`);
      const params = { CNTR_NO: this.CNTR_NO, TMN_COD: this.TMN_COD };

      notify("The OK button was clicked");

      axios
        .post("http://localhost:8888/frameworkapi/api", {
          programId: this.programId,
          param: JSON.stringify(params),
          fileName: "TEST.json",
        })
        .then((res) => {
          console.log(res.data);
          this.gridSource = res.data;
        });
    },
    callAPI2() {
      alert("test");
    },
  },
};
</script>
