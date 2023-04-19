
// Constants
const DEBUG = true; // Debug mode

// ----------------------------------------------------------------------------------------------------
// Functions

// Escape console.log
function log( workerId = null, params = {} ){
  if( DEBUG ) console.log(new Date(), " :: ", `Worker ${workerId} > `, params);
}

// ----------------------------------------------------------------------------------------------------

// Export
module.exports = {
  log
};