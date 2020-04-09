const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const DataTwo = require("./dataTwo");
require("dotenv").config();

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://Colin_Kawai:Twinturbo123@cluster0-p8ar4.mongodb.net/reviews?retryWrites=true";

// connects our back end code with the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
//return calculated array
router.get("/getData/:placeID", (req, res) => {
  Data.find({ placeID: req.params.placeID }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// returns the existing average data
router.get("/getDataAverage/:placeID", (req, res) => {
  Data.aggregate(
    [
      {
        $match: {
          placeID: req.params.placeID,
        },
      },
      {
        $group: {
          _id: null,
          averageSeatRating: {
            $avg: "$seatRating",
          },
          averageComfortRating: {
            $avg: "$comfortRating",
          },
          averageInternetRating: {
            $avg: "$internetRating",
          },
          averageNoiseRating: {
            $avg: "$noiseRating",
          },
          averageOutletRating: {
            $avg: "$outletRating",
          },
        },
      },
    ],
    function (err, data) {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true, data: data });
    }
  );
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
// also store the current average rating
router.post("/putData", (req, res) => {
  let data = new Data();

  const {
    placeID,
    seatRating,
    comfortRating,
    internetRating,
    noiseRating,
    outletRating,
  } = req.body;

  if (
    !placeID ||
    !seatRating ||
    !comfortRating ||
    !internetRating ||
    !noiseRating ||
    !outletRating
  ) {
    return res.json({
      success: false,
      error: "INVALID INPUTS",
    });
  }
  data.placeID = placeID;
  data.seatRating = seatRating;
  data.comfortRating = comfortRating;
  data.internetRating = internetRating;
  data.noiseRating = noiseRating;
  data.outletRating = outletRating;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true });
  });
  console.log(data);
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
