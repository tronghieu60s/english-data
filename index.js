const fs = require("fs");

const folderName = process.argv[2] || "";

if (folderName.length === 0) {
  throw new Error("No folder name specified!");
}

const WordsPath = `./${folderName}/words.json`;
const GroupsPath = `./${folderName}/groups.json`;

if (!fs.existsSync(WordsPath) || !fs.existsSync(GroupsPath)) {
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

/* Fix ID Groups */

const GroupsData = require(GroupsPath).map((o, i) => ({
  ...o,
  id_group: `${i + 1}`,
}));
fs.writeFile(GroupsPath, JSON.stringify(GroupsData), "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log(`${folderName}: The file groups was saved!`);
});

/* Find Duplicate Words */

const WordsDataLookup = WordsData.reduce((a, e) => {
  a[e.name_word] = ++a[e.name_word] || 0;
  return a;
}, {});

WordsData.filter((e) => WordsDataLookup[e.name_word]).map((e) =>
  console.log(`${e.id_word} - ${e.name_word}`)
);

/* Find Duplicate Groups */

const GroupsDataLookup = GroupsData.reduce((a, e) => {
  a[e.name_group] = ++a[e.name_group] || 0;
  return a;
}, {});

GroupsData.filter((e) => GroupsDataLookup[e.name_group]).map((e) =>
  console.log(`${e.id_group} - ${e.name_group}`)
);
