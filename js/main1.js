/**
 * Created by Lemon on 2017/11/23.
 */


console.log("init_version:16");
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var video1 = document.getElementById("video1");
var video2 = document.getElementById("video2");
var load=document.getElementById("load");
var startX,startY,moveEndX,moveEndY;
document.addEventListener("WeixinJSBridgeReady", function () {
    console.log("WeixinJSBridgeReady");
    try{
        video1.play();
        video2.play();
        video2.pause();
    }catch (e){}
});

function AutoPaly(from) {
        console.log("auto:"+from)
    try {
        if (video1.currentTime > 0.01) {
            load.style.display = "none";
            $(".video_btn_1").hide();
            console.log("开始播放了");
        } else {
            console.log("没有自动播放")
        }
    }catch (e){}
}

try {
    video1.onplaying=function(){
        setTimeout(function (e) {
            AutoPaly("onplaying");
        },100);
    }
}catch (e){}


window.onload = function () {
    load.style.display = "none";
    try{
        video1.play();
        video2.play();
        video2.pause();
        AutoPaly("onload");
    }catch (e){}

	console.log("window.onload");
    // 禁止ios下拉页面弹性滚动
    document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, true);

    $(".smbtn").click(function(){
        $(".btnbg").toggleClass("bianhua");
    });

	//iphone X  适配
	
	if(!isAndroid){
		console.log("不是安卓");
		var mh=$(window).height()
		var hh=$("#video1").height()
		$(".gy1").css("height",mh-hh+"px");
		$("#video2").css("top",(mh-1136)/2+"px")
	}



    var Lj_canvas_dh=function(){
        console.log("p1_canvas");
        var L_img=new Image();
        var zhen=21;
        L_img.src="img/dz2.png";
        var  img_w=1100;
        var  img_h=1236;
        var c=document.getElementById("L_donghua");
        var ctx=c.getContext("2d");
        L_img.onload=function(){
            var shu=0;
            setInterval(function(){
                if(shu>22){
                    shu=1;
                    huahua(shu);
                }else{
                    shu++;
                    huahua(shu);
                }
            },(3000/zhen));
        };

        function huahua(x){
            var mx=(x-1)%4*275;
            if(x<=4){
                my=0;
            }else{
                my=(parseInt(x/4)-1)*206;
            }
            ctx.clearRect(0,0,275,206);
            ctx.drawImage(L_img,mx,my,275,206,0,0,275,206);
        }
    }();



    $(".video_btn_1").on("click",function () {
        console.log("dianji");
        $(".video_btn_1").hide();
        try {
            video1.play();
            AutoPaly("video_btn1_touch");
            if(!isAndroid){
                video2.play();
                video2.pause();
            }

        }catch (e){}
     })

    $("#video1").on("touchstart",function () {
        try {
            video1.play();
            AutoPaly("video_click");
        }catch (e){}
  })
    $("#video2").on("touchstart",function () {
        try {
            video2.play();
        }catch (e){}
    })


    // var popNum = 0;
    $('.p_1').on("touchstart", function (e) {
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
    }).on("touchmove", function (e) {
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        moveEndY = e.originalEvent.changedTouches[0].pageY;
        var X = moveEndX - startX;
        var Y = moveEndY - startY;
        // 上滑
        if (Math.abs(X) < Math.abs(Y) && Y < 0) {
            $('.p_1').addClass('p_1_act');
            $('.p_2').addClass('p_2_act');
            try {
                video1.pause();
                video2.style.display = 'block';
                video2.play();
            }catch (e){}
        }
    }).on('touchend', function () {
        startX = 0, startY = 0, moveEndX = 0, moveEndY = 0, X = 0, Y = 0;
    });

    var isNoTwo=true;
    $('.p_2').on("touchstart", function (e) {
        // e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
        isNoTwo=true;

    }).on("touchmove", function (e) {
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        moveEndY = e.originalEvent.changedTouches[0].pageY;
        var X = moveEndX - startX;
        var Y = moveEndY - startY;
        //下滑
        if (Math.abs(X) < Math.abs(Y) && Y > 0) {
            $('.p_1').removeClass('p_1_act');
            $('.p_2').removeClass('p_2_act');
            $('#btn').hide();
            isNoTwo=false;
            if (!isAndroid) {
                try {
                    video1.play();
                }catch (e){}
                console.log('不是android');
            }

        }
        // 上滑
        if (Math.abs(X) < Math.abs(Y) && Y < 0) {
            isNoTwo=false;
            $('.p_2').addClass('p_2_act_1');
            $('.p_3').addClass('p_3_act');
            $('#btn').show();
        }

    }).on('touchend', function () {
        if(isNoTwo==false){
            video2.pause();
            video2.style.display = 'none';
        };
        isNoTwo=true;
        startX = 0, startY = 0, moveEndX = 0, moveEndY = 0, X = 0, Y = 0;

    });
    $('.p_3').on("touchstart", function (e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
    }).on("touchmove", function (e) {
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        moveEndY = e.originalEvent.changedTouches[0].pageY;
        var X = moveEndX - startX;
        var Y = moveEndY - startY;
        //下滑
        if (Math.abs(X) < Math.abs(Y) && Y > 0) {
            $('.p_2').removeClass('p_2_act_1');
            $('.p_3').removeClass('p_3_act');
            console.log('下滑');
            $('#btn').hide();
            try {
                video2.style.display = 'block';
                video2.play();
            }catch (e){}


        }
        // 上滑
        if (Math.abs(X) < Math.abs(Y) && Y < 0) {
            $('.p_3').addClass('p_3_act_1');
            $('.p_4').addClass('p_4_act');
            console.log('上滑');
        }

    }).on('touchend', function () {
        startX = 0, startY = 0, moveEndX = 0, moveEndY = 0, X = 0, Y = 0;
    });
    $('.p_4').on("touchstart", function (e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
    }).on("touchmove", function (e) {
        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        moveEndY = e.originalEvent.changedTouches[0].pageY;
        var X = moveEndX - startX;
        var Y = moveEndY - startY;
        //下滑
        if (Math.abs(X) < Math.abs(Y) && Y > 0) {
            $('.p_3').removeClass('p_3_act_1');
            $('.p_4').removeClass('p_4_act');
            // popNum = 0;
        }
        // 上滑
        // if (Math.abs(X) < Math.abs(Y) && Y < 0) {
        //     $('.p_4').addClass('p_4_act_1');
        //     // $('.p_5').addClass('p_5_act');
        // }

    }).on('touchend', function () {
        startX = 0, startY = 0, moveEndX = 0, moveEndY = 0, X = 0, Y = 0;
    });
    // $('.p_5').on("touchstart", function (e) {
    //     e.preventDefault();
    //     startX = e.originalEvent.changedTouches[0].pageX;
    //     startY = e.originalEvent.changedTouches[0].pageY;
    // }).on("touchmove", function (e) {
    //     e.preventDefault();
    //     moveEndX = e.originalEvent.changedTouches[0].pageX;
    //     moveEndY = e.originalEvent.changedTouches[0].pageY;
    //     var X = moveEndX - startX;
    //     var Y = moveEndY - startY;
    //     //下滑
    //     if (Math.abs(X) < Math.abs(Y) && Y > 0) {
    //         $('.p_4').removeClass('p_4_act_1');
    //         $('.p_5').removeClass('p_5_act');
    //         // popNum = 0;
    //     }

    // }).on('touchend', function () {
    //     startX = 0, startY = 0, moveEndX = 0, moveEndY = 0, X = 0, Y = 0;
    // });
};