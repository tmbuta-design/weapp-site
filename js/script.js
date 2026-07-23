document.addEventListener('DOMContentLoaded', function () {

  // Protection des images (propriété WeAPP) : bloque le clic droit et le glisser-déposer.
  // Rappel honnête : ceci décourage le téléchargement en un clic, mais ne bloque pas
  // un utilisateur qui passerait par les outils développeur ou l'onglet réseau.
  document.addEventListener('contextmenu', function (e) {
    if (e.target && e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
  document.addEventListener('dragstart', function (e) {
    if (e.target && e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Dropdown "Ressources"
  var dropdown = document.querySelector('.nav-dropdown');
  var dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Contact form: local, no-backend confirmation message
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('form-response');
      if (note) {
        note.textContent = 'Merci. Votre demande a bien été enregistrée — un membre de l’équipe WeAPP vous répondra sous 48 heures ouvrées.';
        note.style.display = 'block';
      }
      form.reset();
    });
  }

  // Hero slider (page d'accueil) : défilement automatique, points, pause au survol
  var heroSlider = document.getElementById('hero-slider');
  if (heroSlider) {
    var heroSlides = heroSlider.querySelectorAll('.hero-slide');
    var heroDots = heroSlider.querySelectorAll('.hero-dot');
    var heroCurrent = 0;
    var heroDelay = 5000; // 5 secondes, comme demandé
    var heroTimer = null;

    var heroGoTo = function (index) {
      heroSlides[heroCurrent].classList.remove('active');
      heroDots[heroCurrent].classList.remove('active');
      heroDots[heroCurrent].setAttribute('aria-selected', 'false');
      heroCurrent = (index + heroSlides.length) % heroSlides.length;
      heroSlides[heroCurrent].classList.add('active');
      heroDots[heroCurrent].classList.add('active');
      heroDots[heroCurrent].setAttribute('aria-selected', 'true');
    };
    var heroNext = function () { heroGoTo(heroCurrent + 1); };
    var heroStart = function () {
      if (heroSlides.length > 1) {
        heroTimer = setInterval(heroNext, heroDelay);
      }
    };
    var heroStop = function () {
      clearInterval(heroTimer);
    };

    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        heroGoTo(i);
        heroStop();
        heroStart();
      });
    });

    // Pause automatique au survol (desktop) ; sans effet sur mobile/tactile, ce qui est le comportement souhaité
    heroSlider.addEventListener('mouseenter', heroStop);
    heroSlider.addEventListener('mouseleave', heroStart);

    heroStart();
  }

});
