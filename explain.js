const fs = require("fs");
const puppeteer = require("puppeteer");
const folderName = process.argv[2] || "";

if (folderName.length === 0) {
  throw new Error("No folder name specified!");
}

const WordsPath = `./${folderName}/words.json`;
const ExplainPath = `./${folderName}/explain.json`;

if (!fs.existsSync(WordsPath)) {
  throw new Error("No folder name exists!");
}

const Words = require(WordsPath);

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < Words.length; i += 1) {
    const { name_word, explain_word = "" } = Words[i];

    if (explain_word.length > 0) {
      continue;
    }

    let explain = "";
    const word = name_word.replace(" ", "-");
    await page.goto(`https://dict.laban.vn/find?type=3&query=${word}`);
    try {
      const selector = `.slide_content:not(.hidden) #content_selectable .green.bold.margin25.m-top15`;
      await page.waitForSelector(selector, { timeout: 2000 });
      explain = await page.evaluate((selector) => {
        for (let index = 0; index < 5; index += 1) {
          const element = document.querySelectorAll(selector);
          const elementText = element?.[index]?.textContent;
          if (elementText.length <= 25) {
            continue;
          }
          return elementText;
        }
      }, selector);

      explain = explain.replace(/ *\[[^\]]*]/, "").trim();
      if (explain[0] === ":") {
        explain = explain.substring(1);
      }
      console.log(`${name_word} - ${explain}`);
    } catch (e) {
      if (e) {
        console.log("Error: ", name_word);
        continue;
      }
    }

    if (explain.length === 0) {
      console.log("Error: ", name_word);
      continue;
    }

    Words[i].explain_word = explain.trim();
  }

  fs.writeFile(ExplainPath, JSON.stringify(Words), "utf8", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(`${folderName}: The file explain was saved!`);
  });

  await browser.close();
})();
