
'use strict';

function removeEP (endpoint) {
    _.remove(endpoints, function (ep) {
        return ep == endpoint;
    });
    console.info('Endpoint removed sucessfuly!', endpoints);
}

function addEP () {
    if (endpoints.length < 5) {
        if ($('#endpoint').val() !== '') {
            endpoints.push($('#endpoint').val());
            $('.endpoints-list').append("<p><a target='_blank' href='"+$('#endpoint').val()+"'>"+$('#endpoint').val()+"</a><button type='button' class='btn btn-default btn-xs' onclick='removeEP(\""+$('#endpoint').val()+"\"); $(this).parent().remove();'>Remove endpoint</button></p>");

            $('#endpoint').val('').focus();
            console.info('Endpoint added sucessfuly!', endpoints);
        }
        else {
            console.warn('You didn\'t enter any endpoint to watch!')
        }
    }
    else {
        console.warn('You reach the limit of watchable endpoints!');
        $('#endpoint').val('');
    }
}

$('#addEP').on('click', function() {
    addEP();
});

$('#endpoint').bind("enterKey",function(e){
    addEP();
});

$('#endpoint').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

function watchEP (epList, endpoint, series, startTime) {
    var epIndex = _.findKey(epList, function (ep) { return ep == endpoint });
    $.ajax({
        url: endpoint,
        data: {},
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function() {
            var request_time = new Date().getTime() - startTime;
            var x = (new Date()).getTime(),
            y = request_time/1000;
            series[epIndex].addPoint([x, y], false, true);
            console.log("Success", request_time/1000);
        },
        error: function() { console.error('Failed!'); }
    });
}