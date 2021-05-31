// var XMLHttpRequest = require('xhr2')
// var xhr = new XMLHttpRequest()
// const fs = require('fs')
// const https = require('https')

// xhr.open('GET','https://m.facebook.com/JalalsOfficial/videos/889647861590691')
// xhr.send()
// xhr.onreadystatechange= function(){
//     if (this.readyState==4 && this.status==200){
//         var response = xhr.responseText
//       console.log(xhr)
        // var start = response.indexOf('<meta property="og:video"')
        // var end= response.indexOf('/>', start)
         // download(response.slice(response.indexOf('https',start), end))
//     }
// }

var videoList = ['northlane','https://www.youtube.com/','https://www.google.com/','ddd']
console.log(videoList.filter(e => !e.includes('https://')))