let JSONN_DATA;
let dinoArr = [];

(async (path_to_file) => {
    let myRequest = new Request(path_to_file);
    const response = await fetch(myRequest);
    JSONN_DATA = await response.json();
    InstantiateDinoObjects(JSONN_DATA);
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

Dino.prototype = Object.create(Animal.prototype);

// Create Dino Objects
function InstantiateDinoObjects(JSONN_DATA)
{
    dinoArr = JSONN_DATA.Dinos.map(element => {
        return new Dino(element.species,parseInt(element.weight), parseInt(element.height),
            element.diet, element.where, element.when, element.fact);
    });
}

// Create Human Object
let human = {};

function Human(species, weight, height, diet, where, when, fact, feet, name)
{
    Animal.call(this, species, weight, height, diet, where, when, fact);
    this.name = name;
    this.feet = feet;
}

// Create Dino Compare Method 1
Dino.prototype.CompareWeight = function (humanWeight)
{
    return (this.weight > humanWeight) ? `${this.species} is havier than Human` : `Human is havier than ${this.species}`;
}
    
// Create Dino Compare Method 2
Dino.prototype.CompareHeight = function (humanInches)
{
    return (this.height > humanInches) ? `${this.species} are longer than Humman` : `${this.species} are shorter than Humman`;
}
    
// Create Dino Compare Method 3
Dino.prototype.CompareDiet = function (humanDiet)
{
    return (this.diet.toLowerCase() == humanDiet.toLowerCase()) ? `${this.species} and Human are both ${humanDiet}` : `${this.species} eats ${this.diet} while Human are ${humanDiet}`;
}

function GenerateRanomFact(dino, human)
{   
    const random = Math.floor(Math.random() * 6) + 1;
    switch(random)
    {
        case 1:
            return dino.CompareWeight(human.weight);
        case 2:
            return dino.CompareHeight(human.height);
        case 3:
            return dino.CompareDiet(human.diet);
        case 4:
            return dino.fact;
        case 5:
            return `${dino.species} live in what is now ${dino.where}`;
        case 6:
            return `${dino.species} live in ${dino.when} age`;
    }
}

// Generate Tiles for each Dino in Array
function GenerateTilesForSpecies(dinoArr, human)
{
    let tiles =  dinoArr.map((element) =>{
        const newDiv = document.createElement("div");
        newDiv.classList.add('grid-item');
        const lbl = document.createElement("label");
        lbl.innerText = element.species !== "human" ? element.species : element.name;
        newDiv.appendChild(lbl);
        const img = document.createElement("img");
        img.src = `.\\images\\${element.species}.png`;
        newDiv.appendChild(img);
        if(element.species !== "human"){
            const fact =  document.createElement("label");
            fact.innerText = element.species == "Pigeon" ? element.fact : GenerateRanomFact(element,human);
            newDiv.appendChild(fact);
        }
        return newDiv;
    })
    return tiles;
}

// Add tiles to DOM
function AddTilesToDom(tiles)
{
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
document.getElementById("btn").addEventListener("click", () => {
    if(document.forms["dino-compare"].name.value == "" || document.forms["dino-compare"].feet.value == ""   ||
        document.forms["dino-compare"].inches.value == "" || document.forms["dino-compare"].weight.value == "") {
        alert("One of the values are empty. Please fill the form data.");
        return;
    }
     // Use IIFE to get human data from form
    human = (function GetHumanData() { 
        const name = document.forms["dino-compare"].name.value;
        const feet = document.forms["dino-compare"].feet.value;
        const height = document.forms["dino-compare"].inches.value;
        const weight =  document.forms["dino-compare"].weight.value;
        const diet = document.forms["dino-compare"].diet.value;
        const where = "World Wide";
        const when = "Cenozoic";
        const species = "human";
        const fact = "Human are homo sapiens.";
        return new Human(species, weight, height, diet, where, when, fact, feet, name);
    })();
    RemomveFormFromScreen();
    dinoArr.splice(4,0,human);
    AddTilesToDom(GenerateTilesForSpecies(dinoArr, human));
});