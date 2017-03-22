var getMonthMatrix = function (contex, year, month) {
    var d = new Date();
    var firstDay = - (new Date(year, month).getDay() - 1);
    var calendar = document.querySelector(contex);
    var result = [];
    var full = false;
    for (var j = 0; j <= 5; j++){
        var week = calendar.querySelector('.cb_week_'+(j+1));
        week.classList.remove('cb_n');
        var k = 1;
        for (var i = firstDay; i <= (firstDay + 6); i++){
            var aux = new Date(year, month, i);
            var day = week.querySelector('.cb_day_'+(k));
            var e = day.querySelector('.cb_day_num');
            e.innerHTML = aux.getDate();
            day.classList.remove('cb_nday');
            day.classList.remove('cb_now');
            if(aux.getFullYear() == d.getFullYear() && aux.getMonth() == d.getMonth() && aux.getDate() == d.getDate()){
                day.classList.add('cb_now');
            }
            if((aux.getMonth()) != (new Date(year, month).getMonth())){
                day.classList.add('cb_nday');
                if((j+1) === 5){
                    full = true;
                }
                if(full && (j+1) === 6 && week.style.display != 'none'){
                    week.classList.add('cb_n');
                }
                if(k===1 && (j+1) === 6 && week.style.display != 'none'){
                    week.classList.add('cb_n');
                }
            }
            day.appendChild(e);
            k++;
        }
        firstDay = i;
    }
    return result;
};
$(document).ready(function () {
    var date = new Date();
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var m = date.getMonth();
    $('.cb_month').text(months[m]);
    getMonthMatrix('.cb_calendar', date.getFullYear(), m);
    $('.cb_prev').click(function(){
        if(m>0){
            m = m-1;
            $('.cb_month').text(months[m]);
            getMonthMatrix('.cb_calendar', date.getFullYear(), m);
        }
    });
    $('.cb_next').click(function(){
        if(m<11){
            m = m+1;
            $('.cb_month').text(months[m]);
            getMonthMatrix('.cb_calendar', date.getFullYear(), m);
        }
    });
});
