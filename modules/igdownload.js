const puppeteer = require('puppeteer-core');

(async function main() {
  try {
    const browser = await puppeteer.launch({headless: false, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/p/CNkovPQn9MQ/');

    page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'media') {
        console.log(request.url());
      }
      request.continue();
    });

    await page.click('body');
    // await page.waitFor(3000);
    // await page.click('body');

    // await browser.close();
  } catch (err) {
    console.error(err);
  }
})()


