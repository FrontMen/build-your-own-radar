var fs = require("fs");
var parse = require("csv-parse");
var async = require("async");

var inputFile = "data/radar.csv";

const rings = {
  Adopt: 0,
  Assess: 2,
  Hold: 3,
  Trial: 1
};
const quads = {
  "Frameworks, CMS & Programmeertalen": 0,
  "Tooling en testing": 1,
  Technieken: 2,
  "Platforms, infrastructure & Data": 3
};

var records = [];
function logLine(data) {
  const formatted = {
    name: data.name,
    quadrant: data.quadrant,
    ring: data.ring,
    // quadrant: quads[data.quadrant],
    // ring: rings[data.ring],
    label: data.name,
    description: data.description,
    active: true,
    link: "",
    moved: 0,
    inRadar: data.inRadar === "Y"
  };

  if (formatted.ring === undefined || formatted.quadrant === undefined) {
    console.log(
      formatted.name,
      "not so good",
      formatted.ring,
      formatted.quadrant
    );
  }
  records.push(formatted);
  return Promise.resolve(data);
}

var parser = parse({ delimiter: ",", columns: true }, function(err, data) {
  async.mapSeries(
    data,
    function(line, callback) {
      // do something with the line
      logLine(line).then(function() {
        // when processing finishes invoke the callback to move to the next one
        callback();
      });
    },
    function(info) {
      console.log("all done", info);
      fs.writeFileSync(
        "data/out.json",
        JSON.stringify({ records: records }, "", 3),
        function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        }
      );
    }
  );
});
fs.createReadStream(inputFile).pipe(parser);
