// Dark mode toggle (persisted)
function setDarkMode(on) {
  if(on){document.documentElement.classList.add('dark');localStorage.setItem('theme','dark');}else{document.documentElement.classList.remove('dark');localStorage.setItem('theme','light');}
}
function toggleDark(){setDarkMode(!document.documentElement.classList.contains('dark'));}
function syncDarkFromStorage(){let t=localStorage.getItem('theme');if(t==='dark'){setDarkMode(true);}else if(t==='light'){setDarkMode(false);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){setDarkMode(true);}}
document.addEventListener('DOMContentLoaded',function(){
  syncDarkFromStorage();
  var darkBtn=document.getElementById('dark-toggle');
  var mobDarkBtn=document.getElementById('mobile-dark-toggle');
  if(darkBtn)darkBtn.addEventListener('click',toggleDark);
  if(mobDarkBtn)mobDarkBtn.addEventListener('click',toggleDark);
  // Shrink header on scroll
  var header=document.getElementById('site-header');
  var lastScroll=0;
  window.addEventListener('scroll',function(){
    var sc=window.scrollY;
    if(header){
      if(sc>20){header.classList.add('shrink');}else{header.classList.remove('shrink');}
    }
    // Back to top button
    var btn=document.getElementById('backToTop');
    if(btn){
      if(sc>200){btn.classList.remove('opacity-0','pointer-events-none');btn.classList.add('opacity-100');}else{btn.classList.add('opacity-0','pointer-events-none');btn.classList.remove('opacity-100');}
    }
    lastScroll=sc;
  });
  // Back to top click
  var btn=document.getElementById('backToTop');
  if(btn){btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});}
  // Mobile nav
  var mobNav=document.getElementById('mobile-nav');
  var mobNavTog=document.getElementById('mobile-nav-toggle');
  var mobNavClose=document.getElementById('mobile-nav-close');
  if(mobNav&&mobNavTog){mobNavTog.addEventListener('click',function(){mobNav.classList.remove('hidden');document.body.classList.add('overflow-hidden');});}
  if(mobNav&&mobNavClose){mobNavClose.addEventListener('click',function(){mobNav.classList.add('hidden');document.body.classList.remove('overflow-hidden');});}
  if(mobNav){mobNav.addEventListener('click',function(e){if(e.target===mobNav){mobNav.classList.add('hidden');document.body.classList.remove('overflow-hidden');}});}
  // FAQ accordion
  document.querySelectorAll('.faq-accordion [data-faq-toggle]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var id=btn.getAttribute('aria-controls');
      var panel=document.getElementById(id);
      var expanded=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',!expanded);
      if(panel){panel.hidden=expanded;}
    });
  });
  // Testimonials carousel
  var car=document.querySelector('.testimonials-carousel');
  if(car){
    var slides=car.querySelectorAll('.testimonial-slide');
    var idx=0,interval=null,paused=false;
    function show(i){slides.forEach((s,j)=>{s.classList.toggle('hidden',j!==i);});}
    function next(){idx=(idx+1)%slides.length;show(idx);}
    function start(){if(interval)clearInterval(interval);interval=setInterval(function(){if(!paused)next();},4000);}
    car.addEventListener('mouseenter',function(){paused=true;});
    car.addEventListener('mouseleave',function(){paused=false;});
    show(idx);start();
  }
  // Tabs/menu filter
  document.querySelectorAll('[data-tab-group]').forEach(function(group){
    var tabs=group.querySelectorAll('[data-tab]');
    var panels=group.querySelectorAll('[data-tab-panel]');
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        var t=tab.getAttribute('data-tab');
        tabs.forEach(tb=>tb.classList.remove('active','bg-blue-100','dark:bg-gray-800'));
        tab.classList.add('active','bg-blue-100','dark:bg-gray-800');
        panels.forEach(p=>{p.hidden=p.getAttribute('data-tab-panel')!==t;});
      });
    });
  });
  // AOS init
  if(window.AOS){AOS.init({once:true,duration:600});}
});
// Accessibility: close mobile nav with Esc
window.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    var mobNav=document.getElementById('mobile-nav');
    if(mobNav&&!mobNav.classList.contains('hidden')){
      mobNav.classList.add('hidden');document.body.classList.remove('overflow-hidden');
    }
  }
});
// Shrink header CSS helper
(function(){
  var css='.shrink nav{padding-top:0.25rem!important;padding-bottom:0.25rem!important;}';
  var s=document.createElement('style');s.innerHTML=css;document.head.appendChild(s);
})();