// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links){
  toggle.addEventListener('click', ()=>{
    const open = links.getAttribute('data-open') === 'true';
    links.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple lightbox for images & videos
const grid = document.getElementById('galleryGrid');
const dialog = document.getElementById('lightbox');
const closeBtn = dialog?.querySelector('.close');
const content = dialog?.querySelector('.content');

function openLightbox(el){
  content.innerHTML = '';
  const type = el.dataset.type;
  if (type === 'image'){
    const img = document.createElement('img');
    img.src = el.getAttribute('href');
    img.alt = el.querySelector('img')?.alt || 'Preview';
    content.appendChild(img);
  } else if (type === 'video'){
    const video = document.createElement('video');
    video.src = el.getAttribute('href');
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    content.appendChild(video);
  }
  dialog.showModal();
}

grid?.addEventListener('click', (e)=>{
  const a = e.target.closest('a.tile');
  if(!a) return;
  e.preventDefault();
  openLightbox(a);
});
closeBtn?.addEventListener('click', ()=> dialog.close());
dialog?.addEventListener('click', (e)=>{
  const r = dialog.getBoundingClientRect();
  if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom){
    dialog.close();
  }
});
