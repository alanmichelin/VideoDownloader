const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const command = ffmpeg();
const readline = require('readline');
const search = require('./search')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


  rl.question('Enter Video URL or /s to search: ',(answer)=>{

    rl.close()
    if(answer.slice(0,2) =='/s' ){

                console.log('searching: ' + answer.slice(3))
                search.ytSearch(answer.slice(3), function(response){
                    download(response)
                })

                



  
        

        
      }
      else{
          download(answer)
      }
      
  })
  
const download = async (url)=>{
    
    if(!ytdl.validateURL(url)){
        return console.log('Invalid URL')
    }
    let regex = /[\/*\\?\|\<\>\-\:\"]/g
    let vidInfo = await ytdl.getInfo(url)
    var videoName= vidInfo.videoDetails.title
    videoName= videoName.replace(regex,'_')

    ytdl(url,{filter: format => format.container === 'mp4'})
    .pipe(fs.createWriteStream( videoName+'.mp4')).on('finish',()=>{
        console.log('video downloaded')
        tomp3()
    })

    const tomp3 = () =>{
    ffmpeg(videoName+'.mp4')
    .toFormat('mp3')
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        process.stdout.write('Processing: ' + progress.targetSize + ' KB converted\r');
    })
    .on('end', () => {
        console.log('Video sucesfully converted to mp3!');
    })
    .save('./'+videoName+'.mp3');
    }
}

module.exports = {download}






