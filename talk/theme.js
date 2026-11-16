(function(){
  'use strict';
  var KEY='botsalon-color-mode';
  var root=document.documentElement;
  var saved=null;
  try{var val=window.localStorage.getItem(KEY);if(val==='dark'||val==='light')saved=val;}catch(e){}
  var preference=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
  function current(){return saved||(preference&&preference.matches?'dark':'light');}
  function render(){
    var dark=current()==='dark';
    root.setAttribute('data-theme',dark?'dark':'light');
    root.style.colorScheme=dark?'dark':'light';
    var button=document.getElementById('theme-toggle');
    if(button){
      button.setAttribute('aria-pressed',String(dark));
      button.setAttribute('aria-label',dark?'라이트 모드로 전환':'다크 모드로 전환');
      button.setAttribute('title',dark?'라이트 모드로 전환':'다크 모드로 전환');
      button.querySelector('.theme-icon').textContent=dark?'☀':'☾';
      button.querySelector('.theme-label').textContent=dark?'라이트':'다크';
    }
  }
  render();
  function mount(){
    if(document.getElementById('theme-toggle'))return;
    var button=document.createElement('button');
    button.type='button';
    button.id='theme-toggle';
    button.className='theme-toggle';
    button.innerHTML='<span class="theme-icon" aria-hidden="true"></span><span class="theme-label"></span>';
    var header=document.querySelector('.topright');
    if(header){header.insertBefore(button,header.firstChild);}
    else{
      var wrap=document.querySelector('body > .wrap');
      if(!wrap)return;
      var nav=wrap.querySelector(':scope > p:first-child');
      var row=document.createElement('div');
      row.className='theme-pagebar';
      wrap.insertBefore(row,wrap.firstChild);
      if(nav)row.appendChild(nav);
      row.appendChild(button);
    }
    button.addEventListener('click',function(){
      saved=current()==='dark'?'light':'dark';
      try{window.localStorage.setItem(KEY,saved);}catch(e){}
      render();
    });
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
  if(preference){
    if(typeof preference.addEventListener==='function')preference.addEventListener('change',function(){if(!saved)render();});
    else if(typeof preference.addListener==='function')preference.addListener(function(){if(!saved)render();});
  }
})();