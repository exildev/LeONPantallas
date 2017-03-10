 var CB_TIMER_LIMIT = 100;
 var CB_TIMER_TIME = 0;
 var CB_TIMER;
 var CB_INTERVAL;
 function cb_timer_init(q, size, limit){
    CB_TIMER_LIMIT = limit;
    CB_TIMER = $(q).css({
        width: size,
        height: size
    }).circleProgress({
        value: 0,
        fill: {color: '#ffa500'},
        startAngle: Math.PI / 8 * 4,
        size: size
    });
}

function cb_timer_clock(){
    cb_timer_clock_to(CB_TIMER_TIME + 1);
}

function cb_timer_clock_to(time){
    CB_TIMER_TIME = time;
    if (CB_TIMER_TIME > 1000){
        CB_TIMER_TIME = 0;
    }
    CB_TIMER.circleProgress("value", time/1000)
    .on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html(Math.round(CB_TIMER_TIME));
    });
}

function cb_timer_start(){
    CB_INTERVAL = window.setInterval(function(){
        cb_timer_clock();
    }, 1);
}

function cb_timer_stop(){
    window.clearInterval(CB_INTERVAL);
    return CB_TIMER_TIME;
}

function cb_timer_restart(){
    cb_timer_clock_to(0);
}

$(document).ready(function(){
    cb_timer_init('#timer', 180, 0);
    cb_timer_start();
});