const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const Worker = require("./worker");
// Helpers
const { log } = require("./helpers");

// CONFIGs
const MAX_CPUS = 0; // Max number of CPUs to use
const URL = "https://www.tabnews.com.br"; // Base URL to web scraping

// Global variables
let page = 0; // Page number
let activeWorkers = 0; // Number of active workers
// CPU usage
let numTheads = numCPUs > MAX_CPUS && MAX_CPUS ? MAX_CPUS : numCPUs;

// ----------------------------------------------------------------------------------------------------
// Clusters

if (cluster.isMaster) {
  // *** MAIN PROCESS ***
  // Create a worker for each CPU
  for (let i = 0; i < numTheads; i++) {
    forkWorker();
  }

  // On exit
  cluster.on("exit", (worker, code, signal) => {
    log(worker.process.pid, { status: `Ended` });
    activeWorkers--;
    forkWorker();
  });

  // Fork new worker
  function forkWorker() {
    if (activeWorkers < numTheads) {
      const worker = cluster.fork();
      activeWorkers++;
      worker.on("online", () => {
        log(worker.process.pid, { status: `Started` });
        // Page
        page++;
        // Execute
        worker.send({ URL, page }, (error) => {
          if (error)
            log(worker.process.pid, {
              status: `Error sending parameters`,
              error,
            });
        });
      });
      worker.on("message", (msg) => {
        if (msg.message === "Worker done") {
          log(worker.process.pid, { status: `Worker done` });
          activeWorkers--;
          forkWorker();
        }
      });
      worker.on("error", (err) => {
        log(worker.process.pid, { status: `Error:`, err });
      });
      worker.on("exit", (code, signal) => {
        log(worker.process.pid, { status: `Exited`, code, signal });
        activeWorkers--;
        forkWorker();
      });
    }
  }
} else {
  // *** WORKER PROCESS ***
  process.on("message", async (params) => {
    log(process.pid, { status: `Received parameters :`, params });
    // Run worker engine
    await Worker(process.pid, params);
    process.send({ message: "Worker done" });
  });
}
