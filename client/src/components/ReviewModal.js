import React, { useState } from "react";

import "../App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
const ReviewModal = (props) => {
  const { buttonLabel, className } = props;
  const names = props.names;
  const ratings = props.ratings;
  const placeID = props.placeID;
  // these constants are used to for the ratings after db call
  const [seating, setSeating] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [noise, setNoise] = useState(0);
  const [outlet, setOutlet] = useState(0);

  const [hours, setHours] = useState(false);
  const [phone, setPhone] = useState("");

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getString = "/api/getDataAverage/" + placeID;
  const getDataFromDb = () => {
    axios
      .get(getString)
      .then((res) => {
        setSeating(res.data.data[0].averageSeatRating);
        setComfort(res.data.data[0].averageComfortRating);
        setSpeed(res.data.data[0].averageInternetRating);
        setNoise(res.data.data[0].averageNoiseRating);
        setOutlet(res.data.data[0].averageOutletRating);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPlaceInfo = () => {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${placeID}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((res) => {
        setHours(res.data.hours[0].is_open_now);
        setPhone(res.data.display_phone);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  return (
    <div>
      <Button
        color="danger"
        onClick={() => {
          getDataFromDb();
          getPlaceInfo();
          toggle();
        }}
      >
        {buttonLabel} Read Reviews
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{names}</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <div> Seating</div>
          <StarRatingComponent
            name={"Seating"}
            editing={false}
            starCount={5}
            value={seating}
          />
          <div> Seat Comfort</div>
          <StarRatingComponent
            name={"Comfort"}
            editing={false}
            starCount={5}
            value={comfort}
          />
          <div> Internet Rating</div>
          <StarRatingComponent
            name={"Internet Speed"}
            editing={false}
            starCount={5}
            value={speed}
          />
          <div> Noise Level </div>
          <StarRatingComponent
            name={"Noise"}
            editing={false}
            starCount={5}
            value={noise}
          />
          <div> Outlet Availability </div>
          <StarRatingComponent
            name={"Outlet Availability"}
            editing={false}
            starCount={5}
            value={outlet}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ReviewModal;
