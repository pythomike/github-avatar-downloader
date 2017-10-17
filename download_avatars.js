var request = require('request');
var fs = require('fs');
var gitUser = "pythomike"
var gitToken = "2ec27c2e1b2544efe5729adb36b3973844ad2d90"

var repoOwner = process.argv[2] 
var repoName = process.argv[3]

if (!repoOwner || !repoName) 
  console.log("You need to give me the repo owner, and the repo name. I'm missing one of those")

function getRepoContributors(repoOwner, repoName, cb) {  
  var options = {
    url: "https://" + gitUser + ":" + gitToken + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "pythomike"
    }
  }
  request(options, function(err, res, body) {
      var data = JSON.parse(body);
      data.forEach(function(profile) {
        if (!fs.existsSync("./avatars")) {
          fs.mkdirSync("./avatars");
        }
        cb(profile.avatar_url, "avatars/" + profile.login + ".jpg");
    })
})
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors(repoOwner, repoName, downloadImageByURL)

function downloadImageByURL(url, filePath){ 
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
}
