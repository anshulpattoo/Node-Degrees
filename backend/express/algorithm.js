const _ = require("lodash")

// Sorting
// function sorting(arrInput, targetEmail, targetRepoName) {
//   myObj = new Object(); // json object

//   var arrSearchOutput=[];

//   for (let i = 0; i < arrInput.length; i++) {
//       // Search the same person email
//       // Found it and expand the array with repo name
//     if(arrInput[i]==targetEmail)
//     {
//       arrSearchOutput.push(arrInput[i]);
//     }
//   }
//   // Eventually join json array and output the object
//   myObj[targetRepoName] = arrSearchOutput;
//   return myObj;
// }

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


module.exports.analyzeProject = function analyzeProject(project, dataset) {
  // The project is a array, dataset is  a json object
  // react, {}
  // var totalDegrees = 0;
  var totalDegrees = new Object();
  // totalDegrees =dataset;
  // go through each item in dataset
  // if it is not react, calculate connections between it and react
  for (var i = 0; i < Object.keys(dataset).length; i++) {
    // array compare to array
    // need to use JSON stringify // see more from https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
    if (JSON.stringify(Object.keys(dataset)[i]) == JSON.stringify(project)) {
      totalDegress.keys = connectionsAmongProjects(
        dataset[project],
        Object.items(dataset)[i]
      );
      totalDegress.count = connectionsAmongProjects(
        dataset[project],
        Object.items(dataset)[i]
      ).length;
    }
  }
  // add this to the total degree of react

  return totalDegrees;
};

function buildProjectReleations(contributor_repo_dict) {
    var repo_dict = {}
    var keys = Object.keys(contributor_repo_dict)
    var values = Object.values(contributor_repo_dict)

    for (var i = 0; i < keys.length; i++) {
        for (var repo_i = 0; repo_i < values[i].length; repo_i++) {
            // console.log(contributor_repo_dict[repo_i])
            for (var repo_j = 0; repo_j < values[i].length; repo_j++) {
                if (repo_i == repo_j) {
                    continue
                }
                if (!(values[i][repo_i] in repo_dict)) {
                    repo_dict[values[i][repo_i]] = new Set()
                }

                repo_dict[values[i][repo_i]].add(values[i][repo_j])
            }
        }
    }
    return repo_dict
}

function bfsRepoConnections(primary_repo, repo_dict) {
    // console.log(repo_dict)
    var keys = Object.keys(repo_dict)
    var found_connections = {}

    // [repo_name, [path]]
    var breadth_queue = [
        [primary_repo, []]
    ]

    while (breadth_queue.length > 0) {
        var popped_repo = breadth_queue.pop()
        var curr_repo = popped_repo[0]
        var path = popped_repo[1]

        repo_dict[curr_repo].forEach(function(repo_name, index) {
            if (primary_repo == repo_name) {
                return
            }

            if (!(repo_name in found_connections)) {
                var path_clone = _.cloneDeep(path)
                path_clone.push(repo_name)

                var connection_obj = [repo_name, path_clone]
                breadth_queue.push(connection_obj)
                found_connections[repo_name] = path_clone
            }
        })
    }
    console.log(found_connections)
}

var jsonObj = require("../data-collection/contributors-repos.json");
var repo_dict = buildProjectReleations(jsonObj)

bfsRepoConnections("webpack-contrib/file-loader", repo_dict)