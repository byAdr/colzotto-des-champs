(function(){
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){return;}
var root=document.documentElement;
root.classList.add("js");
document.querySelectorAll("main.narrow h2,main.narrow figure,main.narrow .note").forEach(function(el){el.classList.add("reveal");});
var io=new IntersectionObserver(function(entries){
entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
},{threshold:0.12});
document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
var steps=document.querySelectorAll(".step");
var imgs=document.querySelectorAll(".stage img");
function setStep(i){
steps.forEach(function(s,k){s.classList.toggle("on",k===i);});
imgs.forEach(function(m,k){m.classList.toggle("on",k===i);});
}
if(steps.length){
setStep(0);
var so=new IntersectionObserver(function(entries){
entries.forEach(function(e){if(e.isIntersecting){setStep(parseInt(e.target.getAttribute("data-i"),10));}});
},{rootMargin:"-45% 0px -45% 0px"});
steps.forEach(function(s){so.observe(s);});
}
var statement=document.querySelector(".statement");
var words=[];
if(statement){
var parts=statement.textContent.trim().split(/\s+/);
statement.textContent="";
parts.forEach(function(w){
var span=document.createElement("span");
span.className="w";
span.textContent=w+" ";
statement.appendChild(span);
words.push(span);
});
}
var bar=document.getElementById("progress");
var plate=document.querySelector("[data-plate]");
var pars=document.querySelectorAll("[data-par]");
var ticking=false;
function update(){
var y=window.scrollY;
var max=document.documentElement.scrollHeight-window.innerHeight;
if(bar){bar.style.transform="scaleX("+(max>0?Math.min(y/max,1):0)+")";}
if(plate){plate.style.transform="translateY("+(y*0.08)+"px) rotate("+(y*0.02)+"deg)";}
if(words.length){
var r=statement.getBoundingClientRect();
var p=(window.innerHeight*0.8-r.top)/(r.height+window.innerHeight*0.3);
p=Math.max(0,Math.min(1,p));
var n=Math.round(p*words.length*1.05);
words.forEach(function(w,i){w.classList.toggle("lit",i<n);});
}
pars.forEach(function(el){
var b=el.parentNode.getBoundingClientRect();
var off=(b.top+b.height/2-window.innerHeight/2)*parseFloat(el.getAttribute("data-par"));
el.style.transform="translateY("+off+"px) scale(1.1)";
});
ticking=false;
}
window.addEventListener("scroll",function(){if(!ticking){ticking=true;window.requestAnimationFrame(update);}},{passive:true});
window.addEventListener("resize",update);
update();
})();
