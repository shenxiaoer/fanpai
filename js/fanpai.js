var award = [];
var imgdata = [];
var num;
var isture = true;

function getData() {
	$.ajax({
		type: "POST",
		url: "~/../json/data.json",
		data: null,
		async: true,
		dataType: "json", //返回数据类型
		success: function(data) {
			award = data["awardNames"];
			imgdata = data["src"];
			num = data["number"];
			$('.cishu').html(num);
		},
		error: function(data) {
			alert("网络错误,请检查您的网络设置");
		}
	});
}
//getData();
$(".main li").each(function() {
	var p = $(this);
	var c = $(this).attr('class');
	p.click(function() {
		if(num <= 0) {
			alert("没有次数了");
			$('.cishu').html(0);
			isture = false;
		} else {
			//还有次数就执行
			num = num - 1;
			if(num <= 0) {
				num = 0;
			}
			$('.cishu').html(num);
		}
		if(isture) {
			$(".main li").unbind('click'); //连续翻动
			var index = $(this).index();
			$.ajax({
				type: "POST",
				url: "~/../json/data.json",
				data: null,
				async: true,
				dataType: "json", //返回数据类型
				success: function(data) {
					award = data["awardNames"];
					imgdata = data["src"];
					num = data["number"];
					$('.cishu').html(num);
					p.flip({
						direction: 'lr',
						content: "<img src=" + imgdata[index] + "/>" + "<div>" + award[index] + "</div>",
						onEnd: function() {
							p.css({
								"background-image": 'url(~/../img/bg3.jpg)',
								color: 'red',
							}).unbind('click');
							p.attr("id", "r"); //标记为中奖方块的id
						}
					});
					setTimeout(function() {
						$(".main li").each(function(i, obj) {
							if(i!=index){
								$(obj).css({
									"background-image": 'url(~/../img/bg2.png)',
									"color": "#333"
								}).html("<img src=" + imgdata[i] + "/>" + "<div>" + award[i] + "</div>")
							}

							//翻牌效果
							/*var pr = $(this);
							 pr.flip({
							 //	                direction: 'rl',
							 speed:1,
							 content:"<img src="+imgdata[index]+"/>"+"<div>"+award[index]+"</div>",
							 //奖品信息（未抽中）
							 onEnd: setTimeout(function(){
							 pr.css({
							 "background-image": 'url(~/../img/bg2.png)',
							 "color": "#333"
							 });
							 },1500)
							 }); */
							$(".mengban").removeClass("hide");
							$(".viewother").removeClass("hide");
							$(".viewother span").html(award[index]);
						});
					}, 1100)
				},
				error: function(data) {
					alert("网络错误,请检查您的网络设置");
				}
			});

		}
	});

});

$(".lbtn").click(function() {
	$(".mengban").addClass("hide");
	$(".viewother").addClass("hide");
})

$(".rbtn").click(function() {
	window.location.reload();
})