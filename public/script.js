var slideIndex = 1;

document.addEventListener('DOMContentLoaded', function () {
  let theme = localStorage.getItem('theme') || 'light';
  setTheme(theme);

  let themeDot =
    document.getElementsByClassName('theme-dot');

  for (let i = 0; i < themeDot.length; i++) {
    themeDot[i].addEventListener('click', function () {
      let mode = this.dataset.mode;
      console.log('option clicked:', mode);
      setTheme(mode);
    });
  }

  function setTheme(mode) {
    document.getElementById('theme-style').href =
      './styles/' + mode + '.css';
    localStorage.setItem('theme', mode);
  }

  showSlides(slideIndex);
});

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = document.getElementsByClassName('mySlides');
  let dots = document.getElementsByClassName('dot');

  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(
      ' active',
      ''
    );
  }

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

function sendEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        alert(data.message);
        clearForm();
        scrollToTop();
      } else {
        alert('Failed to send the email.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while sending the email.');
    });
}

function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}

function scrollToTop() {
  window.scrollTo(0, 0);
}
