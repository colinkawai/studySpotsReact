import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

const WriteReviewModal = props => {
  const { buttonLabel, className } = props;
  const names = props.names;
  const rating = props.rating;
  const placeID = props.placeID;
  const [seating, setSeating] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [noise, setNoise] = useState(0);
  const [outlet, setOutlet] = useState(0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onStarClickSeating = (nextValue, prevValue, name) => {
    setSeating(nextValue);
  };
  const onStarClickComfort = (nextValue, prevValue, name) => {
    setComfort(nextValue);
  };
  const onStarClickSpeed = (nextValue, prevValue, name) => {
    setSpeed(nextValue);
  };
  const onStarClickNoise = (nextValue, prevValue, name) => {
    setNoise(nextValue);
  };
  const onStarClickOutlet = (nextValue, prevValue, name) => {
    setOutlet(nextValue);
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel} Write Review
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
          <div>Rating in State: {rating}</div>
          <div>Seating</div>
          <StarRatingComponent
            name={names}
            editing={true}
            starCount={5}
            value={seating}
            onStarClick={onStarClickSeating}
          />
          <div>Seat Comfort</div>
          <StarRatingComponent
            name={names}
            editing={true}
            starCount={5}
            value={comfort}
            onStarClick={onStarClickComfort}
          />
          <div>Internet Speed</div>
          <StarRatingComponent
            name={names}
            editing={true}
            starCount={5}
            value={speed}
            onStarClick={onStarClickSpeed}
          />
          <div>Nosie Level</div>
          <StarRatingComponent
            name={names}
            editing={true}
            starCount={5}
            value={noise}
            onStarClick={onStarClickNoise}
          />
          <div>Outlet Availability</div>
          <StarRatingComponent
            name={names}
            editing={true}
            starCount={5}
            value={outlet}
            onStarClick={onStarClickOutlet}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.putData(placeID, seating, comfort, speed, noise, outlet);
              toggle();
            }}
          >
            Do Something
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default WriteReviewModal;
