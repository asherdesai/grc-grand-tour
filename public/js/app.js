var map;
var panorama;
var marker;

function initialize() {
    var current = {lat: coordinate.lat, lng: coordinate.lon};
    var sv = new google.maps.StreetViewService();

    map = new google.maps.Map(
        document.querySelector('#map'), {
            center: current,
            zoom: 14,
            streetViewControl: false
        }
    );

    panorama = new google.maps.StreetViewPanorama(
        document.querySelector('#pano'), {
            position: current
        }
    );

    marker = new google.maps.Marker({position: current, map: map});

    sv.getPanorama({
        location: current,
        preference: nearest,
        radius: 400
    }, processSVData);
}

function processSVData(data, status) {
    if (status === 'OK') {
        panorama.setPano(data.location.pano);
        panorama.setPov({
            heading: 270,
            pitch: 0
        });
        panorama.setVisible(true);
    } else {
        console.error("Street View unavailable at this location")
    }
}