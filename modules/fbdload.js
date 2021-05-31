const puppeteer = require('puppeteer-core');
const browserFetcher = puppeteer.createBrowserFetcher()
const fs = require('fs')
const https = require('https')
const fbDownload = async(videoLink,cb) =>{
    var date = new Date()
    date = date.toString().split(' ').splice(0,5).join('_').replace(/:/g,'-')
    videoLink = videoLink.replace('https://www.','')

    const browser = await puppeteer.launch({headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
    const page = await browser.newPage();
    await page.goto('https://m.'+videoLink)
    await page.waitForSelector('._1o0y')
    // await page.click('._1o0y')
    const videoUrl = await page.evaluate(()=>{
        document.querySelector('._1o0y').click()
        return document.querySelector('video').src
    })
    return cb(videoUrl)
    // await page.goto(videoUrl)
    
    // var download = (url, cb) =>{
    //     var file = fs.createWriteStream(date+'.mp4')
    //     https.get(url, function(response) {
    //         response.pipe(file);
    //         file.on('finish', function() {
    //             console.log('Downloaded')
    //           file.close(cb);
    //         });
    //       });
    // } 
    // download(videoUrl)

};
module.exports = {fbDownload}
