const context = {
  releasenoteShowCheckText: "同意して利用を開始する",
  dashboardShowCheckText: "メニュー",
  gatewaySetting: {
    listShowCheckText: "ゲートウェイ設定管理",
    communicationSettingTitle: "エッジ通信",
  },
};


const selectors = {
  selectBoxInner: ".menuable__content__active .v-select-list",
  gatewaySetting: { 
    isTitle: ".step-title",
    toCommunicationSettingButton: "div.v-stepper__items > div:nth-child(1) > div > form > div > div.row.step-control-btn.justify-center > div:nth-child(2) > button",
    nameSetting: {
      titleGatewayNameText:"h1",
      currentNameValue: "div.v-stepper__items > div:nth-child(1) > div > form > div > div:nth-child(2) > .config-device-name > div > .v-input > .v-input__control > .v-input__slot > .v-text-field__slot > input[type='text']",
      newNameValue: "div.v-stepper__items > div:nth-child(1) > div > form > div > div:nth-child(3) > div > div > div > div > div.v-input__slot > div.v-text-field__slot > input[type='text']"
    },
    communicationSetting: {
      communicationModeSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div.v-input > div.v-input__control",
      baudrateSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(2) > div.v-input__control",
      startBitSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(3) > div.v-input__control",
      datalengthSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(4) > div.v-input__control",
      stopBitSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(5) > div.v-input__control",
      paritySelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(6) > div.v-input__control",
      checksumSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(7) > div.v-input__control",
      crlfSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(8) > div.v-input__control",
      flowSelectBox: "div.v-stepper__items > div:nth-child(2) > div > form > div > div.row.config-itemgroup-row > div:nth-child(1) > .config-itemgroup-row-firstitem > div:nth-child(9) > div.v-input__control"
    }
  }
}


// 通信モード
const communicationMode = {
  MODBUS_RTU: 0,
  FX3G: 1,
  MELSECQ: 2,
  RESERVED3: 3,
  RESERVED4: 4,
  KV: 5,
  TC_MINI: 6,
  SYSMAC: 7,
  FP: 8,
  RESERVED9: 9,
  TOSVERT_VF: 10,
  NM: 12,
};

const communicationModeName = {
  MODBUS_RTU: "Modbus RTU（マスタ）",
  FX3G: "FX3G/U（計算機リンク）",
  MELSECQ: "MELSEC-Qシリーズ（計算機リンク）",
  KV: "KVシリーズ（上位リンク）",
  TC_MINI: "TCmini",
  SYSMAC: "SYSMAC CJ/CPシリーズ（上位リンク）",
  FP: "FPシリーズ（MEWTOCOL-COM）",
  TOSVERT_VF: "TOSVERT VFシリーズ",
  NM: "NM専用(エッジ通信無し)",
}

const communicationDeviceLinks = {
  DEFAULT: "/help/connection_device.pdf",
  [communicationMode.MODBUS_RTU]: "/help/connection_device.pdf#Modbus_RTU",
  [communicationMode.FX3G]: "/help/connection_device.pdf#FX_Q",
  [communicationMode.MELSECQ]: "/help/connection_device.pdf#FX_Q",
  [communicationMode.KV]: "/help/connection_device.pdf#KV_series",
  [communicationMode.TC_MINI]: "/help/connection_device.pdf#TCmini",
  [communicationMode.SYSMAC]: "/help/connection_device.pdf#SYSMAC",
  [communicationMode.FP]: "/help/connection_device.pdf#FP",
  [communicationMode.TOSVERT_VF]: "/help/connection_device.pdf#TOSVERT_VF",
  [communicationMode.NM]: "/help/users_manual.pdf#NM_mode",
};

// ゲートウェイ設定、トリガ設定、デバイス設定等のマニュアルアンカーページ
const usersManualLinks = {
  DEFAULT: "/help/users_manual.pdf",
  GATEWAY_SETTING: "/help/users_manual.pdf#gateway_setting",
  GPS_SETTING: "/help/users_manual.pdf#gps_setting",
  CONTROL_MEMORY_SETTING: "/help/users_manual.pdf#control_memory_setting",
  TRIGGER_SETTING: "/help/users_manual.pdf#trigger_setting",
  COLLECT_SETTING: "/help/users_manual.pdf#collect_setting",
  STREAM_SETTING: "/help/users_manual.pdf#stream_setting",
  STREAM_COLLECT_SETTING: "/help/users_manual.pdf#stream_collect_setting",
  ALARMRECORDER_SETTING: "/help/users_manual.pdf#alarmrecorder_setting",
  SETTING_IN_EXP: "/help/users_manual.pdf#setting_in_exp",
};

module.exports = {
  context,
  selectors,
  communicationDeviceLinks,
  usersManualLinks,
  communicationModeName,
};
