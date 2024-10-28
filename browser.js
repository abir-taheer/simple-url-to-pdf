const puppeteer = require("puppeteer");

let browser = null;

const getBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });
  }

  return browser;
};

module.exports = getBrowser;
