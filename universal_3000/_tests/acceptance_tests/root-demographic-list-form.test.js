const assert = require('assert');
const puppeteer = require('puppeteer');

var CREDS = require('../../../_config/creds').root_creds;

var LIST_DEMOGRAPHIC_TOKEN_ID = 'body > form > fieldset > input[type="text"]:nth-child(2)';
var LIST_DEMOGRAPHIC_PUBLIC_TOKEN = 'body > form > fieldset > input[type="text"]:nth-child(3)';
var LIST_DEMOGRAPHIC_CRED_ID = 'body > form > fieldset > input[type="text"]:nth-child(4)';
var LIST_DEMOGRAPHIC_SUBMIT = 'body > form > fieldset > input[type="submit"]:nth-child(6)';

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
describe('root demographic list form', ()=>{
	it('checks the list demographic interactor from the browser', async ()=>{
		await page.goto('http://localhost:3000/demographic/inspect/form');
		
		await page.focus(LIST_DEMOGRAPHIC_TOKEN_ID);
		await page.keyboard.type(token_obj.token_id);
		await page.focus(LIST_DEMOGRAPHIC_PUBLIC_TOKEN);
		await page.keyboard.type(token_obj.public_token);
		await page.focus(LIST_DEMOGRAPHIC_CRED_ID);
		await page.keyboard.type('r0');
		await page.click(LIST_DEMOGRAPHIC_SUBMIT);
		await page.waitFor(1*1000);
		var demographic_str= await page.evaluate(() => document.body.textContent);
		var slice_index = demographic_str.indexOf(':');
		var demographic_arr = JSON.parse(demographic_str.slice(slice_index+1));
		//console.log("demographic_obj: ", demographic_arr);
		assert(demographic_arr.length>=3);
	}).timeout(20000)
});

after(async () => {
  await browser.close()
})