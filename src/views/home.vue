<template>
  <div>
    <h2 class="content-block">Home</h2>

    <p>Program ID</p>
    <DxTextBox v-model:value="programId" />
    <p>TMN_COD</p>
    <DxTextBox v-model:value="TMN_COD" />
    <p>CNTR_NO</p>
    <DxTextBox v-model="CNTR_NO" :value="CNTR_NO" />

    <DxButton text="api" :width="150" @click="callAPI" />
    <!-- <DxButton text="api222" @click="callAPI2" /> -->

    <!-- <DxAccordion :data-source="accordionData" /> -->

    <DxDataGrid
      :columns="columns"
      :selection="{ mode: 'single' }"
      :show-borders="true"
      :data-source="gridSource"
      @exporting="onExporting"
    >
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxScrolling row-rendering-mode="virtual" />
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxSelection mode="multiple" />
      <DxPaging :page-size="10" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        :display-mode="displayMode"
        :show-info="showInfo"
        :show-navigation-buttons="showNavButtons"
      />

      <DxColumn :fixed="true" data-field="CNTR_NO" />
      <DxColumn data-field="VVD" />
      <DxColumn data-field="CNTR_OPR" />
      <DxColumn data-field="TS" />
      <DxColumn data-field="VVD_YEAR" />
      <DxColumn data-field="CLS_NM" />
      <DxColumn data-field="CNTR_SEQ" />
    </DxDataGrid>
  </div>
</template>

<script>
import axios from "axios";
import DxButton from "devextreme-vue/button";
import DxTextBox from "devextreme-vue/text-box";
// import DxAccordion from "devextreme-vue/accordion";
import notify from "devextreme/ui/notify";
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxExport,
  DxSelection,
  DxScrolling,
  DxPaging,
  DxPager,
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxButton,
    DxTextBox,
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing,
    DxExport,
    DxSelection,
    DxScrolling,
    DxPaging,
    DxPager,
    // DxAccordion,
  },
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
