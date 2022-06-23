const { json, text } = require("body-parser");
var port = 5000
var express = require("express");
var app = express();
app.listen(8888, () => {
 console.log("Server running on port 8888")
});

// screenshot
app.get("/screenshot", (req, res, next) => {
    const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://' + (req.query.url));
  await page.waitFor(1000);
  await page.screenshot({path: 'website.png', fullPage: true});

  await browser.close();
  res.sendFile(__dirname + '/website.png');
  })();
});

//pdf
app.get("/pdf", (req, res, next) => {
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://' + (req.query.url), {
      waitUntil: 'networkidle2',
    });
    await page.waitFor(2000);
    await page.pdf({path: 'website.pdf', fullPage: true, format: 'a4'});
  
    await browser.close();
    res.sendFile(__dirname + '/website.pdf')
  })();
});
