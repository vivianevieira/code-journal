var urlInput = document.querySelector('input[name="avatarUrl"]');

urlInput.addEventListener('input', function (event) {
  document.getElementById('avatar').src = event.target.value;
});

var form = document.querySelector('form');

form.addEventListener('submit');
