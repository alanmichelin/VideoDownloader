const puppeteer = require('puppeteer-core');
//https://www.youtube.com/results?search_query=${videoName}&sp=EgIQAQ%253D%253D

const multiDownload = async(videoList, cb) =>{

const browser = await puppeteer.launch({headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page = await browser.newPage();
var listaVideos = []
for(var i=0;i<videoList.length;i++){ 
videoList[i].replace(/ /g,'+')

await page.goto(`https://www.youtube.com/results?search_query=${videoList[i]}&sp=EgIQAQ%253D%253D`);
await page.waitForSelector('#content')
listaVideos.push(
await page.evaluate(()=>{
        const vidsContainer= document.querySelector('#contents> .ytd-section-list-renderer > #contents')

        let videoLink = vidsContainer.children[0].querySelector('#thumbnail').href


        return videoLink
        
        }))
        
    }
    return cb(listaVideos)
};
module.exports={multiDownload}
// multiDownload(['northlane-quantum flux', 'northlane-clockwork'])
