const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;

var ADD_SALE_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var ADD_SALE_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var ADD_SALE_ACCOUNT_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var ADD_SALE_PAYMENT_AMOUNT = 'body > form > fieldset > input[type="text"]:nth-child(5)';
var ADD_SALE_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(7)';

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
});
var token_obj = {
	token_id: 't0',
	public_token: 'k0'
};
describe('root sales add form', ()=>{
	it('checks the add sale interactor from the browser', async ()=>{
		await page.goto('http://localhost:3000/sale/add/form');
		
		await page.focus(ADD_SALE_TOKEN_ID);
		await page.keyboard.type(token_obj.token_id);
		await page.focus(ADD_SALE_PUBLIC_TOKEN);
		await page.keyboard.type(token_obj.public_token);
		await page.focus(ADD_SALE_ACCOUNT_ID);
		await page.keyboard.type('a-test');
		await page.focus(ADD_SALE_PAYMENT_AMOUNT);
		await page.keyboard.type('$0.00');
		await page.click(ADD_SALE_SUBMIT);
		await page.waitFor(1*1000);
		var sale_obj_str = await page.evaluate(() => document.body.textContent);
		var sale_obj = JSON.parse(sale_obj_str);
		console.log("sale_id: ", sale_obj.sale_id);
		assert(sale_obj.sale_id.substring(0, 7)=='s-test0');
	}).timeout(10000)
});

after(async () => {
  await browser.close()
})