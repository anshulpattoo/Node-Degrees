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
function connectionsAmongProjects(repo1, repo2) {
  var Degrees = 0;
  // repo contain contributors and typeof repo is array
  for(var i = 0; i < repo1.length; i++)
  {
    console.log(repo1[i]);

    for(var k=0; k< repo2.length; k++)
    {
       if(repo1[i]==repo2[k])
       {
         Degrees+=1;
       }
    }
  }
  return Degrees;
}

// function binarySearch(arrInput, targetEmail) {
//   let start = 0;
//   let end = arrInput.length - 1;

//   while (start <= end) {
//       let mid = Math.floor((start + end) / 2);

//       if (arrInput[mid] === targetEmail) {
//           return mid;
//       }

//       if (targetEmail < arrInput[mid]) {
//           end = mid - 1;
//       } else {
//           start = mid + 1;
//       }
//   }
//   return -1;
// }

function analyzeProject(project, dataset) {
  // react, {}
  
  var totalDegrees = 0;

  // go through each item in dataset
  // if it is not react, calculate connections between it and react
  // for (i..) {
  totalDegress += connectionsAmongProjects(project, dataset[i])
  
  // }
  // add this to the total degree of react
    
  return totalDegrees
}