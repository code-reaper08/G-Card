const username = document.getElementById("name");
const gravatar = document.getElementById("gravatar");
const locdisp = document.getElementById("location");
const biodiv = document.getElementById("bio");
const numrepo = document.getElementById("numrepo");
const gists = document.getElementById("gists");

const element = document.getElementById("maindiv");


// on click function....
async function dta() {
  let inputVal = document.getElementById("text").value;
  // Making maindiv visible on button click....
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
  // if (element.style.display === "none") {
  //     element.style.display = "block";
  //   } else {
  //     element.style.display = "none";
  //   }

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
  const orgdata1 = await fetch(orginfo);
  const orgdata = await orgdata1.json();
  // console.log(orgdata);
  orgdata.forEach(i => {
    const orgname = i.login;
    console.log(orgname);
  });
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

  // debug statements....
  console.log(name, loc);
  // alert(inputVal);
}