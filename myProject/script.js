console.log('it working');

let theme = localStorage.getItem('theme');

if (theme == null) {
  setTheme('light');
} else {
  setTheme(theme);
}

let themeDot = document.getElementsByClassName('theme-dot');

for (var i = 0; themeDot.length > i; i++) {
  themeDot[i].addEventListener('click', function () {
    let mode = this.dataset.mode;
    console.log('option clicked:', mode);
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == 'light') {
    document.getElementById('theme-style').href =
      'default.css';
  }

  if (mode == 'blue') {
    document.getElementById('theme-style').href =
      'blue.css';
  }

  if (mode == 'green') {
    document.getElementById('theme-style').href =
      'green.css';
  }

  if (mode == 'purple') {
    document.getElementById('theme-style').href =
      'purple.css';
  }

  localStorage.setItem('theme', mode);
}

// portfolio slide show
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(
      ' active',
      ''
    );
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

// send email
function sendEmail() {
  var params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  const serviceId = 'service_2u4hpuo';
  const templateId = 'template_jp0o7bn1';

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.getElementById('name').value,
        document.getElementById('email').value,
        document.getElementById('message').value;
      console.log(res);
    })
    .then(alert('Message Sent Successfully!'))
    .catch((err) => console.log(err));
}
