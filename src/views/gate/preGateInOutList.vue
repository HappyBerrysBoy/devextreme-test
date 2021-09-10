<template>
  <div>
    <h2 class="content-block">Pre Gate In/Out List</h2>

    <DxSelectBox :items="gateIO" />

    <DxForm :form-data="params" :col-count="6">
      <p>Truck No</p>
      <DxTextBox v-model:value="params.TRK_NO" />
      <p>Terminal</p>
      <DxTextBox v-model:value="params.TMN_COD" />
      <p>CntrNo</p>
      <DxTextBox v-model:value="params.CNTR_NO" />
      <p>I/O</p>
      <DxSelectBox :items="gateIO" />
      <p>From</p>
      <DxTextBox v-model:value="params.FROM_DTE" />
      <p>To</p>
      <DxTextBox v-model:value="params.TO_DTE" />
      <p>Process Tag</p>
      <DxTextBox v-model:value="params.PROCESS_TAG" />
      <p>Mode</p>
      <DxTextBox v-model:value="params.MODE" />
      <p>OPR</p>
      <DxTextBox v-model:value="params.CNTR_OPR" />
      <p>F/E</p>
      <DxTextBox v-model:value="params.CNTR_FOE" />
      <p>Cargo</p>
      <DxTextBox v-model:value="params.CARGO_TYP" />
    </DxForm>

    <DxButton text="Inquiry" :width="150" @click="callAPI" />

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
import { DxSelectBox } from "devextreme-vue/select-box";
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
import { DxForm } from "devextreme-vue/form";

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
    DxForm,
    DxSelectBox,
  },
  data() {
    return {
      gridSource: {},
      gateIO: ["I", "O"],
      programId: "HITOPS3-GTE-CTL-S-LSTPREGATEINOUT",
      params: {
        TRK_NO: "",
        CNTR_NO: "",
        TMN_COD: "",
        GATE_IO: ["I", "O"],
        FROM_DTE: new Date(),
        TO_DTE: new Date(),
        PROCESS_TAG: "",
        MODE: "",
        CNTR_OPR: "",
        CNTR_FOE: "",
        CARGO_TYP: "",
      },
    };
  },
  methods: {
    callAPI() {
      console.log(`this.CNTR_NO:${this.CNTR_NO}, this.TMN_COD:${this.TMN_COD}`);
      const params = { CNTR_NO: this.CNTR_NO, TMN_COD: this.TMN_COD };
      debugger;
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
  },
};
</script>
