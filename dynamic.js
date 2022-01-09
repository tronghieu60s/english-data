const fs = require("fs");
const folderName = process.argv[2] || "";

if (folderName.length === 0) {
  throw new Error("No folder name specified!");
}

const WordsPath = `./${folderName}/words.json`;
const DynamicPath = `./${folderName}/dynamic.json`;

if (!fs.existsSync(WordsPath)) {
  throw new Error("No folder name exists!");
}

let Words = require(WordsPath);

(async () => {
  for (let i = 0; i < Words.length; i += 1) {
    delete Words[i]["classifier"];
  }

  Words = Words.map((o) => ({
    id_word: o.id_word,
    name_word: o.name_word,
    pronounce_word: o.pronounce_word,
    explain_word: o.explain_word,
    mean_word: o.mean_word,
    id_lesson: o.id_lesson,
  }));

  fs.writeFile(DynamicPath, JSON.stringify(Words), "utf8", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(`${folderName}: The file dynamic was saved!`);
  });
})();
