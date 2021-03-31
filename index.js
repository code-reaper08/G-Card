const username = document.getElementById("name");
const gravatar = document.getElementById("gravatar");
const locdisp = document.getElementById("location");

const element = document.getElementById("maindiv");

// document.getElementById('submit').addEventListener('click', () => {
// 	if (screenfull.isEnabled) {
// 		screenfull.request(element);
//         screenfull.request(element, {navigationUI: 'hide'});
// 	}
// });

// on click function....
async function dta() {
  let inputVal = document.getElementById("text").value;
  // Making maindiv visible on button click....
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
  if (screenfull.isEnabled) {
    screenfull.request(element);
    screenfull.request(element, { navigationUI: "hide" });
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

  // for name ....
  let name = data.name;

  // for location ....
  let loc = data.location;

  // for gravatar....
  let img = data.avatar_url;

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

  // debug statements....
  console.log(name, loc);
  // alert(inputVal);
}

if (screenfull.isEnabled) {
  screenfull.on("change", () => {
    console.log("SCreen detected");
  });
}
