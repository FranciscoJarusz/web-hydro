window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.05s ease';

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
});