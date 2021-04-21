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
const butdiv = document.getElementById("butdiv");
const inpdiv = document.getElementById("inpdiv");

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
// function ss() {
//   html2canvas(document.querySelector("#maindiv")).then((canvas) => {
//     document.body.appendChild(canvas);
//   });
//   allowTaint = false;
// }

// ssjs function for screenshot.... // using normal js....  // almost working.... hurray ...........................
function ss(){
  heightdiv = document.getElementById("ss").offsetHeight
  console.log("heightdiv" + heightdiv); // this logs the current height of the element....
  widthdiv = document.getElementById("ss").offsetWidth
  console.log("Widthdiv" + widthdiv); // this logs the current width of the elemrnt....
  
    if ( window.innerWidth <= 800 &&  window.innerHeight <= 600 ){
      console.log("i am mobile")
      domtoimage.toBlob(document.getElementById('ss') , {"height" : 2000 , "width" : 1500})   // div is cropped here for suitable output..... {"height" : heightdiv , "width" : widthdiv}
      .then(function (blob) {
          saveAs(blob, `${username.textContent}.png`);
      });
    }
   else{
     console.log("i am pc")
  domtoimage.toBlob(document.getElementById('ss') , {"height" : 500 , "width" : 1500})   // div is cropped here for suitable output..... {"height" : heightdiv , "width" : widthdiv}
  .then(function (blob) {
      saveAs(blob, `${username.textContent}.png`);
  });
}
}

// // another screenshot method.... //ssjsbut
// $(function() { 
//   $("#ssjsbut").click(function() { 
//     html2canvas($('#gravatardiv').get(0)).then( function (canvas) {
//       $("#body").append(canvas);
//       });
//               canvas.toBlob(function(blob) {
//         saveAs(blob, "Dashboard.png"); 
//       });
//           })
//         })
    

// on click function....
async function dta() {
  let inputVal = document.getElementById("text").value;
  // Making maindiv visible on button click....
  if (element.style.display === "none") {
    element.style.display = "block";
    butdiv.style.display = "block";
  } else {
    element.style.display = "none";
    butdiv.style.display = "none";
  }

  // Making content div invisible on the appearence of maindiv....
  if (contentdiv.style.display === "block") {
    contentdiv.style.display = "none";
    // inpdiv.style.display = "none";  // needed for reload function in output screen....
  } else {
    contentdiv.style.display = "block";
    // inpdiv.style.display = "block";  // needed for reload function in output screen....
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
      "../img/star.png";
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

// Theme toggler mechanism....
let themetoggler = 0;
document.getElementById("theme").onclick = function themetoggle () {
  themetoggler++;
  if (themetoggler == 1) {
    document.getElementById("theme").innerText = "bullseye" // changes inner text of the button....
    theme1()
  }
  else if (themetoggler == 2){
    document.getElementById("theme").innerText = "squares" // changes inner text of the button....
    theme2()
  }
  else if (themetoggler == 3){
    document.getElementById("theme").innerText = "inter" // changes inner text of the button....
    theme3()
  }
  else if (themetoggler == 4){
    document.getElementById("theme").innerText = "white" // changes inner text of the button....
    // theme4()
  }
  // else if (themetoggler == 5){
  //   console.log("recurivse started.")
  //   return themetoggle()
  // }
 else{
   themetoggler = null;
   themetoggle()
 }
};

// all theme changing functions....
function theme1() {
  element.style.backgroundImage = "url('../img/Bullseye-Gradient.png')";
  // document.body.style.backgroundImage = "url('img_tree.png')";
  element.style.transition = "ease 2s"

}
function theme2(){
  element.style.backgroundImage = "url('../img/Protruding-Squares.png')";
  element.style.transition = "ease 2s"

}
function theme3(){
  element.style.backgroundImage = "url('../img/Geometric-Intersection.png')";
  element.style.transition = "ease 2s"
}
function theme4(){
  // <a href='https://www.freepik.com/photos/background'>Background photo created by benzoix - www.freepik.com</a>
  element.style.backgroundImage = "url('../img/grungy-white-background-natural-cement-stone-old-texture-as-retro-pattern-wall-conceptual-wall-banner-grunge-material-construction.jpg')";
  document.getElementById("name").style.color = "#2f4f4f"
  document.getElementById("location").style.color = "#2f4f4f"
  document.getElementById("orgtitle").style.color = "#2f4f4f"
  document.getElementById("bio").style.color = "#2f4f4f"
  document.getElementById("startitle").style.color = "#2f4f4f"
  document.getElementById("langtitle").style.color = "#2f4f4f"
  // let langlistcolor = document.getElementById("toplangs").childNodes;
  // console.log(langlistcolor);
  document.getElementById("#toplangs").style.color = "#2f4f4f"
  // document.querySelector("#toplangs > dt")
  // console.log(langlistcolor);


}