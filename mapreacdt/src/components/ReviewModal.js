import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
const ReviewModal = props => {
  const { buttonLabel, className } = props;
  const names = props.names;
  const ratings = props.ratings;
  const [modal, setModal] = useState(false);
  const placeID = props.placeID;
  const ratingElement = [];
  const toggle = () => setModal(!modal);

  const getDataFromDb = () => {
    axios
      .get("http://localhost:3001/api/getData", {
        params: {
          placeID: placeID
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        color="danger"
        onClick={() => {
          getDataFromDb();
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
          <StarRatingComponent
            name={names}
            editing={false}
            starCount={5}
            value={ratings}
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
