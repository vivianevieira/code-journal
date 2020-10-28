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
  viewSwapping('profile');
  $form.reset();
});

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-profile-storage', dataJson);
});

function profileView() {
  // var $profileDataView = document.querySelector("div[data-view=profile]");

  var $divContainer = document.createElement('div');
  $divContainer.setAttribute('class', 'container');
  // $profileDataView.appendChild($divContainer);

  var $fullName = document.createElement('h2');
  $fullName.textContent = data.profile.fullName;
  $divContainer.appendChild($fullName);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $divContainer.appendChild($divRow);

  var $divAvatar = document.createElement('div');
  $divAvatar.setAttribute('class', 'column-half');
  $divRow.appendChild($divAvatar);

  var $imgAvatar = document.createElement('img');
  $imgAvatar.src = data.profile.avatarUrl;
  $imgAvatar.setAttribute('alt', 'avatar');
  $imgAvatar.setAttribute('class', 'avatar');
  $divAvatar.appendChild($imgAvatar);

  var $divRightColumn = document.createElement('div');
  $divRightColumn.setAttribute('class', 'column-half');
  $divRow.appendChild($divRightColumn);

  var $usernameParagraph = document.createElement('p');
  $divRightColumn.appendChild($usernameParagraph);

  var $iconUsername = document.createElement('img');
  $iconUsername.setAttribute('alt', 'username-icon');
  $iconUsername.setAttribute('class', 'icon');
  $iconUsername.src = 'images/icons-username.png';
  $usernameParagraph.appendChild($iconUsername);

  var $spanUsername = document.createElement('span');
  $spanUsername.setAttribute('id', 'userId');
  $spanUsername.textContent = data.profile.username;
  $usernameParagraph.appendChild($spanUsername);

  var $locationParagraph = document.createElement('p');
  $divRightColumn.appendChild($locationParagraph);

  var $iconLocation = document.createElement('img');
  $iconLocation.setAttribute('alt', 'location-icon');
  $iconLocation.setAttribute('class', 'icon');
  $iconLocation.src = 'images/location_icon-contact.jpeg';
  $locationParagraph.appendChild($iconLocation);

  var $spanLocation = document.createElement('span');
  $spanLocation.setAttribute('id', 'locationId');
  $spanLocation.textContent = data.profile.location;
  $locationParagraph.appendChild($spanLocation);

  var $bioParagraph = document.createElement('p');
  $bioParagraph.setAttribute('id', 'bioId');
  $bioParagraph.textContent = data.profile.bio;
  $divRightColumn.appendChild($bioParagraph);

  var domTree = $divContainer;

  return domTree;
}

function viewSwapping(dataView) {
  var $editProfileView = document.querySelector('div[data-view=edit-profile]');
  var $profileView = document.querySelector('div[data-view=profile]');

  if (dataView === 'edit-profile') {
    $editProfileView.className = '';
    $profileView.className = 'hidden';
  } else if (dataView === 'profile') {
    $profileView.className = '';
    $editProfileView.className = 'hidden';
    $profileView.appendChild(profileView());
  }

  data.view = dataView;
}

// check for existing username created and load page accordingly //
var previousProfileJson = localStorage.getItem('data-profile-storage');

if (previousProfileJson !== null) {
  data = JSON.parse(previousProfileJson);
}

document.addEventListener('DOMContentLoaded', function () {
  if (data.profile.username === '') {
    viewSwapping('edit-profile');
  } else if (data.profile.username !== '') {
    viewSwapping('profile');
  }
});
