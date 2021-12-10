const fs = require("fs");

/* 2000_Words_Topic */

let Words600 = require("./1.600_Words_Toeic/words.json");
let Groups600 = require("./1.600_Words_Toeic/groups.json");

Words600 = Words600.map((o, i) => ({ ...o, id_word: `${i + 1}` }));
Groups600 = Groups600.map((o, i) => ({ ...o, id_group: `${i + 1}` }));

fs.writeFile(
  "./1.600_Words_Toeic/words.json",
  JSON.stringify(Words600),
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("600_Words_TOEIC: The file words was saved!");
  }
);

fs.writeFile(
  "./1.600_Words_Toeic/groups.json",
  JSON.stringify(Groups600),
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("600_Words_Toeic: The file groups was saved!");
  }
);

/* 2000_Words_Topic */

let Words2000 = require("./2.2000_Words_Topic/words.json");
let Groups2000 = require("./2.2000_Words_Topic/groups.json");

Words2000 = Words2000.map((o, i) => ({ ...o, id_word: `${i + 1}` }));
Groups2000 = Groups2000.map((o, i) => ({ ...o, id_group: `${i + 1}` }));

fs.writeFile(
  "./2.2000_Words_Topic/words.json",
  JSON.stringify(Words2000),
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("2000_Words_Topic: The file words was saved!");
  }
);

fs.writeFile(
  "./2.2000_Words_Topic/groups.json",
  JSON.stringify(Groups2000),
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("2000_Words_Topic: The file groups was saved!");
  }
);
