async function getActiveItem(page, itemSelector) {
    const selector = `${itemSelector} > div.v-input__slot > div.v-select__slot > div.v-select__selections`;
    const target = await page.$(selector);
    return (await (await target.getProperty('textContent')).jsonValue()).trim();
}

module.exports = getActiveItem;