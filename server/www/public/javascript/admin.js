$(function(){
	//add article
	$("a.btn-insert-article").on("click",function(){
		var this_btn = $(this);
		var art_title = $(".article-title").val();
		var art_time = new Date();
		var art_time_parse = Date.parse(art_time);
		var art_type = $(".article-type").find("option:selected").val();
        var art_ct = $("#elm1").val();
        var art_subtitle = $(".article-subtitle").val();
        var art_notice = this_btn.siblings(".notice-span");
		if(art_title.length > 0 && art_ct.length > 0 && art_subtitle.length > 0){
			art_notice.html("");
			var reqParm = {
				title : art_title,
				content : art_ct,
				   time : art_time.toLocaleString(),
				   type : art_type,
			      parse : art_time_parse,
			   subtitle : art_subtitle
			}
			//var objpam = JSON.stringify(reqParm);
			$.post("/insertarticle",reqParm,function(res){
				console.log(res);
			});
			art_notice.html("添加成功！");
			/*setTimeout(function(){
				window.location.replace("/newarticle");
			},300);*/
		}else{
			art_notice.html("条件不充分！");
		}
	});
	//update article
	$("a.btn-update-article").on("click",function(){
		var this_btn = $(this);
		var art_title = $(".article-title").val();
		var art_time = new Date();
		var art_time_parse = Date.parse(art_time);
		var art_type = $(".article-type").find("option:selected").val();
        var art_ct = $("#elm1").val();
        var art_id = $(".article-title").attr("article-id");
        var art_notice = this_btn.siblings(".notice-span");
        var art_subtitle = $(".article-subtitle").val();
		if(art_title.length > 0 && art_ct.length > 0 && art_subtitle.length > 0){
			art_notice.html("");
			$.getJSON("/updatearticle",{
				    _id : art_id,
				  title : art_title,
				content : art_ct,
				   time : art_time.toLocaleString(),
				   type : art_type,
			      parse : art_time_parse,
			   subtitle : art_subtitle
 			},function(res){
				console.log(res);
			});
			art_notice.html("更新成功！");
			setTimeout(function(){
				location.replace("/editarticle");
			},300);
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
				$.getJSON("/deletearticle",{
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
	//deleteComments
	var deleteArtCmts = $("a.deleteCommentsLink");
	for(i = 0; i < deleteArtCmts.length; i ++){
		(function(m){
			deleteArtCmts.eq(m).on("click",function(){
				var this_obj = $(this);
				$.getJSON("/deletearticlecmts",{
					id : this_obj.attr("id"),
			     cmnum : this_obj.attr("num"),
			     cmtit : this_obj.attr("tit"),
			      cmct : this_obj.attr("content"),
			    cmtime : this_obj.attr("cttime"),
			   cmtcond : this_obj.attr("cmtscond")
				},function(res){
					var result = res.num;
					if(result === 1){
						this_obj.parent().remove();
						//window.location.reload();
					}
				})
			})
		})(i)
	}
})