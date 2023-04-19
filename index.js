const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const puppeteer = require('puppeteer');

// Base URL for the search results page
const BASE_URL = 'https://www.google.com/search?q=';

if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to Google search results page
    await page.goto(BASE_URL + 'brasil');

    // Extract search results
    const searchResults = await page.$$eval('.g', (elements) => {
      const results = [];

      for (let i = 0; i < elements.length; i++) {
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

    console.log(searchResults);

    await browser.close();
  })();
}
