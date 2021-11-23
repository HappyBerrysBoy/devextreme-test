<template>
  <div class="content-block">
    <h2>Pre Gate In/Out List</h2>

    <DxBox :height="75" direction="row" width="100%">
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>Truck No</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox v-model:value="params.TRK_NO" @enter-key="inquiryData" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>OPR</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="oprList" v-model:value="params.CNTR_OPR" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>F/E</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="foe" v-model:value="params.CNTR_FOE" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>CntrNo</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox
              v-model:value="params.CNTR_NO"
              @enter-key="inquiryData"
            />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>I/O</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="gateIO" v-model:value="params.GATE_IO" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>From</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxDateBox
              v-model:value="params.FROM_DTE"
              display-format="yyyy-MM-dd"
            />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>To</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxDateBox
              v-model:value="params.TO_DTE"
              display-format="yyyy-MM-dd"
            />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>Process Tag</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox
              :items="processTag"
              v-model:value="params.PROCESS_TAG"
            />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>Mode</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="copMode" v-model:value="params.MODE" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>Cargo</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="cargoTyp" v-model:value="params.CARGO_TYP" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>Error</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="errCode" v-model:value="params.ERROR" />
          </DxItem>
        </DxBox>
      </DxItem>
    </DxBox>

    <DxBox direction="row" width="100%">
      <DxItem :baseSize="200">
        <DxButton
          id="inquiryBtn"
          text="Pre In Out Detail"
          :visible="visiblePreInOutDetail"
          @click="preInOutDetail"
        />
      </DxItem>
      <DxItem :baseSize="200">
        <DxButton
          id="inquiryBtn"
          text="Status to Disable"
          :visible="visibleStatusToDisable"
          @click="statusToDisable"
        />
      </DxItem>
      <DxItem :baseSize="150">
        <DxButton id="inquiryBtn" text="Inquiry" @click="inquiryData" />
      </DxItem>
    </DxBox>

    <DetailPopup v-model:visible="popupVisible" />

    <!-- <DxPopup
      v-model:visible="popupVisible"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-close-button="false"
      :show-title="true"
      :width="300"
      :height="280"
      container=".dx-viewport"
      title="Pre Gate In/Out Detail Information"
    >
      <DxPosition
        at="center center"
        my="center center"
        v-model:of="positionOf"
      />
      <p>
      </p>
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        :options="emailButtonOptions"
      />
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="closeButtonOptions"
      />
      <p>
        Full Name:
        <span>{{ currentEmployee.FirstName }}</span>
        <span>{{ currentEmployee.LastName }}</span>
      </p>
      <p>
        Birth Date: <span>{{ currentEmployee.BirthDate }}</span>
      </p>
      <p>
        Address: <span>{{ currentEmployee.Address }}</span>
      </p>
      <p>
        Hire Date: <span>{{ currentEmployee.HireDate }}</span>
      </p>
      <p>
        Position: <span>{{ currentEmployee.Position }}</span>
      </p>
    </DxPopup> -->

    <DxDataGrid
      id="gridData"
      :columns="columns"
      :selection="{ mode: 'single' }"
      :show-borders="true"
      :data-source="gridSource"
      :filter-enabled="true"
      :columns-auto-width="true"
      :ref="dataGridRef"
      @exporting="onExporting"
      @selection-changed="dataGridCellClick"
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

      <DxColumn
        data-field="CNTR_NO"
        :width="130"
        caption="CNTR"
        :fixed="true"
      />
      <DxColumn
        data-field="TRK_NO"
        :width="120"
        caption="TRK_NO"
        :fixed="true"
      />
      <DxColumn data-field="GATE_IO" :width="60" caption="I/O" :fixed="true" />
      <DxColumn data-field="TYPSIZ" :width="80" caption="SZTP" :fixed="true" />
      <DxColumn data-field="CNTR_FOE" :width="60" caption="F/E" />
      <DxColumn data-field="CNTR_OPR" :width="80" caption="OPR" />
      <DxColumn data-field="POD" caption="POD" :visible="false" />
      <DxColumn data-field="RF" caption="RF" :visible="false" />
      <DxColumn data-field="VENT" caption="VENT" :visible="false" />
      <DxColumn data-field="VENT_UNIT" caption="UNIT" :visible="false" />
      <DxColumn data-field="CARGO_TYP" caption="CARGO" :visible="false" />
      <DxColumn data-field="DG_IMDG" caption="IMDG" :visible="false" />
      <DxColumn data-field="DG_UNNO" caption="UNNO" :visible="false" />
      <DxColumn data-field="VGM_WGT" caption="VGM" :visible="false" />
      <DxColumn data-field="CNTR_WGT" caption="WGT" :visible="false" />
      <DxColumn data-field="INPUT_DTE" :width="150" caption="RCV DTE" />
      <DxColumn data-field="VVD_YEAR" :width="80" caption="YEAR" />
      <DxColumn data-field="VVD" :width="110" caption="VVD" />
      <DxColumn data-field="TS" caption="TS" :visible="false" />
      <DxColumn data-field="OPR_BKG_NO" caption="BKG NO" :visible="false" />
      <DxColumn data-field="DO_NO" caption="DO" :visible="false" />
      <DxColumn data-field="TRK_CO" :width="110" caption="TRK CO" />
      <DxColumn data-field="REAL_SENDER" :width="110" caption="Sender" />
      <DxColumn data-field="INPUT_PSN" caption="INPUT" :visible="false" />
      <DxColumn data-field="CNTR_INSP" caption="INSP" :visible="false" />
      <DxColumn data-field="OOG" caption="OOG" :visible="false" />
      <DxColumn data-field="CLL" caption="CLL" :visible="false" />
      <DxColumn data-field="XRAY" caption="XRAY" :visible="false" />
      <DxColumn data-field="DLV_MODE" :width="60" caption="DLV" />
      <DxColumn data-field="RCV_MODE" :width="80" caption="MODE" />
      <DxColumn data-field="PROCESS_TAG" caption="PROCESS" />
      <DxColumn data-field="MSG" caption="MSG" :visible="false" />
      <DxColumn data-field="ISSUE_SEQ" caption="ISSUE" :visible="false" />
    </DxDataGrid>

    <DxLoadPanel
      :position="{ of: `#gridData` }"
      v-model:visible="loadingVisible"
      shading-color="rgba(0,0,0,0.4)"
    />
  </div>
