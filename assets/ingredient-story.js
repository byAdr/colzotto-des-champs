(() => {
  const story = document.querySelector('[data-ingredient-story]');
  if (!story || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const steps = [...story.querySelectorAll('[data-ingredient-step]')];
  const number = story.querySelector('[data-stage-number]');
  const name = story.querySelector('[data-stage-name]');
  const setCurrent = (step) => {
    steps.forEach((item) => item.classList.toggle('is-current', item === step));
    number.textContent = step.dataset.number;
    name.textContent = step.dataset.name;
  };
  story.classList.add('has-motion');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCurrent(entry.target);
    });
  }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
  steps.forEach((step) => observer.observe(step));
})();
