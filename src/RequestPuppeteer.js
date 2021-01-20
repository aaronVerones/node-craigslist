const puppeteer = require("puppeteer");
import { getDocumentInnerHTML } from "./puppeteerEvaluateFunction";

function buildUrl(options) {
  const protocol = options.secure ? "https://" : "http://";
  return `${protocol}${options.hostname}${options.path}`;
}

export class RequestPuppeteer {
  constructor(options) {
    this.options = options;
  }

  async get(options) {
    options = Object.assign(this.options, options);
    const url = buildUrl(options);
    return await loadPageMarkup(url);
  }
}

let browser;
export async function loadPageMarkup(url) {
  if (!browser) {
    browser = await puppeteer.launch();
  }
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  const html = await page.evaluate(getDocumentInnerHTML);
  return html;
}
