require.config({
	paths:{//用于映射不存在根路径下面的模块路径
		swiper:"../../plugs/swiper",
		jquery:"../../libs/jquery-3.1.1",
		area:"../js/area",
   		commonObj:"../js/commonobj"

	}
})
require(['jquery','swiper','area','commonObj'],function($,swiper,area,commonObj){
	var topSlider=new Swiper("#topSlider", {
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction:true
    });
	commonObj.loadCanvas();
	$(window).scroll(commonObj.scrollHandler);
	$("#productul").on("touchmove",commonObj.scrollHandler);
	$(".add").on("click",commonObj.addnums);
    $(".reduce").on("click",commonObj.reducenums);
	$(".addcart").on("click",commonObj.addcatAnimation);
	 if($(".cartnums").val()<1){
            $(".cartnums").hide();
        }else{
           $(".cartnums").show();
        }
     $('.delbtn').click(function(){
     	$(this).parents('li').remove();
     	if($('.cartlist li').length<1){
     		$('.cartlist').hide();
     		$('.onthebottom').hide();$('.null_shopping').show();
     	}
     });
     $('.clearcart').click(function(){
     	$('.cartlist').remove();
     	$('.onthebottom').hide();
     	$(".null_shopping").show();
     })
   	
       if($("select[name='sheng']").length>0){
            new PCAS("sheng","shi","qu","","","");
        }
        $('input[name=address_options]').change(function(){
                if($(this).val()==0)
                {
                        $('#new_address').show();
                }else
                {
                        $('#new_address').hide();
                }
        });
       /* $(".ifvoicenot").on("click",function(){
            $(this).parent().next().toggle();
        });*/
        
        $(".address_detail").on("click",function(){
            $(this).children().eq(0).attr("checked","checked");
            commonObj.set_address();
        });
        $("#is_set").click(function(){
//      	$('#invoice_content').
			commonObj.set_invoice();
        })
        
})