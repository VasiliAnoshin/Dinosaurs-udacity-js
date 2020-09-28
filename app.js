    let JSONN_DATA;
    let dinoArr = [];

    (async (path_to_file) => {
        let myRequest = new Request(path_to_file);
        const response = await fetch(myRequest);
        JSONN_DATA = await response.json();
        InstantiateDinoObjects(JSONN_DATA);
        console.log(JSONN_DATA);
    })("./dino.json");

    function Animal(species, weight, height, diet, where, when, fact) 
    {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

     // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact)
    {
        Animal.call(this, species, weight, height, diet, where, when, fact);
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

    function Human(species, weight, height, diet, where, when, fact)
    {
        Animal.call(this, species, weight, height, diet, where, when, fact);
    }

    // Use IIFE to get human data from form

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Dino.prototype.CompareWeight = function (humanWeight)
    {
        return (this.weight > humanWeight) ? `${this.species} is havier than Human` : `Human is havier than ${this.species}`;
    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.CompareHeight = function (humanInches)
    {
        return (this.height > humanInches) ? `${this.species} are longer than Humman` : `${this.species} are shorter than Humman`;
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.CompareDiet = function (humanDiet)
    {
        return (this.diet == humanDiet) ? `${this.species} and Human are both ${humanDiet}` : `${this.species} eats ${this.diet} while Human are ${humanDiet}`;
    }

    // Generate Tiles for each Dino in Array
    function GenerateTilesForSpecies(dinoArr)
    {
        let tiles =  dinoArr.map((element) =>{
            const newDiv = document.createElement("div");
            newDiv.classList.add('grid-item');
            const lbl = document.createElement("label");
            lbl.innerText = element.species;
            newDiv.appendChild(lbl)
            return newDiv;
        })
        return tiles;
    }

    // Add tiles to DOM
    function AddTilesToDom(tiles)
    {
        console.log(typeof(tiles))
        console.log(tiles)
        let main = document.getElementById("grid");
        tiles.forEach(element => 
            main.appendChild(element)
        );
    }

    // Remove form from screen
    function RemomveFormFromScreen()
    {
        const form = document.getElementById("dino-compare");
        form.style.display = "none";
    }

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', () => {
    if(document.forms["dino-compare"].name.value == "" || document.forms["dino-compare"].feet.value == ""   ||
         document.forms["dino-compare"].inches.value == "" || document.forms["dino-compare"].weight.value == "") {
          alert("One of the values are empty. Please fill the form data.")
     }
    human = (function GetHumanData() { 
        const name = document.forms["dino-compare"].name.value;
        const feet = document.forms["dino-compare"].feet.value;
        const inches = document.forms["dino-compare"].inches.value;
        const weight =  document.forms["dino-compare"].weight.value;
        const diet = document.forms["dino-compare"].diet.value;
        const species = "Human";
        return new Human(name, feet, inches, weight, diet, species);
    })();
    console.log(human);
    RemomveFormFromScreen();
    dinoArr.splice(4,0,human);
    AddTilesToDom(GenerateTilesForSpecies(dinoArr));
});