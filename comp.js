const radios = document.querySelectorAll('input[type=radio]');
const images = document.querySelectorAll("div");
let breaker = window.screen.width;

const callback = (entries, observer) => {
  entries.forEach((entry) => {   
    entry.target.classList.toggle("is-active", entry.isIntersecting);
  });
};

const options = {
  threshold: 0.5
};

const animateObserver = new IntersectionObserver(callback, options);

const assignObservers = () => {
  images.forEach((image) => {
    animateObserver.observe(image);
  });
}

const enableObserver = () => {
  breaker >= 1024
  ? assignObservers()
  : animateObserver.disconnect();
};

const accordionToggle = (active) => {
  radios.forEach((radio, index) => {
    let closestImage = radio.parentElement.closest('.content').nextElementSibling;
    let closestText = radio.parentElement.nextElementSibling;
    closestImage.classList.remove('show');
    closestText.classList.remove('show');
    if(active === index){
      closestImage.classList.add('show');
      closestText.classList.add('show');
    } else {
      radio.checked = false;
    }
  });
};

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    accordionToggle(parseInt(radio.dataset['index']));
  });
});

const reportWindowSize = () => {
  breaker = window.screen.width;
  enableObserver();
};

window.addEventListener('resize', reportWindowSize);
window.addEventListener('load', reportWindowSize);
