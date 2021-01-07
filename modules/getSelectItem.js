async function getSelectItem(
  page,
  targetSelectBox,
  targetInnerItem,
  targetMetadata
) {
  let targetInner = `${targetInnerItem} .v-list-item `;
  let results = [];
  let flag = true;
  await page.waitFor(500);
  await page.waitForSelector(targetSelectBox);
  await page.click(targetSelectBox);
  await page.waitFor(500);
  await page.waitForSelector(targetInner);
  targetInner = await page.$$(targetInner);
  for (let i = 0; i < targetInner.length; i++) {
    const getItem = await (await targetInner[i].getProperty(
      "textContent"
    )).jsonValue();
    results.push(getItem.trim());
  }
  // for (let i = 0; i < targetMetadata.length; i++) {
  //   if (!results.includes(targetMetadata[i].text)) {
  //     flag = false;
  //     break;
  //   }
  // }

  return { length: results.length, innerItem:results};
}
module.exports = getSelectItem;
