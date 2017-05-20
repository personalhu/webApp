function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function onLoad(){
	
}
/*window.onload=function(){
bind(document,"touchmove",function(ev){
		ev.preventDefault();
	})
}*/
function fnTab(){
	function view(){
		return {
			w:window.document.innerWidth||document.body.clientWidth,
			h:window.document.innerHeight||document.body.clientHeight
		}
	}
	var iDis=0;
	var iStartX=0;
	var iStartTouchX=0;
	var iX=0;
	var oList=id("picList");
	var imgArr = document.images;
//	console.log(imgArr.length);
	var iW=view().w;
	var iNow=0;
	var oTab=id("tabPic");
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	function fnStart(ev){
		//fnstart的主要功能：
		oList.style.transition="none";
		iStartTouchX=ev.changedTouches[0].pageX;
		iStartX=iX;
//		console.log(iStartTouchX);
	}
	function fnMove(ev){
		iDis = ev.changedTouches[0].pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.transition="0.5s";
		oList.style.transform=oList.style.webkitTransform="translateX("+iX+"px)";
	}
	function fnEnd(){
		//fnEnd的主要实现功能
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		console.log(iNow);
		if (iNow<0){
			iNow=imgArr.length-1;
		}else if(iNow>imgArr.length-1){
			iNow=0;
		}
		tab();
	}
	function tab(){
		//fnTab主要实现功能：实现图片之间的切换
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
}
