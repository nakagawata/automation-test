const {
  STAGE_BASE_URL,
  STAGE_EMAIL,
  STAGE_PASSWORD,
} = require("dotenv").config().parsed;
const constants = require("../../const/const");
const gatewayId = require("../../expects/gwid.json");
// const metadata = require("../../../const/deviceConfig.json");
const login = require("../../modules/login");
const releasenote = require("../../modules/releasenote");
const routing = require("../../modules/routing");
// const selectInnerItem = require("../../../modules/selectSelectboxInneritem");
// const getSelectItem = require("../../../modules/getSelectItem");
// const getActiveItem = require("../../../modules/getActiveItem");
// const getActiveItemValue = require("../../../modules/getActiveItemValue");
const expectedValue = require("../../expects/gateway/systemSetting.json");

const { nameSetting } = constants.selectors.gatewaySetting;

// const targetMetadata = metadata.通信設定[1].通信モード.filter(
//   (item) => item.value === 1
// )[0];

describe("TEST : システム再設定一連フロー自動テスト)", () => {
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

    describe("TEST : 名称変更", () => {
      it("タイトルのゲートウェイ名が期待値と一致していること", async (done) => {
        await page.waitFor(500);
        const currentNameValue = await page.$eval(
          nameSetting.currentNameValue,
          (el) => el.value
        );
        expect(currentNameValue.trim()).toBe(
          expectedValue.nameSetting.currentName
        );
        done();
      });

      it("現在の名称が期待値と一致していること", async (done) => {
        await page.waitFor(500);
        let titleGatewayNameText = await page.$(
          nameSetting.titleGatewayNameText
        );
        titleGatewayNameText = await (await titleGatewayNameText.getProperty(
          "textContent"
        )).jsonValue();
        expect(titleGatewayNameText.trim()).toBe(
          expectedValue.nameSetting.titleGatewayName
        );
        done();
      });

      it("新しい名称が期待値と一致していること", async (done) => {
        await page.waitFor(500);
        const newNameValue = await page.$eval(
          nameSetting.newNameValue,
          (el) => el.value
        );
        expect(newNameValue.trim()).toBe(expectedValue.nameSetting.newName);
        done();
      });
    });
  });
});
