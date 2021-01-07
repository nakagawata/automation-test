async function login(page, url, email, password) {
    const INPUT_EMAIL = "input[type=email]";
    const INPUT_PASSWORD = "input[type=password]";
    const SUBMIT = "button[type=submit]";
    await page.goto(`${url}/`,  {waitUntil: "domcontentloaded"});
    // const isLoadingSucceeded = await page.$('.tablist').then(res => !!res);
    // if(isLoadingSucceeded) return;
    await page.waitForSelector(".entry");
    await page.type(INPUT_EMAIL, email);
    await page.type(INPUT_PASSWORD, password);
    await page.click(SUBMIT);
}

module.exports = login;