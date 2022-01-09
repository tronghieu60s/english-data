const fs = require("fs");

const folderName = process.argv[2] || "";

if (folderName.length === 0) {
  throw new Error("No folder name specified!");
}

const WordsPath = `./${folderName}/words.json`;
const LessonsPath = `./${folderName}/lessons.json`;

if (!fs.existsSync(WordsPath) || !fs.existsSync(LessonsPath)) {
  throw new Error("No folder name exists!");
}

/* Fix ID Words */

const WordsData = require(WordsPath).map((o, i) => ({
  ...o,
  id_word: `${i + 1}`,
}));

fs.writeFile(WordsPath, JSON.stringify(WordsData), "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log(`${folderName}: The file words was saved!`);
});

/* Fix ID Lessons */

const LessonsData = require(LessonsPath).map((o, i) => ({
  ...o,
  id_lesson: `${i + 1}`,
}));
fs.writeFile(LessonsPath, JSON.stringify(LessonsData), "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log(`${folderName}: The file lessons was saved!`);
});

/* Find Duplicate Words */

// const WordsDataLookup = WordsData.reduce((a, e) => {
//   a[e.name_word] = ++a[e.name_word] || 0;
//   return a;
// }, {});

// WordsData.filter((e) => WordsDataLookup[e.name_word]).map((e) =>
//   console.log(`${e.id_word} - ${e.name_word}`)
// );

/* Find Duplicate Lessons */

// const LessonsDataLookup = LessonsData.reduce((a, e) => {
//   a[e.name_group] = ++a[e.name_group] || 0;
//   return a;
// }, {});

// LessonsData.filter((e) => LessonsDataLookup[e.name_group]).map((e) =>
//   console.log(`${e.id_group} - ${e.name_group}`)
// );
