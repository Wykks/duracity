$(document).ready(function () {
    

    var idmap = 'alex3165.h4m66jp2';
    MakeMap(idmap);

    // Requete API Keolis en ajax à finir
    $('#request').on('click', function(event) {
        var button = $(this);
        event.preventDefault();
    
        setTimeout(function(){
            var datas = KeolisRequest();
            console.log(datas);
        },3000);
        
    });

});


/*****************************
        FUNCTIONS
*****************************/


function MakeMap(id) {
    var tiles = L.mapbox.tileLayer(id);
    var map = L.mapbox.map('map',id);
}



function KeolisRequest(){
    var response;
    var urlrequest = "http://data.keolis-rennes.com/json/";
    var value = ["2.0", "8W28SF1V3D03O3V", "getbikestations"];
    var req = $.ajax({
        url: urlrequest,
        crossDomain: true,
        type: "post",
        dataType: "json",
        data: {
            version : value[0],
            key : value[1],
            cmd : value[2]
        }
    });

    function doSomethingLater( fn, time ) {
        var dfd = $.Deferred();

        setTimeout(function() {
            dfd.resolve( fn() );
        }, time || 0);

        return dfd.promise();
    }

    var success = function( ResponseObject ) {
        response = ResponseObject.opendata.answer.data;
        //console.log(response);
        
    };

    var err = function( req, status, err ) {
        //console.log(err);
        response = err;
    };

    var dfd = doSomethingLater(function() {
        return response;
    }, 100);
    
    dfd.then( success, err );
    
}

