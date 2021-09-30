const axios = require("axios");

const {
  API_URL,
  GENERAL_COD,
  MAIN_COD_ITEM_TYP,
  GET_MAIN_CODE_OPT,
} = require("./constant");

export const getMainCode = (
  codTyp,
  allTag = false,
  blankTag = false,
  itemType,
  dispSeq = GET_MAIN_CODE_OPT.DISPLAY_SEQ
) => {
  const params = { COD_TYP: codTyp };
  const retArray = [];
  let programId = "";

  if (dispSeq === GET_MAIN_CODE_OPT.DISPLAY_SEQ) {
    programId = "HITOPS3-CDS-COD-S-LSTMAINCODE";
  } else if (dispSeq === GET_MAIN_CODE_OPT.MAIN_COD) {
    programId = "HITOPS3-CDS-COD-S-LSTMAINCODE_SORTNAME";
  }

  if (allTag) retArray.push("*");
  if (blankTag) retArray.push(" ");

  return axios
    .post(API_URL, {
      programId: programId,
      param: JSON.stringify(params),
      fileName: "",
    })
    .then((res) => {
      console.log(res.data);

      res.data.filter((item) => {
        if (itemType === MAIN_COD_ITEM_TYP.MAIN_COD) {
          retArray.push(item[MAIN_COD_ITEM_TYP.MAIN_COD]);
        } else if (itemType === MAIN_COD_ITEM_TYP.COD_NAME) {
          retArray.push(item[MAIN_COD_ITEM_TYP.COD_NAME]);
        } else if (itemType === MAIN_COD_ITEM_TYP.COD_DESC) {
          retArray.push(item[MAIN_COD_ITEM_TYP.COD_DESC]);
        } else if (itemType === MAIN_COD_ITEM_TYP.COD_NAME_DESC) {
          retArray.push(
            `${item[MAIN_COD_ITEM_TYP.COD_NAME]}:${
              item[MAIN_COD_ITEM_TYP.COD_DESC]
            }`
          );
        } else if (itemType === MAIN_COD_ITEM_TYP.MAIN_COD_DESC) {
          retArray.push(
            `${item[MAIN_COD_ITEM_TYP.MAIN_COD]}:${
              item[MAIN_COD_ITEM_TYP.COD_DESC]
            }`
          );
        }
      });

      return retArray;
    })
    .catch((err) => {
      console.log(err);
      return retArray;
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

  if (strWhere.Length > 0) params.push("TMN_COD", strWhere[0]);

  if (allTag) retArray.push("*");
  if (blankTag) retArray.push(" ");

  if (codTyp == GENERAL_COD.MASH_GRP) {
    programId = "HITOPS3-PLN-YRD-S-LSTMASHGRP";
    fieldName = "MASH_GRP_ID";
  } else if (codTyp == GENERAL_COD.BITT) {
    programId = "HITOPS3-CDS-DSN-S-LSTBITT_COM";
    fieldName = "BTT_NO";
  } else if (codTyp == GENERAL_COD.AGS_BASIC_CATEGORY) {
    programId = "HITOPS3-CDS-DSN-S-LSTAGSBASICCATELIST_COM";
    fieldName = "CAT_COD";
  } else if (codTyp == GENERAL_COD.DAMAGE) {
    programId = "HITOPS3-CDS-COD-S-LSTCNTRDAMAGECODE";
    fieldName = "DMG_COD";
  } else if (codTyp == GENERAL_COD.BLOCK) {
    if (strWhere.Length > 1) params.push("TYPE_CGO_PRI", strWhere[1]);
    else params.push("TYPE_CGO_PRI", "%%%");

    if (strWhere.Length > 2) params.push("VIRTUAL_USE_TAG", strWhere[2]);
    else params.push("VIRTUAL_USE_TAG", "%%%");

    if (strWhere.Length > 3) params.push("ON_CHZ_TAG", strWhere[3]);
    else params.push("ON_CHZ_TAG", "%%%");

    programId = "HITOPS3-CDS-DSN-S-LSTBLOCK_COM";
    fieldName = "YBLK";
  } else if (codTyp == GENERAL_COD.BAY) {
    params.push("YBLK", strWhere[1]);
    programId = "HITOPS3-CDS-DSN-S-LSTBAYBYBLOCK";
    fieldName = "YBAY";
  } else if (codTyp == GENERAL_COD.SERVICE_AREA) {
    programId = "HITOPS3-CDS-DSN-S-GETSERVICEAREANO";
    fieldName = "SA_NO";
  } else if (codTyp == GENERAL_COD.LANE) {
    programId = "HITOPS3-CDS-DSN-S-GETLANENO";
    fieldName = "LANE_NO";
  } else if (codTyp == GENERAL_COD.BERTH) {
    programId = "HITOPS3-CDS-DSN-S-GETBERTHNO";
    fieldName = "BTH_NO";
  } else if (codTyp == GENERAL_COD.YT) {
    programId = "HITOPS3-OPR-YTP-S-LSTYT_COM";
    fieldName = "YT_NO";
  } else if (codTyp == GENERAL_COD.QC) {
    programId = "HITOPS3-CDS-COD-S-LSTQC_COM";
    fieldName = "EQP_NO";
  } else if (codTyp == GENERAL_COD.TRUCKER) {
    programId = "HITOPS3-GTE-COD-J-LSTTRKCOINFO";
    params.push("TRK_CO", "%");
    params.push("CO_DESC", "%");
    fieldName = "TRK_CO";
  } else if (codTyp == GENERAL_COD.VVD) {
    params.push("VVD_YEAR", strWhere[1]);
    programId = "HITOPS3-PLN-SHP-S-LSTVVD_BYYEAR";
    fieldName = "VVD";
  } else if (codTyp == GENERAL_COD.VVDNEW) {
    params.push("VVD_YEAR", strWhere[1]);
    programId = "HITOPS3-PLN-SHP-S-LSTVVD_BYYEAR2";
    fieldName = "VVD";
  } else if (codTyp == GENERAL_COD.VVDACT) {
    params.push("VVD_YEAR", strWhere[1]);
    programId = "HITOPS3-PLN-SHP-S-LSTVVD_BYYEAR3";
    fieldName = "VVD";
  } else if (codTyp == GENERAL_COD.VVDACTALL) {
    params.push("VVD_YEAR", strWhere[1]);
    programId = "HITOPS3-PLN-SHP-S-LSTVVD_BYYEAR4";
    fieldName = "VVD";
  } else if (codTyp == GENERAL_COD.VVD_LATEST) {
    params.push("VVD_YEAR", strWhere[1]);
    programId = "HITOPS3-PLN-SHP-S-LSTLATESTVVD_BYYEAR";
    fieldName = "VVD";
  } else if (codTyp == GENERAL_COD.VESSEL) {
    programId = "HITOPS3-CDS-DSN-S-LSTVESSELCOD_COM";
    fieldName = "VSL_COD";
  } else if (codTyp == GENERAL_COD.PORT) {
    programId = "HITOPS3-CDS-COD-S-LSTPORTCODE_COM";
    fieldName = "PORT";
  } else if (codTyp == GENERAL_COD.PORT_ONLY) {
    programId = "HITOPS3-CDS-COD-S-LSTPORTCODE_COM2";
    fieldName = "PORT_ONLY";
  } else if (codTyp == GENERAL_COD.PORT_BY_ROUTE) {
    params.push("ROUTE", strWhere[1]);
    programId = "HITOPS3-CDS-COD-S-LSTPORTCODEBYROUTE_COD";
    fieldName = "PORT";
  } else if (codTyp == GENERAL_COD.PORT_BY_VVD) {
    params.push("VVD_YEAR", strWhere[1]);
    params.push("VVD", strWhere[2]);
    programId = "HITOPS3-CDS-COD-S-LSTPORTBYVVD_COM";
    fieldName = "PORT";
  } else if (codTyp == GENERAL_COD.ROUTE) {
    programId = "HITOPS3-CDS-COD-S-LSTROUTECODE_COM";
    fieldName = "ROUTE";
  } else if (codTyp == GENERAL_COD.ROUTEGROUP) {
    programId = "HITOPS3-CDS-COD-S-LSTROUTEGRPCODE_COM";
    fieldName = "ROUTE_GRP";
  } else if (codTyp == GENERAL_COD.NATION) {
    programId = "HITOPS3-CDS-COD-S-LSTNATIONCODE_COM";
    fieldName = "NAT";
  } else if (codTyp == GENERAL_COD.OPERATOR) {
    programId = "HITOPS3-CDS-COD-S-LSTOPRCODE_COM";
    fieldName = "OPR";
  } else if (codTyp == GENERAL_COD.ACT_OPR) {
    programId = "HITOPS3-CDS-COD-S-LSTACTOPRCOD_COM";
    fieldName = "ACT_OPR";
  } else if (codTyp == GENERAL_COD.CNTR_SIZE) {
    programId = "HITOPS3-CDS-COD-S-LSTCNTRSIZECODE";
    fieldName = "CNTR_SIZ";
  } else if (codTyp == GENERAL_COD.CNTR_TYPE) {
    programId = "HITOPS3-CDS-COD-S-LSTCNTRTYPECODE";
    fieldName = "CNTR_TYP";
  } else if (codTyp == GENERAL_COD.CNTR_OPR_TYPE) {
    programId = "HITOPS3-CDS-COD-S-LSTCNTRTYPECODE";
    fieldName = "CNTR_TYP";
  } else if (codTyp == GENERAL_COD.CARGO_TYPE) {
    programId = "HITOPS3-CDS-COD-S-LSTCARGOTYPECODE";
    fieldName = "CARGO_TYP";
  } else if (codTyp == GENERAL_COD.ISO_SZTP) {
    programId = "HITOPS3-CDS-COD-S-LSTISOCODE_COM";
    fieldName = "ISO_COD";
  } else if (codTyp == GENERAL_COD.LINER_SZTP) {
    programId = "HITOPS3-CDS-COD-S-LSTLINERCODE_COM";
    fieldName = "LNR_COD";
  } else if (codTyp == GENERAL_COD.CYS_OPR) {
    programId = "HITOPS3-CYS-COD-S-LSTCYSOPR";
    fieldName = "CNTR_OPR";
  } else if (codTyp == GENERAL_COD.CY_USAGE_COD) {
    params.push("ON_DOCK_TAG", strWhere[1] == "*" ? "%%%" : strWhere[1]);
    programId = "HITOPS3-CDS-COD-S-LSTCYUSAGECOD_COM";
    fieldName = "CY_USAGE_COD";
  } else if (codTyp == GENERAL_COD.CURRENCY) {
    programId = "HITOPS3-CDS-COD-S-LSTCURRENCY_COM";
    fieldName = "CURRENCY";
  } else if (codTyp == GENERAL_COD.POOL_SCHE_EQP_TYP) {
    programId = "HITOPS3-OPR-YTP-S-LSTSCHDTRGTKND_COM";
    fieldName = "SCHD_TRGT_KND";
  } else if (codTyp == GENERAL_COD.POOL_SCHE_EQP_NO) {
    params.push("SCHD_TRGT_KND", strWhere[1]);
    params.push("START_DTE", strWhere[2]);
    params.push("END_DTE", strWhere[3]);
    programId = "HITOPS3-OPR-YTP-S-LSTSCHDTRGT_COM";
    fieldName = "SCHD_TRGT";
  } else if (codTyp == GENERAL_COD.TARIFF_DUE_TYP) {
    programId = "HITOPS3-CDS-COD-S-LSTTARIFFDUETYP_COM";
    fieldName = "TARIFF_DUE_TYP";
  } else if (codTyp == GENERAL_COD.CNTR_HOLD) {
    programId = "HITOPS3-CDS-COD-S-LSTCNTRHOLDCODE_COM";
    fieldName = "HOLD_COD";
  } else if (codTyp == GENERAL_COD.GATE_NO) {
    programId = "HITOPS3-CDS-DSN-S-LSTGATE_COM";
    fieldName = "GAT_NO";
  } else if (codTyp == GENERAL_COD.VESSEL_BAY) {
    params.push("VSL_COD", strWhere[1]);
    programId = "HITOPS3-CDS-DSN-S-LSTVSLBAY_COM";
    fieldName = "VBAY";
  }

  console.log(
    `getGeneralCode >> programId(${programId}), param(${JSON.stringify(
      params
    )})`
  );

  return axios
    .post(API_URL, {
      programId: programId,
      param: JSON.stringify(params),
      fileName: "",
    })
    .then((res) => {
      console.log(`getGeneralCode query result`, res.data);

      res.data.filter((item) => {
        retArray.push(item[fieldName]);
      });

      console.log(`getGeneralCode return list`, retArray);

      return retArray;
    })
    .catch((err) => {
      console.log(err);
    });
};
