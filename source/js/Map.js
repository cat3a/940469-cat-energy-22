function initMap() {
  let coordinates = {
    center: {lat:59.938840074091964, lng:30.323036678877255},
    zoom: 4
  }

  let map = new google.maps.Map(document.getElementsByClassName('.find-us__map'), coordinates);

}
