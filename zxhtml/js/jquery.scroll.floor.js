(function(window){
	var defaults = {
		floorClass : '.scroll-floor',
		navClass : '.scroll-nav',
		activeClass : 'active',
		activeTop : 100,
		scrollTop : 100,
		delayTime : 200
	};
	
	var $body = $('body'),data = [];
	function getItem(_list,newOptions){
		_list.each(function() {
            var item = {};
            item.$obj = $body.find(this);
            item.$activeTop = $body.find(this).offset().top - newOptions.activeTop;
            item.$scrollTop = $body.find(this).offset().top + newOptions.scrollTop;
            data.push(item);
        });
	}
	
	function scrollActive(_list,newOptions){
		var nowScrollTop = $(window).scrollTop();
		if(nowScrollTop>=300){
			$('.floor-nav').addClass('active');
        }else{
            $('.floor-nav').removeClass('active');
		}
		$.each(data,function(i,item){
			if(nowScrollTop > item.$activeTop){
				_list.removeClass(newOptions.activeClass).eq(i).addClass(newOptions.activeClass);
			}
		});
	}
	
	var scroll_floor = window.scrollFloor = function(options){
		var newOptions = $.extend({}, defaults, options);
		var floorList = $body.find(newOptions.floorClass),navList = $body.find(newOptions.navClass);

		getItem(floorList,newOptions);
		scrollActive(navList,newOptions);
        $(window).bind('scroll',function(){scrollActive(navList,newOptions);});
        
        navList.bind('click',function(){
        	var _index = $body.find(this).index();
        	$('html,body').animate({'scrollTop' : data[_index].$scrollTop},newOptions.delayTime);
        });
        var scroll_navs=$('.scroll-navs');
        scroll_navs.on('click',function () {
            document.body.scrollTop=0;
        })
	}
})(window);