</template>

<style>
#btnBox {
  justify-content: end;
}

.dx-box-flex {
  margin-bottom: 20px;
  flex-wrap: wrap;
  grid-column-gap: 30px;
}

.dx-texteditor-input {
  text-transform: uppercase;
}
</style>

<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import { getMainCode, getGeneralCode } from "@/functions/commfunc";
import DetailPopup from "./preInOutDetail";
import {
  MAIN_COD,
  GENERAL_COD,
  MAIN_COD_ITEM_TYP,
  API_URL,
} from "@/functions/constant";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import DxButton from "devextreme-vue/button";
import DxDateBox from "devextreme-vue/date-box";
import DxTextBox from "devextreme-vue/text-box";
import { DxSelectBox } from "devextreme-vue/select-box";
import notify from "devextreme/ui/notify";
import { DxBox, DxItem } from "devextreme-vue/box";
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
  // DxFilterRow,
} from "devextreme-vue/data-grid";
// import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";

const dataGridRef = "dataGrid";

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
    DxSelectBox,
    DxBox,
    DxItem,
    DxDateBox,
    DxLoadPanel,
    // DxPopup,
    // DxPosition,
    // DxToolbarItem,
    // DxFilterRow,
  },
  data() {
    return {
      dataGridRef,
      popupVisible: false,
      loadingVisible: false,
      visiblePreInOutDetail: true,
      visibleStatusToDisable: true,
      selectedRowsData: [],
      gridSource: {},
      gateIO: [],
      processTag: [],
      cargoTyp: [],
      copMode: [],
      errCode: [],
      foe: [],
      oprList: [],
      emailButtonOptions: {
        icon: "email",
        text: "Send",
        onClick: () => {
          const message = `Email is sent to ${this.currentEmployee.FirstName} ${this.currentEmployee.LastName}`;
          notify(
            {
              message,
              position: {
                my: "center top",
                at: "center top",
              },
            },
            "success",
            3000
          );
        },
      },
      closeButtonOptions: {
        text: "Close",
        onClick: () => {
          this.popupVisible = false;
        },
      },
      programId: "HITOPS3-GTE-CTL-S-LSTPREGATEINOUT-UD",
      params: {
        MODE: "",
        PROCESS_TAG: "",
        FROM_DTE: new Date(),
        TO_DTE: new Date(),
        GATE_IO: "",
        TRK_CO: "%%%",
        TRK_NO: "",
        ERROR: "",
        CARGO_TYP: "",
        CNTR_OPR: "",
        CNTR_FOE: "",
        RECEIVER: "PNITY050",
        CNTR_NO: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      doubleCount: "moduleA/doubleCount",
      tmnCod: "GlobalConstant/getTmnCod",
    }),
    dataGrid: function() {
      return this.$refs[dataGridRef].instance;
    },
  },
  created() {
    getMainCode(MAIN_COD.GATE_IO, true, false, MAIN_COD_ITEM_TYP.COD_NAME)
      .then((data) => {
        this.gateIO = data;
        this.params.GATE_IO = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data(${MAIN_COD.GATE_IO})`);
      });

    getMainCode(MAIN_COD.YON, true, false, MAIN_COD_ITEM_TYP.MAIN_COD)
      .then((data) => {
        this.errCode = data;
        this.params.ERROR = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data(${MAIN_COD.GATE_IO})`);
      });

    getMainCode(MAIN_COD.FOE, true, false, MAIN_COD_ITEM_TYP.COD_NAME)
      .then((data) => {
        this.foe = data;
        this.params.CNTR_FOE = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data(${MAIN_COD.GATE_IO})`);
      });

    getMainCode(MAIN_COD.COP_STS, true, false, MAIN_COD_ITEM_TYP.MAIN_COD)
      .then((data) => {
        this.processTag = data;
        this.params.PROCESS_TAG = data[1];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data(${MAIN_COD.COP_STS})`);
      });

    getMainCode(MAIN_COD.COP_MOD, true, false, MAIN_COD_ITEM_TYP.COD_NAME)
      .then((data) => {
        this.copMode = data;
        this.params.MODE = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data`);
      });

    getGeneralCode(GENERAL_COD.OPERATOR, true, false)
      .then((data) => {
        this.oprList = data;
        this.params.CNTR_OPR = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data(${GENERAL_COD.CARGO_TYPE})`);
      });

    getGeneralCode(GENERAL_COD.CARGO_TYPE, true, false)
      .then((data) => {
        this.cargoTyp = data;
        this.params.CARGO_TYP = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data(${GENERAL_COD.CARGO_TYPE})`);
      });
  },
  beforeMount() {},
  mounted() {
    console.log(`state`, this.$store.state);
    console.log(`doubleCount`, this.doubleCount);
    console.log(`mounted tmnCod2 ${this.$store.state.GlobalConstant2.tmnCod2}`);
    console.log(
      `mounted vuex count value ${this.$store.state.Counter.counter}`
    );
  },
  methods: {
    ...mapActions({
      incrementIfOddOnRootSum: "moduleA/incrementIfOddOnRootSum",
      setTmnCod: "GlobalConstant/setTmnCod",
    }),
    test(e) {
      this.incrementIfOddOnRootSum({ tt: 12312 });
      this.setTmnCod({ tmnCod: "QQ" });
      console.log(`setTmnCod`, this.$store.getters["GlobalConstant/getTmnCod"]);

      console.log(`doubleCount`, this.$store.getters["moduleA/doubleCount"]);
      console.log(`doubleCount`, this.doubleCount);
      notify(`The OK button was clicked ${this.$store.state.moduleA.count}`);
    },
    dataGridCellClick({ selectedRowsData }) {
      const data = selectedRowsData[0];

      console.log("dataGridCellClick", data);
      console.log("dataGridCellClick rows", selectedRowsData);

      // this.showEmployeeInfo = !!data;
      // this.selectedRowNotes = data && data.Notes;
    },
    preInOutDetail() {
      this.selectedRowsData = this.dataGrid.getSelectedRowsData();

      console.log("this.selectedRowsData", this.selectedRowsData);

      // ===== or when deferred selection is used =====
      this.dataGrid.getSelectedRowsData().then((selectedRowsData) => {
        // Your code goes here
        console.log("selectedRowsData", selectedRowsData);
      });
    },
    statusToDisable() {
      this.popupVisible = !this.popupVisible;
    },
    inquiryData() {
      const param = JSON.parse(JSON.stringify(this.params));

      param["TMN_COD"] = this.tmnCod;
      param["FROM_DTE"] =
        param["FROM_DTE"].substring(0, 10).replace(/-/g, "") + "000000";
      param["TO_DTE"] =
        param["TO_DTE"].substring(0, 10).replace(/-/g, "") + "235959";

      if (param.MODE === "*") {
        param.MODE = "%%%";
      }

      if (param.GATE_IO === "*") {
        param.GATE_IO = "%%%";
      }

      if (param.TRK_NO === "") {
        param.TRK_NO = "%%%";
      }

      if (param.CNTR_NO === "") {
        param.CNTR_NO = "%%%";
      }

      if (param.ERROR === "*") {
        param.ERROR = "%%%";
      }

      if (param.CARGO_TYP === "*") {
        param.CARGO_TYP = "";
      }

      if (param.CNTR_OPR === "*") {
        param.CNTR_OPR = "%%%";
      }

      if (param.CNTR_FOE === "*") {
        param.CNTR_FOE = "%%%";
      }

      if (this.PROCESS_TAG == "N") {
        this.programId = "HITOPS3-GTE-CTL-S-LSTPREGATEINOUT-UD";
      } else {
        this.programId = "HITOPS3-GTE-CTL-S-LSTPREGATEINOUT2-UD";
      }

      console.log(
        `programid:${this.programId}, parameter`,
        JSON.stringify(param)
      );

      this.loadingVisible = true;
      axios
        .post(API_URL, {
          programId: this.programId,
          param: JSON.stringify(param),
          fileName: "TEST.json",
        })
        .then((res) => {
          console.log(res.data);
          this.gridSource = res.data;
          this.loadingVisible = false;
        })
        .catch((err) => {
          notify("Fail to load query data");
          this.loadingVisible = false;
        });
    },
  },
};
</script>
