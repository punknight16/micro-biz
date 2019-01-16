const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;

var ADD_ACCESS_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var ADD_ACCESS_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var ADD_ACCESS_CRED_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var ADD_ACCESS_RESOURCE_ID = 'body > form > fieldset > input[type="text"]:nth-child(5)';
var ADD_ACCESS_UNIVERSAL_ID = 'body > form > fieldset > input[type="text"]:nth-child(6)';
var ADD_ACCESS_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(8)';

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
describe('root login', ()=>{
	it('checks the add access permssions from the browser', async ()=>{
		await page.goto('http://localhost:3000/permissions/add/form');
			
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
});

after(async () => {
  await browser.close()
})