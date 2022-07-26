<template>
  <div>
    <button class="" @click="btnGetir">getir</button>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      error: "",
      apiKey: "",
      lat: 0,
      lng: 0,
    };
  },

  methods: {
    btnGetir() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            this.getAdressParam(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            // console.log(error.message);
            this.error = error.message;
          }
        );
      } else {
        console.log("tarayıcınız geolocations API desteklememektedir. !!!");
      }
    },

    getAdressParam(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=Your Api Key" +
            this.apiKey
        )
        .then((response) => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
            this.error = response.data.error_message;
          } else {
            console.log(response.data.results[0].formatted_address);
            this.address = response.data.results[0].formatted_address;
          }
        })
        .catch((error) => {
          // console.log(error.message);
          this.error = error.message;
        });
    },

    showPlaceOnMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(this.lat, this.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      //   const infoWindow = new window.google.maps.InfoWindow();

      //   infoWindow.open(map);

      //   console.log(map);

      //   for (let i = 0; i < this.places.length; i++) {
      //     const lat = this.places[i].geometry.location.lat;
      //     const lng = this.places[i].geometry.location.lng;

      //     const marker = new window.google.maps.Marker({
      //       position: new window.google.maps.LatLng(lat, lng),
      //       map: map,
      //     });

      //     this.markers.push(marker);

      //     window.google.maps.event.addListener(marker, "click", () => {
      //       console.log("click is run");
      //       infoWindow.setContent(`<div class="fw-bold fs-3 text-center text-dark">${this.places[i].name}</div>
      //                                        <div class="fw-bold text-dark">${this.places[i].vicinity}</div>`);
      //       infoWindow.open(map, marker);
      //     });
      //   }
    },
  },
};
</script>
