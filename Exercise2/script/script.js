// all the magic will happen now !

const selector1 = document.getElementById("hero1");
const selector2 = document.getElementById("hero2");
const readyButton = document.getElementById("ready");
const speedSelector = document.getElementById("speed");

const note = document.getElementById("note");

const battleGround = document.getElementById("battleground");

const leftHero = document.getElementById("leftHero");
const rightHero = document.getElementById("rightHero");

const centerDiv = document.getElementById("centerDiv");
const fightButton = document.getElementById("fight");
const winnerAnnounce = document.getElementById("winnerAnnounce");

const URL = "https://akabab.github.io/superhero-api/api/all.json";

function map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

class superHero {
    constructor(id, name, speed, durability, combat, imageLink) {
        this.id = id;
        this.name = name;
        this.speed = speed;
        this.durability = durability;
        this.combat = combat;
        this.img = imageLink;
    }
}

class superHeroes {
    constructor() {
        this.allHeroes = [];
    }

    addHero(id, name, speed, durability, combat, imageLink) {
        let newHero = new superHero(id, name, speed, durability, combat, imageLink);
        this.allHeroes.push(newHero);
    }

    showHeroes() {
        return this.allHeroes;
    }

    battleMode(hero1, hero2) {
        let hp1 = hero1[1];
        const hero1HBar = document.getElementById("health1");
        const hero1Health = document.getElementById("hp1");

        let hp2 = hero2[1];
        const hero2HBar = document.getElementById("health2");
        const hero2Health = document.getElementById("hp2");

        let attack1 = hero1[2];
        const hero1ABar = document.getElementById("attack1");

        let attack2 = hero2[2];
        const hero2ABar = document.getElementById("attack2");

        let speed1 = hero1[3];
        speed1 = map_range(speed1, 0, 100, 5, 1);

        let speed2 = hero2[3];
        speed2 = map_range(speed2, 0, 100, 5, 1);

        const hits1 = document.getElementById("hits1");
        const damage1 = document.getElementById("damage1");
        const hits2 = document.getElementById("hits2");
        const damage2 = document.getElementById("damage2");

        let selectedSpeed = speedSelector.value;

        let hitCounter1 = 0;
        let hitCounter2 = 0;

        let time1 = new Date();
        let time2 = new Date();

        hero1Health.innerHTML = "HP: " + hero1[1];
        hero2Health.innerHTML = "HP: " + hero2[1];
        hero1HBar.setAttribute("value", "100");
        hero1ABar.setAttribute("value", "0");
        hero2HBar.setAttribute("value", "100");
        hero2ABar.setAttribute("value", "0");

        MakeVisible(1);

        function MakeVisible(ms) {
            let newTime = new Date();

            hero2ABar.setAttribute(
                "value",
                map_range(newTime - time1, 0, (speed2 * 1000) / selectedSpeed, 0, 100)
            );
            if ((newTime - time1) / 1000 >= speed2 / selectedSpeed) {
                time1 = new Date();
                hp1 -= attack2;
                if (hp1 < 0) hp1 = 0;
                hero1HBar.setAttribute("value", (hp1 * 100) / hero1[1]);
                hero1Health.innerHTML = "HP: " + hp1;
                hitCounter2 += 1;
                hits2.innerHTML = "Blows Delivered: " + hitCounter2;
                damage2.innerHTML = "Total Damage Delivered: " + hitCounter2 * attack2;
            }

            hero1ABar.setAttribute(
                "value",
                map_range(newTime - time2, 0, (speed1 * 1000) / selectedSpeed, 0, 100)
            );
            if ((newTime - time2) / 1000 >= speed1 / selectedSpeed) {
                time2 = new Date();
                hp2 -= attack1;
                if (hp2 < 0) hp2 = 0;
                hero2HBar.setAttribute("value", (hp2 * 100) / hero2[1]);
                hero2Health.innerHTML = "HP: " + hp2;
                hitCounter1 += 1;
                hits1.innerHTML = "Blows Delivered: " + hitCounter1;
                damage1.innerHTML = "Total Damage Delivered: " + hitCounter1 * attack1;
            }

            if (hp1 <= 0) {
                const winnerText = document.createElement("h2");
                winnerText.innerHTML =
                    "👑👉<br>The Winner is " + hero2[0] + "!<br>With " + hp2 + " remaining HP!<br>Delivering " +
                    hitCounter2 * attack2 + " Damage Points with " + hitCounter2 + " Hits!";
                winnerAnnounce.innerHTML = "";
                winnerAnnounce.append(winnerText);
            } else if (hp2 <= 0) {
                const winnerText = document.createElement("h2");
                winnerText.innerHTML =
                    "👈👑<br>The Winner is " + hero1[0] + "!<br>With " + hp1 + " remaining HP!<br>Delivering " +
                    hitCounter1 * attack1 + " Damage Points with " + hitCounter1 + " Hits!";
                winnerAnnounce.innerHTML = "";
                winnerAnnounce.append(winnerText);
            } else
                setTimeout(function () {
                    MakeVisible(ms);
                }, ms);
        }
    }
}

