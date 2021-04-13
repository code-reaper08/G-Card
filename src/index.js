// requiring dom-to-image....
// import domtoimage from '../node_modules/dom-to-image';
// requiring filesaver....
// import { saveAs } from '../node_modules/file-saver';

// Selecting elements....
const username = document.getElementById("name");
const gravatar = document.getElementById("gravatar");
const locdisp = document.getElementById("location");
const biodiv = document.getElementById("bio");
const numrepo = document.getElementById("numrepo");
const gists = document.getElementById("gists");
const orgsdiv = document.getElementById("orgs");
const orgtitle = document.getElementById("orgtitle");
const element = document.getElementById("maindiv");
const contentdiv = document.getElementById("con");
const stardiv = document.getElementById("stardiv");
const startitle = document.getElementById("startitle");
const submitbut = document.getElementById("submit");
const langtitle = document.getElementById("langtitle");
const profilelink = document.getElementById("profilelink");

// Create elements....
const hr = document.createElement("hr");
const countdiv = document.createElement("div");
const starimgdiv = document.createElement("div");
const stariconcontainerdiv = document.createElement("div");

// Action switcher....
let clickCounter = 0;
submitbut.onclick = function () {
  clickCounter++;
  if (clickCounter == 2) {
    window.location.reload();
  } else {
    dta();
  }
};

// ss function for screenshot.... // using html2canvas....
function ss() {
  html2canvas(document.querySelector("#maindiv")).then((canvas) => {
    document.body.appendChild(canvas);
  });
  allowTaint = false;
}

// ssjs function for screenshot.... // using normal js....
// function ssjs(){
//   domtoimage.toBlob(document.getElementById('langdiv'))
//   .then(function (blob) {
//       saveAs(blob, 'my-node.png');
//   });
// }
    

// on click function....
async function dta() {
  let inputVal = document.getElementById("text").value;
  // Making maindiv visible on button click....
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }

  // Making content div invisible on the appearence of maindiv....
  if (contentdiv.style.display === "block") {
    contentdiv.style.display = "none";
  } else {
    contentdiv.style.display = "block";
    ssjs()
  }

  // Base url for every request....
  let baseURL = "https://api.github.com/users/";
  // url to request for ....
  let usrreq = baseURL + inputVal;
  // await for the url and getting back the json....
  const res = await fetch(usrreq);
  const data = await res.json();
  //console.log(data);

  // for name....
  let name = data.name;

  // for location....
  let loc = data.location;

  // for profile link....
  let profile = data.html_url;

  // for gravatar....
  let img = data.avatar_url;

  // for bio....
  let bio = data.bio;

  // for public repos....
  let prepo = data.public_repos;

  // for gists count....
  let pgists = data.public_gists;

  // for organistation info....
  let orginfo = data.organizations_url;
  // let orglinksarray = [];
  const orgdata1 = await fetch(orginfo);
  const orgdata = await orgdata1.json();
  // console.log(orgdata); // this line for debugging....
  if (orgdata.length != 0) {
    orgdata.forEach((i) => {
      const orgname = i.login;
      const orgavatar = i.avatar_url;
      const orgurl = i.url; // organisation url for every organisation....
      // console.log(orgname); // debug statement....
      console.log(orgurl);
      // orglinksarray.push(orgurl);
      let orgimg = document.createElement("img"); // create a image element for organisations....
      let orglink = document.createElement("a"); //create a link for organistaions....
      orgimg.src = orgavatar;
      orgimg.alt = orgname;
      orgimg.className = "orimg";
      orgsdiv.appendChild(orglink); // orlink is a anchor tag....
      orglink.appendChild(orgimg); // image is inserted between anchor tags....
      orglink.href = `https://github.com/${orgname}`;
      orgtitle.textContent = "Organisations";
      orgtitle.appendChild(hr);
    });
  }
  // for star info....
  let starsarray = [];
  const lang = [];
  let repourl = data.repos_url;
  const repourl1 = await fetch(repourl);
  const repodata = await repourl1.json();
  console.log(repodata);
  if (repodata.length != 0) {
    repodata.forEach((j) => {
      const eachstar = j.stargazers_count;
      starsarray.push(eachstar);
    });
    let totalstars = starsarray.reduce(function (a, b) {
      return a + b;
    }, 0);
    // final stars count....
    console.log(totalstars);
    let staricon = document.createElement("img");
    staricon.src =
      "https://www.flaticon.com/svg/vstatic/svg/616/616489.svg?token=exp=1617473804~hmac=3acaf13accb5f404eb370a9cf061f807";
    staricon.alt = "Total stars";
    staricon.className = "staricon";
    stardiv.appendChild(stariconcontainerdiv);
    stariconcontainerdiv.appendChild(starimgdiv);
    starimgdiv.appendChild(staricon);
    stariconcontainerdiv.appendChild(countdiv);
    // stardiv.appendChild(staricon);
    // stardiv.appendChild(span);
    countdiv.textContent = `${totalstars}`;
    countdiv.className = "starcount";
    startitle.textContent = "Stars";
    startitle.appendChild(hr);

    // for most used languages....
    repodata.forEach((k) => {
      eachlang = k.language;
      lang.push(eachlang);
    });

    // removing null fields from the lang array....
    let filteredlang = lang.filter(function (el) {
      return el != null;
    });

    // frequently used languages mechanism....
    const num = 5;
    const findMostFrequent = (num = 1) => {
      const strArr = filteredlang; // filteredlang is a array with null fields removed....
      const map = {};
      strArr.forEach((word) => {
        if (map.hasOwnProperty(word)) {
          map[word]++;
        } else {
          map[word] = 1;
        }
      });
      const frequencyArr = Object.keys(map).map((key) => [key, map[key]]);
      frequencyArr.sort((a, b) => b[1] - a[1]);
      return frequencyArr.slice(0, num).map((el) => el[0]);
    };
    const mostusedlangs = findMostFrequent(num);
    console.log(mostusedlangs); // final languages top array....

    // rendering lang title....
    langtitle.textContent = "TOP LANGUAGES";
    langtitle.appendChild(hr);
    mostusedlangs.forEach((l) => {
      $(".col1").append(
        '<div id="toplangs"><dt class ="langdata">' + l + "</dt></div>"
      ); // dynamic language rendering....
    });
  }

  // rendering on front end....

  // to check for null fields....
  if ((name == null) & (loc == null) & (img == null)) {
    username.textContent = "OOPS not found ..";
  } else {
    username.textContent = name;
  }
  gravatar.src = img;
  gravatar.alt = inputVal;
  locdisp.textContent = loc;
  biodiv.textContent = bio;
  numrepo.textContent = prepo;
  gists.textContent = pgists;
  profilelink.href = profile;

  // debug statements....
  // console.log(name, loc);
  // alert(inputVal);
}
// below code is written for a precaution purpose, it deletes duplicate images in the html document, in case of double fetching happens....

// var img = $("img");
// var used = {};
// console.dir($(img[0]).attr("src"));
// img.each(function () {
//   var src = $(this).attr("src");
//   if (used[src]) $(this).remove();
//   used[src] = 1;
// });
