async function selectInnerItem(
  page,
  targetSelectBox,
  targetSelectItem,
  targetTextContent
) {
  let resultsArray = [];
  let flag = 0;
  let targetInnerElm = ` ${targetSelectItem} .v-list-item`;
  await page.waitFor(500);
  await page.waitForSelector(targetSelectBox);
  await page.click(targetSelectBox);
  await page.waitFor(500);
  await page.waitForSelector(targetInnerElm);
  targetInnerElm = await page.$$(targetInnerElm);
  for (let i = 0; i < targetInnerElm.length; i++) {
    // 選択項目一覧のテキストプロパティを取得
    const getItem = await (await targetInnerElm[i].getProperty(
      "textContent"
    )).jsonValue();
    // 表示されている項目の一覧を取得 & 配列へ格納
    resultsArray.push(getItem);
    // 任意の項目に一致する項目をマッチさせる
    if (resultsArray[i].match(new RegExp(targetTextContent))) {
      flag = i + 1;
      break;
    }
  }

  return `${targetSelectItem} > div:nth-child(${flag})`;
}

module.exports = selectInnerItem;
