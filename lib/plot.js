'use strict';

const puppeteer = require('puppeteer');
var path = require('path')

var Chart = function (HTMLTemplate) {
	this.defaultChartHTMLTemplate = HTMLTemplate || path.join(__dirname, '../default-chart-style/index.html')
	return this;
}

Chart.prototype.plot = function (pageParms, done) {
	(async(self, pageParms, done) => {
		var self = this
		const browser = await puppeteer.launch(pageParms.headlessSettings);
		let page = await browser.newPage();
		page.on('pageerror', exception => {
			throw (exception);
		});
		page.on('console', msg => console.log('PAGE LOG:', msg.args));

		await page.setViewport({
			width: pageParms.viewport.width,
			height: pageParms.viewport.height,
			deviceScaleFactor: pageParms.viewport.deviceScaleFactor,
		});
		console.log('rendering image using \'' + self.defaultChartHTMLTemplate + '\'...')
		await page.goto('file:///' + self.defaultChartHTMLTemplate);
		await page.addScriptTag({
			content: "window.chartioSettings = " + JSON.stringify(pageParms)
		})
		// await page.evaluate((pageParms) => initializePageParameters(pageParms))
		await page.evaluate(() => drawChartTraces())

		await page.waitFor('body.done')
		await page.screenshot({
			path: pageParms.outputFilename || 'chart.png'
		});
		await browser.close()
		console.log('image rendered to ' + pageParms.outputFilename)
		if (done) {
			done()
		}
	})(this, pageParms, done);
}

module.exports = Chart