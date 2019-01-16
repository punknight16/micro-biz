const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;

var LIST_SALES_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var LIST_SALES_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var LIST_SALES_UNIVERSAL_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var LIST_SALES_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(6)';

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
});
var token_obj = {
	token_id: 't0',
	public_token: 'k0'
};
describe('root list sales form', ()=>{
	it('checks the list sales interactor from the browser', async ()=>{
		await page.goto('http://localhost:3000/sale/list/form');
		
		await page.focus(LIST_SALES_TOKEN_ID);
		await page.keyboard.type(token_obj.token_id);
		await page.focus(LIST_SALES_PUBLIC_TOKEN);
		await page.keyboard.type(token_obj.public_token);
		await page.focus(LIST_SALES_UNIVERSAL_ID);
		await page.keyboard.type('r0');
		await page.click(LIST_SALES_SUBMIT);
		await page.waitFor(2*1000);
		var sales_str= await page.evaluate(() => document.body.textContent);
		var slice_index = sales_str.indexOf(':');
		var sales_arr = JSON.parse(sales_str.slice(slice_index+1));
		console.log("sales_arr[0]: ", sales_arr[0]);
		assert(sales_arr.length>=4);
	}).timeout(10000)
});

after(async () => {
  await browser.close()
})