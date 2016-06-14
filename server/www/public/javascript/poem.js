$(function(){
	//add article
	$("a.btn-insert-poem").on("click",function(){
		var this_btn = $(this);
		var art_title = $(".article-title").val();
		var art_time = new Date();
		var art_time_parse = Date.parse(art_time);
		var art_type = $(".article-type").find("option:selected").val();
        var art_ct = $("#elm1").val();
        var art_author = $(".article-author").val();
        var art_notice = this_btn.siblings(".notice-span");
        var art_appreciation = $("#elm2").val();
        var art_authorinfo = $("#elm3").val();
		if(art_title.length > 1 && art_ct.length > 1 && art_author.length > 1 && art_appreciation.length > 1 && art_authorinfo.length > 1){
			art_notice.html("");
			$.getJSON("/insertpoem",{
						  title : art_title,
						content : art_ct,
						   time : art_time.toLocaleString(),
						   type : art_type,
					      parse : art_time_parse,
					   	 author : art_author,
			   	   appreciation : art_appreciation,
			   	     authorinfo : art_authorinfo
 			},function(res){
				console.log(res);
			});
			art_notice.html("添加成功！");
		}else{
			art_notice.html("条件不充分！");
		}
	});
	//deleteArticleLink
	var deleteArt = $("a.deleteArticleLink");
		for(i = 0; i < deleteArt.length; i ++){
		(function(m){
			deleteArt.eq(m).on("click",function(){
				var this_obj = $(this);
				$.getJSON("/deletepoem",{
					id : this_obj.attr("id")
				},function(res){
					var result = res.num;
					if(result === 1){
						this_obj.parent().parent().remove();
						//window.location.reload();
					}
				})
			})
		})(i)
	}
	//btn-update-poem
	$(".btn-update-poem").on("click",function(){
		var this_btn = $(this);
		var art_title = $(".article-title").val();
		var art_time = new Date();
		var art_time_parse = Date.parse(art_time);
		var art_type = $(".article-type").find("option:selected").val();
        var art_ct = $("#elm1").val();
        var art_author = $(".article-author").val();
        var art_notice = this_btn.siblings(".notice-span");
        var art_appreciation = $("#elm2").val();
        var art_authorinfo = $("#elm3").val();
        var art_id = $(".article-title").attr("article-id");
		if(art_title.length > 1 && art_ct.length > 1 && art_author.length > 1 && art_appreciation.length > 1 && art_authorinfo.length > 1){
			art_notice.html("");
			$.getJSON("/updatepoem",{
						    _id : art_id,
						  title : art_title,
						content : art_ct,
						   time : art_time.toLocaleString(),
						   type : art_type,
					      parse : art_time_parse,
					   	 author : art_author,
			   	   appreciation : art_appreciation,
			   	     authorinfo : art_authorinfo
 			},function(res){
				console.log(res);
			});
			art_notice.html("更新成功！");
		}else{
			art_notice.html("条件不充分！");
		}
	})
	//poem-type
	var poemType = $("select.poem-type").attr("data-selected");
	$("select.poem-type").find("option[value="+poemType+"]").attr("selected","selected");
})