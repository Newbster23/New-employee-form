require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { uploadFile } = require("./js/s3-file-upload");
const { saveDataToDatabase } = require("./js/save-details");

const app = express();
const port = process.env.PORT || "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/forms/Form.html");
});

// POST endpoint to handle form submissions
app.post("/submit-form", uploadFile.array("file"), async (req, res) => {
  if (req.files && req.files.length > 0) {
    // Files were uploaded, call the saveData function
    try {
      const inserted = await saveDataToDatabase(req, res); // Assuming saveData takes form data and files as arguments
      inserted ? 
        res.sendFile(__dirname + "/public/forms/successPopup.html") :  res.sendFile(__dirname + "/public/forms/errorPopup.html");
    } catch (error) {
      // Handle any errors that occur during data saving
      console.error("Error while saving data into db", error);
      console.log("Error while saving data into db", error);
      res.sendFile(__dirname + "/public/forms/errorPopup.html");
    }
  } else {
    // No files were uploaded, handle the error or respond accordingly
    console.error("Error while uploading files to AWS S3", error);
    console.log("Error while uploading files to AWS S3", error);
    res.sendFile(__dirname + "/public/forms/errorPopup.html");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
