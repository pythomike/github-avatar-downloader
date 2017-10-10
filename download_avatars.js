var request = require('request');
var fs = require('fs');

var gitUser = "pythomike"
var gitToken = "2ec27c2e1b2544efe5729adb36b3973844ad2d90"

var repoOwner = "pythomike"  //  REMOVE
var repoName = "waldo"      //   REMOVE

// var repoOwner = process.argv[2] 
// var repoName = process.argv[3]

// if (!repoOwner || !repoName) 
//   console.log("You need to give me the repo owner, and the repo name. I'm missing one of those")

function getRepoContributors(repoOwner, repoName, cb) {  
  var options = {
    url: "https://" + gitUser + ":" + gitToken + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "pythomike"
    }
  }
  request(options, function(err, res, body) {
      var outputBody = JSON.parse(body);
      var contributorObj = []
      for (each in outputBody){
        contributorObj.push(outputBody[each])
      }
      cb(contributorObj)
    })
}


console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors(repoOwner, repoName, isolateAvatar)

function downloadImageByURL(url, filePath){ 
}

function isolateAvatar(contributors){
  var userList = {}
  for (each in contributors){
    userList[contributors[each].login] = contributors[each].avatar_url
  }
  console.log(userList)
}