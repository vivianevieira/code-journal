var $urlInput = document.querySelector('input[name="avatarUrl"]');
var $avatar = document.querySelector('.avatar');

$urlInput.addEventListener('input', function (event) {
  $avatar.src = event.target.value;
});

var $form = document.querySelector('#profile-form');
var $menuLinks = document.querySelectorAll('.menu-links');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $form.elements.username.value;
  data.profile.fullName = $form.elements.fullName.value;
  data.profile.location = $form.elements.location.value;
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.bio = $form.elements.bio.value;
  $avatar.src = 'images/placeholder-image-square.jpg';
  viewSwapping('profile');
  // show nav bar menu links:
  for (var i = 0; i < $menuLinks.length; i++) {
    $menuLinks[i].setAttribute('class', 'menu-links');
  }
  $form.reset();
});

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data-profile-storage', dataJson);
});

function profileView() {

  var $divContainer = document.createElement('div');
  $divContainer.setAttribute('class', 'container');

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

  var $buttonParagraph = document.createElement('p');
  $divRightColumn.appendChild($buttonParagraph);

  var $editButton = document.createElement('a');
  $editButton.setAttribute('href', '#');
  $editButton.setAttribute('class', 'edit-button');
  $editButton.setAttribute('data-view', 'edit-profile');
  $editButton.textContent = 'Edit';
  $buttonParagraph.appendChild($editButton);

  var domTree = $divContainer;

  return domTree;
}

function viewSwapping(dataView) {
  var $editProfileView = document.querySelector('div[data-view=edit-profile]');
  var $profileView = document.querySelector('div[data-view=profile]');
  var $createEntry = document.querySelector('div[data-view=create-entry]');
  var $entries = document.querySelector('div[data-view=entries]');

  if (dataView === 'edit-profile') {
    $editProfileView.className = '';
    $profileView.className = 'hidden';
    $createEntry.className = 'hidden';
    $entries.className = 'hidden';
    // populate the profile form
    $avatar.src = data.profile.avatarUrl;
    if (data.profile.avatarUrl === '') {
      $avatar.src = 'images/placeholder-image-square.jpg';
    }
    $form.elements.avatarUrl.value = data.profile.avatarUrl;
    $form.elements.username.value = data.profile.username;
    $form.elements.fullName.value = data.profile.fullName;
    $form.elements.location.value = data.profile.location;
    $form.elements.bio.value = data.profile.bio;

  } else if (dataView === 'profile') {
    $profileView.className = '';
    $editProfileView.className = 'hidden';
    $createEntry.className = 'hidden';
    $entries.className = 'hidden';
    // empty out the content of the div[data-view="profile"]
    while ($profileView.hasChildNodes()) {
      $profileView.removeChild($profileView.firstChild);
    }
    // append the return value of the profile rendering function
    $profileView.appendChild(profileView());
  } else if (dataView === 'create-entry') {
    $createEntry.className = '';
    $profileView.className = 'hidden';
    $editProfileView.className = 'hidden';
    $entries.className = 'hidden';
  } else if (dataView === 'entries') {
    $entries.className = '';
    $createEntry.className = 'hidden';
    $profileView.className = 'hidden';
    $editProfileView.className = 'hidden';
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
    // loop through all nav bar links and hide them if no username
    for (var i = 0; i < $menuLinks.length; i++) {
      $menuLinks[i].setAttribute('class', 'hidden menu-links');
    }
  } else if (data.profile.username !== '') {
    viewSwapping('profile');
  }
});

document.addEventListener('click', function (event) {
  if (event.target.getAttribute('data-view') === 'edit-profile') {
    viewSwapping('edit-profile');
  } else if (event.target.getAttribute('data-view') === 'profile') {
    viewSwapping('profile');
  } else if (event.target.getAttribute('data-view') === 'create-entry') {
    viewSwapping('create-entry');
  } else if (event.target.getAttribute('data-view') === 'entries') {
    viewSwapping('entries');
  }
});

// entry form
var $entryUrlInput = document.querySelector('input[name="entryUrl"]');
var $entryImage = document.querySelector('#entry-image');

$entryUrlInput.addEventListener('input', function (event) {
  $entryImage.src = event.target.value;
});

var $entryForm = document.querySelector('#entry-form');

$entryForm.addEventListener('submit', function (event) {
  var dataObj = {};
  var $ol = document.querySelector('ol');
  event.preventDefault();
  dataObj.entryUrl = $entryForm.elements.entryUrl.value;
  dataObj.entryTitle = $entryForm.elements.entryTitle.value;
  dataObj.entryNotes = $entryForm.elements.entryNotes.value;
  data.entries.unshift(dataObj);
  $entryImage.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
  $ol.prepend(journalEntries(0));
  viewSwapping('entries');
});

function journalEntries(index) {
  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');

  var $divColumnHalf = document.createElement('div');
  $divColumnHalf.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf);

  var $imageEntry = document.createElement('img');
  $imageEntry.setAttribute('alt', 'entry-image');
  $imageEntry.setAttribute('class', 'avatar');
  $imageEntry.src = data.entries[index].entryUrl;
  $divColumnHalf.appendChild($imageEntry);

  var $divColumnEntry = document.createElement('div');
  $divColumnEntry.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnEntry);

  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = data.entries[index].entryTitle;
  $divColumnEntry.appendChild($entryTitle);

  var $entryParagraph = document.createElement('p');
  $entryParagraph.textContent = data.entries[index].entryNotes;
  $divColumnEntry.appendChild($entryParagraph);

  return $divRow;
}

document.addEventListener('DOMContentLoaded', function () {
  var arrayLength = data.entries.length;
  var $ol = document.querySelector('ol');
  for (var i = 0; i < arrayLength; i++) {
    var domTreeJournalEntry = journalEntries(i);
    $ol.append(domTreeJournalEntry);
  }
});
