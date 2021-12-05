const fs = require("fs");

let Words600 = require("./2000_Words_Topic/words.json");
let Words2000 = require("./2000_Words_Topic/words.json");

Words2000 = Words2000.map((o, i) => ({ ...o, id_word: `${i + 1}` }));

fs.writeFile(
  "./2000_Words_Topic/words.json",
  JSON.stringify(Words2000),
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  }
);
