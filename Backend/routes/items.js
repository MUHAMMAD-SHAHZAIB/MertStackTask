const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const _ = require("lodash");
const logger = require("../lib/logger");
const log = logger();
const items = require("../init_data.json").data;


// Upload directory
const uploadDir = "./static/img/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating upload directory:", err);
    } else {
      console.log("Upload directory created successfully.");
    }
  });
}

// Its storage for file by using multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage: storage });


let curId = _.size(items);

/* GET items listing. */
router.get("/", function (req, res) {
  res.json(_.toArray(items));
});

/* Create a new item */
router.post("/", upload.single("img"), function (req, res) {
  const item = req.body;
  item.img = req.file ? `./img/${req.file.filename}` : null; 
  curId += 1;
  item.id = curId;
  items[item.id] = item;
  log.info("Created item", item);

  // Save items to JSON file
  fs.writeFileSync("./init_data.json", JSON.stringify({ data: items }));

  res.json(item);
});



/* GET a single item by ID */
router.get("/:id", function (req, res) {
  const itemId = parseInt(req.params.id);
  const item = items[itemId];
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

/* Delete a item by id */
router.delete("/:id", function (req, res) {
  var item = items[req.params.id];
  delete items[req.params.id];
  res.status(204);
  log.info("Deleted item", item);
  res.json(item);
});

/* Update a item by id */
router.put("/:id", function (req, res, next) {
  var item = req.body;
  if (item.id != req.params.id) {
    return next(new Error("ID paramter does not match body"));
  }
  items[item.id] = item;
  log.info("Updating item", item);
  res.json(item);
});

module.exports = router;
