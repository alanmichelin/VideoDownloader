const puppeteer = require('puppeteer');
const readline = require('readline');
const _download = require('./script')




  
const ytSearch = async(toSearch,cb)=>{
    const browser = await puppeteer.launch({headless: true});
    // {headless: false}
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');

    page.on('load', () => {
        console.log('Results:');
      });
    await page.type('#search', toSearch)
    await page.click('#search-icon-legacy')
    const pageUrl = await page.url()
    await page.goto(pageUrl+'&sp=EgIQAQ%253D%253D')
    //video filter = &sp=EgIQAQ%253D%253D

    await page.waitForTimeout(1500)
    
    
    const list = await page.evaluate(()=>{
        const vidsContainer= document.querySelector('#contents> .ytd-section-list-renderer > #contents')
        function Video(title,author,link,listID){
            this.title = title
            this.author = author
            this.link = link
            this.listID = listID
        }
        let result = []
        for(let i =0 ;i<9;i++){
            let videoTitle = vidsContainer.children[i].querySelector("#title-wrapper > h3> a").title
            let videoAuthor = vidsContainer.children[i].querySelector('.yt-formatted-string').innerText
            let videoLink = vidsContainer.children[i].querySelector('#thumbnail').href
            let listID = [i+1]
            result.push(new Video(videoTitle,videoAuthor,videoLink,listID))
            
        }
        return result
    })

    var displayVideos = list.map((video)=>{
    return `${video.listID} - Title: ${video.title} | Author: ${video.author} `
  })
  console.log(displayVideos)
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  
rl.question('Choose number to download video:\n', (number) => {

     rl.close();
     var videoNumber = list.find(e => {
         if (e.listID == number) {
             return e.link;
         }
     });
     return cb(videoNumber.link)
 })

    await browser.close();


    
};
module.exports = {ytSearch}

