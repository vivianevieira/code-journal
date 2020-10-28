var $urlInput = document.querySelector('input[name="avatarUrl"]');
var $avatar = document.querySelector('.avatar');

$urlInput.addEventListener('input', function (event) {
  $avatar.src = event.target.value;
});

var $form = document.querySelector('#profile-form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $form.elements.username.value;
  data.profile.fullName = $form.elements.fullName.value;
  data.profile.location = $form.elements.location.value;
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.bio = $form.elements.bio.value;
  $avatar.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-profile-storage', dataJson);
});

function domTree() {
  var $profileDataView = document.querySelector("profile");

  var $divContainer = document.createElement("div");
  $divContainer.setAttribute("class", "container");
  $profileDataView.appendChild($divContainer);

  var $fullName = document.createElement("h2");
  $fullName = data.profile.fullName;
  $divContainer.appendChild($fullName);

  var $divRow = document.createElement("div");
  $divRow.setAttribute("class", "row");
  $divContainer.appendChild($divRow);

  var $divAvatar = document.createElement("div");
  $divAvatar.setAttribute("class", "column-half");
  $divRow.appendChild($divAvatar);

  var $imgAvatar = document.createElement("img");
  $imgAvatar.src = data.profile.avatarUrl;
  $divAvatar.appendChild($imgAvatar);

  var $divRightColumn = document.createElement("div");
  $divRightColumn.setAttribute("class", "column-half");
  $divRow.appendChild($divRightColumn);

  var $usernameParagraph = document.createElement("p");
  $divRightColumn.appendChild($usernameParagraph);

  var $iconUsername = document.createElement("img");
  $iconUsername.setAttribute("alt", "username-icon");
  $iconUsername.setAttribute("class", "icon");
  $usernameParagraph.appendChild($iconUsername);

  var $spanUsername = document.createElement("span");
  $spanUsername.setAttribute("id", "userId");
  $spanUsername.textContent = data.profile.username;
  $usernameParagraph.appendChild($spanUsername);

  var $locationParagraph = document.createElement("p");
  $divRightColumn.appendChild($locationParagraph);

  var $iconLocation = document.createElement("img");
  $iconLocation.setAttribute("alt", "location-icon");
  $iconLocation.setAttribute("class", "icon");
  $locationParagraph.appendChild($iconLocation);

  var $spanLocation = document.createElement("span");
  $spanLocation.setAttribute("id", "locationId");
  $spanLocation.textContent = data.profile.location;
  $locationParagraph.appendChild($spanLocation);

  var $bioParagraph = document.createElement("p");
  $bioParagraph.setAttribute("id", "bioId");
  $bioParagraph.textContent = data.profile.bio;
  $divRightColumn.appendChild($bioParagraph);

  return $divContainer;
}
