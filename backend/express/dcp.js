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
require("dcp-client").initSync(scheduler)

module.exports.dcp = async function main() {
 

  return processing().finally((res) => {return res});
};

async function processing() {
  const compute = require("dcp/compute");
  const wallet = require("dcp/wallet");

  let job, results, startTime;

  var jsonObj = require("./data-collection/repos-contributors-min-30.json");



  var input_arr = [];
  for (i = 0; i < Object.keys(jsonObj).length; i++) {
    // first para is a string
    // second is object
    input_arr.push([Object.values(jsonObj)[i], Object.values(jsonObj)]); // [[key1,jsonObj],[key2,jsonObj]]
  }


  job = compute.for(input_arr, function (key1) {
    var results = [];

    const algorithm = require('./algorithm');


    progress();
     return algorithm.analyzeProject(key1[0],key1[1][1])
    return  {"repo1": key1[1][1], "repo2": key1[0], "length": key1[0].length, "similar": similar};
    return results;
  });

  job.requires('./algorithm');

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

  results = await job.exec(compute.marketValue)
  // results = await job.localExec();
  console.log("Results are: ", results.values());
  return results.values();
}
