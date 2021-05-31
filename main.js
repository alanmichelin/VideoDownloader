const fs = require('fs');
const ytdl = require('ytdl-core');
// const ffmpegInstaller = require('./@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const chalk = require('chalk')
ffmpeg.setFfmpegPath('./@ffmpeg-installer/win32-x64/ffmpeg.exe');

module.exports = ffmpeg;

const search = require('./modules/search')
const question = require('./modules/userinteractions')
const functions = require('./modules/functions')

var format

console.log(`
${chalk.yellow(`------------------------------
WELCOME TO VIDEO DOWNLOADER 1.0.0!
------------------------------`)}
`
    )
console.log(chalk.bold.cyan(`
You can download any facebook/instagram/youtube video by just pasting its link.
INSTRUCTIONS:
1- Choose format.
2- Paste link.
3- Wait until video is downloaded/converted.

EXTRA FUNCTIONS ONLY FOR YOUTUBE:
Use search by typing ${chalk.yellow('/s')}, you will get a list of videos and you can 
choose wich one you want to download.
Example: ${chalk.yellow('/s')} any band X song
Use multi-download mode by typing ${chalk.yellow('/l')} and writing all the videos you 
want separated by a comma.
(Automatically detects if it is a link or you want to search that) 
Example: ${chalk.yellow('/l')} video1, video2, https://youtu.be/XXXXXXXXXX , video 3



VIDEO LINK FORMATS ADMITED:
Facebook: https://www.facebook.com/watch/?v=XXXXXXXXXX
Instagram: https://www.instagram.com/p/XXXXXXXXXX/
Youtube: https://youtu.be/XXXXXXXXXX or https://www.youtube.com/watch?v=XXXXXXXXXX

ENJOY

****************Made by ${chalk.green('https://github.com/alanmichelin')}****************

`
))



  functions.start()







