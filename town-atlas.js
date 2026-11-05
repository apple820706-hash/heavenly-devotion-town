/* Heavenly Devotion Town illustrated atlas, original SVG artwork based on 2D map design principles. */
(function(){
'use strict';
var stage=document.getElementById('illustratedMap'),svg=document.getElementById('townAtlas'),scene=document.getElementById('scene');
if(!stage||!svg||!scene)return;
var mode='2d'; // Illustrated-first edition; keep Three.js engine dormant.
scene.classList.add('mode-'+mode);
document.getElementById('atlas2d').setAttribute('aria-pressed',String(mode==='2d'));
document.getElementById('atlas3d').setAttribute('aria-pressed',String(mode==='3d'));
document.getElementById('atlas2d').onclick=function(){switchMode('2d')};
document.getElementById('atlas3d').onclick=function(){switchMode('3d')};
function switchMode(next){if(mode===next)return;localStorage.setItem('devotion-town-mapmode',next);location.reload()}
var nodes=[
{id:0,x:201,y:218,name:'真理之島',sub:'📖 經文閱讀',top:'#b5e7b7',edge:'#76ad8b',soil:'#a17e6d'},
{id:1,x:508,y:145,name:'默想森林',sub:'🌳 默想反省',top:'#acd8b2',edge:'#75aa86',soil:'#927967'},
{id:2,x:495,y:371,name:'禱告聖殿',sub:'🕊️ 小鎮中心',top:'#cfedbd',edge:'#90b99a',soil:'#ac8c72'},
{id:3,x:786,y:234,name:'生命花園',sub:'🌱 生活實踐',top:'#c3e8b1',edge:'#8ab394',soil:'#ad8a6c'},
{id:4,x:779,y:509,name:'恩典山谷',sub:'🌄 感恩記錄',top:'#e2e5b5',edge:'#b1b388',soil:'#a18a78'},
{id:5,x:209,y:520,name:'信仰旅程',sub:'🗺️ 生命足跡',top:'#b5e3d2',edge:'#7aada6',soil:'#9a8270'}
];
var order=[2,0,1,3,4,5,2];
function el(tag,attrs,children){var s='<'+tag;Object.keys(attrs||{}).forEach(function(k){s+=' '+k+'="'+String(attrs[k]).replace(/"/g,'&quot;')+'"'});return s+'>'+(children||'')+'</'+tag+'>'}
function circle(x,y,r,fill,other){return el('circle',Object.assign({cx:x,cy:y,r:r,fill:fill},other||{}),'')}
function rect(x,y,w,h,fill,rx){return el('rect',{x:x,y:y,width:w,height:h,rx:rx||0,fill:fill},'')}
function path(d,fill,extra){return el('path',Object.assign({d:d,fill:fill},extra||{}),'')}
function text(x,y,value,attrs){return el('text',Object.assign({x:x,y:y},attrs||{}),value)}
function tree(x,y,c){return '<g transform="translate('+x+' '+y+')">'+circle(0,-15,14,'#7dad87')+circle(-11,-7,15,c||'#8fcb99')+circle(11,-10,14,'#aadcb0')+rect(-3,-1,6,15,'#b9916d',2)+'</g>'}
function flower(x,y,color){return '<g transform="translate('+x+' '+y+')">'+circle(-4,-3,4,color)+circle(4,-3,4,color)+circle(0,-8,4,color)+circle(0,2,4,color)+circle(0,-3,3,'#ffd786')+'</g>'}
function npc(x,y,shirt,face,delay){return '<g class="atlas-npc" style="animation-delay:'+delay+'s" transform="translate('+x+' '+y+')">'+ellipse(0,9,11,3,'#38644b26')+rect(-5,-3,10,13,shirt,4)+rect(-5,7,4,7,'#776f75',1)+rect(2,7,4,7,'#776f75',1)+circle(0,-11,9,face)+path('M -9 -12 Q -5 -28 5 -21 Q 12 -19 9 -12 Z','#8c6c56')+circle(-3,-11,1.2,'#494143')+circle(3,-11,1.2,'#494143')+'</g>'}
function ellipse(x,y,rx,ry,fill){return el('ellipse',{cx:x,cy:y,rx:rx,ry:ry,fill:fill},'')}
function tinyHouse(x,y,walls,roof){return '<g transform="translate('+x+' '+y+')">'+ellipse(0,24,35,8,'#356a4923')+rect(-27,-19,54,44,walls,5)+path('M -36 -18 L 0 -49 L 36 -18 Z',roof)+rect(-6,4,12,21,'#a78166',3)+rect(-22,-10,11,13,'#a5d9e6',2)+rect(11,-10,11,13,'#a5d9e6',2)+path('M -36 -18 L 0 -49 L 36 -18','none',{stroke:'#fff9e9','stroke-width':5,'stroke-linejoin':'round'})+'</g>'}
function temple(){return '<g>'+ellipse(0,34,74,16,'#496d5232')+path('M -72 30 L -72 16 L -55 16 L -55 -15 L 55 -15 L 55 16 L 72 16 L 72 30 Z','#fff4da')+rect(-57,-38,114,71,'#fcf6e9',8)+path('M -71 -38 L 0 -83 L 71 -38 Z','#b4a0da')+rect(-13,1,26,32,'#ad8067',9)+rect(-44,-22,15,28,'#9fd3df',7)+rect(29,-22,15,28,'#9fd3df',7)+path('M -1 -38 L -1 -92 L 29 -92 L 29 -38 Z','#fff8e9')+rect(1,-112,26,22,'#f5eee5',3)+path('M -5 -112 L 14 -139 L 33 -112 Z','#9c87c6')+rect(11,-151,6,22,'#edcc85',2)+rect(4,-145,20,5,'#edcc85',2)+path('M -44 -12 L -29 -12 M 29 -12 L 44 -12','none',{stroke:'#f1d7a6','stroke-width':3})+circle(-56,17,5,'#f2bc9f')+circle(55,14,5,'#f2bc9f')+'</g>'}
function library(){return tinyHouse(-12,1,'#fff5de','#bf9bcb')+text(-10,-23,'✦',{fill:'#eed3a0','font-size':14,'text-anchor':'middle'})+rect(30,-8,28,17,'#cba879',3)+text(44,5,'📖',{'font-size':16,'text-anchor':'middle'})}
function forest(){return tree(-45,5,'#6cb187')+tree(-4,-25,'#84bc92')+tree(41,12,'#5eaa86')+rect(-27,31,58,8,'#c69d7a',4)+rect(-21,39,5,10,'#a4846f',1)+rect(22,39,5,10,'#a4846f',1)}
function garden(){return flower(-45,-12,'#f7accc')+flower(-18,24,'#efb6cf')+flower(39,19,'#f3cd89')+flower(48,-18,'#efadc9')+flower(-8,-37,'#d1b7ef')+ellipse(0,7,29,21,'#a9dcdd')+ellipse(0,4,23,15,'#cff3e8')+circle(0,5,5,'#f7e19d')+tree(-57,-5,'#8cce92')}
function valley(){return path('M -65 22 L -42 -32 L -14 1 L 5 -36 L 49 22 Z','#a9b69d')+path('M -35 -22 L -42 -32 L -52 -7 L -42 -13 Z','#fff4df')+path('M 5 -36 L -10 -8 L 21 -9 Z','#fff4df')+path('M -12 2 Q 6 19 -8 34 Q -30 39 -21 46','#95d0d8',{stroke:'#87c7dc','stroke-width':11,'stroke-linecap':'round'})+tree(49,21,'#90c69a')+flower(-54,22,'#f5c09c')}
function journey(){return path('M -55 32 L -37 15 L -20 23 L -5 -4 L 13 3 L 37 -24 L 58 -5','none',{stroke:'#f7ead1','stroke-width':17,'stroke-linecap':'round','stroke-linejoin':'round'})+rect(19,-55,30,52,'#fff4d9',5)+path('M 13 -55 L 34 -83 L 55 -55 Z','#d8b98e')+circle(34,-48,8,'#fbdd9d')+rect(31,-99,5,20,'#c8a570',2)+text(34,-109,'✦',{'text-anchor':'middle','font-size':17,fill:'#fff0c2'})+tree(-52,-8,'#86c7a1')}
function scenery(id){if(id===0)return library();if(id===1)return forest();if(id===2)return temple();if(id===3)return garden();if(id===4)return valley();return journey()}
function tile(n){
 var scale=n.id===2?1.16:1;
 var artNames=['scripture','forest','chapel','garden','valley','journey'];
 var artW=n.id===2?270:251;
 var art='<image class="atlas-art" href="./'+artNames[n.id]+'.webp" x="'+(-artW/2)+'" y="-140" width="'+artW+'" height="'+artW+'" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>';
 return '<g class="town-island" tabindex="0" role="button" aria-label="前往'+n.name+'" data-map-island="'+n.id+'" transform="translate('+n.x+' '+n.y+') scale('+scale+')">'+
 art+
 '<rect class="atlas-hit" x="-108" y="-105" width="216" height="255" rx="60" fill="transparent" pointer-events="all"/></g>';
}
function bridge(a,b,index){
 var x1=a.x,y1=a.y,x2=b.x,y2=b.y;
 var dx=x2-x1,dy=y2-y1,length=Math.hypot(dx,dy),off=length>0?Math.min(75,length*.23):0;
 x1+=dx/length*105;y1+=dy/length*66;x2-=dx/length*105;y2-=dy/length*66;
 var d='M '+x1+' '+y1+' Q '+((x1+x2)/2)+' '+((y1+y2)/2-17)+' '+x2+' '+y2;
 return path(d,'none',{stroke:'#648f8e','stroke-width':21,'stroke-linecap':'round',opacity:.46})+path(d,'none',{stroke:'#fff5d9','stroke-width':15,'stroke-linecap':'round'})+path(d,'none',{stroke:'#d4bc92','stroke-width':2,'stroke-dasharray':'9 13','stroke-linecap':'round'})
}
function cloud(x,y,s){return '<g class="atlas-cloud" transform="translate('+x+' '+y+') scale('+s+')">'+ellipse(0,0,55,15,'#ffffff9d')+circle(-20,-10,21,'#fffdf4')+circle(5,-15,29,'#fffdf8')+circle(30,-6,21,'#fffaf1')+'</g>'}
var defs='<defs>'+ 
'<radialGradient id="islandFadeGradient"><stop offset="0" stop-color="white"/><stop offset=".54" stop-color="white"/><stop offset=".83" stop-color="white" stop-opacity=".83"/><stop offset="1" stop-color="black"/></radialGradient>'+ 
'<mask id="islandArtworkFade" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"><rect x="0" y="0" width="1" height="1" fill="url(#islandFadeGradient)"/></mask>'+
'<linearGradient id="atlasSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#73c9f4"/><stop offset=".4" stop-color="#a0e7fa"/><stop offset=".75" stop-color="#bdeefb"/><stop offset="1" stop-color="#d5f1f8"/></linearGradient>'+
'<radialGradient id="atlasSun"><stop stop-color="#fff9c5" stop-opacity="1"/><stop offset=".58" stop-color="#fff2bd" stop-opacity=".6"/><stop offset="1" stop-color="#ffe6a4" stop-opacity="0"/></radialGradient>'+
'<linearGradient id="cloudShine" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".96"/><stop offset="1" stop-color="#f4eeff" stop-opacity=".55"/></linearGradient>'+
'<linearGradient id="atlasGrass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bee887"/><stop offset="1" stop-color="#6fc6a1"/></linearGradient>'+
'</defs>';
function brightCloud(x,y,scale,opacity){return '<g opacity="'+opacity+'" transform="translate('+x+' '+y+') scale('+scale+')">'+
ellipse(0,0,115,31,'url(#cloudShine)')+ellipse(-69,-11,53,35,'url(#cloudShine)')+ellipse(-17,-32,62,47,'url(#cloudShine)')+ellipse(51,-25,66,43,'url(#cloudShine)')+ellipse(103,-7,44,29,'url(#cloudShine)')+'</g>'}
function twinkle(x,y,sz){return '<g class="atlas-twinkle" transform="translate('+x+' '+y+') scale('+sz+')">'+path('M 0 -13 Q 3 -3 13 0 Q 3 3 0 13 Q -3 3 -13 0 Q -3 -3 0 -13 Z','#fffdf1',{stroke:'#ffc957','stroke-width':1.5})+'</g>'}
// The outside world is drawn by the page-level sky background.
var base=''+
circle(790,68,170,'url(#atlasSun)')+
'<g opacity=".29" stroke="#fffbe1" stroke-width="16">'+
path('M 808 0 L 690 275 M 860 0 L 900 280 M 730 0 L 512 200','none')+'</g>'+
'<g class="atlas-parallax">'+brightCloud(85,128,.76,.82)+brightCloud(922,120,.83,.8)+brightCloud(600,72,.43,.48)+brightCloud(78,422,.7,.65)+brightCloud(950,413,.85,.64)+
brightCloud(70,655,.66,.44)+brightCloud(440,687,.57,.37)+brightCloud(915,658,.68,.44)+'</g>'+
'<g opacity=".83">'+twinkle(54,285,.78)+twinkle(916,315,.65)+twinkle(589,271,.58)+twinkle(670,598,.74)+twinkle(355,80,.52)+twinkle(947,520,.6)+twinkle(90,540,.47)+'</g>'+
'<g opacity=".22">'+path('M 0 560 Q 151 515 290 559 T 560 570 T 1000 550','none',{stroke:'#e9fff8','stroke-width':4,opacity:.28})+'</g>'+
'';
// Painterly map only: the old vector bridges, scatter decorations and scenery
// are intentionally not rendered. Each island is the original detailed WebP.
svg.innerHTML=defs+base+'<g id="atlasIslandNodes">'+
 nodes.filter(function(n){return n.id!==2}).map(tile).join('')+
 tile(nodes[2])+'</g>';

function residentIcon(kind){
 var face='#ffd7b3',hair='#80523a';
 var head=ellipse(0,-19,10,10,face)+path('M -10 -23 Q -9 -37 4 -31 Q 14 -27 10 -21 Q 4 -29 -3 -25 Z',hair)+
 circle(-3,-19,1.4,'#46302b')+circle(4,-19,1.4,'#46302b')+path('M -1 -15 Q 2 -13 5 -15','none',{stroke:'#a24f49','stroke-width':1.4,'stroke-linecap':'round'})+
 circle(-7,-15,2.7,'#f5aab185')+circle(8,-15,2.5,'#f5aab185');
 var legs=path('M -4 5 L -8 17 M 5 5 L 8 17','none',{stroke:'#765242','stroke-width':5,'stroke-linecap':'round'});
 if(kind==='rabbit'){
  return '<g>'+ellipse(0,17,12,3,'#1f5d5660')+
   path('M -6 -21 Q -17 -61 -8 -59 Q 0 -58 -1 -27 M 5 -25 Q 6 -65 17 -56 Q 23 -46 11 -22','#fffaf1',{stroke:'#8b6f63','stroke-width':2})+
   ellipse(0,-18,14,13,'#fffef5')+ellipse(-4,-18,1.5,2.5,'#3a393c')+ellipse(5,-18,1.5,2.5,'#3a393c')+circle(1,-12,2,'#e8939c')+
   path('M -12 -4 Q 0 -13 12 -4 L 13 10 Q 0 18 -13 9 Z','#7acb96',{stroke:'#44785d','stroke-width':2})+
   path('M -11 -5 Q 4 -12 13 -3 L 21 2','#ff5d62',{stroke:'#d94757','stroke-width':3})+
   rect(-12,9,9,8,'#fff8ea',4)+rect(5,9,9,8,'#fff8ea',4)+rect(7,-6,14,9,'#ffefca',2)+circle(13,-2,2,'#ed7967')+'</g>'
 }
 var shirt=kind==='reader'?'#65bda1':kind==='flower'?'#68a9e9':'#ffaf81',cape=kind==='reader'?'#f2ce70':kind==='flower'?'#85d5b5':'#ffd778';
 var accessories='';
 if(kind==='reader')accessories=rect(5,-7,12,14,'#b27b4d',2)+rect(6,-7,10,12,'#fff4d8',1)+path('M 11 -3 L 11 1 M 9 -1 L 13 -1','none',{stroke:'#d6ac51','stroke-width':1.2});
 if(kind==='flower')accessories=ellipse(13,3,10,6,'#bd844d')+path('M 4 2 Q 13 -14 22 2','none',{stroke:'#bd844d','stroke-width':2.5})+flower(12,-3,'#fff0ba')+flower(18,0,'#a2d6ee');
 if(kind==='angel')accessories=path('M -8 -11 Q -24 -21 -18 -3 Q -12 3 -6 -2 M 8 -11 Q 24 -21 18 -3 Q 12 3 6 -2','#fffef0',{stroke:'#dbb86b','stroke-width':1.4})+
 ellipse(0,-42,14,3,'none',{stroke:'#ffcd41','stroke-width':3})+
 path('M 8 -4 L 20 5','none',{stroke:'#6eb87b','stroke-width':3})+ellipse(21,6,7,5,'#85d3a4')+
 flower(-6,-30,'#ffc0d5');
 return '<g>'+ellipse(0,17,12,3,'#2c695d55')+legs+
 path('M -13 -6 Q 0 -13 13 -6 L 11 11 Q 0 16 -11 11Z',shirt,{stroke:'#f7f2d7','stroke-width':2})+
 path('M -11 -7 Q 0 0 11 -7 L 4 3 L -4 3 Z',cape)+
 path('M -10 -5 L -16 6 M 11 -5 L 16 5','none',{stroke:face,'stroke-width':4,'stroke-linecap':'round'})+
 head+accessories+'</g>'
}
var residentPlans=[
 {type:'reader',at:[{x:175,y:262},{x:203,y:281},{x:240,y:265},{x:214,y:251}],start:1.3,speed:23},
 {type:'flower',at:[{x:777,y:522},{x:807,y:540},{x:826,y:519},{x:800,y:500}],start:2.7,speed:26},
 {type:'angel',at:[{x:763,y:266},{x:803,y:284},{x:831,y:263},{x:797,y:250}],start:4.1,speed:24},
 {type:'rabbit',at:[{x:448,y:411},{x:520,y:430},{x:552,y:400},{x:503,y:400}],start:.8,speed:33},
 {type:'reader',at:[{x:468,y:171},{x:501,y:188},{x:537,y:169},{x:514,y:152}],start:2.4,speed:22},
 {type:'rabbit',at:[{x:192,y:545},{x:240,y:570},{x:244,y:542},{x:213,y:528}],start:4.5,speed:27},
 {type:'flower',at:[{x:477,y:405},{x:510,y:415},{x:534,y:390},{x:491,y:389}],start:3.6,speed:24}
];
svg.insertAdjacentHTML('beforeend','<g id="atlasResidents" aria-hidden="true" pointer-events="none">'+
 residentPlans.map(function(r,i){return '<g id="atlasResident'+i+'" class="atlas-walking-resident" data-kind="'+r.type+'">'+
 '<image class="resident-image" href="./resident-'+r.type+'.webp" x="-31" y="-48" width="62" height="66" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>'+
 '</g>'}).join('')+'</g>');
['reader','flower','angel','rabbit'].forEach(function(type){
 var img=new Image();img.onload=function(){
  svg.querySelectorAll('[data-kind="'+type+'"]').forEach(function(n){n.classList.add('resident-art-loaded')})
 };img.onerror=function(){};img.src='./resident-'+type+'.webp';
});
/* Construction overlay architecture v1.
 * Existing purchase keys are preserved so Firestore/local journals continue to work.
 * Every purchased object is anchored to its island-local SVG coordinates; the whole
 * group scales together on mobile and no independent image positioning is required.
 */
var buildDefinitions=[
 // Same painterly detail at every stage. Coordinates are local to the original 850px island illustration.
 {id:'flowers',island:3,file:'build-flowers.webp',x:-74,y:8,w:53,h:53,emoji:'🌷'},
 {id:'bench',island:1,file:'build-bench.webp',x:38,y:12,w:57,h:57,emoji:'🪑'},
 {id:'lantern',island:2,file:'build-lantern.webp',x:-91,y:15,w:47,h:47,emoji:'🏮'},
 {id:'tree',island:0,file:'build-tree.webp',x:34,y:-50,w:91,h:91,emoji:'🌳'},
 {id:'fountain',island:2,file:'build-fountain.webp',x:60,y:16,w:48,h:48,emoji:'🕊️'},
 {id:'arch',island:2,file:'build-arch.webp',x:-36,y:22,w:71,h:71,emoji:'🌸'}
];
var validBuildIds=buildDefinitions.map(function(item){return item.id});
buildDefinitions.forEach(function(item){
 var root=svg.querySelector('[data-map-island="'+item.island+'"]');
 if(!root)return;
 var group=document.createElementNS('http://www.w3.org/2000/svg','g');
 group.setAttribute('class','atlas-building-overlay');
 group.setAttribute('data-building',item.id);
 group.setAttribute('data-building-island',String(item.island));
 group.setAttribute('pointer-events','none');
 group.style.display='none';
 // Canvas-relative coordinates, not viewport pixels.  Even in iPhone Safari the
 // decoration follows its floating island without being independently positioned.
 var imageEl=document.createElementNS('http://www.w3.org/2000/svg','image');
 imageEl.setAttribute('href','./'+item.file);
 imageEl.setAttribute('x',String(item.x));imageEl.setAttribute('y',String(item.y));
 imageEl.setAttribute('width',String(item.w));imageEl.setAttribute('height',String(item.h));
 imageEl.setAttribute('preserveAspectRatio','xMidYMid meet');
 imageEl.setAttribute('class','atlas-building-image');
 imageEl.setAttribute('pointer-events','none');
 group.appendChild(imageEl);
 var fallback=document.createElementNS('http://www.w3.org/2000/svg','text');
 fallback.setAttribute('x',String(item.x+item.w/2));
 fallback.setAttribute('y',String(item.y+item.h*.64));
 fallback.setAttribute('text-anchor','middle');
 fallback.setAttribute('font-size','23');
 fallback.setAttribute('class','atlas-building-fallback');
 fallback.textContent=item.emoji;
 group.appendChild(fallback);
 root.appendChild(group);
 var probe=new Image();
 probe.onload=function(){group.classList.add('building-image-ready')};
 probe.onerror=function(){group.classList.add('building-image-missing')};
 probe.src='./'+item.file;
});
function updateTownBuildings(detail){
 var purchased=(detail&&detail.purchased)||{};
 buildDefinitions.forEach(function(item){
  var layer=svg.querySelector('[data-building="'+item.id+'"]');
  if(!layer)return;
  var built=!!purchased[item.id];
  layer.style.display=built?'':'none';
  layer.setAttribute('aria-hidden',String(!built));
  layer.classList.toggle('is-built',built);
 });
 var chapelCount=['lantern','fountain','arch'].filter(function(k){return !!purchased[k]}).length;
 var stage=Math.min(3,chapelCount+1);
 svg.dataset.chapelStage=String(stage);
 var chapelLabel=svg.querySelector('[data-label-island="2"] .atlas-island-sub');
 if(chapelLabel)chapelLabel.textContent='🕊️ 小鎮中心 · Lv.'+stage;
 var total=validBuildIds.filter(function(k){return !!purchased[k]}).length;
 var shopProgress=document.getElementById('townBuildStatus');
 if(shopProgress)shopProgress.textContent='已建設 '+total+' / '+validBuildIds.length+' 項 · 聖殿 Lv.'+stage;
}
window.addEventListener('town-growth',function(ev){updateTownBuildings(ev.detail)});

var reducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function pointOnRoute(route,time,speed){
 var distance=time*speed,total=0;
 for(var j=0;j<route.length;j++){
  var a=route[j],b=route[(j+1)%route.length],len=Math.hypot(b.x-a.x,b.y-a.y);
  if(distance<total+len){var f=Math.max(0,Math.min(1,(distance-total)/len));f=f*f*(3-2*f);return {x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f,flip:b.x<a.x}}
  total+=len;
 }
 return pointOnRoute(route,(distance%total)/speed,speed);
}
var animationStart=performance.now(),lastFrame=0;
function walkResidents(now){
 if(now-lastFrame<33){requestAnimationFrame(walkResidents);return}lastFrame=now;
 if(!document.hidden&&!down){
  residentPlans.forEach(function(r,i){
   var node=document.getElementById('atlasResident'+i);
   if(!node)return;
   var elapsed=reducedMotion?0:Math.max(0,(now-animationStart)/1000+r.start);
   var cycle=r.at.reduce(function(sum,a,j){return sum+Math.hypot(r.at[(j+1)%r.at.length].x-a.x,r.at[(j+1)%r.at.length].y-a.y)},0);
   var p=pointOnRoute(r.at,elapsed%(cycle/r.speed),r.speed);
   var bob=reducedMotion?0:Math.sin(now/175+i*2)*1.7;
   node.setAttribute('transform','translate('+p.x.toFixed(1)+' '+(p.y+bob).toFixed(1)+') scale('+(p.flip?'-1':'1')+' 1)');
  })
 }
 requestAnimationFrame(walkResidents);
}
requestAnimationFrame(walkResidents);

svg.querySelectorAll('.atlas-art').forEach(function(img){
 var url=img.getAttribute('href');
 var probe=new Image();
 probe.onload=function(){img.closest('.town-island').classList.add('art-loaded')};
 probe.onerror=function(){
  // No substitute low-quality vector island: report a missing picture and keep the
  // island hotspot accessible. The original premium art must be present.
  img.closest('.town-island').classList.add('art-missing');
  var label=svg.querySelector('[data-label-island="'+img.closest('.town-island').dataset.mapIsland+'"]');
  if(label)label.setAttribute('aria-label','此島插畫尚未載入');
 };
 probe.src=url;
});
// The entire sky, bridges, islands and residents are one responsive SVG scene.
// Keep the atlas fixed; only island hotspots and resident sprites are interactive.
// Put all task lamps above the island artwork, so they remain easy to tap
// even where a neighboring island overlaps an icon.
svg.insertAdjacentHTML('beforeend','<g id="atlasTaskLights">'+nodes.map(function(n){
 var scale=n.id===2?1.16:1;
 var x=n.x+100*scale,y=n.y-54*scale;
 var existing=svg.querySelector('[data-map-island="'+n.id+'"] .atlas-status');
 if(existing){existing.setAttribute('aria-hidden','true');existing.style.display='none'}
 return '<g class="atlas-status-link" role="button" tabindex="0" data-light-island="'+n.id+'" aria-label="前往'+n.name+'查看今日任務" transform="translate('+x+' '+y+')">'+
 '<g class="atlas-status status-pending" data-status="'+n.id+'">'+
 circle(0,0,24,'#fff6c2',{class:'atlas-status-halo'})+
 circle(0,0,15,'#ffd05c',{class:'atlas-status-lamp',stroke:'#fffdf0','stroke-width':3})+
 text(0,5,'!',{class:'atlas-status-symbol','text-anchor':'middle',fill:'#6c4c14','font-size':17,'font-weight':950})+'</g>'+
 '<circle class="atlas-status-clicktarget" cx="0" cy="0" r="27" fill="transparent" pointer-events="all"/>'+
 '</g>'
}).join('')+'</g>');

// Six island titles are always rendered above images and residents.
// This prevents the central chapel from covering the forest name on narrow screens.
function atlasLabel(n){
 var scale=n.id===2?1.16:1;
 // Forest is the top-centre island. Its title belongs on its own lower
 // foreground, not in the corridor between the Scripture and Chapel islands.
 // Positioning here preserves six visible labels on both desktop and mobile.
 var px=n.x;
 var py=n.y+(n.id===1?63:136)*scale;
 var w=n.id===1?152:158;
 return '<g class="atlas-visible-label" data-label-island="'+n.id+'" pointer-events="none" transform="translate('+px+' '+py+')">'+
 rect(-w/2,-25,w,38,'#fffdf5',17)+
 text(0,1,n.name,{class:'atlas-island-label','font-size':18,'text-anchor':'middle'})+
 text(0,30,n.sub,{class:'atlas-island-sub','font-size':11,'text-anchor':'middle'})+'</g>';
}
svg.insertAdjacentHTML('beforeend','<g id="atlasLabels" pointer-events="none">'+nodes.map(atlasLabel).join('')+'</g>');

var moved=false,down=null;
svg.style.transform='none';
svg.setAttribute('preserveAspectRatio','xMidYMid meet');
['atlasZoomIn','atlasZoomOut','atlasZoomReset'].forEach(function(id){
 var b=document.getElementById(id);
 if(b){b.hidden=true;b.disabled=true;b.setAttribute('aria-hidden','true')}
});
stage.addEventListener('pointerdown',function(ev){
 down={x:ev.clientX,y:ev.clientY};
 moved=false;
});
stage.addEventListener('pointermove',function(ev){
 if(!down)return;
 if(Math.abs(ev.clientX-down.x)+Math.abs(ev.clientY-down.y)>12)moved=true;
});
window.addEventListener('pointerup',function(){down=null;if(moved)setTimeout(function(){moved=false},130)});
stage.addEventListener('pointercancel',function(){down=null;moved=false});
function visitIsland(i){if(mode!=='2d')return;var id=Number(i);if(!Number.isInteger(id)||id<0||id>5)return;var api=window.DevotionIsland;if(api&&typeof api.navigateIsland==='function')api.navigateIsland(id);}
svg.addEventListener('click',function(ev){
 if(mode!=='2d'||moved)return;
 var lamp=ev.target.closest('[data-light-island]');
 if(lamp){ev.preventDefault();visitIsland(lamp.getAttribute('data-light-island'));return}
 var item=ev.target.closest('[data-map-island]');
 if(item){ev.preventDefault();visitIsland(item.getAttribute('data-map-island'))}
});
svg.addEventListener('keydown',function(ev){
 if(ev.key!=='Enter'&&ev.key!==' ')return;
 var lamp=ev.target.closest('[data-light-island]');
 if(lamp){ev.preventDefault();moved=false;visitIsland(lamp.getAttribute('data-light-island'));return}
 var item=ev.target.closest('[data-map-island]');
 if(item){ev.preventDefault();moved=false;visitIsland(item.getAttribute('data-map-island'))}
});
function updateState(d){
 if(!d)return;
 var route=[0,1,3,4,5,2],status={};
 (d.completed||[]).forEach(function(done,i){status[route[i]]=!!done});
 svg.querySelectorAll('[data-map-island]').forEach(function(n){
  var id=Number(n.dataset.mapIsland),done=!!status[id],current=id===Number(d.active);
  n.classList.toggle('selected',current);
  var titleLabel=svg.querySelector('[data-label-island="'+id+'"]');
  if(titleLabel){titleLabel.classList.toggle('selected',current);titleLabel.classList.toggle('task-complete',done)}
  n.classList.toggle('task-complete',done);
  n.classList.toggle('task-pending',!done);
  var light=svg.querySelector('#atlasTaskLights [data-status="'+id+'"]');
  if(!light)return;
  light.classList.toggle('status-done',done);
  light.classList.toggle('status-pending',!done);
  light.classList.toggle('status-current',!done&&current);
  light.setAttribute('aria-label',done?'今日任務已完成':(current?'目前探索：尚未完成':'今日任務尚未完成'));
  var circleEl=light.querySelector('.atlas-status-lamp');
  var haloEl=light.querySelector('.atlas-status-halo');
  var label=light.querySelector('.atlas-status-symbol');
  if(circleEl)circleEl.setAttribute('fill',done?'#2dbb81':(current?'#ffbf38':'#ffd76c'));
  if(haloEl)haloEl.setAttribute('fill',done?'#b7f2d4':(current?'#fff0a3':'#fff7cf'));
  if(label){label.textContent=done?'✓':'!';label.setAttribute('fill',done?'#fffefa':'#765016')}
 });
}
window.addEventListener('town-map-refresh',function(e){updateState(e.detail)});
var all=[...document.querySelectorAll('.island')],sel=all.findIndex(function(n){return n.classList.contains('selected')});
updateState({active:sel<0?2:sel,completed:[]});
var bubbleColors=['📖','💡','🙏','🌱','❤️','✨'];
var lastBubble=0;
setInterval(function(){
 if(mode!=='2d'||document.hidden)return;
 var icons=svg.querySelectorAll('.atlas-island-label');if(!icons.length)return;
 var active=Math.floor(Math.random()*nodes.length),node=nodes[active],tag=document.createElementNS('http://www.w3.org/2000/svg','text');
 tag.setAttribute('x',node.x+45);tag.setAttribute('y',node.y-85);tag.setAttribute('fill','#47766f');tag.setAttribute('font-size','25');tag.setAttribute('text-anchor','middle');tag.textContent=bubbleColors[active];
 svg.appendChild(tag);
 setTimeout(function(){tag.remove()},2200);
},9500);
})();