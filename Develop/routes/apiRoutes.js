var fs = require('fs')
var util = require('util')
const readFileAsync = util.promisify(fs.readFile);
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var tableData = require("../data/tableData");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    //All comments will refer to the line below the comment
    //Here we read the db.json file using the fs package 
    //(same as the newvar variable you had but named more appropriately )
    readFileAsync('./db/db.json','utf8', (err, data) => {
      //This handles if the file cannot be read
        if (err) throw err;
        let parsedNotes;
        try {
          //converts the data from the db.json file from a string to an object
          parsedNotes = [].concat(JSON.parse(data));
        } catch (err) {
          //if the data cannot be converted it returns an empty array
          parsedNotes = [];
        }
        //returns the object to the page that made the request - our notes.html file
        //this is handled by the function in index.js named "renderNoteList"
        //which takes the data we send back from our endpoint and populates it on the page
        //similar to how we worked with the objects we got back from APIs
        res.json(parsedNotes)
      })
  });

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // app.get("/api/notes", function(req, res) {
  //   var notesInfo = newVar('./db/db.json','utf8', (err, data) => {
  //       if (err) throw err;
  //       console.log(data);
  //       return data
  //     });
  //   console.log(notesInfo);
  //   res.json(notesInfo);
  // });

  // var newVar = util.promisify(fs.readFile);

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
      db.push(req.body);
      res.json();
    
  });

  

  // app.post("/api/delete", function(req, res) {
  //   // Empty out the arrays of data
  //   notesData.length = 0;
  //   waitListData.length = 0;
  //   res.json({ ok: true });
  // });
};
