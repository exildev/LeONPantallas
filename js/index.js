/**
    Mueve la barra al sigiente valir
*/
function cbj_step_next(){
    var active = $(".cb_progress_bar").find('.cb_current').data('step');
    if (active+1 <= $(".cb_progress_bar").find('.cb_step').length){
        cbj_step_process(active, active+1);
    }else{
        cbj_step_process(active, 1);
    }
}

/**
    activa o desactiva el modal
*/

function cbj_modal(){
    $("#cb_modalc")[0].classList.toggle('cb_modal');
}

/**
    Activa el dialogo
*/

function cbj_dialog(){
    cbj_modal();
    $("#cb_dialogc")[0].classList.toggle('cb_activate');
}

/**
    Mueve la barra a un valor espesifico

    form: posicion en la que se encuentra la barra
    to: posicion a la que se movera la barra
    dir (opcional): direccion de la animacion acendente o desendente
*/

function cbj_step_process(from, to, dir) {
    if (to <= $(".cb_progress_bar").find('.cb_step').length){
        if (typeof(dir) === 'undefined') dir = 'asc';
        var old_move = '';
        var new_start = '';
        var speed = 500;

        if (dir == 'asc') {
            old_move = '-';
            new_start = '';
        } else if (dir == 'desc') {
            old_move = '';
            new_start = '-';
        }

        if (Math.abs(from-to) === 1) {
            // Next Step
            if (from < to) $("#step"+from).addClass('cb_complete').removeClass('cb_current');
            else $("#step"+from).removeClass('cb_complete').removeClass('cb_current');
            var width = (parseInt(to) - 1) * 16.5;
            $(".cb_progress_bar").find('.cb_current_steps').animate({'width': width+'%'}, speed, function() {
                $("#step"+to).removeClass('cb_complete').addClass('cb_current');
            });
        } else {
            // Move to Step
            var steps = Math.abs(from-to);
            var step_speed = speed / steps;
            if (from < to) {
                move_to_step(from, to, 'asc', step_speed);
            } else {
                move_to_step(from, to, 'desc', step_speed);
            }
        }
    }
}

/**
    Animacion de la barra (esta funccion es automanticamente utilizada por las anteriores)

    step: posicion inicial
    end: posicion hasta la cual llegara la animacion
    dir: direccion de la animacion (acendente o desendente)
    step_speed: velocidad de la animacion
*/

function move_to_step(step, end, dir, step_speed) {
    if (dir == 'asc') {
        $("#step"+step).addClass('cb_complete').removeClass('cb_current');
        var width = (parseInt(step+1) - 1) * 20;
        $(".cb_progress_bar").find('.cb_current_steps').animate({'width': width+'%'}, step_speed, function() {
            $("#step"+(step+1)).removeClass('cb_complete').addClass('cb_current');
            if (step+1 < end) move_to_step((step+1), end, dir, step_speed);
        });
    } else {
        $("#step"+step).removeClass('cb_complete').removeClass('cb_current');
        var width = (parseInt(step-1) - 1) * 20;
        $(".cb_progress_bar").find('.cb_current_steps').animate({'width': width+'%'}, step_speed, function() {
            $("#step"+(step-1)).removeClass('cb_complete').addClass('cb_current');
            if (step-1 > end) move_to_step((step-1), end, dir, step_speed);
        });
    }
}
