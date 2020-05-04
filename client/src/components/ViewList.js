import React, { Component } from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "../App.css";
import ReviewModal from "./ReviewModal";
import FilterList from "./FilterList";
import WriteReviewModal from "./WriteReviewModal";
import axios from "axios";

export class ViewList extends Component {
  constructor(props) {
    super(props);
    this.filterPlaces = this.filterPlaces.bind(this);
    this.state = {
      elements: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.names !== prevProps.names) {
      this.createList();
    }
  }

  componentDidMount() {
    this.createList();
  }

  putDataToDB = (
    placeID,
    rateSeating,
    rateComfort,
    rateIspeed,
    rateNoise,
    rateOutlet
  ) => {
    axios.post("/api/putData", {
      placeID: placeID,
      seatRating: rateSeating,
      comfortRating: rateComfort,
      noiseRating: rateNoise,
      internetRating: rateIspeed,
      outletRating: rateOutlet,
    });
  };

  createList() {
    const names = this.props.names;
    const addresses = this.props.addresses;
    const ratings = this.props.ratings;
    const placeID = this.props.placeID;
    const newArray = [];

    for (var i = 0; i < names.length; i++) {
      newArray.push(
        <li>
          <div>{names[i]}</div>

          <div>{addresses[i]}</div>
          <div> Yelp rating: {ratings[i]}/5</div>
          <ReviewModal
            names={names[i]}
            ratings={ratings[i]}
            showReviews={this.showReviews}
            placeID={placeID[i]}
          />
          <br />
          <WriteReviewModal
            names={names[i]}
            putData={this.putDataToDB}
            placeID={placeID[i]}
          />
          <br />
        </li>
      );
    }
    this.setState({ elements: newArray });
  }

  filterPlaces(seating, comfort, speed, noise, outlet) {
    let filterArray = [seating, comfort, speed, noise, outlet];
    this.props.onFilter(filterArray);
  }

  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        <FilterList onFilter={this.filterPlaces} />
        <ol>{this.state.elements}</ol>
      </div>
    );
  }
}
export default ViewList;
