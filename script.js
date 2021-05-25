const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const command = ffmpeg();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


  rl.question('Enter Video URL to download: ',(answer)=>{
      download(answer)
      
  })

const download = async (url)=>{
    
    
    let regex = /[\/*\\?\|\<\>\-\:\"]/g
    let vidInfo = await ytdl.getInfo(url)
    var videoName= vidInfo.videoDetails.title
    videoName= videoName.replace(regex,'_')

    ytdl(url,{filter: format => format.container === 'mp4'})
    .pipe(await fs.createWriteStream( videoName+'.mp4'));

    setTimeout(()=>{},2000)
    ffmpeg(videoName+'.mp4')
    .toFormat('mp3')
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        console.log('Processing: ' + progress.targetSize + ' KB converted');
    })
    .on('end', () => {
        console.log('Processing finished !');
    })
    .save('./'+videoName+'.mp3');

}










