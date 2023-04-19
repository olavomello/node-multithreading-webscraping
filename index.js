const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const Worker = require("./worker");

// Page count
let page = 0;

if (cluster.isMaster) {
  // Master process ***
  // Create a worker for each CPU
  for (let i = 0; i < numCPUs; i++) {
    // Add worker to cluster
    try {
      cluster.fork();
      cluster.on("online", (worker) => {
        console.log(new Date(), " :: ", `Worker ${worker.process.pid} started`);
      
        // Page
        page++;        

        // Execute
        worker.send({ page });
      });
    } catch (e) {}
  }

  // On exit
  cluster.on("exit", (worker, code, signal) => {
    console.log(new Date(), " :: ", `Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker ***
  const workerPID = process.pid;

  process.on('message', ({page}) => {
    console.log(`Received message in worker process ${cluster.worker.id}:`, page);
    
    // Run worker
    Worker(workerPID);
  });  
}
