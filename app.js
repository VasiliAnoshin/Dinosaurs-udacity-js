//  var myinit = { method:'GET',
//  headers: 
//  {
//      'Content-Type':'application/json'   
//  },
//  mode: 'cors',
//  cache:'default'
//  };
//let myRequest = new Request("./dino.json", myinit);

// fetch(myRequest)
//     .then(function(resp){
//         return resp.json();
//     })
//     .then(function(data){
//         console.log(data);
//     }); 
// const JSON_DATA  =  async function(){
//         return  fetch(myRequest)
//         .then(function (response) {
//             // return if problem
//             if (response.status !== 200) {
//                 throw new Error("Looks like there was a problem. Status Code: " +
//                     response.status);
//             }
//             return response.json();
//         })
//         .catch(function(err) {
//             throw new Error(err);
//         });
// };
// const response = await fetch(myRequest);
// const json = await response.json();
// console.log(json);
// let output = JSON_DATA();
// console.log(output)

    let dinoArr = [];
    const request = async () => {
        let myRequest = new Request("./dino.json");
        const response = await fetch(myRequest);
        const json = await response.json();
        console.log(json.Dinos);
        return json;
    }

    const JSONN_DATA = request();
    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact)
    {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }
    // Create Dino Objects
    
    function InstantiateDinoObjects(JSONN_DATA)
    {
        dinoArr = JSONN_DATA.Dinos.map(element => {
            console.log(element)
            return new Dino(element.species,element.weight, element.height, 
                    element.diet, element.where, element.when, element.fact);    
        });
        console.log(dinoArr);
    }

    // Create Human Object
    let human = {}

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
