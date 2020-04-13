import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import makeCancelable from "make-cancelable";
var promise = require("promise");

export class Map extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    };
    return (
      <div style={style} ref="map">
        Loading Map...
      </div>
    );
  }
  // the case when the map is first loaded
  // cannot depend upon the google api being avaliable when the component is first loaded
  // if component is loaded without it the google prop will be undefined
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    // recenterMap is called when the currentLocation in the component's state is updated
  }

  // this would happen whenever our map has already been loaded previously in our app
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        this.geoPromise = makeCancelable(
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          })
        );

        this.geoPromise.promise
          .then(pos => {
            const coords = pos.coords;
            this.setState({
              currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude
              }
            });
          })
          .catch(e => e);
      }
    }
    this.loadMap();
  }

  //called when there is a DOM component on the page
  //need to grab the refrence to the DOM component
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      //instantiate a google map object on our page
      // pulling from state and not props
      let { initialCenter, zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // constructor accepts a DOM node
      // and a configuration object to create a map
      this.map = new maps.Map(node, mapConfig);
    }
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool
};
//convert loadmap function to use these variables from this.props
Map.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  centerAroundCurrentLocation: false,
  visible: true
};

export default Map;
/*
const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocaiton: {
        lat: lat,
        lng: lng
      }
    };
  }

  //is invoked immediatley after updating occurs. Not called for initial render
  // good place to do network requests
  componentDidUpdate(prevProps, prevState) {
    //need to check if the map is loaded
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    //check if browser's current location is provided
    if (prevState.currentLocaiton !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  // instance when map is already loaded
  // invoked immediatley after a component is mounted
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      // what is setting centerAroundCurrentLocation to true
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocaiton: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  //only called after the component has been rendered
  //and grabs a reference from the DOM component to where we want out map to be placed
  loadMap() {
    if (this.props && this.props.google) {
      // check if google is avaliable
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      //reference to the DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocaiton;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.maps = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocaiton
      });
    });
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map ...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};
*/
