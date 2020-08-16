#! /usr/bin/env node

const { json } = require("body-parser");

const scheduler = "https://demo-scheduler.distributed.computer/";

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


    return processing().finally((res) => { return res });
};

async function processing() {
    const compute = require("dcp/compute");
    const wallet = require("dcp/wallet");

    let job, results, startTime;

    // var jsonObj = require("./data-collection/contributors-repos.json");
    var jsonObj = require("../data-collection/contributors-repos.json");

    var repos = new Set()

    Object.values(jsonObj).forEach(function(repo_array) {
        repo_array.forEach(function(repo_name) {
            repos.add(repo_name)
        })
    })

    // repos = ["lodash/lodash"]

    var input_arr = [];
    repos.forEach(function(repo_name) {
        input_arr.push([repo_name, jsonObj]); // [[key1,jsonObj],[key2,jsonObj]]
    })

    console.log("Prepared input")


    job = compute.for(input_arr, function(input_arr) {
        repo_name = input_arr[0]
        jsonObj = input_arr[1]

        var results = [];

        const algorithm = require('./algorithm');

        var repo_dict = algorithm.buildProjectReleations(jsonObj)

        var bfs_connections = algorithm.bfsRepoConnections(repo_name, repo_dict)


        progress();
        return [repo_name, bfs_connections]
    });

    job.requires('./algorithm');
    job.on('status', (status) => { console.log(status) });

    // Probably don't need to change this
    job.on("accepted", function(ev) {
        console.log(` - Job accepted by scheduler, waiting for results`);
        console.log(` - Job has id ${this.id}`);
        startTime = Date.now();
    });

    // Probably don't need to change this
    job.on("complete", function(ev) {
        console.log(
            `Job Finished, total runtime = ${
        Math.round((Date.now() - startTime) / 100) / 10
      }s`
        );
    });

    // Probably don't need to change this
    job.on("readystatechange", function(arg) {
        console.log(`new ready state: ${arg}`);
    });

    // job.on('console', (event) => console.log(event));

    job.on('error', (event) => {
        console.error("An exception was thrown by the work function:", event.message);
    });

    job.on("result", function(ev) {
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

    degree_list = {}

    results.values().forEach(function(result) {
            degree_list[result[0]] = result[1]
        })
        // console.log("Results are: ", results.values());
    return degree_list;
}

const fs = require('fs');
const dcp = require('./dcp');

dcp.dcp().then((data) => {
    data = JSON.stringify(data);
    fs.writeFileSync('output.json', data);
})