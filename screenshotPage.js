const getBrowser = require("./browser");

const screenshotPage = async (url, goto = {}, screenshot = {}) => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
    ...goto,
  });

  const { clip, ...others } = screenshot || {};

  /** @type {Uint8Array} */
  const uint8 = await page.screenshot({
    ...others,
    type: "png",
    encoding: "binary",
    clip: {
      x: 0,
      y: 0,
      width: 800,
      height: 600,
      ...clip,
    },
  });

  await page.close();

  return Buffer.from(uint8);
};

module.exports = screenshotPage;
