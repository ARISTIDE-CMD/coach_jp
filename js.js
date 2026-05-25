const menuBtn=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(menuBtn){menuBtn.addEventListener('click',()=>{links.classList.toggle('open');menuBtn.setAttribute('aria-expanded',links.classList.contains('open'));});}
const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('section').forEach(s=>{s.classList.add('reveal');io.observe(s);});
