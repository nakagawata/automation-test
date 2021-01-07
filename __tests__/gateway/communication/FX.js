const {
  STAGE_BASE_URL,
  STAGE_EMAIL,
  STAGE_PASSWORD,
} = require("dotenv").config().parsed;
const constants = require("../../../const/const");
const gatewayId = require("../../../expects/gwid.json");
const metadata = require("../../../const/deviceConfig.json");
const login = require("../../../modules/login");
const releasenote = require("../../../modules/releasenote");
const routing = require("../../../modules/routing");
const selectInnerItem = require("../../../modules/selectSelectboxInneritem");
const getSelectItem = require("../../../modules/getSelectItem");
const getActiveItem = require("../../../modules/getActiveItem");
const getActiveItemValue = require("../../../modules/getActiveItemValue");
const expectedValue = require("../../../expects/gateway/communication/FX.json");

const { communicationSetting } = constants.selectors.gatewaySetting;

const targetMetadata = metadata.通信設定[1].通信モード.filter(
  (item) => item.value === 1
)[0];

describe("TEST : 通信モード:FX選択時のバリデーションチェック)", () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
  });

  afterAll(async () => {
    await page.close();
  });

  describe("システム再設定画面:通信設定へ遷移", () => {
    it("ログイン", async () => {
      await login(page, STAGE_BASE_URL, STAGE_EMAIL, STAGE_PASSWORD);
      await releasenote.releasenoteCheck(page);
      let text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain(constants.context.releasenoteShowCheckText);
    });

    it("リリースノートに同意", async () => {
      await releasenote.releasenoteThrow(page);
      let text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain(constants.context.dashboardShowCheckText);
    });

    it("システム再設定画面へ遷移", async () => {
      await routing(
        page,
        STAGE_BASE_URL,
        `/gateway/${gatewayId.id}/systemconfig`
      );
      await page.waitFor(1000);
      await page.waitForSelector(constants.selectors.gatewaySetting.isTitle);
      expect(
        await page
          .$(constants.selectors.gatewaySetting.isTitle)
          .then((res) => !!res)
      ).toBeTruthy();
    });

    it("システム再設定画面:通信設定へ遷移", async () => {
      await page.waitFor(1000);
      await page.click(
        constants.selectors.gatewaySetting.toCommunicationSettingButton
      );
      let text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain(
        constants.context.gatewaySetting.communicationSettingTitle
      );
    });
  });

  describe("TEST : 項目数・存在・選択チェック)", () => {
    it("通信モード：表示項目内容と項目数チェック", async (done) => {
      // 通信モードの選択肢個数とターゲット項目の存在確認
      const targetList = metadata.通信設定[1].通信モード.map((item) => {
        return { text: item.text };
      });
      const result = await getSelectItem(
        page,
        communicationSetting.communicationModeSelectBox,
        constants.selectors.selectBoxInner,
        targetList
      );
      
      expect(result.length).toBe(expectedValue.communicationMode.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.communicationMode.EnumList);
      done();
    });

    it("通信モード：FX3G/Uを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.communicationModeSelectBox);
      await page.waitFor(500);
      // 通信モードの選択
      const targetCommunicationMode = await selectInnerItem(
        page,
        communicationSetting.communicationModeSelectBox,
        constants.selectors.selectBoxInner,
        constants.communicationModeName.FX3G
      );
      await page.click(targetCommunicationMode);
      const value = await getActiveItemValue(page, communicationSetting.communicationModeSelectBox);
      const text = await getActiveItem(page, communicationSetting.communicationModeSelectBox);
      expect(value).toBe(expectedValue.communicationMode.value.toString());
      expect(text).toBe("通信モード： "+expectedValue.communicationMode.text);
      done();
    });

    it("ボーレート：表示項目内容と項目数チェック", async (done) => {
      // 通信モードの選択肢個数とターゲット項目の存在確認

      const result = await getSelectItem(
        page,
        communicationSetting.baudrateSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.ボーレート
      );
      
      expect(result.length).toBe(expectedValue.baudrate.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.baudrate.EnumList);
      done();
    });

    it("ボーレート：2.19200 bpsを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.baudrateSelectBox);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.baudrateSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.ボーレート.filter((item) => item.value === 1)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.baudrateSelectBox);
      const text = await getActiveItem(page, communicationSetting.baudrateSelectBox);
      expect(value).toBe(expectedValue.baudrate.value.toString());
      expect(text).toBe("ボーレート： "+expectedValue.baudrate.text);
      await page.waitFor(1000);
      done();
    });

    it("スタートビット：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.startBitSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.スタートビット
      );
      
      expect(result.length).toBe(expectedValue.startBit.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.startBit.EnumList);
      done();
    });

    it("スタートビット：1ビットを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.startBitSelectBox);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.startBitSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.スタートビット.filter((item) => item.value === 1)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.startBitSelectBox);
      const text = await getActiveItem(page, communicationSetting.startBitSelectBox);
      expect(value).toBe(expectedValue.startBit.value.toString());
      expect(text).toBe("スタートビット： "+expectedValue.startBit.text);
      done();
    });

    it("データレングス：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.datalengthSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.データレングス
      );
      
      expect(result.length).toBe(expectedValue.datalength.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.datalength.EnumList);
      done();
    });

    it("データレングス：8 ビットを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.datalengthSelectBox);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.datalengthSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.データレングス.filter((item) => item.value === 1)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.datalengthSelectBox);
      const text = await getActiveItem(page, communicationSetting.datalengthSelectBox);
      expect(value).toBe(expectedValue.datalength.value.toString());
      expect(text).toBe("データレングス： "+expectedValue.datalength.text);
      done();
    });

    it("ストップビット：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.stopBitSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.ストップビット
      );
      
      expect(result.length).toBe(expectedValue.stopBit.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.stopBit.EnumList);
      done();
    });

    it("ストップビット：1 ビットを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.stopBitSelectBox);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.stopBitSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.ストップビット.filter((item) => item.value === 1)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.stopBitSelectBox);
      const text = await getActiveItem(page, communicationSetting.stopBitSelectBox);
      expect(value).toBe(expectedValue.stopBit.value.toString());
      expect(text).toBe("ストップビット： "+expectedValue.stopBit.text);
      done();
    });

    it("パリティ：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.paritySelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.パリティ
      );
      
      expect(result.length).toBe(expectedValue.parity.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.parity.EnumList);
      done();
    });

    it("パリティ：なしを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.paritySelectBox);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.paritySelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.パリティ.filter((item) => item.value === 0)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.paritySelectBox);
      const text = await getActiveItem(page, communicationSetting.paritySelectBox);
      expect(value).toBe(expectedValue.parity.value.toString());
      expect(text).toBe("パリティ： "+expectedValue.parity.text);
      done();
    });

    it("チェックサム：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.checksumSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.チェックサム
      );
      
      expect(result.length).toBe(expectedValue.checksum.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.checksum.EnumList);
      done();
    });

    it("チェックサム：ありを選択", async (done) => {
      await page.waitFor(500);
      await page.click(communicationSetting.checksumSelectBox);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.checksumSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.チェックサム.filter((item) => item.value === 1)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.checksumSelectBox);
      const text = await getActiveItem(page, communicationSetting.checksumSelectBox);
      expect(value).toBe(expectedValue.checksum.value.toString());
      expect(text).toBe("チェックサム： "+expectedValue.checksum.text);
      done();
    });

    it("crlf：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.crlfSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.crlf
      );
      
      expect(result.length).toBe(expectedValue.crlf.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.crlf.EnumList);
      done();
    });

    it("crlf：CR/LFありを選択", async (done) => {
      await page.waitFor(500);
      await page.click(constants.selectors.selectBoxInner);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.crlfSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.crlf.filter((item) => item.value === 3)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.crlfSelectBox);
      const text = await getActiveItem(page, communicationSetting.crlfSelectBox.toString());
      expect(value).toBe(expectedValue.crlf.value.toString());
      expect(text).toBe("CR/LF： "+expectedValue.crlf.text);
      done();
    });

    it("フロー制御：表示項目内容と項目数チェック", async (done) => {
      await page.waitFor(500);
      const result = await getSelectItem(
        page,
        communicationSetting.flowSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.フロー制御
      );
      
      expect(result.length).toBe(expectedValue.flow.EnumList.length);
      expect(result.innerItem).toEqual(expectedValue.flow.EnumList);
      done();
    });

    it("フロー制御：CR/LFありを選択", async (done) => {
      await page.waitFor(500);
      await page.click(constants.selectors.selectBoxInner);
      await page.waitFor(500);
      const result = await selectInnerItem(
        page,
        communicationSetting.flowSelectBox,
        constants.selectors.selectBoxInner,
        targetMetadata.フロー制御.filter((item) => item.value === 0)[0].text
      );
      await page.click(result);
      const value = await getActiveItemValue(page, communicationSetting.flowSelectBox);
      const text = await getActiveItem(page, communicationSetting.flowSelectBox);
      expect(value).toBe(expectedValue.flow.value.toString());
      expect(text).toBe("フロー制御： "+expectedValue.flow.text);
      done();
    });

    describe("TEST : バリデーション)", () => {
      it("パリティ：なし選択中にデータレングス：7に変更した際、パリティが「偶数」になっていること", async (done) => {
        await page.waitFor(500);
        // データレングスを7ビット(value:0)に変更
        const result = await selectInnerItem(
          page,
          communicationSetting.datalengthSelectBox,
          constants.selectors.selectBoxInner,
          targetMetadata.データレングス.filter((item) => item.value === 0)[0]
            .text
        );
        await page.click(result);
        await page.waitFor(500);

        const datalengthText = await getActiveItem(
          page,
          communicationSetting.datalengthSelectBox
        );
        const datalengthValue = await getActiveItemValue(page, communicationSetting.datalengthSelectBox);
        expect(datalengthText).toBe(
          `データレングス： ${ expectedValue.validation.datalengthSevenAutoSelectParityEven.datalength.text }`
        ); // 7 ビット
        expect(datalengthValue).toBe(expectedValue.validation.datalengthSevenAutoSelectParityEven.datalength.value.toString());

        const parityText = await getActiveItem(
          page,
          communicationSetting.paritySelectBox
        );
        const parityValue = await getActiveItemValue(page, communicationSetting.paritySelectBox);
        expect(parityText).toBe(
          `パリティ： ${ expectedValue.validation.datalengthSevenAutoSelectParityEven.activeParity.text }`
        ); // 偶数
        expect(parityValue).toBe(expectedValue.validation.datalengthSevenAutoSelectParityEven.activeParity.value.toString());
        done();
      });

      it("データレングス：7の時、パリティ選択可能項目が「偶数」「奇数」になっていること", async (done) => {
        await page.waitFor(1000);
        // データレングスが7ビットかの確認
        const datalengthText = await getActiveItem(
          page,
          communicationSetting.datalengthSelectBox
        );
        const datalengthValue = await getActiveItemValue(page, communicationSetting.datalengthSelectBox);
        expect(datalengthText).toBe(
          `データレングス： ${ expectedValue.validation.datalengthSevenSelectItemValue.datalength.text }`
        ); // 7 ビット
        expect(datalengthValue).toBe(expectedValue.validation.datalengthSevenSelectItemValue.datalength.value.toString());


        const result = await getSelectItem(
          page,
          communicationSetting.paritySelectBox,
          constants.selectors.selectBoxInner,
          targetMetadata.パリティ
        );
        await page.click(communicationSetting.paritySelectBox);
        expect(result.innerItem).toEqual(expectedValue.validation.datalengthSevenSelectItemValue.parityArray);
        done();
      });
    });
  });
});
