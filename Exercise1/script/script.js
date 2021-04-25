// all the magic will happen now ! 

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("search");
const header = document.getElementById("found");
const list = document.getElementById("list");

const checkInput = document.getElementById("checkInput");
const checkButton = document.getElementById("check");
const checkResult = document.getElementById("checkResult");

const checkPowerInput = document.getElementById("checkPowerInput");
const checkPowerButton = document.getElementById("checkPower");
const checkPowerResult = document.getElementById("checkPowerResult");

class character {
    constructor(name, gender, align, power) {
        this.name = name;
        this.gender = gender;
        this.align = align;
        this.power = power;
    }

    checkAlign() {
        let alignment = this.name + " is a Netral Character";
        if (this.align == "good characters") alignment = this.name + " is a Good Character";
        if (this.align == "bad characters") alignment = this.name + " is a Bad Character";
        return alignment;
    }

    isPowerful() {
        let powerful = this.name + " is NOT Powerful!";
        if (this.power > 2000) powerful = this.name + " is Powerful!";
        return powerful;
    }
}

class characters {
    constructor() {
        this.characters = [];
    }
    addCharatcer(name, gender, align, power) {
        let newCharacter = new character(name, gender, align, power);
        this.characters.push(newCharacter);
    }

    returnArray() {
        return this.characters;
    }

    searchCharacter(name) {
        let searchResults;
        let array = this.characters;

        // setTimeout(function () {
        searchResults = array.filter(character => {
            if (character.name.includes(name.toLowerCase())) {
                return true;
            }
        })
        return searchResults;
        // }, 1000);
    }
}

let characterlist = new characters();

fetch("./marvel.json").then(
    response => response.json()
).then(
    json => {
        json.forEach(element => {
            characterlist.addCharatcer(element.name, element.sex, element.align, element.power);
        });

        const searcher = () => {
            const results = characterlist.searchCharacter(searchInput.value);

            if (results.length == 0) {
                list.innerHTML = "";
                searchInput.value = "";
                header.innerHTML = "Found no matching Characters!"
                header.style.display = "block";
            } else {
                list.innerHTML = "";
                searchInput.value = "";
                results.forEach(result => {
                    const charName = document.createElement("li");
                    charName.innerHTML = "Name: " + result.name;
                    charName.style.marginTop = "10px";

                    const charGender = document.createElement("p");
                    charGender.innerHTML = "Gender: " + result.gender;

                    const charAlign = document.createElement("p");
                    charAlign.innerHTML = "Alignment: " + result.align;

                    const charPower = document.createElement("p");
                    charPower.innerHTML = "Power: " + result.power;
                    charPower.style.marginBottom = "10px";

                    header.innerHTML = "Found Characters:"
                    header.style.display = "block";

                    list.append(charName);
                    list.append(charGender);
                    list.append(charAlign);
                    list.append(charPower);
                });
            }
        }
        searchButton.addEventListener("click", searcher);

        const checker = () => {
            const results = characterlist.searchCharacter(checkInput.value);

            if (results.length == 0) {
                checkResult.innerHTML = "";
                checkInput.value = "";
                checkResult.innerHTML = "<li>Found no matching Characters to check!</li>"
            } else {
                checkResult.innerHTML = "";
                checkInput.value = "";
                results.forEach(result => {
                    const newCheck = document.createElement("li");
                    newCheck.innerHTML = result.checkAlign();
                    newCheck.margin = "10px 0px 10px 0px";
                    checkResult.append(newCheck);
                });
            }
        }
        checkButton.addEventListener("click", checker);

        const powerChecker = () => {
            const results = characterlist.searchCharacter(checkPowerInput.value);

            if (results.length == 0) {
                checkPowerResult.innerHTML = "";
                checkPowerInput.value = "";
                checkPowerResult.innerHTML = "<li>Found no matching Characters to check!</li>"
            } else {
                checkPowerResult.innerHTML = "";
                checkPowerInput.value = "";
                results.forEach(result => {
                    const newCheck = document.createElement("li");
                    newCheck.innerHTML = result.isPowerful();
                    newCheck.margin = "10px 0px 10px 0px";
                    checkPowerResult.append(newCheck);
                });
            }
        }
        checkPowerButton.addEventListener("click", powerChecker);
    }
)