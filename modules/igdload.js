var XMLHttpRequest = require('xhr2')
var xhr = new XMLHttpRequest()
const fs = require('fs')
const https = require('https')
// const functions = require('./functions')
var date = new Date()
    date = date.toString().split(' ').splice(0,5).join('_').replace(/:/g,'-')
const getVideo = (video,cb) => {
    xhr.open('GET',video)
    xhr.send()

xhr.onreadystatechange= function(){
    if (this.readyState==4 && this.status==200){
        var response = xhr.responseText
        var start = response.indexOf('<meta property="og:video"')
        var end= response.indexOf('/>', start)
        return cb (response.slice(response.indexOf('https',start), end))
        
    }
}
}
/*
var download = (url, cb) =>{
    var file = fs.createWriteStream(date+'.mp4')
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            console.log('Downloaded')
          file.close(cb);
        });
      });
} */
module.exports = {getVideo}