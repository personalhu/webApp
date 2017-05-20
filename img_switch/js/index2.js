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
function addClass(obj, sClass) { 
    var aClass = obj.className.split("");
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
			//将所有元素转换为字符串            
            obj.className = aClass.join(' ');
            break;
        }
    }
}
/*function getWidth(){
		var w1 = document.body.clientWidth;
//		console.log(w1);
		var w2 = w1+'px';
		console.log(w2);
		var scrW=document.getElementsByTagName('img');
		console.log(scrW);
		for (var i=0;i<scrW.length;i++){
			scrW[i].style.width ="w2";
//			console.log(scrW[i]);
			
		}
}*/
function view(){
	return{
		 w:document.body.clientWidth || window.documeny.innerWidht,
		 h:document.body.clientHeight || window.document.innerHeight
	}
}

function fnTab(){
	var iStartTouchX=0;
	var istartX=0;
	var iX=0;
	var iDis=0;
	var iNow=0;
	var iW = view().w;
	var iH = view().h;
	var oList = id("picList");
	var oTab = id("tabPic");
	var imgArr = document.images;
	var aNav = document.getElementsByTagName("nav")[1].children;
	var aNav1 = document.getElementsByTagName("nav")[0].children;
	console.log(aNav);
	console.log(aNav1);
//	console.log(imgArr.length);
	bind(oTab,'touchstart',fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	fnAuto();
	function fnAuto(){
		otimer=setInterval(function(){
			if (iNow>=0&&iNow<7){
				iNow++;
				fntab();
			}else if(iNow>=7){
				iNow = 0;
				fntab();
			}
		},2000);

		//最好用如下的方法
//		otimer = setInterval(function(){
//			iNow++;
//			iNow = iNow%imgArr.length;
//			fntab();
//		},2000);

	}
	function fnStart(ev){
		oList.style.transition="none";
		iStartTouchX = ev.changedTouches[0].pageX ;
		istartX = iX;
		clearInterval(otimer);
	}
	function fnMove(ev){
		iDis=ev.changedTouches[0].pageX-iStartTouchX;
		iX = istartX+iDis;
		oList.style.transform=oList.style.webkitTransform="translateX("+iX+"px)";
	}
	function fnEnd(){
		iNow = iX/iW;
//		alert(iNow);
		iNow = -Math.round(iNow);
		if(iNow<0){
			iNow=0;
		}else if(iNow>imgArr.length-1){
			iNow=imgArr.length-1;
		}
		fntab();
		fnAuto();
	}
	function fntab(){
		iX = -iNow*iW;
		oList.style.transition="0.5s"
		oList.style.transform = oList.style.webkitTransform = "translateX("+iX+"px)";
		for (var i = 0; i<aNav.length;i++){
			removeClass(aNav[i],'active');
			removeClass(aNav1[i],"show");
		}
		addClass(aNav[iNow],"active");
		addClass(aNav1[iNow],"show");
	}
}
