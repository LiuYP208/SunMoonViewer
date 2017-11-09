/**
 * Created by lenovo on 2017/11/9.
 */



var TimeSP = 0;
var timeController;
var AnimationData = {
    "AnimationTime": "",
    "isAnimation": false,
    "AnimationList": [],
    "AnimationIndex": -1
};
window.addEventListener("resize", _resizeCanvas, false);

function _resizeCanvas() {
    var canvas = document.getElementById('sky-canvas');
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    _init();
}

//时间选择部分
function _initDatePicker() {
    $("#datepicker").datepicker({
            language: "zh-CN",
            autoclose: true,//选中之后自动隐藏日期选择框
            clearBtn: true,//清除按钮
            todayBtn: true,//今日按钮
            format: "yyyy-mm-dd"//日期格式，
            // 详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
        })
        .on('changeDate', function (ev) {
            //  console.log(ev);
            var TimeStr = moment(ev.date).format("YYYY-MM-DD");
            // var TimeStr = $(".datepicker").datepicker("getDate").toLocaleString();
            alert(TimeStr);
            _getDataInfo(TimeStr);
            AnimationData.AnimationTime = TimeStr;
        });
}

//根据选择时间 ,获取json数据
function _getDataInfo(timeStr) {
    var _baseURL = "http://10.24.4.121:8888/api/locationInfo/";
    var _url = _baseURL + timeStr;
    if (timeStr !== "") {
        AnimationData.isAnimation = false;
        $.get(_url, function (data, status) {
            if (status === "success") {
                AnimationData.AnimationIndex = 0;
                AnimationData.AnimationList = JSON.parse(data);
                AnimationData.isAnimation = true;
            }
            else {
                AnimationData.AnimationList = [];
            }
        });
    }
}


//初始化部分

function _init() {
    //初始化 时间选择
    _initDatePicker();
    //初始化星空绘制
    _drawSky(function () {
    });
}


//绘制部分
function _testDraw() {
    // _drawEarth(935, 510);
    var SUN_u = Targetitem.sun.uv[0] / 200000 + 935;
    var SUN_v = Targetitem.sun.uv[1] / 200000 + 510;
    // console.log("sun:" + SUN_u + ":" + SUN_v);
    _drawSun(SUN_u, SUN_v);
    var Moon_u = Targetitem.moon.uv[0] / 3000 + 935;
    var Moon_v = Targetitem.moon.uv[1] / 3000 + 510;
    // console.log("Moon:" + Moon_u + ":" + Moon_v);
    _drawMoon(Moon_u, Moon_v);

    var Sate_u = Targetitem.target.uv[0] / 500 + 935;
    var Sate_v = Targetitem.target.uv[1] / 500 + 510;
    //console.log("Sate:" + Sate_u + ":" + Sate_v);
    _drawTarget(Sate_u, Sate_v);
}

//按照顺序绘制
function _DrawAll() {
    _drawSky(function () {
        _drawEarth(935, 510);
        //  _testDraw();
        //_DrawAll();


        var Targetitem = AnimationData.AnimationList[AnimationData.AnimationIndex];
        var showTimeStr = document.getElementById('showTimeStr');
        showTimeStr.innerHTML = Targetitem.time;
        var SUN_u = Targetitem.sun.uv[0] / 200000 + 935 + 16;
        var SUN_v = Targetitem.sun.uv[1] / 200000 + 510 + 16;
        //  console.log("sun:" + SUN_u + ":" + SUN_v);
        _drawSun(SUN_u, SUN_v);
        var Moon_u = Targetitem.moon.uv[0] / 3000 + 935 + 16;
        var Moon_v = Targetitem.moon.uv[1] / 3000 + 510 + 16;
        // console.log("Moon:" + Moon_u + ":" + Moon_v);
        _drawMoon(Moon_u, Moon_v);

        var Sate_u = Targetitem.target.uv[0] / 180 + 935 + 16;
        var Sate_v = Targetitem.target.uv[1] / 180 + 510 + 16;
        //  console.log("Sate:" + Sate_u + ":" + Sate_v);

        _drawTarget(Sate_u, Sate_v);
        AnimationData.AnimationIndex++;
        if (AnimationData.AnimationIndex >= AnimationData.AnimationList.length) {
            AnimationData.AnimationIndex = 0;
        }
    });
}

//绘制天空
function _drawSky(next) {
    var _canvas = document.getElementById('sky-canvas');


    var w = _canvas.width = window.innerWidth;
    var h = _canvas.height = window.innerHeight;


    if (_canvas.getContext) {
        var ctx = _canvas.getContext('2d');
        var img = new Image();
        img.src = 'images/sky.png';
        img.onload = function () {
            var _width = img.width;
            var _height = img.height;
            //  console.log(_width + ":" + _height);
            ctx.drawImage(img, 0, 0, w, h);
            next();
        }
    }


}

//绘制地球
function _drawEarth(x, y) {
    var canvas = document.getElementById('sky-canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'images/earth.png';
        img.onload = function () {
            var _width = img.width;
            var _height = img.height;
            //   console.log("earth:" + _width + ":" + _height);

            ctx.drawImage(img, x, y, _width, _height);
        }

    }
}

//绘制太阳
function _drawSun(x, y) {

    var canvas = document.getElementById('sky-canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'images/sun.png';
        img.onload = function () {
            var _width = img.width;
            var _height = img.height;
            //   console.log(_width + ":" + _height);
            ctx.drawImage(img, x, y, _width, _height);
        }

    }
}

//绘制 月亮
function _drawMoon(x, y) {

    var canvas = document.getElementById('sky-canvas');
    var ctx = canvas.getContext('2d');
    var ratio = getPixelRatio(ctx);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'images/moon.png';
        img.onload = function () {
            var _width = img.width;
            var _height = img.height;
            ctx.drawImage(img, x, y, ratio * 24, ratio * 24);
        }

    }


}

//绘制卫星
function _drawTarget(x, y) {

    var canvas = document.getElementById('sky-canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'images/satellite.png';
        img.onload = function () {
            var _width = img.width;
            var _height = img.height;
            //   console.log(_width + ":" + _height);
            ctx.drawImage(img, x, y, _width, _height);
        }

    }


}

//根据分辨率缩放函数
var getPixelRatio = function (context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

//点击开始动画
function _beginAnimation() {

    if (AnimationData.isAnimation) {
        timeController = setInterval(_DrawAll, 1000);
    }
    else {
        alert("请先选择时间！");
    }
}


$(document).ready(function () {
    _init();
    $("#beginAnimation").click(_beginAnimation);
});

