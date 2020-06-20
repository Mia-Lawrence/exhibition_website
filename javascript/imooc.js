// 获取元素
var getElem = function( selector ){
  return document.querySelector(selector);
}
var getAllElem = function( selector ){
  return document.querySelectorAll(selector);
}
// 获取元素的样式
var getCls = function ( element ) {
  return element.getAttribute('class');
}
// 设置元素的样式
var setCls = function( element , cls){
  return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function( element , cls ){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) === -1){
      setCls(element,baseCls+' '+cls);
  }
}
// 为元素删减样式
var delCls = function( element , cls){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) > -1){
      setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
  }
}

//动画元素列表
var screenAnimateElements = {

  '.header' : [
    '.header__wrap',
  ],
  '.screen-1' : [
    '.screen-1__title',
    '.screen-1__subtitle',
  ],
  '.screen-2' : [
    '.screen-2__title',
    '.screen-2__subtitle',
    '.screen-2__underline',
    '.screen-2__image__people',
    '.screen-2__image__rocket',
  ],
  '.screen-3' : [
    '.screen-3__title',
    '.screen-3__subtitle',
    '.screen-3__underline',
    '.screen-3__bgimg',
    '.screen-3__class',
  ],
  '.screen-4' : [
    '.screen-4__title',
    '.screen-4__subtitle',
    '.screen-4__underline',
    '.screen-4__wrap__item1',
    '.screen-4__type__item1',
    '.screen-4__wrap__item2',
    '.screen-4__type__item2',
    '.screen-4__wrap__item3',
    '.screen-4__type__item3',
    '.screen-4__wrap__item4',
    '.screen-4__type__item4',
  ],
  '.screen-5' : [
    '.screen-5__title',
    '.screen-5__subtitle',
    '.screen-5__underline',
    '.screen-5__img',
  ],

};

//获取元素
var navItems=getAllElem('.header__nav__item'),
    sideNavItems=getAllElem('.side-nav-item'),
    slideTip=getElem('.slide__tip');

//初始化某一个动画元素为init
var setScreenAnimateInit=function(screenCls){
  var screen = document.querySelector(screenCls);
  var animateElements = screenAnimateElements[screenCls];
  for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}

//遍历对象中的每个元素 使所有动画元素变为init 完成初始化操作
window.onload=function(){
  for(k in screenAnimateElements){
    if(k==='.header'){
      setScreenAnimateInit('.header');
    }
    else if(k==='.screen-1'){
      setScreenAnimateInit('.screen-1');
    }else{
        setScreenAnimateInit(k);
    }
  }
}

//让初始化的动画元素init转为done 实现动画的播放
var playScreenAnimateDone=function(screenCls){
  var screen = document.querySelector(screenCls);
  var animateElements =  screenAnimateElements[screenCls];
  for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
      }
}

//只让当前指定元素的class变为header__nav__item_state_active 滑动门的联动
var swicthNavItemsActive=function(idx){
  for(var a=0;a<navItems.length;a++){
    delCls(navItems[a],"header__nav__item_state_active");
    slideTip.style.left=0*idx+'px';
  }
    addCls(navItems[idx],"header__nav__item_state_active");
    slideTip.style.left=93*idx+'px';
}

//只让当前指定的元素的class变为side-nav-item_state_active
var swicthSideNavItemsActive=function(idx){
   for(var a=0;a<sideNavItems.length;a++){
    delCls(sideNavItems[a],"side-nav-item_state_active");
  }
    addCls(sideNavItems[idx],"side-nav-item_state_active");
}

//点击元素的时跳转至设置的位置
var setNavJump=function(index,lib){
  var item=lib[index];
  item.onclick=function(){
    if(document.body.scrollTop){
      document.body.scrollTop=index*640;
    }else{
      document.documentElement.scrollTop=index*640;
    }
  }
}

//通过循环 为顶部和侧边导航栏item 添加点击就跳转到指定位置的事件
for(var i=0;i<navItems.length;i++){
  setNavJump(i,navItems);
}

for(var i=0;i<sideNavItems.length;i++){
  setNavJump(i,sideNavItems);
}

swicthNavItemsActive(0);
swicthSideNavItemsActive(0);

//添加滚动事件
window.onscroll=function(){
  var top=document.body.scrollTop || document.documentElement.scrollTop;
  //高度大于导航栏高度的时候出现侧边导航栏和不同样式的顶部导航栏
  if(top>48){
    addCls(getElem('.header'),'header_status_back');
    addCls(getElem('.header__caption'),'header__caption_state_active');
    addCls(getElem('.side-nav'),'side-nav_status_show');
  }else{
    delCls(getElem('.header'),'header_status_back');
    delCls(getElem('.header__caption'),'header__caption_state_active');
    delCls(getElem('.side-nav'),'side-nav_status_show');
  }
  //滚动到相应高度的联动-->播放动画 顶部/侧边导航栏对应item样式变化
  if(top>=0){
    swicthNavItemsActive(0);
    swicthSideNavItemsActive(0);
  }
  if(top>540*1){
    playScreenAnimateDone('.screen-2');
    swicthNavItemsActive(1);
    swicthSideNavItemsActive(1);
  }
  if(top>540*2){
    playScreenAnimateDone('.screen-3');
    swicthNavItemsActive(2);
    swicthSideNavItemsActive(2);
  }
  if(top>540*3){
    playScreenAnimateDone('.screen-4');
    swicthNavItemsActive(3);
    swicthSideNavItemsActive(3);
  }
  if(top>540*4){
    playScreenAnimateDone('.screen-5');
    swicthNavItemsActive(4);
    swicthSideNavItemsActive(4);
  }
}

//让导航栏和第一屏动画无需任何操作就自动播放
setTimeout(function(){
  playScreenAnimateDone('.header');
  playScreenAnimateDone('.screen-1');
},200)

//滑动门效果实现
var slideTipChange=function(elem,index){
  elem[index].onmouseover=function(){
    slideTip.style.left=93*index+'px';
  }
  elem[index].onmouseout=function(){
    var nowElem=0;
    for(var i=0;i<elem.length;i++){
      if(getCls(elem[i]).indexOf('header__nav__item_state_active')!=-1){
        nowElem=i;
      }
      slideTip.style.left=93*nowElem+'px';
    }
  }
}
for(var i=0;i<navItems.length;i++){
  slideTipChange(navItems,i);
}