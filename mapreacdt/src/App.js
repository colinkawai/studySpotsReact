import React, { Component } from "react";
import MapContainer from "./components/MapContainer";
import axios from "axios";
import ViewList from "./components/ViewList";
import "./App.css";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

export class Container extends React.Component {
  targetElement = null;
  //modal variabales

  constructor(props) {
    //state from map needs to live up here
    super(props);

    this.state = {
      showingInfoWindow: false,
      show: false,
      activeMarker: {},
      selectedPlace: {},
      addresses: [],
      locations: [],
      names: [],
      placeID: [],
      hours: [],
      ratings: [],
      currentLocation: {
        lat: "",
        lng: ""
      }
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleOnMapClicked = this.handleOnMapClicked.bind(this);
    this.handleCenterMoved = this.handleCenterMoved.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    this.targetElement = document.querySelector("#listView");
    disableBodyScroll(this.targetElement);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  handleOnMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleCenterMoved(mapProps, map) {
    this.setState(
      {
        currentLocation: {
          lat: map.center.lat(),
          lng: map.center.lng()
        }
      },
      () => {
        this.getMapInfo();
      }
    );
  }

  handleLocationChange(lat, lng) {
    this.setState(
      {
        currentLocation: {
          lat: lat,
          lng: lng
        }
      },
      () => {
        this.getMapInfo();
      }
    );
  }

  getMapInfo() {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          },
          params: {
            categories: "coffee, libraries",
            latitude: this.state.currentLocation.lat,
            longitude: this.state.currentLocation.lng,
            limit: 20
          }
        }
      )
      // set state for locations, names
      .then(res => {
        let locationArr = [];
        let namesArr = [];
        let ratingsArr = [];
        let addressesArr = [];
        let placeIDArr = [];

        for (var key in res.data.businesses) {
          var addressesBase = res.data.businesses[key].location;

          locationArr.push(res.data.businesses[key].coordinates);
          placeIDArr.push(res.data.businesses[key].id);
          namesArr.push(res.data.businesses[key].name);
          ratingsArr.push(res.data.businesses[key].rating);
          addressesArr.push(
            "" +
              addressesBase.address1 +
              " " +
              addressesBase.city +
              ", " +
              addressesBase.state +
              " " +
              addressesBase.zip_code
          );
        }
        this.setState({
          locations: locationArr,
          placeID: placeIDArr,
          names: namesArr,
          ratings: ratingsArr,
          addresses: addressesArr
        });
        console.log(this.state.names);
      })

      .catch(err => {
        console.log("Yelp API call error");
      });
  }

  render() {
    const names = this.state.names;
    const locations = this.state.locations;
    const addresses = this.state.addresses;
    const ratings = this.state.ratings;
    const activeMarker = this.state.activeMarker;
    const showingInfoWindow = this.state.showingInfoWindow;
    const selectedPlace = this.state.selectedPlace;
    const placeID = this.state.placeID;
    return (
      <div className={"container"}>
        <div className={"mapListContainer"}>
          <ViewList
            className={"ViewList"}
            id={"listView"}
            names={names}
            locations={locations}
            addresses={addresses}
            ratings={ratings}
            placeID={placeID}
          />

          <MapContainer
            className={"mapContainer"}
            names={names}
            locations={locations}
            addresses={addresses}
            ratings={ratings}
            activeMarker={activeMarker}
            showingInfoWindow={showingInfoWindow}
            selectedPlace={selectedPlace}
            onMapClicked={this.handleOnMapClicked}
            onMarkerClick={this.onMarkerClick}
            centerMoved={this.handleCenterMoved}
            handleLocationChange={this.handleLocationChange}
          />
        </div>
      </div>
    );
  }
}

export default Container;
