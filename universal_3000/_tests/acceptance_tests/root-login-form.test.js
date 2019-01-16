const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;

var EMAIL_SELECTOR = 'body > form > fieldset > input[type="email"]:nth-child(2)';
var PASSWORD_SELECTOR = 'body > form > fieldset > input[type="password"]:nth-child(3)';
var SUBMIT_SELECTOR = 'body > form > fieldset > input[type="submit"]:nth-child(5)';


let browser
let page

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
});
var token_obj;
describe('root login', ()=>{
	it('checks the login functionality from the browser', async ()=>{
		await page.goto('http://localhost:3000/login/form');
		await page.screenshot({ path: 'screenshots/login-form.png' });
		await page.focus(EMAIL_SELECTOR);
		await page.keyboard.type(CREDS.email);
		await page.focus(PASSWORD_SELECTOR);
		await page.keyboard.type(CREDS.password);
		await page.click(SUBMIT_SELECTOR);
		await page.waitFor(1*1000);
		var token_str = await page.evaluate(() => document.body.textContent);
		await page.screenshot({ path: 'screenshots/root-login-submit.png' });
		token_obj = JSON.parse(token_str);
		assert(token_obj.cred_id == 'c0');
		assert(token_obj.token_id == 't0');
		assert(token_obj.public_token == 'k0');
	}).timeout(10000)
});

after(async () => {
  await browser.close()
})