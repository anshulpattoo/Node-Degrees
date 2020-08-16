#! /usr/bin/env node

const { json } = require("body-parser");

const scheduler = "https://scheduler.distributed.computer";

/**
 * @file        events.js
 *              Sample node application showing how to deploy a DCP job whilst receiving
 *              events describing the current state of the job, processing results
 *              as they are received, and so on.
 *
 * @author Wes Garland, wes@kingsds.network
 * @date   Aug 2019
 */

module.exports.dcp = async function main() {
  return require("dcp-client")
    .init(scheduler)
    .then(processing)
    .finally((result) => {
      //setImmediate(process.exit);
      return result;
    });
};

async function processing() {
  const compute = require("dcp/compute");
  const wallet = require("dcp/wallet");

  let job, results, startTime;

  var jsonObj = require("./data-collection/repos-contributors-min-15.json");

  var algorithm = require("./algorithm");

  var input_arr = [];
  for (i = 0; i < Object.keys(jsonObj).length; i++) {
    // first para is a string
    // second is object
    input_arr.push([Object.values(jsonObj)[i], Object.values(jsonObj)]); // [[key1,jsonObj],[key2,jsonObj]]
  }

  job = compute.for(input_arr, function (key1) {
    var results = [];

    console.log("Hello, World!", key1);
    // analyzeProject(key[1], key[2])
    var totalDegrees = new Object();
    
    // go through each item in dataset
    // if it is not react, calculate connections between it and react
    // for (var i = 0; i < Object.keys(dataset).length; i++) {
    //   // array compare to array
    //   // need to use JSON stringify // see more from https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
    //   if (JSON.stringify(Object.keys(dataset)[i]) == JSON.stringify(project)) {
    //     totalDegress.keys = connectionsAmongProjects(
    //       dataset[project],
    //       Object.items(dataset)[i]
    //     );
    //     totalDegress.count = connectionsAmongProjects(
    //       dataset[project],
    //       Object.items(dataset)[i]
    //     ).length;
    //   }
    // }

    progress();
    return keys
    return  {"email": key1[1][1][1], "name": key1[0][0][0]};
    return results;
  });

  // job = compute.for(["red", "green", "yellow", "blue", "brown", "orange", "pink"],
  // function(colour) {
  //   console.log(colour)
  //   progress()
  //   return colour
  // })

  // Probably don't need to change this
  job.on("accepted", function (ev) {
    console.log(` - Job accepted by scheduler, waiting for results`);
    console.log(` - Job has id ${this.id}`);
    startTime = Date.now();
  });

  // Probably don't need to change this
  job.on("complete", function (ev) {
    console.log(
      `Job Finished, total runtime = ${
        Math.round((Date.now() - startTime) / 100) / 10
      }s`
    );
  });

  // Probably don't need to change this
  job.on("readystatechange", function (arg) {
    console.log(`new ready state: ${arg}`);
  });

 // job.on('console', (event) => console.log(event));

  job.on('error', (event) => {
    console.error("An exception was thrown by the work function:", event.message);
  });

  job.on("result", function (ev) {
    console.log(
      ` - Received result for slice ${ev.sliceNumber} at ${
        Math.round((Date.now() - startTime) / 100) / 10
      }s`
    );
    console.log(` * Wow! ${ev.result} is such a pretty colour!`);
  });

  job.public.name = "events example, nodejs";
  job.public.description = "DCP-Client Example examples/node/events.js";

  // This is the default behaviour - change if you have multiple bank accounts
  // let ks = await wallet.get(); /* usually loads ~/.dcp/default.keystore */
  // job.setPaymentAccountKeystore(ks);

  // results = await job.exec(compute.marketValue)
  results = await job.localExec();
  console.log("Results are: ", results.values());
  return results.values();
}

function analyzeProject(project, dataset) {
  // The project is a array, dataset is  a json object
  // react, {}
  // var totalDegrees = 0;
  var totalDegrees = new Object();
  totalDegrees = dataset;
  // go through each item in dataset
  // if it is not react, calculate connections between it and react
  // for (var i = 0; i < Object.keys(dataset).length; i++) {
  //   // array compare to array
  //   // need to use JSON stringify // see more from https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
  //   if (JSON.stringify(Object.keys(dataset)[i]) == JSON.stringify(project)) {
  //     totalDegress.keys = connectionsAmongProjects(
  //       dataset[project],
  //       Object.items(dataset)[i]
  //     );
  //     totalDegress.count = connectionsAmongProjects(
  //       dataset[project],
  //       Object.items(dataset)[i]
  //     ).length;
  //   }
  // }
  // add this to the total degree of react

  return totalDegrees;
}

// Return the degree in between the repo
// repo is a
function connectionsAmongProjects(project_contributors, compare_contributors) {
  var similar = [];
  for (var i = 0; i < project_contributors.length; i++) {
    if (compare_contributors.indexOf(project_contributors[i]) > -1) {
      similar.push(project_contributors[i]);
    }
  }
  return similar;
}
