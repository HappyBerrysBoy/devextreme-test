const axios = require("axios");
const { API_URL, GENERAL_COD } = require("./constant");

export const getMainCode = (codTyp, allTag = false, blankTag = false) => {
  const params = { COD_TYP: codTyp };
  const retArray = [];

  if (allTag) retArray.push("*");
  if (blankTag) retArray.push(" ");

  return axios
    .post(API_URL, {
      programId: "HITOPS3-CDS-COD-S-LSTMAINCODE",
      param: JSON.stringify(params),
      fileName: "",
    })
    .then((res) => {
      console.log(res.data);

      res.data.filter((item) => {
        retArray.push(item.MAIN_COD);
      });

      return retArray;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGeneralCode = (
  codTyp,
  allTag = false,
  blankTag = false,
  strWhere = []
) => {
  let programId = "";
  let fieldName = "";
  const params = {};
  const retArray = [];

  if (allTag) retArray.push("*");
  if (blankTag) retArray.push(" ");

  if (codTyp == GENERAL_COD.MASH_GRP) {
    programId = "HITOPS3-PLN-YRD-S-LSTMASHGRP";
    strFieldName = "MASH_GRP_ID";
  } else if (codTyp == GENERAL_COD.BITT) {
    programId = "HITOPS3-CDS-DSN-S-LSTBITT_COM";
    strFieldName = "BTT_NO";
  } else if (codTyp == GENERAL_COD.AGS_BASIC_CATEGORY) {
    programId = "HITOPS3-CDS-DSN-S-LSTAGSBASICCATELIST_COM";
    strFieldName = "CAT_COD";
  } else if (codTyp == GENERAL_COD.DAMAGE) {
    programId = "HITOPS3-CDS-COD-S-LSTCNTRDAMAGECODE";
    strFieldName = "DMG_COD";
  } else if (codTyp == GENERAL_COD.BLOCK) {
    if (strWhere.Length > 1) params.push("TYPE_CGO_PRI", strWhere[1]);
    else params.push("TYPE_CGO_PRI", "%%%");

    if (strWhere.Length > 2) params.push("VIRTUAL_USE_TAG", strWhere[2]);
    else params.push("VIRTUAL_USE_TAG", "%%%");

    if (strWhere.Length > 3) params.push("ON_CHZ_TAG", strWhere[3]);
    else params.push("ON_CHZ_TAG", "%%%");

    programId = "HITOPS3-CDS-DSN-S-LSTBLOCK_COM";
    strFieldName = "YBLK";
  } else if (codTyp == GENERAL_COD.BAY) {
    programId = "";
  } else if (codTyp == GENERAL_COD.SERVICE_AREA) {
    programId = "";
  } else if (codTyp == GENERAL_COD.LANE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.BERTH) {
    programId = "";
  } else if (codTyp == GENERAL_COD.YT) {
    programId = "";
  } else if (codTyp == GENERAL_COD.QC) {
    programId = "";
  } else if (codTyp == GENERAL_COD.TRUCKER) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VVD) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VVDNEW) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VVDACT) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VVDACTALL) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VVD_LATEST) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VESSEL) {
    programId = "";
  } else if (codTyp == GENERAL_COD.PORT) {
    programId = "";
  } else if (codTyp == GENERAL_COD.PORT_ONLY) {
    programId = "";
  } else if (codTyp == GENERAL_COD.PORT_BY_ROUTE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.PORT_BY_VVD) {
    programId = "";
  } else if (codTyp == GENERAL_COD.ROUTE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.ROUTEGROUP) {
    programId = "";
  } else if (codTyp == GENERAL_COD.NATION) {
    programId = "";
  } else if (codTyp == GENERAL_COD.OPERATOR) {
    programId = "";
  } else if (codTyp == GENERAL_COD.ACT_OPR) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CNTR_SIZE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CNTR_TYPE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CNTR_OPR_TYPE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CARGO_TYPE) {
    programId = "";
  } else if (codTyp == GENERAL_COD.ISO_SZTP) {
    programId = "";
  } else if (codTyp == GENERAL_COD.LINER_SZTP) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CYS_OPR) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CY_USAGE_COD) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CURRENCY) {
    programId = "";
  } else if (codTyp == GENERAL_COD.POOL_SCHE_EQP_TYP) {
    programId = "";
  } else if (codTyp == GENERAL_COD.POOL_SCHE_EQP_NO) {
    programId = "";
  } else if (codTyp == GENERAL_COD.TARIFF_DUE_TYP) {
    programId = "";
  } else if (codTyp == GENERAL_COD.CNTR_HOLD) {
    programId = "";
  } else if (codTyp == GENERAL_COD.GATE_NO) {
    programId = "";
  } else if (codTyp == GENERAL_COD.VESSEL_BAY) {
    programId = "";
  }

  return axios
    .post(API_URL, {
      programId: "HITOPS3-CDS-COD-S-LSTMAINCODE",
      param: JSON.stringify(params),
      fileName: "",
    })
    .then((res) => {
      console.log(res.data);

      res.data.filter((item) => {
        retArray.push(item.MAIN_COD);
      });

      return retArray;
    })
    .catch((err) => {
      console.log(err);
    });
};
