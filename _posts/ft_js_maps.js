function demoinit() {

    // Centered on Indonesia
    var latlng = new google.maps.LatLng(-2.5, 120.5);

    var options = {
        disableDefaultUI: true,
        zoom: 4,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: true,
        scaleControl: true,
        zoomControl: true
    };

    mymap = new google.maps.Map(document.getElementById("map_canvas"), options);

    getData(1043910);
}

function getData(table) {
    // Builds a Fusion Tables SQL query and hands the result to dataHandler()

    var queryUrlHead = 'http://www.google.com/fusiontables/api/query?sql=';
    var queryUrlTail = '&jsonCallback=?';

//    var query = "SELECT id, lat, lon, protected_area, " + forma.prob + " FROM " + table + " WHERE " + forma.prob + " >= " + threshold + " and " + forma.prob_previous + " < " + threshold;
    var query = "SELECT p201012, lat, lon FROM " + table + " LIMIT 100";
    var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);

    var jqxhr = $.get(queryurl, dataHandler, "jsonp");
}

function dataHandler(d) {
    var data = d.table.rows;

    for (var i = 0; i < data.length; i++) {
        var latlon = new google.maps.LatLng(data[i][1], data[i][2]);
        var name = data[i][0];

        var marker = new google.maps.Marker({
            position: latlon,
            title: i + " " + name,
            map: mymap
        });
    }
}

