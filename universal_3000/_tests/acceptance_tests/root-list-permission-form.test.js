const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;

var TOKEN_ID_SELECTOR = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var PUBLIC_TOKEN_SELECTOR = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var UNIVERSAL_ID_SELECTOR = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var LIST_ACCESS_SUBMIT_SELECTOR = 'body > form > fieldset > input[type="submit"]:nth-child(6)';


let browser
let page

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
});
var token_obj = {
	token_id: 't0',
	public_token: 'k0'
};
describe('root list permissions', ()=>{
	it('checks the list access permssions from the browser', async ()=>{
		await page.goto('http://localhost:3000/permissions/list/form');
		await page.focus(TOKEN_ID_SELECTOR);
		await page.keyboard.type(token_obj.token_id);
		await page.focus(PUBLIC_TOKEN_SELECTOR);
		await page.keyboard.type(token_obj.public_token);
		await page.focus(UNIVERSAL_ID_SELECTOR);
		await page.keyboard.type('r0');
		await page.click(LIST_ACCESS_SUBMIT_SELECTOR);
		await page.waitFor(2*1000);
		var permission_str = await page.evaluate(() => document.body.textContent);
		await page.screenshot({ path: 'screenshots/root-access-submit.png' });
		var slice_index = permission_str.indexOf(':');
		var permission_arr = JSON.parse(permission_str.slice(slice_index+1));
		console.log("permission_arr[0]: ", permission_arr[0]);
		assert(permission_arr.length >= 21);
	}).timeout(10000)
});

after(async () => {
  await browser.close()
})