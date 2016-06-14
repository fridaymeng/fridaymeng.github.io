/*window.onload = function(){
	!function(){
		var phy = function(id){
			return document.getElementById(id);
		}
		window.phy = phy;
	}(window)
	var $ = phy;
	//console.log($("container").innerHTML);
}*/
$(function(){
	//test 
	/*var str = "12546745457456746.995";
	var numeq = str.indexOf(".");
	var number = str.slice(0,numeq);
	var numArr = [];
	var numEnd = str.slice(numeq);
	var numLength = number.toString().length;
	var numStart = 0;
	var arrString = "";
	var stopNum = 0;
	while(numLength > -1){
		var i = numArr.length;
		if(numStart%3 == 0 && numLength > 3){
			numArr[i] = number.slice(numLength-3,numLength);
			arrString = "";
			stopNum = numLength-3;
		}else if(numLength == 0){
			numArr[i] = number.slice(0,stopNum);
		}
		numStart++;
    	numLength--;
	}
	alert("$"+numArr.reverse().join(",")+numEnd);*/
	/*(function () {
	    var str = "12546745457456746.903";
	    if (!/^-?\d+(\.\d+)*$/.test(str)) {
	        alert("格式不正确");
	        return;
	    }
	    while (/(\d)(\d{3})([,\.])/.test(str))
	        str = str.replace(/(\d)(\d{3})([,\.])/g, "$1,$2$3");
	    alert("$" + str);
	})();*/
	//#container
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var bodyHeight = $("body").height();
	/*$(".overlay-white").css({"height" : windowHeight})
	$("#container").css("opacity",0);
	setTimeout(function(){
		$(".overlay-white").animate({
			"height" : 0,
			 "width" : 0,
			   "top" : windowHeight/2,
			  "left" : windowWidth/2
		},"fast",function(){
			$("#container").animate({"opacity" : 1});
		})
	},200);*/
	//menu
	var top_menu = $(".tp-menu-pt");
	//top_menu.find("li a[name='"+top_menu.attr("activeli")+"']").addClass("active");
	top_menu.find("li[seq="+top_menu.attr("activeli")+"]").find("a").addClass("active");
	//articleP
	var articleP_li = $(".articleP");
	for(i = 0; i < articleP_li.length; i ++){
		//articleP_li.eq(i).attr("title",articleP_li.eq(i).html());
		//articleP_li.eq(i).html(articleP_li.eq(i).html().slice(0,98)+" ...");
	};
	//top animate
	var ti = 0;
	var si = 0;
	//feibonaxie draw 
	/*function pointmove(){
		ti+=1;
		si+=0.05;
		var top_val = Math.cos(0.05*ti)*80+160;
		$(".point").last().after($(".point").first().clone().css({
		   top : top_val,
		  left : ti+=2
		}))
		if($(".point").length > 85){
		  $(".point").eq(0).remove();
		}
		if(ti + 15 > $(window).width()){
		  ti = 0;
		}
	}
	var thisi = setInterval(pointmove,20);*/
	//article-type
	var articleType = $(".article-type");
	articleType.find("option[value="+ articleType.attr("data-selected") +"]").prop("selected",true);
	//btn-insert-comments
	var cve_random = parseInt(Math.random()*10);
	var cve_random_sec = parseInt(Math.random()*10);
	$(".comments-veristr").html(cve_random+"*"+cve_random+"+"+cve_random_sec+":");
	var calculation_rst = cve_random*cve_random+cve_random_sec;
	$("a.add-comments-link").on("click",function(){
		$(this).parent().hide();
		$(".comments").fadeIn();
	})
	$("input.comments-name").val("");
	$("textarea.comments-txt").val("");
	$("a.btn-insert-comments").on("click",function(){
		var this_c = $(this);
		var date = new Date();
		var cmts_name = $("input.comments-name").val();
		var cmts_ct = $("textarea.comments-txt").val();
		var cmts_time = date.toLocaleString();
		var cmst_cal = parseInt($(".comments-veri").val());
		if(cmts_name.length > 2 && cmts_ct.length > 3 && cmts_name.length < 20 && cmts_ct.length < 1000 && calculation_rst == cmst_cal){
			$.getJSON("/insertcomments",{
				    		 _id : this_c.attr("article-id"),
				   conments_name : cmts_name,
				conments_content : cmts_ct,
				   conments_time : cmts_time
			},function(res){
				this_c.siblings("span.notice-span").html(res.notice);
				window.location.reload();
			})
		}else{
			this_c.siblings("span.notice-span").html("条件不充分！")
		}
	});
})