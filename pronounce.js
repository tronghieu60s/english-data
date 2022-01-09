const fs = require("fs");
const puppeteer = require("puppeteer");
const folderName = process.argv[2] || "";

if (folderName.length === 0) {
  throw new Error("No folder name specified!");
}

const WordsPath = `./${folderName}/words.json`;
const PronouncePath = `./${folderName}/pronounce.json`;

if (!fs.existsSync(WordsPath)) {
  throw new Error("No folder name exists!");
}

const Words = require(WordsPath);

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < Words.length; i += 1) {
    const { name_word, pronounce_word = '' } = Words[i];

    if (pronounce_word.length > 0) {
      continue;
    }

    const arrName = name_word.split(" ");
    const arrPronounce = [];

    for (let j = 0; j < arrName.length; j += 1) {
      await page.goto(`https://dict.laban.vn/find?type=1&query=${arrName[j]}`);
      try {
        const selector = ".word_tab_title .color-black";
        const element = await page.waitForSelector(selector, { timeout: 2000 });
        const pronounce = await element.evaluate((el) => el.textContent);
        console.log(`${name_word} - ${pronounce}`);
        arrPronounce.push(pronounce.replace(/\//g, ""));
      } catch (e) {
        if (e) {
          console.log("Error: ", name_word);
          break;
        }
      }
    }

    if (arrPronounce.length === 0) {
      console.log("Error: ", name_word);
      continue;
    }
    Words[i].pronounce_word = `/${arrPronounce.join(" ")}/`;
  }

  fs.writeFile(PronouncePath, JSON.stringify(Words), "utf8", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(`${folderName}: The file pronounce was saved!`);
  });

  await browser.close();
})();
