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
  require('dcp-client')
    .initSync()
    // .then(main)
    // .finally(() => setImmediate(process.exit));;

  const compute = require("dcp/compute");
  const wallet = require("dcp/wallet");

  let job, results, startTime;

  var jsonObj = require("../data-collection/repos-contributors.json");

  var algorithm = require("./algorithm")
  console.log(algorithm.analyzeProject)

  var input_arr = []
  for (i = 0; i < Object.keys(jsonObj).length; i++) {
    input_arr.push([Object.keys(jsonObj)[i], jsonObj])
  }

  job = compute.for(input_arr, function (key, jsonObj) {
    var results = [];
    console.log(key)

    algorithm.analyzeProject(key, jsonObj)
    // for (var k = 0, length = keys.length; k < length; k++) {
    //   console.log(jsonObj[keys[k]]);
    //   console.log(jsonObj[keys[k]]["contributors"].length);
    //   results.push({ name: keys[k], count: jsonObj[keys[k]]["contributors"].length });
    // }

    progress();
    return key.length
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
  return results.values()
}

// require("dcp-client")
//   .init(scheduler)
//   .then(main)
//   .finally(() => setImmediate(process.exit));
