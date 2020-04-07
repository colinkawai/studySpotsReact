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
import { filter } from "async";

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
    this.filterPlaces = this.filterPlaces.bind(this);
    this.removePlaces = this.removePlaces.bind(this);
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

  handleFilters = async filterArray => {
    let paramArray = await this.getMapInfo(filterArray);
    let filteredArray = await this.filterPlaces(filterArray, paramArray);
    let removedArray = await this.removePlaces(filteredArray, paramArray);
    console.log(removedArray);
    this.filterFinal(removedArray);
  };

  getMapInfo = filterArray => {
    return new Promise((resolve, reject) => {
      var paramArray = [];
      var locationArr = [];
      var namesArr = [];
      var ratingsArr = [];
      var addressesArr = [];
      var placeIDArr = [];
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
          if (filterArray === undefined) {
            this.setState({
              placeID: placeIDArr,
              locations: locationArr,
              names: namesArr,
              ratings: ratingsArr,
              addresses: addressesArr
            });
          }

          paramArray.push(placeIDArr);
          paramArray.push(locationArr);
          paramArray.push(namesArr);
          paramArray.push(ratingsArr);
          paramArray.push(addressesArr);

          if (filterArray !== undefined) {
            resolve(paramArray);
          }
        });
    }).catch(err => {
      console.log("Yelp API call error");
    });
  };

  filterFinal = removedArray => {
    let placeIDArr = removedArray[0];
    let locationsArr = removedArray[1];
    let namesArr = removedArray[2];
    let ratingsArr = removedArray[3];
    let addressesArr = removedArray[4];

    this.setState({
      placeID: placeIDArr,
      locations: locationsArr,
      names: namesArr,
      ratings: ratingsArr,
      addresses: addressesArr
    });
  };
  filterPlaces = (filterArray, paramArray) => {
    // have viewList send the filters in an array
    // get request to the database and put the list of placeIDs in a list that excludes those places
    // update the state
    return new Promise((resolve, reject) => {
      var placeIDArr = paramArray[0];

      var removeArray = [];
      for (let i = 0; i < placeIDArr.length; i++) {
        const getString =
          "http://localhost:3001/api/getDataAverage/" + placeIDArr[i];
        axios
          .get(getString)
          .then(res => {
            let resArray = [
              res.data.data[0].averageSeatRating,
              res.data.data[0].averageComfortRating,
              res.data.data[0].averageInternetRating,
              res.data.data[0].averageNoiseRating,
              res.data.data[0].averageOutletRating
            ];
            // push the indexes
            for (let j = 0; j < resArray.length; j++) {
              if (resArray[j] < filterArray[j]) {
                removeArray.push(i);
                break;
              }
            }
          })

          .catch(err => {
            console.log(err);
          });
      }
      resolve(removeArray);
    });
  };

  // remove change state array and rerender by calling setState
  removePlaces = (removeArray, paramArray) => {
    return new Promise((resolve, reject) => {
      let placeIDCopy = paramArray[0];
      let locationArrayCopy = paramArray[1];
      let namesCopy = paramArray[2];
      let ratingsCopy = paramArray[3];
      let addressesCopy = paramArray[4];

      let i = removeArray.length;
      console.log(removeArray);
      console.log(i);
      while (i--) {
        console.log("here");
        locationArrayCopy.splice(removeArray[i], 1);
        placeIDCopy.splice(removeArray[i], 1);
        namesCopy.splice(removeArray[i], 1);
        ratingsCopy.splice(removeArray[i], 1);
        addressesCopy.splice(removeArray[i], 1);
      }
      let returnArray = [
        placeIDCopy,
        locationArrayCopy,
        namesCopy,
        ratingsCopy,
        addressesCopy
      ];
      //console.log(returnArray);

      resolve(returnArray);
    });
  };

  // have the filters as states. And pass thsoe states off to ViewList to create
  // a call to the database
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
        <div id="title"> Study Spots</div>
        <div className={"mapListContainer"}>
          <ViewList
            className={"ViewList"}
            id={"listView"}
            names={names}
            locations={locations}
            addresses={addresses}
            ratings={ratings}
            placeID={placeID}
            onFilter={this.handleFilters}
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
