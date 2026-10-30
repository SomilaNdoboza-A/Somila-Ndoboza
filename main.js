(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var list = document.querySelector('.nav ul');
  if (btn && list) {
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Screenshot slots: show the image if the file exists, otherwise a placeholder box
  function placeholder(img) {
    var box = document.createElement('div');
    box.className = 'shot-empty';
    box.innerHTML = '<div>Screenshot goes here<br><code>' + img.getAttribute('src') + '</code></div>';
    img.replaceWith(box);
  }
  document.querySelectorAll('img.shot-img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) { placeholder(img); return; }
    img.addEventListener('error', function () { placeholder(img); });
  });
})();
