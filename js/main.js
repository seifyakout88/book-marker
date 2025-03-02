var sitename = document.getElementById("sitename");
var siteurl = document.getElementById("siteuRL");
var dialog = document.getElementById("dialog");

var sitesList = [];
if (localStorage.getItem("AllSites") != null) {
  sitesList = JSON.parse(localStorage.getItem("AllSites"));
  display();
}

// add function
function addsite() {
  var site = {
    siteName: sitename.value,
    siteUrl: siteurl.value,
  };

  if (validation(sitename) && validation(siteurl)) {
    sitesList.push(site);
    localStorage.setItem("AllSites", JSON.stringify(sitesList));
    clear();
    display();

    sitename.classList.remove("is-valid");
    siteurl.classList.remove("is-valid");
  }
  else{
    dialog.setAttribute("open" , 'true');
    dialog.removeAttribute("close" , 'true');
  }
}
function closedialog(){
    dialog.setAttribute("close" , 'true');
    dialog.removeAttribute("open" , 'true');
}
// clear function
function clear() {
  sitename.value = "";
  siteurl.value = "";
}

// display function

function display() {
  var blackBox = ``;

  for (var i = 0; i < sitesList.length; i++) {
    blackBox += `<tr>
                    <td>${i + 1}</td>
                    <td>${sitesList[i].siteName}</td>
                    <td><a href="${
                      sitesList[i].siteUrl
                    }" target="_blank" class="btn visit "><i class="fa-solid fa-eye pe-1"></i> Visit</a></td>
                    <td><button class="btn  btn-danger delete" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
                </tr>`;
  }

  document.getElementById("table-body").innerHTML = blackBox;
}

// delete function

function deleteSite(del) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      sitesList.splice(del, 1);
      localStorage.setItem("AllSites", JSON.stringify(sitesList));
      display();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function validation(input) {
  var regex = {
    sitename: /^[A-Z]{1}[a-z]{2,}$/,
    siteuRL:/^(https:\/\/|http:\/\/){1}.{1,}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
    // siteuRL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  };

  isvalid = regex[input.id].test(input.value);
  console.log(input.nextElementSibling);
  if (isvalid) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
  }

  return isvalid;
}
