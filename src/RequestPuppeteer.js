const puppeteer = require("puppeteer");
import { getDocumentInnerHTML } from './puppeteerEvaluateFunction'

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

export async function loadPageMarkup(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.evaluate(getDocumentInnerHTML);
  await browser.close();
  return html;
}
