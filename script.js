const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

// trend repositories
var trend_repo = [];

function getData(error, data) {
  if (error) {
    console.log("Error in fetching data");
  }
  var $ = cheerio.load(data.body); // DOM tree using HTML

  $(".Box-row").each((index, el) => {
    const title = $(el).find("h1 a").text().replace(/\s\s+/g, "").trim();
    const description = $(el).find("p").text().trim() || "";
    const url = $(el).find(".h3 a").attr("href");
    const stars = $(el).find(".f6 a:nth-of-type(1)").text().trim() || "0";
    const forks = $(el).find(".f6 a:nth-of-type(2)").text().trim() || "0";
    const lang = $(el).find(".repo-language-color + span").text().trim() || "";
    trend_repo.push({ title, description, url, stars, forks, lang });
  });
  console.log(trend_repo);

  // save data in a JSON file
  fs.writeFile("trend_repo.json", JSON.stringify(trend_repo), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data saved to trend_repo.json");
    }
  });
}

request("https://github.com/trending", getData);

// developers
var dev_repo = [];

function getDev(error, data) {
  if (error) {
    console.log("Error in fetching data");
  }
  var $ = cheerio.load(data.body); // DOM tree using HTML

  $(".Box-row.d-flex").each((index, el) => {
    const name = $(el).find("h1 a").text().replace(/\s\s+/g, "").trim();

    const description =
      $(el).find(".f6.color-fg-muted.mt-1").text().trim() || "";

    const user_name = $(el).find(".f4 a").text().trim();

    const repo = $(el).find("h1.h4 a").text().trim();

    dev_repo.push({ name, description, user_name, repo });
  });
  console.log(dev_repo);

  // save data in a JSON file
  fs.writeFile("dev_repo.json", JSON.stringify(dev_repo), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data saved to dev_repo.json");
    }
  });
}

request(
  "https://github.com/trending/developers/javascript?since=daily",
  getDev
);