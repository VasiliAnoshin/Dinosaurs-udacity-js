    let JSONN_DATA;
    let dinoArr = [];

    (async (path_to_file) => {
        let myRequest = new Request(path_to_file);
        const response = await fetch(myRequest);
        JSONN_DATA = await response.json();
        console.log(JSONN_DATA);
    })("./dino.json");

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
            return new Dino(element.species,element.weight, element.height, 
                    element.diet, element.where, element.when, element.fact);    
        });
    }

    // Create Human Object
    let human = {}

    // Use IIFE to get human data from form
    function GetHumanData()
    {
            human.name = document.form.name.value;
            human.feet = document.form.feet.value;
            human.inches =  document.form.inches.value;
            human.weight = document.form.weight.value;
            human.diet = document.form.diet.value;

    }

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
document.getElementById('btn').addEventListener('click', () => {
    InstantiateDinoObjects(JSONN_DATA);
    console.log(dinoArr);
    if(document.forms["dino-compare"].name.value == "" || document.forms["dino-compare"].feet.value == ""   ||
       document.forms["dino-compare"].inches.value == "" || document.forms["dino-compare"].weight.value == "") {
        alert("One of the values are empty. Please fill the form data.")
    }
    
});