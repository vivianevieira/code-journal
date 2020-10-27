var urlInput = document.querySelector('input[name="avatarUrl"]');

urlInput.addEventListener('input', function (event) {
  document.getElementById('avatar').src = event.target.value;
});

var $form = document.querySelector('.profile');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $form.elements.username.value;
  data.profile.fullName = $form.elements.fullName.value;
  data.profile.location = $form.elements.location.value;
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.bio = $form.elements.bio.value;
  $form.reset();
});