let heroList = new superHeroes();
fetch(URL)
    .then((response) => response.json())
    .then((json) => {
        json.forEach((hero) => {
            const newOption1 = document.createElement("option");
            const newOption2 = document.createElement("option");
            newOption1.setAttribute("value", hero.id);
            newOption2.setAttribute("value", hero.id);
            newOption1.innerHTML = hero.name;
            newOption2.innerHTML = hero.name;
            selector1.append(newOption1);
            selector2.append(newOption2);

            heroList.addHero(
                hero.id,
                hero.name,
                hero.powerstats.speed,
                hero.powerstats.durability,
                hero.powerstats.combat,
                hero.images.md
            );
        });

        const getHeroes = () => {
            if (selector1.value == -1 || selector2.value == -1) {
                alert("Please choose two Superheroes!");
            } else {
                let heroes2get = heroList.showHeroes();
                note.style.display = "none";
                centerDiv.style.display = "none";
                winnerAnnounce.innerHTML = "";

                rightHero.innerHTML = "";
                leftHero.innerHTML = "";

                const hero1Name = document.createElement("h3");
                hero1Name.style.marginBottom = "0px";

                const hero1HP = document.createElement("p");
                hero1HP.setAttribute("id", "hp1");
                hero1HP.style.marginBottom = "0px";

                const hero1HealthBar = document.createElement("progress");
                hero1HealthBar.setAttribute("id", "health1");
                hero1HealthBar.setAttribute("value", "100");
                hero1HealthBar.setAttribute("max", "100");
                hero1HealthBar.style.marginBottom = "0px";

                const hero1Attack = document.createElement("p");
                hero1Attack.style.marginBottom = "0px";

                const hero1AttackBar = document.createElement("progress");
                hero1AttackBar.setAttribute("id", "attack1");
                hero1AttackBar.setAttribute("value", "0");
                hero1AttackBar.setAttribute("max", "100");
                hero1AttackBar.style.marginBottom = "0px";

                const hero1Speed = document.createElement("p");
                hero1Speed.style.marginBottom = "0px";

                const hero1Hits = document.createElement("p");
                hero1Hits.setAttribute("id", "hits1");
                hero1Hits.innerHTML = "Blows Delivered: 0";
                hero1Hits.style.marginBottom = "0px";

                const hero1Damage = document.createElement("p");
                hero1Damage.setAttribute("id", "damage1");
                hero1Damage.innerHTML = "Total Damage Delivered: 0";

                const hero1Image = document.createElement("img");

                const hero2Name = document.createElement("h3");
                hero2Name.style.marginBottom = "0px";

                const hero2HP = document.createElement("p");
                hero2HP.setAttribute("id", "hp2");
                hero2HP.style.marginBottom = "0px";

                const hero2HealthBar = document.createElement("progress");
                hero2HealthBar.setAttribute("id", "health2");
                hero2HealthBar.setAttribute("value", "100");
                hero2HealthBar.setAttribute("max", "100");
                hero2HealthBar.style.marginBottom = "0px";

                const hero2Attack = document.createElement("p");
                hero2Attack.style.marginBottom = "0px";

                const hero2AttackBar = document.createElement("progress");
                hero2AttackBar.setAttribute("id", "attack2");
                hero2AttackBar.setAttribute("value", "0");
                hero2AttackBar.setAttribute("max", "100");
                hero2AttackBar.style.marginBottom = "0px";

                const hero2Speed = document.createElement("p");
                hero2Speed.style.marginBottom = "0px";

                const hero2Hits = document.createElement("p");
                hero2Hits.setAttribute("id", "hits2");
                hero2Hits.innerHTML = "Blows Delivered: 0";
                hero2Hits.style.marginBottom = "0px";

                const hero2Damage = document.createElement("p");
                hero2Damage.setAttribute("id", "damage2");
                hero2Damage.innerHTML = "Total Damage Delivered: 0";

                const hero2Image = document.createElement("img");

                heroes2get.forEach((hero) => {
                    if (selector1.value == hero.id) {
                        hero1Name.innerHTML = "Name: " + hero.name;
                        hero1HP.innerHTML = "HP: " + hero.durability * 10;
                        hero1Attack.innerHTML = "Attack Damage: " + hero.combat;
                        hero1Speed.innerHTML = "Attack Cooldown: " +
                            map_range(hero.speed, 0, 100, 5, 1).toFixed(2) + "s";
                        hero1Image.setAttribute("src", hero.img);
                    }
                    if (selector2.value == hero.id) {
                        hero2Name.innerHTML = "Name: " + hero.name;
                        hero2HP.innerHTML = "HP: " + hero.durability * 10;
                        hero2Attack.innerHTML = "Attack Damage: " + hero.combat;
                        hero2Speed.innerHTML = "Attack Cooldown: " +
                            map_range(hero.speed, 0, 100, 5, 1).toFixed(2) + "s";
                        hero2Image.setAttribute("src", hero.img);
                    }
                });
                leftHero.append(hero1Name);
                leftHero.append(hero1HP);
                leftHero.append(hero1HealthBar);
                leftHero.append(hero1Speed);
                leftHero.append(hero1AttackBar);
                leftHero.append(hero1Attack);
                leftHero.append(hero1Hits);
                leftHero.append(hero1Damage);
                leftHero.append(hero1Image);

                rightHero.append(hero2Name);
                rightHero.append(hero2HP);
                rightHero.append(hero2HealthBar);
                rightHero.append(hero2Speed);
                rightHero.append(hero2AttackBar);
                rightHero.append(hero2Attack);
                rightHero.append(hero2Hits);
                rightHero.append(hero2Damage);
                rightHero.append(hero2Image);

                centerDiv.style.display = "block";
            }
        };
        readyButton.addEventListener("click", getHeroes);

        const fight = () => {
            winnerAnnounce.innerHTML = "";
            let heroes2get = heroList.showHeroes();
            let hero1 = [4];
            let hero2 = [4];
            heroes2get.forEach((hero) => {
                if (selector1.value == hero.id) {
                    hero1[0] = hero.name;
                    hero1[1] = hero.durability * 10;
                    hero1[2] = hero.combat;
                    hero1[3] = hero.speed;
                }
                if (selector2.value == hero.id) {
                    hero2[0] = hero.name;
                    hero2[1] = hero.durability * 10;
                    hero2[2] = hero.combat;
                    hero2[3] = hero.speed;
                }
            });
            heroList.battleMode(hero1, hero2);
        };
        fightButton.addEventListener("click", fight);
    });