function initialize() {
    var fenway = {lat: 42.345573, lng: -71.098326};
    var map = new google.maps.Map(
        document.querySelector('#map'), {
            center: fenway,
            zoom: 14
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.querySelector('#pano'), {
            position: fenway,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
}