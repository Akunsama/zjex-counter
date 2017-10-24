function wave(canvas,config){
    var ctx = canvas.getContext('2d');
    var stageWidth = 0;
    var stageHeight = 0;
    var stageWidth2 = 0;
    var stageHeight2 = 0;
    var totalLength2 = 0;
    var distanceX = 0;
    var DELTA_WIDTH = 1;
    function init(){
        window.onresize = onResize;
        onResize();
        render();
    }
    function onResize(){
        stageWidth = canvas.width = 2400;
        stageHeight = canvas.height = 380;
        stageWidth2 = stageWidth / 2;
        stageHeight2 = stageHeight / 2;
        totalLength2 = Math.ceil(stageWidth2 / DELTA_WIDTH) * DELTA_WIDTH;
        redraw();
    }
    function render(){
        redraw();
        requestAnimationFrame(render);
    }
    function _getHeight(distanceX, x) {
        var offsetX = ((distanceX + x) /totalLength2 - 1) * (totalLength2 / config.waveLength);
        var waveFactor = Math.cos((x / totalLength2 - 1) * Math.PI / 2);
        return Math.cos(offsetX * Math.PI) * Math.pow(waveFactor, config.curveFactor) * config.height;
    }
    function redraw(){
        var x = stageWidth2 - totalLength2;
        var toX = x + totalLength2 * 2;
        var centerY = stageHeight2;
        //挖空
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        //椭圆
        ctx.beginPath();
        //把新窗口移动到指定的坐标
        ctx.moveTo(x, stageHeight);
        //绘制路径
        for(; x < toX; x+=DELTA_WIDTH){
            ctx.lineTo(x, centerY - _getHeight(distanceX, x));
        }
        ctx.lineTo(x-DELTA_WIDTH, stageHeight);
        //ctx.lineWidth = 4;
        //ctx.strokeStyle = '#81ecff';
        ctx.globalAlpha=0.5;
        ctx.fillStyle = config.opacity;
        //填充颜色
        ctx.fill();
        //绘制路径
        // ctx.stroke();
        distanceX+=config.speed;

    }
    init();
}
