const { json, text } = require("body-parser");
const port = 5000
var express = require("express");
var app = express();
app.listen((port), () => {
 console.log("Server running on port") + (port);
});

// strona 404
app.use(function(req, res, next){
  res.status(404);
if (req.accepts('json'))
  res.send({ error: 'url not found' });
  return;

 });
// screenshot
app.get("/screenshot", (req, res, next) => {
    const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://' + (req.query.url));
  await page.waitFor(1000);
  await page.screenshot({path: 'example.png', fullPage: true});

  await browser.close();
  res.sendFile(__dirname + '/example.png');
})();
   });