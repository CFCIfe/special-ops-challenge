const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.gsmarena.com/apple-phones-48.php";

axios.get(url)
    .then(res =>{
        const html = res.data;
        const $ = cheerio.load(html);

        const phones = {};

        $(".makers li").each((index, element) => {
          const name = $(element).find("span").text();

          phones[`phone${index + 1}`] = name;
        });

        const phonesJson = JSON.stringify(phones, null, 1);
        console.log((phonesJson));
    })
    .catch(error =>{
        console.log('Error loading webpage:', error);
    })