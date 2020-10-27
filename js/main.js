var urlInput = document.querySelector('input[name="avatarUrl"]');
var avatar = document.getElementById('avatar');

urlInput.addEventListener('input', function (event) {
  avatar.src = event.target.value;
});

var $form = document.querySelector('.profile');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $form.elements.username.value;
  data.profile.fullName = $form.elements.fullName.value;
  data.profile.location = $form.elements.location.value;
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.bio = $form.elements.bio.value;
  document.getElementById('avatar').src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
