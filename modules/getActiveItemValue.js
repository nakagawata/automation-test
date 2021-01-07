async function getActiveItemValue(page, itemSelector) {
    const selector = `${itemSelector} > div.v-input__slot > div.v-select__slot > input[type=hidden]`;
    return await page.$eval(selector, el => el.value);
}

module.exports = getActiveItemValue;