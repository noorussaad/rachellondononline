var fl=true
$(document).ready(function() {
	// hover
	
	$('#content > ul > li').each(function(num){
		$(this).data({num:num})
		
	})
	
	$('.close').css({opacity:0.4})
	
	$('.close').hover(function(){
		$(this).stop().animate({opacity:1})					   
	}, function(){
		$(this).stop().animate({opacity:0.4})					   
	})
	
	$('.link1 span').each(function(){
		color = $(this).parent().css('color');
		$(this).css({background:color})
	})
	
	$('.link1').hover(function(){
		$(this).find('span').css({right:'0', left:'auto'}).stop().animate({width:0},500,'easeOutCirc')				   
	}, function(){
		$(this).find('span').css({left:'0', right:'auto'}).stop().animate({width:'100%'},500,'easeOutCirc')				   
	})
	
	$('.prev span, .next span').css({opacity:0})
	
	$('.prev, .next').hover(function(){
		$(this).find('span').stop().animate({opacity:1})							
	}, function(){
		$(this).find('span').stop().animate({opacity:0})							
	})
	
	$('.gallery a').hover(function(){
		$(this).find('.caption').stop().animate({bottom:0})						   
	}, function(){
		$(this).find('.caption').stop().animate({bottom:-100})						   
	})
	
	//gallery
	
	$('.but').click(function(){
		$.fancybox.close();
		location.hash=$(this).data('hash');
	})
	
	// for lightbox
	$('.gallery a').fancybox({
				'transitionIn'		: 'elastic',
				'transitionOut'		: 'none'
	});
	
	$("#gallery1").jCarouselLite({
			btnNext: "#next1",
		 	btnPrev: "#prev1"
	});
	$("#gallery2").jCarouselLite({
			btnNext: "#next2",
		 	btnPrev: "#prev2"
	});
	$("#gallery3").jCarouselLite({
			btnNext: "#next3",
		 	btnPrev: "#prev3"
	});
	$("#gallery4").jCarouselLite({
			btnNext: "#next4",
		 	btnPrev: "#prev4"
	});
	$("#gallery5").jCarouselLite({
			btnNext: "#next5",
		 	btnPrev: "#prev5"
	});
	$("#gallery6").jCarouselLite({
			btnNext: "#next6",
		 	btnPrev: "#prev6"
	});
	$("#gallery7").jCarouselLite({
			btnNext: "#next7",
		 	btnPrev: "#prev7"
	});
	
	
 });
$(window).load(function() {	
	//bg animate
	
	$('#bgStretch').bgStretch({
			align:'rightTop',
			navigs:$('#bg_pagination').navigs({
				hoverIn:function(li){
					$('span',li).stop().animate({top:-20},500,'easeOutCirc')
				},
				hoverOut:function(li){
					if (!li.hasClass('active')) {$('span',li).stop().animate({top:-71},500,'easeOutCirc')}
				}						   
			})
		})
		.sImg({
			spinner:$('<div class="spinner"></div>').css({opacity:.7}).hide()
	})
	
	$('#bg_pagination li').eq(0).addClass('active').find('span').stop().animate({top:-20},500,'easeOutCirc');
	

	
	
	// scroll
	$('.scroll').cScroll({
		duration:700,
		step:54,
		trackCl:'track',
		shuttleCl:'shuttle'
	})	
	
	
	$('#ContactForm').forms({
		ownerEmail:'#'
	})
	
	//content switch
	var  last_num=0;
	var content=$('#content'),
		nav=$('.menu');
	nav.navs({
		useHash:true,
		hoverIn:function(li){
			$('span',li).css({left:0, right:'auto'}).stop().animate({width:'100%'},500,'easeOutCirc')
		},
		hoverOut:function(li){
			$('span',li).css({right:0, left:'auto'}).stop().animate({width:0},500,'easeOutCirc')
		}						   
	})	
	nav.navs(function(n, _){
		content.cont_sw(n);
	})
	content.cont_sw({
		showFu:function(){
			var _=this
			$.when(_.li).then(function(){
				if (_.next.attr('id')=='page_locations') {
					$('#map').html('<iframe width="310" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Brooklyn,+New+York,+NY,+United+States&amp;aq=0&amp;sll=37.0625,-95.677068&amp;sspn=61.282355,146.513672&amp;ie=UTF8&amp;hq=&amp;hnear=Brooklyn,+Kings,+New+York&amp;ll=40.649974,-73.950005&amp;spn=0.01628,0.025663&amp;z=14&amp;iwloc=A&amp;output=embed"></iframe>');
				}
				_.next.css({display:'block', left:left2}).stop().animate({left:0},600,'easeOutCirc');
			});
			fl=false;
			centre();
		},
		hideFu:function(){
			var _=this	
			if (last_num<=_.next.data('num')) {
				left1=1800;
				left2=-1600;
			} else {
				left1=-1600;
				left2=1800;
			}
			last_num=_.next.data('num');
			_.li.stop().animate({left:left1},600,'easeOutCirc', function(){
				_.li.css({display:'none'});
			})
			fl=true;
			centre();
		},
		preFu:function(){
			var _=this
			_.li.css({position:'absolute', display:'none'});
		}
	})
	
	var h_cont=840;
	function centre() {
		var h=$(window).height();
		if (h>h_cont) {
			m_top=(h-h_cont)/2+67;
		} else {
			m_top=68
		}
		if (fl==true && h<h_cont) {
			$('#content').css({height:h-334})
		} else {
			$('#content').css({height:506})	
		}
		$('.main').stop().css({paddingTop:m_top})
	}
	centre();
	$(window).resize(centre);
	/*
	var min_w_gal=726;
	
	function set_width() {
		w=$(window).width();
		if (w>988) {
			w_all=w-87;
		} else {
			w_all=901;
		}
		$('#gallery').css({width:w_all});
		if (!fl) {
			$('#gallery').css({left:359-w_all})
		}
		if (w>988) {
			k=~~((w-188-min_w_gal)/150);
			w_gal=min_w_gal+k*150
		} else {
			k=0
			w_gal=min_w_gal;
		}
		$('#gallery nav').css({width:w_gal});
		k=k+5;
		if (~~(pos/150)==k-amount-1) {
			pos=pos+150;
			$('#gallery ul').stop().animate({left:pos});
		}
		if (k<amount) {
			$('.buttons').css({display:'block'});
			$('.marker_right').css({left:w_gal+99})
		} else {
			$('.buttons').css({display:'none'});
			$('#gallery ul').stop().animate({left:0});
			pos=0;
		}
	}
	set_width();
	$(window).resize(set_width);
	centre();
	$(window).resize(centre);
	
	if (location.hash!='' && location.hash!='#') {
		$('header').css({left:0})
		$('#gallery').css({left:359-w_all})
	}
	*/
})