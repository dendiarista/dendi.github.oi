const pages=[...document.querySelectorAll(".page")];
let current=0;
const prev=document.getElementById("prevBtn");
const next=document.getElementById("nextBtn");
const currentEl=document.getElementById("current");

function showPage(n){
  if(n<0)n=0;
  if(n>pages.length-1)n=pages.length-1;
  current=n;
  pages.forEach((p,i)=>p.classList.toggle("is-active",i===current));
  currentEl.textContent=String(current+1).padStart(2,"0");
  prev.disabled=current===0;
  next.disabled=current===pages.length-1;
  history.replaceState(null,"",current===0 ? location.pathname : `#${current+1}`);
}
function go(n){showPage(n)}
prev.addEventListener("click",()=>go(current-1));
next.addEventListener("click",()=>go(current+1));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.go))));
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"||e.key==="PageDown")go(current+1);
  if(e.key==="ArrowLeft"||e.key==="PageUp")go(current-1);
});
let startX=0;
document.addEventListener("touchstart",e=>startX=e.touches[0].clientX,{passive:true});
document.addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].clientX-startX;
  if(Math.abs(dx)>60)go(current+(dx<0?1:-1));
},{passive:true});
const hash=parseInt(location.hash.slice(1),10);
showPage(Number.isFinite(hash)&&hash>=1&&hash<=pages.length ? hash-1 : 0);