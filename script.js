// ---- Settings: change these once and every page updates ----
const SHOP = {
  phones: [['077 713 7394', '+94777137394'], ['074 289 1425', '+94742891425']],
  wa: '94777137394',
  email: 'arunadisahathma@gmail.com',
  address: 'No. 3/2, Highlevel Road, Godagama'
};

// ---- SAMPLE stock: replace with real vehicles and photos ----
const CARS = [
  { n: 'Honda Vezel Z', b: 'Honda', y: 2016, km: '58,000', f: 'Hybrid', t: 'Auto', p: '12,450,000', c: '#9aa4ad', tag: 'Popular' },
  { n: 'Toyota Aqua G', b: 'Toyota', y: 2015, km: '71,000', f: 'Hybrid', t: 'Auto', p: '6,950,000', c: '#2a6fb5', tag: 'Popular' },
  { n: 'Toyota Axio Hybrid', b: 'Toyota', y: 2016, km: '64,500', f: 'Hybrid', t: 'Auto', p: '8,800,000', c: '#b8c0c8' },
  { n: 'Suzuki Wagon R FX', b: 'Suzuki', y: 2018, km: '39,000', f: 'Petrol', t: 'Auto', p: '5,200,000', c: '#d99a1b' },
  { n: 'Honda Fit GP5', b: 'Honda', y: 2016, km: '52,000', f: 'Hybrid', t: 'Auto', p: '7,350,000', c: '#c1272d' },
  { n: 'Suzuki Alto', b: 'Suzuki', y: 2019, km: '28,000', f: 'Petrol', t: 'Auto', p: '4,450,000', c: '#7aa5c8', tag: 'Just in' },
  { n: 'Toyota Prius', b: 'Toyota', y: 2014, km: '88,000', f: 'Hybrid', t: 'Auto', p: '6,400,000', c: '#3a3f47' },
  { n: 'Toyota Vitz', b: 'Toyota', y: 2017, km: '45,000', f: 'Petrol', t: 'Auto', p: '6,100,000', c: '#0a9a3a' }
];

const carSVG = '<svg viewBox="0 0 200 80" fill="currentColor" aria-hidden="true"><path d="M8 58c0-9 6-13 16-15l28-5c10-14 26-22 48-22 22 0 36 8 48 22l22 6c10 3 14 8 14 14v8H8z"/><path fill="#fff" opacity=".75" d="M62 38c8-10 20-16 38-16v16zM108 22c14 1 26 8 36 16h-36z"/><g fill="#13263a"><circle cx="52" cy="64" r="13"/><circle cx="154" cy="64" r="13"/></g><g fill="#cfd8e0"><circle cx="52" cy="64" r="5"/><circle cx="154" cy="64" r="5"/></g></svg>';

const cardHTML = c => `
<article class="car-card rv">
  <div class="pic" style="--c:${c.c}">${c.tag ? `<span class="tag">${c.tag}</span>` : ''}${carSVG}</div>
  <div class="info">
    <h3>${c.n}</h3>
    <div class="facts"><span>${c.y}</span><span>${c.km} km</span><span>${c.f}</span><span>${c.t}</span></div>
    <div class="buy"><div class="price"><span>Rs. ${c.p}</span></div>
    <a href="https://wa.me/${SHOP.wa}?text=${encodeURIComponent('Hi, I am interested in the ' + c.y + ' ' + c.n + '.')}" target="_blank" rel="noopener">Ask about this car</a></div>
  </div>
</article>`;

// ---- Header and footer ----
const pages = [['index.html', 'Home'], ['inventory.html', 'Vehicles'], ['about.html', 'About'], ['contact.html', 'Contact']];
const here = document.body.dataset.page;
document.body.insertAdjacentHTML('afterbegin', `
<header><div class="wrap">
  <a class="brand" href="index.html"><img src="images/logo.png" alt="">Pragathi Lanka</a>
  <button class="burger" aria-label="Menu">&#9776;</button>
  <nav>${pages.map(p => `<a href="${p[0]}"${p[0].startsWith(here) ? ' class="on"' : ''}>${p[1]}</a>`).join('')}</nav>
  <a class="call" href="tel:${SHOP.phones[0][1]}">Call ${SHOP.phones[0][0]}</a>
</div></header>`);
document.body.insertAdjacentHTML('beforeend', `
<footer><div class="wrap">
  <div><img src="images/logo.png" alt="Pragathi Lanka logo"><p>Pragathi Lanka International (Pvt) Ltd<br>${SHOP.address}, Sri Lanka</p></div>
  <div><h4>Pages</h4>${pages.map(p => `<a href="${p[0]}">${p[1]}</a>`).join('')}</div>
  <div><h4>Talk to us</h4>${SHOP.phones.map(p => `<a href="tel:${p[1]}">${p[0]}</a>`).join('')}<a href="mailto:${SHOP.email}">${SHOP.email}</a></div>
  <p class="copy">&copy; 2026 Pragathi Lanka International (Pvt) Ltd. Design concept; vehicles and prices shown are samples.</p>
</div></footer>
<a class="wa" href="https://wa.me/${SHOP.wa}" target="_blank" rel="noopener">WhatsApp us</a>`);

const header = document.querySelector('header');
addEventListener('scroll', () => header.classList.toggle('stuck', scrollY > 10), { passive: true });
document.querySelector('.burger').onclick = () => document.querySelector('nav').classList.toggle('open');

// ---- Vehicle grids ----
const grid = document.querySelector('[data-cars]');
if (grid) {
  const limit = +grid.dataset.cars || CARS.length;
  const show = brand => {
    const list = CARS.filter(c => brand === 'All' || c.b === brand).slice(0, limit);
    grid.innerHTML = list.map(cardHTML).join('');
    const count = document.getElementById('count');
    if (count) count.textContent = list.length + ' vehicles';
    reveal();
  };
  const chips = document.querySelector('.chips');
  if (chips) {
    chips.innerHTML = ['All', ...new Set(CARS.map(c => c.b))].map((b, i) => `<button${i ? '' : ' class="on"'}>${b}</button>`).join('');
    chips.onclick = e => {
      if (e.target.tagName !== 'BUTTON') return;
      chips.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.target));
      show(e.target.textContent);
    };
  }
  show('All');
}

// ---- Scroll reveal ----
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
}
reveal();

// ---- Contact form: sends the enquiry to WhatsApp ----
const form = document.getElementById('enq');
if (form) {
  const sel = form.elements.car;
  CARS.forEach(c => sel.add(new Option(c.y + ' ' + c.n)));
  form.onsubmit = e => {
    e.preventDefault();
    const d = form.elements;
    const msg = `Hi, I'm ${d.name.value}. ${d.car.value ? 'I am interested in the ' + d.car.value + '. ' : ''}${d.msg.value}`;
    open(`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(msg)}`, '_blank');
  };
}
