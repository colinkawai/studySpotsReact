import React, { Component } from "react";
import ReactDOM from "react-dom";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Map from "../components/index.js";
import axios from "axios";
import "../App.css";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.locationChange = this.locationChange.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.props.onMarkerClick(props, marker, e);
  };

  onMapClicked = (props) => {
    if (this.props.showingInfoWindow) {
      this.props.onMapClicked();
    }
  };

  centerMoved(mapProps, map) {
    this.props.centerMoved(mapProps, map);
  }

  //after a location change call after recall the api
  // using a setState callback (setState(updater, callback))
  locationChange(lat, lng) {
    this.props.handleLocationChange(lat, lng);
  }

  // if a user clicks redo search in this area, call set state
  // which will re render everything
  // how to create event listeners for a component
  render() {
    const names = this.props.names;
    const locations = this.props.locations;
    const addresses = this.props.addresses;
    const ratings = this.props.ratings;
    const activeMarker = this.props.activeMarker;
    const showingInfoWindow = this.props.showingInfoWindow;
    const selectedPlace = this.props.selectedPlace;
    var elements = [];
    for (var i = 0; i < names.length; i++) {
      elements.push(
        <Marker
          onClick={this.onMarkerClick}
          title={names[i]}
          name={names[i]}
          position={{
            lat: locations[i].latitude,
            lng: locations[i].longitude,
          }}
          addresses={addresses[i]}
          ratings={ratings[i]}
        />
      );
    }
    // loaded prop is from the GoogleApiComponent
    return (
      //getting a reference to a google object
      <div>
        <Map
          centerAroundCurrentLocation
          google={this.props.google}
          style={{ width: "100%", height: "100%", position: "relative" }}
          className={"map"}
          zoom={14}
          onClick={this.onMapClicked}
          onDragend={this.centerMoved}
          onLocationChange={this.locationChange}
        >
          {elements}
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <div>
              <h1>{selectedPlace.name}</h1>
              <h2>Yelp Rating: {selectedPlace.ratings}/5</h2>
              <h3>{selectedPlace.addresses}</h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

/*
MapContainer.defaultProps = {
  names: {},
  locations: [],
  addresses: [],
  ratings: [],

  activeMarker: {},
  selectedPlace: {}
};
*/
//Higher Order Component that provides wrapper around Google APIs
//Can be configured by passing a function that will be called with the wrapped component's props
export default GoogleApiWrapper({
  apiKey: `${process.env.GOOGLE_KEY}`,
})(MapContainer);
