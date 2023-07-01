import axios from "https://cdn.skypack.dev/axios";
import cheerio from "https://cdn.skypack.dev/cheerio";

function showPhones() {
  const url = "https://www.gsmarena.com/apple-phones-48.php";

  axios
    .get(url)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);

      const phones = {};

      $(".makers li").each((index, element) => {
        const name = $(element).find("span").text();

        phones[`phone${index + 1}`] = name;
      });

      const phonesListJson = JSON.stringify(phones, null, 1);

      const phoneListDiv = document.getElementById("phoneList");
      phoneListDiv.innerHTML(phonesListJson);
    })
    .catch((error) => {
      console.log("Error loading webpage:", error);
    });
}

const phoneButton = document.getElementById("phoneListButton");
phoneButton.addEventListener("click", showPhones);