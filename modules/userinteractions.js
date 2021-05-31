const readline = require('readline');
const chalk = require('chalk')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const vidFormat = () =>{ 


    return new Promise((res,rej)=>{
      
      
        rl.question(`
          
${chalk.yellow(`-----------------------------
CHOOSE FORMAT: mp3/mp4 
-----------------------------
>`)}`
, (ans)=>{
          res(ans)
        })      
      })
  }

const searchVideo = () =>{ 
    return new Promise((res,rej)=>{
        rl.question(`

${chalk.yellow(`-------------------------------
Enter Video URL 
or "/s" to search videos: 
-------------------------------
>`)}`
, (answer)=>{
  res(answer)
    })
  })
}

const videoDownload = () =>{ 
    return new Promise((res,rej)=>{
        rl.question(`
        
${chalk.yellow(`-------------------------------
CHOOSE VIDEO:
-------------------------------
>`)}`
, (number)=>{
  res(number)
      })
  })
}

module.exports = {searchVideo,videoDownload,vidFormat}