const puppeteer = require('puppeteer');

async function Worker(workerPID, numPage = 1){

  console.log(new Date(), ' :: ', `Worker ${workerPID} running...`);

  // Base URL for the search results page
  const BASE_URL = 'https://www.tabnews.com.br/pagina/'+ ( !numPage || 1 );
  
  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(new Date(), ' :: ', 'Page', page);

  // Navigate to URL
  await page.goto(BASE_URL);

  // Extract search results
  const data = await page.$$('#header', (elements) => {
    const results = [];
    // Limit results listed
    //  LIMIT || elements.length ==> total data 
    const LIMIT = 10;

    // Reading the data
    for (let i = 0; i < LIMIT; i++) {
      // Get title and link
      const articleElement = elements[i].querySelector('article');
      console.log("articleElement", articleElement);
      const titleElement = elements[i].querySelector('h3');
      const linkElement = elements[i].querySelector('a');

      if (titleElement && linkElement) {
        results.push({
          title: titleElement.innerText,
          link: linkElement.href
        });
      }
    }
    return results;
  });

  // Return search results
  const ret = {
    date: new Date(),
    workerPID,
    data
  };

  console.log(ret);
  
  // Close browser without wait to speed up the process 
  browser.close();

}

module.exports = Worker;