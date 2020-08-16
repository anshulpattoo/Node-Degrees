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

// let a = [1, 2, 3]
// let b = [2, 3, 4]

// console.log(connectionsAmongProjects(a, b))
