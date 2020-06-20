
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

function setScreenAnimate(screenCls) {

  var screen = document.querySelector(screenCls); // 获取当前屏的元素
  var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素

  var isSetAnimateClass = false; // 是否有初始化子元素的样式

  var isAnimateDone = false; // 当前屏幕下所有子元素的状态是DONE？

  screen.onclick = function(){

    //  初始化样式，增加init A A_init
    if( isSetAnimateClass === false){
        for(var i=0;i<animateElements.length;i++){
            var element = document.querySelector(animateElements[i]);
            var baseCls = element.getAttribute('class');
            element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
        }
        isSetAnimateClass = true;
        return ;
    }
    //  切换所有 animateElements 的  init -> done   A A_done
    if(isAnimateDone === false){
      for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
      }
      isAnimateDone = true;
      return ;
    }
    //  切换所有 animateElements 的  done -> init   A A_init
    if(isAnimateDone === true){
      for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
      }
      isAnimateDone = false;
      return ;
    }

  }


}

for(k in screenAnimateElements){
  setScreenAnimate(k);
}
