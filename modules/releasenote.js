async function releasenoteCheck(page) {
  const isLoadingSucceeded = await page.$('.tablist').then(res => !!res);
  if(isLoadingSucceeded) return;

  const INPUT_CHECKBOX = ".releasenote-control > .col .v-input input[type=checkbox]";
  await page.waitFor(1000);
  await page.waitForSelector(INPUT_CHECKBOX);
}

async function releasenoteThrow(page) {
  // const isLoadingSucceeded = await page.$('.tablist').then(res => !!res);
  // if(isLoadingSucceeded) return;
  const INPUT_CHECKBOX = "input[type=checkbox]";
  const RELEASENOTE_THROW =
    ".releasenote-control > .col button[type=button].v-btn.primary";
  await page.waitFor(1000);
  await page.click(INPUT_CHECKBOX);
  await page.click(RELEASENOTE_THROW);
}

module.exports = {
  releasenoteCheck,
  releasenoteThrow,
};
