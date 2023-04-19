const puppeteer = require("puppeteer");
const fs = require("fs");

// Helpers
const { log } = require("./helpers");

async function Worker(workerPID, params) {
  log(workerPID, { status: `Running with params`, params });

  // Constants
  // Screenshots path
  const PATH_SS = "img/screenshots/";
  // Data path
  const PATH_DATA = "data/";
  // Element load target
  const EL_LOAD = "#header";
  // Element target
  const EL = "article";

  // Configs
  const { URL, page: numPage } = params;

  // Check required params
  if (!URL) return log(workerPID, { status: `Missing required params` });

  // Base URL for the search results page
  const loadURL = URL + "/recentes/pagina/" + (numPage || 1);

  // Launch browser
  const browser = await puppeteer.launch();
  log(workerPID, { status: `Browser opened >`, loadURL });

  // Open URL
  const page = await browser.newPage();
  await page.goto(loadURL);

  // Wait for page to load
  await page.waitForSelector(EL_LOAD);
  log(workerPID, { status: `Page loaded` });

  // Escape screenshot page to debug
  await page.screenshot({ path: PATH_SS + numPage +'.png' });

  // Extract search results
  const elements = await page.$$(EL);

  // Data array
  const data = [];

  // Reading the data
  for (const element of elements) {
    // Find A element inside article
    const a = await element.$("a");

    // Skip if not found
    if (!a) continue;

    // Get A data
    const route = await a.evaluate((node) => node.getAttribute("href"));
    const title = await a.evaluate((node) => node.textContent);
    // Add to data array
    data.push({
      title,
      url: URL + route,
    });
  }

  // Return search results
  const jsonRet = {
    data,
    page: numPage,
    total: data.length || 0,
    updated: new Date(),
  };

  // Close browser
  await browser.close();

  // Save Json file
  try{
    // Save file
    const file = PATH_DATA + numPage + ".json";
    log(workerPID, { file });

    fs.writeFileSync( file, JSON.stringify(jsonRet));
    // File saved
    log(workerPID, { status: `Json file saved` });
  } catch (err) {
    // Error saving file
    log(workerPID, { status: `Error saving file`, err });
  }

  // End process
  try {
    process.exit(0);
  } catch (e) {
    // Cant end process for now
  }
}

module.exports = Worker;
