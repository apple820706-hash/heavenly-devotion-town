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
 var x=n.x,y=n.y,scale=n.id===2?1.16:1;
 var top='M 0 -74 L 107 -37 L 107 26 L 0 72 L -107 26 L -107 -37 Z';
 var bottom='M -107 -15 L 0 32 L 107 -15 L 107 45 L 0 92 L -107 45 Z';
 var decorations=tree(-81,-7,'#9cd19c')+tree(85,-14,'#8dc69c')+flower(-71,28,'#f7bbcf')+flower(67,37,'#f3df98')+flower(30,43,'#d4b1ee')+npc(-65,31,'#d19abc','#f8d7b9',n.id/2)+npc(73,23,'#a3c7d0','#f3d8bc',n.id/3);
 if(n.id===2)decorations+=npc(-5,37,'#dfb995','#f4d2b6',.7);
 var progress='<g class="atlas-status" data-status="'+n.id+'" transform="translate(98 -51)">'+circle(0,0,17,'#fffef5',{stroke:'#d4e6d6','stroke-width':2})+text(0,5,'○',{'text-anchor':'middle',fill:'#8aac9d','font-size':17,'font-weight':900})+'</g>';
 var artNames=['scripture','forest','chapel','garden','valley','journey'];
 var artPath='./'+artNames[n.id]+'.webp';
 var artW=n.id===2?270:251, artX=-artW/2,artY=-140;
 var artwork='<image class="atlas-art" href="'+artPath+'" x="'+artX+'" y="'+artY+'" width="'+artW+'" height="'+artW+'" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>';
 return '<g class="town-island" tabindex="0" role="button" aria-label="前往'+n.name+'" data-map-island="'+n.id+'" transform="translate('+x+' '+y+') scale('+scale+')">'+
 '<g class="atlas-vector-fallback">'+ellipse(0,55,128,39,'#507a7050')+path(bottom,n.soil,{stroke:'#fff6df','stroke-width':2})+path('M -107 21 L 0 65 L 107 21 L 107 44 L 0 88 L -107 44 Z',n.edge,{opacity:.88})+path(top,n.top,{stroke:'#edf6db','stroke-width':4,'stroke-linejoin':'round',class:'atlas-plate'})+path('M -99 -32 L 0 -65 L 99 -32','none',{stroke:'#f9ffef','stroke-width':2,opacity:.68})+decorations+scenery(n.id)+'</g>'+
 artwork+
 '<g class="atlas-label-card">'+rect(-79,117,158,39,'#fffcf4',17)+text(0,143,n.name,{class:'atlas-island-label'})+text(0,171,n.sub,{class:'atlas-island-sub'})+'</g>'+
 progress+
 '<rect class="atlas-hit" x="-110" y="-120" width="220" height="260" rx="90" fill="transparent" pointer-events="all"/></g>'
}
function bridge(a,b,index){
 var x1=a.x,y1=a.y,x2=b.x,y2=b.y;
 var dx=x2-x1,dy=y2-y1,length=Math.hypot(dx,dy),off=length>0?Math.min(75,length*.23):0;
 x1+=dx/length*105;y1+=dy/length*66;x2-=dx/length*105;y2-=dy/length*66;
 var d='M '+x1+' '+y1+' Q '+((x1+x2)/2)+' '+((y1+y2)/2-17)+' '+x2+' '+y2;
 return path(d,'none',{stroke:'#648f8e','stroke-width':21,'stroke-linecap':'round',opacity:.46})+path(d,'none',{stroke:'#fff5d9','stroke-width':15,'stroke-linecap':'round'})+path(d,'none',{stroke:'#d4bc92','stroke-width':2,'stroke-dasharray':'9 13','stroke-linecap':'round'})
}
function cloud(x,y,s){return '<g class="atlas-cloud" transform="translate('+x+' '+y+') scale('+s+')">'+ellipse(0,0,55,15,'#ffffff9d')+circle(-20,-10,21,'#fffdf4')+circle(5,-15,29,'#fffdf8')+circle(30,-6,21,'#fffaf1')+'</g>'}
var defs='<defs><linearGradient id="atlasSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9e2f2"/><stop offset=".6" stop-color="#e7f7ed"/><stop offset="1" stop-color="#fff4d9"/></linearGradient><radialGradient id="atlasSun"><stop stop-color="#fff0b2" stop-opacity=".8"/><stop offset="1" stop-color="#fff0b2" stop-opacity="0"/></radialGradient></defs>';
var base='<rect width="1000" height="720" fill="url(#atlasSky)"/>'+circle(820,95,185,'url(#atlasSun)')+
'<g opacity=".5">'+cloud(65,115,.85)+cloud(950,120,1)+cloud(80,600,1.2)+cloud(885,650,1.2)+cloud(520,652,1.1)+'</g>';
var links='';for(var i=0;i<order.length-1;i++)links+=bridge(nodes[order[i]],nodes[order[i+1]],i);
var decorations=path('M 100 355 Q 490 285 950 410','none',{stroke:'#fffdf4','stroke-width':2,opacity:.4,'stroke-dasharray':'4 16'})+
text(80,400,'✧',{fill:'#fffefa','font-size':35})+text(911,340,'✧',{fill:'#fffefa','font-size':36})+text(621,600,'✦',{fill:'#e1c78d','font-size':20});
svg.innerHTML=defs+base+'<g>'+links+'</g>'+decorations+'<g id="atlasIslandNodes">'+nodes.filter(function(n){return n.id!==2}).map(tile).join('')+tile(nodes[2])+'</g>';
svg.querySelectorAll('.atlas-art').forEach(function(img){
 var url=img.getAttribute('href');
 var probe=new Image();
 probe.onload=function(){img.closest('.town-island').classList.add('art-loaded')};
 probe.onerror=function(){img.remove()};
 probe.src=url;
});
var zoom=1,panX=0,panY=0,down=null,moved=false;
function apply(){svg.style.transform='translate('+panX+'px,'+panY+'px) scale('+zoom+')'}
function changeZoom(delta){zoom=Math.max(.75,Math.min(2.2,zoom+delta));apply()}
document.getElementById('atlasZoomIn').onclick=function(){changeZoom(.15)};
document.getElementById('atlasZoomOut').onclick=function(){changeZoom(-.15)};
document.getElementById('atlasZoomReset').onclick=function(){zoom=1;panX=0;panY=0;apply()};
stage.addEventListener('wheel',function(ev){if(mode!=='2d')return;ev.preventDefault();changeZoom(ev.deltaY>0?-.1:.1)},{passive:false});
stage.addEventListener('pointerdown',function(ev){if(mode!=='2d')return;down={x:ev.clientX,y:ev.clientY,px:panX,py:panY};moved=false;stage.classList.add('dragging')});
stage.addEventListener('pointermove',function(ev){if(!down)return;var dx=ev.clientX-down.x,dy=ev.clientY-down.y;if(Math.abs(dx)+Math.abs(dy)>6)moved=true;if(moved){panX=down.px+dx;panY=down.py+dy;apply()}});
window.addEventListener('pointerup',function(){down=null;stage.classList.remove('dragging')});
svg.querySelectorAll('[data-map-island]').forEach(function(n){
 function visit(){if(moved||mode!=='2d')return;var target=Number(n.getAttribute('data-map-island'));if(window.DevotionIsland&&window.DevotionIsland.navigateIsland)window.DevotionIsland.navigateIsland(target)}
 n.addEventListener('click',visit);n.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();moved=false;visit()}})
});
function updateState(d){
 if(!d)return;
 svg.querySelectorAll('[data-map-island]').forEach(function(n){n.classList.toggle('selected',Number(n.dataset.mapIsland)===d.active)});
 var route=[0,1,3,4,5,2];
 (d.completed||[]).forEach(function(done,j){var id=route[j];var badge=svg.querySelector('[data-status="'+id+'"]');if(!badge)return;var t=badge.querySelector('text');t.textContent=done?'✓':'○';t.setAttribute('fill',done?'#368967':'#8aac9d')});
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