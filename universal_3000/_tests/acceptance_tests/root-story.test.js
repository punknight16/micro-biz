const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;
var LOGIN_SELECTOR = 'body > fieldset > article:nth-child(2) > a';
var LIST_ACCESS_SELECTOR = 'body > fieldset > article:nth-child(3) > a';
var ADD_ACCESS_SELECTOR = 'body > fieldset > article:nth-child(4) > a';
var LIST_SALES_SELECTOR = 'body > fieldset > article:nth-child(5) > a';
var ADD_SALE_SELECTOR = 'body > fieldset > article:nth-child(6) > a';
var LIST_ENGAGEMENTS_SELECTOR = 'body > fieldset > article:nth-child(7) > a';

var EMAIL_SELECTOR = 'body > form > fieldset > input[type="email"]:nth-child(2)';
var PASSWORD_SELECTOR = 'body > form > fieldset > input[type="password"]:nth-child(3)';
var SUBMIT_SELECTOR = 'body > form > fieldset > input[type="submit"]:nth-child(5)';

var TOKEN_ID_SELECTOR = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var PUBLIC_TOKEN_SELECTOR = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var UNIVERSAL_ID_SELECTOR = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var LIST_ACCESS_SUBMIT_SELECTOR = 'body > form > fieldset > input[type="submit"]:nth-child(6)';

var ADD_ACCESS_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var ADD_ACCESS_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var ADD_ACCESS_CRED_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var ADD_ACCESS_RESOURCE_ID = 'body > form > fieldset > input[type="text"]:nth-child(5)';
var ADD_ACCESS_UNIVERSAL_ID = 'body > form > fieldset > input[type="text"]:nth-child(6)';
var ADD_ACCESS_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(8)';

var LIST_SALES_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var LIST_SALES_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var LIST_SALES_UNIVERSAL_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var LIST_SALES_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(6)';

var ADD_SALE_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var ADD_SALE_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var ADD_SALE_ACCOUNT_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var ADD_SALE_PAYMENT_AMOUNT = 'body > form > fieldset > input[type="text"]:nth-child(5)';
var ADD_SALE_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(7)';

var LIST_ENGAGEMENTS_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var LIST_ENGAGEMENTS_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var LIST_ENGAGEMENTS_CRED_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var LIST_ENGAGEMENTS_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(6)';

let browser
let page

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
});
var token_obj;
describe('root login', ()=>{
	it('checks the login functionality from the browser', async ()=>{
		await page.goto('http://localhost:3000/');
		await page.screenshot({ path: 'screenshots/index.png' });
		await page.click(LOGIN_SELECTOR);
		await page.waitFor(1*1000);		
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
	it('checks the list access permssions from the browser', async ()=>{
		await page.goto('http://localhost:3000/');
		await page.click(LIST_ACCESS_SELECTOR);
		await page.waitFor(2*1000);		
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
	it('checks the add access permssions from the browser', async ()=>{
		await page.goto('http://localhost:3000/');
		await page.click(ADD_ACCESS_SELECTOR);
		await page.waitFor(1*1000);		
		await page.focus(ADD_ACCESS_TOKEN_ID);
		await page.keyboard.type(token_obj.token_id);
		await page.focus(ADD_ACCESS_PUBLIC_TOKEN);
		await page.keyboard.type(token_obj.public_token);
		await page.focus(ADD_ACCESS_CRED_ID);
		await page.keyboard.type('c2');
		await page.focus(ADD_ACCESS_RESOURCE_ID);
		await page.keyboard.type('r3');
		await page.focus(ADD_ACCESS_UNIVERSAL_ID);
		await page.keyboard.type('a1');
		await page.click(ADD_ACCESS_SUBMIT);
		await page.waitFor(1*1000);
		var permission_obj_str = await page.evaluate(() => document.body.textContent);
		await page.screenshot({ path: 'screenshots/root-add-access-submit.png' });
		var permission_obj = JSON.parse(permission_obj_str);
		console.log("permission_id: ", permission_obj.permission_id);
		assert(permission_obj.permission_id.substring(0, 7)=='p-test0');
	}).timeout(10000)
	it('checks the list sales interactor from the browser', async ()=>{
		await page.goto('http://localhost:3000/');
		await page.click(LIST_SALES_SELECTOR);
		await page.waitFor(2*1000);		
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
	it('checks the add sale interactor from the browser', async ()=>{
		await page.goto('http://localhost:3000/');
		await page.click(ADD_SALE_SELECTOR);
		await page.waitFor(1*1000);		
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
	it('checks the list engagements interactor from the browser', async ()=>{
		await page.goto('http://localhost:3000/');
		await page.click(LIST_ENGAGEMENTS_SELECTOR);
		await page.waitFor(1*1000);		
		await page.focus(LIST_ENGAGEMENTS_TOKEN_ID);
		await page.keyboard.type(token_obj.token_id);
		await page.focus(LIST_ENGAGEMENTS_PUBLIC_TOKEN);
		await page.keyboard.type(token_obj.public_token);
		await page.focus(LIST_ENGAGEMENTS_CRED_ID);
		await page.keyboard.type('r0');
		await page.click(LIST_ENGAGEMENTS_SUBMIT);
		await page.waitFor(1*1000);
		var engagements_str= await page.evaluate(() => document.body.textContent);
		var slice_index = engagements_str.indexOf(':');
		var engagements_arr = JSON.parse(engagements_str.slice(slice_index+1));
		console.log("engagements_arr[0]: ", engagements_arr[0]);
		assert(engagements_arr.length>=4);

	}).timeout(20000)
});

after(async () => {
  await browser.close()
})