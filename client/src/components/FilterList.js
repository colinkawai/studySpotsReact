// within the filter there will be a drop down that fills a form
// After a user presses submit the entries will go back to viewlist then app.js
// have it exclude/include based on the entries and stil continue
// to have unrated ones.

import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import "../App.css";
const FilterList = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [seating, setSeating] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [noise, setNoise] = useState(0);
  const [outlet, setOutlet] = useState(0);

  const toggle = () => setIsOpen(!isOpen);
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
      <Button
        color="primary"
        onClick={toggle}
        id="filterButton"
        style={{ marginBottom: "1rem", marginTop: "1rem", marginLeft: "3rem" }}
      >
        Filter
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <div className={"filterList"}>
            <CardBody>
              <div> Select minimum rating for each category </div>
              <br />
              <div className={"filterListInside"}>
                <div className={"filterText"}>Seating: </div>
                <div className={"filterStar"}>
                  <StarRatingComponent
                    name={"Seating"}
                    editing={true}
                    starCount={5}
                    value={seating}
                    onStarClick={onStarClickSeating}
                  />
                </div>
              </div>

              <div className={"filterListInside"}>
                <div className={"filterText"}>Seat Comfort:</div>
                <div className={"filterStar"}>
                  <StarRatingComponent
                    name={"SeatComfort"}
                    editing={true}
                    starCount={5}
                    value={comfort}
                    onStarClick={onStarClickComfort}
                  />
                </div>
              </div>

              <div className={"filterListInside"}>
                <div className={"filterText"}>Internet Speed: </div>
                <div className={"filterStar"}>
                  <StarRatingComponent
                    name={"internetSpeed"}
                    editing={true}
                    starCount={5}
                    value={speed}
                    onStarClick={onStarClickSpeed}
                  />
                </div>
              </div>

              <div className={"filterListInside"}>
                <div className={"filterText"}>Noise Level:</div>
                <div className={"filterStar"}>
                  <StarRatingComponent
                    name={"Noise"}
                    editing={true}
                    starCount={5}
                    value={noise}
                    onStarClick={onStarClickNoise}
                  />
                </div>
              </div>

              <div className={"filterListInside"}>
                <div className={"filterText"}>Outlet Availability:</div>
                <div className={"filterStar"}>
                  <StarRatingComponent
                    name={"Outlet"}
                    editing={true}
                    starCount={5}
                    value={outlet}
                    onStarClick={onStarClickOutlet}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  props.onFilter(seating, comfort, speed, noise, outlet);
                  toggle();
                }}
              >
                Submit
              </Button>
            </CardBody>
          </div>
        </Card>
      </Collapse>
    </div>
  );
};

export default FilterList;
