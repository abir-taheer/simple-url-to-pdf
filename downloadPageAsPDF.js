const getBrowser = require("./browser");

const downloadPageAsPDF = async (url, goto = {}, pdf = {}) => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
    ...goto,
  });

  // uint8array
  const uint8 = await page.pdf({
    format: "letter",
    printBackground: true,
    margin: {
      top: "0.4in",
      bottom: "0.4in",
      left: "0.4in",
      right: "0.4in",
    },
    waitForFonts: true,
    ...pdf,
  });

  await page.close();

  return Buffer.from(uint8);
};

module.exports = downloadPageAsPDF;
