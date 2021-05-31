const fs = require('fs');
const question = require('./userinteractions')
const search = require('./search')
const multiDl = require('./multisearch')
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path')
const chalk = require('chalk')
const https = require('https')
const fbdload = require('./fbdload')
const igdload = require('./igdload')
ffmpeg.setFfmpegPath('./@ffmpeg-installer/win32-x64/ffmpeg.exe');
module.exports = ffmpeg;


const start = async ()=>{
    
    format = await question.vidFormat()
    while(format!='mp3' && format!='mp4'){
        console.log(chalk.red('ERROR, valid inputs: mp3/mp4'))
        format = await question.vidFormat()
    }
    var answer = await question.searchVideo()
    while(
    !(answer.slice(0,2) =='/s') &&  
    !ytdl.validateURL(answer) && 
    !(answer.slice(0,2) =='/l') && 
    !answer.includes('facebook') && 
    !answer.includes('instagram') &&
    !answer.includes('m.youtube')
    )
    {
        console.log('wrong answer')
        answer = await question.searchVideo()
    }
    if(answer.slice(0,2) =='/s' )
    {
        console.log(chalk.yellow('SEARCHING: ') + chalk.cyan(answer.slice(3)))
        search.ytSearch(answer.slice(3), function(response){
        download(response)
        })
    }
    else if(answer.slice(0,2)=='/l')
    {
        let videoList = answer.slice(3).split(',')

        let search = videoList.filter(e => !ytdl.validateURL(e))
        let validLinks = videoList.filter(e => ytdl.validateURL(e))
        multiDl.multiDownload(search,function(response){
            response = response.concat(validLinks)
            response.forEach(e=>{

                download(e)
            })
        })
    }
    else if(answer.includes('facebook'))
    {
        console.log('Getting video from facebook...')
        fbdload.fbDownload(answer,function(link){
            downloadOther(link)
        })
        start()

    }
    
    else if(answer.includes('instagram'))
    {
        console.log('Getting video from instagram...')
        igdload.getVideo(answer,function (link){
            downloadOther(link)
        })
        start()
    }
    
    else if(ytdl.validateURL(answer))
    {
        download(answer)
    }

  }
  
const download = async (url)=>{

    let regex = /[\/*\\?\|\<\>\-\:\"]/g
    let vidInfo = await ytdl.getInfo(url)
    var videoName= vidInfo.videoDetails.title
    videoName= videoName.replace(regex,'_')

    ytdl(url,{filter: format => format.container === 'mp4'})
    .pipe(fs.createWriteStream( videoName+'.mp4'))
    .on('finish',()=>{
        console.log(chalk.green('Video downloaded'))
        if(format=='mp3'){
        tomp3(videoName)
        }
        else if(format=='mp4'){
        console.log(chalk.green('All done!'))
        start()
        }
    })
}


const tomp3 = (videoName) =>{
    ffmpeg('./'+videoName+'.mp4')
    .toFormat('mp3')
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        process.stdout.write('Processing: ' + progress.targetSize + ' KB converted\r');
    })
    .on('end', () => {
        
        console.log('Video sucesfully converted to mp3!');
        
        fs.unlink('./'+videoName+'.mp4', (err) => {
            if (err) {
              console.error(err)
              return
            }
        })
        // start()
    })
    .save('./'+videoName+'.mp3');
    }
    

const downloadOther = (url, cb) =>{
    var date = new Date()
    date = date.toString().split(' ').splice(0,5).join('_').replace(/:/g,'-')
        var file = fs.createWriteStream(date+'.mp4')
        https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                console.log('Downloaded')
              file.close(cb);
              if(format=='mp3'){
                tomp3(date)
                }
            });
          });
    } 

  module.exports= {start,download,tomp3,downloadOther}