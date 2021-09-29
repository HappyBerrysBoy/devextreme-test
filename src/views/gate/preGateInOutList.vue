<template>
  <div>
    <h2 class="content-block">Pre Gate In/Out List</h2>

    <DxBox :height="75" direction="row" width="100%">
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>Truck No</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox v-model:value="params.TRK_NO" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>Terminal</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="tmnCod" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col">
          <DxItem :ratio="1">
            <p>CntrNo</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox v-model:value="params.CNTR_NO" />
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
            <DxSelectBox :items="processTag" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>Mode</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox v-model:value="params.MODE" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>OPR</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox v-model:value="params.CNTR_OPR" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>F/E</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxTextBox v-model:value="params.CNTR_FOE" />
          </DxItem>
        </DxBox>
      </DxItem>
      <DxItem :ratio="1">
        <DxBox direction="col" width="100%">
          <DxItem :ratio="1">
            <p>Cargo</p>
          </DxItem>
          <DxItem :ratio="1">
            <DxSelectBox :items="cargoTyp" />
          </DxItem>
        </DxBox>
      </DxItem>
    </DxBox>

    <DxButton text="Inquiry" :width="150" @click="callAPI" />
    Count:{{ count }}
    <DxButton text="Test Action" :width="150" @click="test" />

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

<style>
.dx-box-flex {
  padding: 0 20px 0px 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
  grid-column-gap: 5px;
}

.dx-box-item {
  min-width: 120px;
  max-width: 120px;
}
</style>

<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import { getMainCode } from "@/functions/commfunc";
import { MAIN_COD, API_URL } from "@/functions/constant";
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
    // DxForm,
    DxSelectBox,
    DxBox,
    DxItem,
    DxDateBox,
  },
  data() {
    return {
      gridSource: {},
      gateIO: [],
      tmnCod: ["*", "U", "H", "P"],
      processTag: ["*", "N", "Y", "D", "W"],
      cargoTyp: ["*", "DG", "RD", "RF", "SD", "SP", "ST"],
      programId: "HITOPS3-GTE-CTL-S-LSTPREGATEINOUT",
      params: {
        TRK_NO: "2468",
        CNTR_NO: "",
        TMN_COD: "",
        GATE_IO: "",
        FROM_DTE: "2021-09-01",
        TO_DTE: new Date(),
        PROCESS_TAG: "",
        MODE: "",
        CNTR_OPR: "",
        CNTR_FOE: "",
        CARGO_TYP: "",
      },
    };
  },
  computed: {
    ...mapGetters({ doubleCount: "moduleA/doubleCount" }),
  },
  created() {
    getMainCode(MAIN_COD.GATE_IO, true, true)
      .then((data) => {
        this.gateIO = data;
        this.params.GATE_IO = data[0];
      })
      .catch((err) => {
        console.log(err);
        notify(`Fail to load code data`);
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
    test() {
      this.incrementIfOddOnRootSum({ tt: 12312 });
      this.setTmnCod({ tmnCod: "QQ" });
      console.log(`setTmnCod`, this.$store.getters["GlobalConstant/getTmnCod"]);

      console.log(`doubleCount`, this.$store.getters["moduleA/doubleCount"]);
      console.log(`doubleCount`, this.doubleCount);
      notify(`The OK button was clicked ${this.$store.state.moduleA.count}`);
    },
    callAPI() {
      console.log(`this.CNTR_NO:${this.CNTR_NO}, this.TMN_COD:${this.TMN_COD}`);
      const params = { CNTR_NO: this.CNTR_NO, TMN_COD: this.TMN_COD };

      notify("The OK button was clicked");

      axios
        .post(API_URL, {
          programId: this.programId,
          param: JSON.stringify(params),
          fileName: "TEST.json",
        })
        .then((res) => {
          console.log(res.data);
          this.gridSource = res.data;
          notify(`Fail to load query data`);
        });

      console.log("test");
    },
  },
};
</script>
