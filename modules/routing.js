async function routing(page, baseUrl, targetRoute) {
  await page.goto(`${baseUrl}${targetRoute}`, {
    waitUntil: "domcontentloaded",
  });
}
module.exports = routing;
