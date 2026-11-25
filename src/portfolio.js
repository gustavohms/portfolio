const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
const mobile = window.matchMedia('(max-width: 700px)');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  links.classList.toggle('is-open', open);
}

document.documentElement.classList.add('enhanced');
menu.hidden = false;
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('click', event => {
  if (event.target.closest('a') || !event.target.closest('.navigation')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
mobile.addEventListener('change', () => setMenu(false));

const orders = document.querySelector('#orders');
const minutes = document.querySelector('#minutes');
const estimate = document.querySelector('#estimate');
const format = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });

function updateEstimate() {
  if (!orders.validity.valid || !minutes.validity.valid) {
    estimate.value = 'Confira os valores informados.';
    return;
  }
  const total = orders.valueAsNumber * minutes.valueAsNumber;
  estimate.value = total > 0 && total < 60
    ? format.format(total) + ' min por semana'
    : format.format(total / 60) + ' h por semana';
}
orders.addEventListener('input', updateEstimate);
minutes.addEventListener('input', updateEstimate);
updateEstimate();
