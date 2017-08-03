// axios.get('https://api.github.com/users/octocat/orgs')
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.error(err)
//   })

fetch('https://api.github.com/repos/octokit/octokit.rb')
  .then(res => {
    res.json().then(json => {
      console.log(json)
    })
  })
  .catch(error => {
    console.error(error)
  })
//
// function reqListener () {
//   console.log(this.responseText);
// }
//
// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.withCredentials = true
// oReq.open("GET", "http://www.example.org/", true);
// oReq.setRequestHeader("Access-Control-Allow-Origin", "*")
// oReq.send();
