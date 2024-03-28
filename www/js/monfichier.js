"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Une classe métier nommée pokemon. Notez la syntaxe typescript pour créer un objet qui a un attribut id. 
class Pokemon {
    constructor(i, n) {
        this.i = i;
        this.id = i;
        this.nom = n;
    }
    setId(id) {
        this.id = id;
    }
}
var Egg;
(function (Egg) {
    Egg["NotInEggs"] = "Not in Eggs";
    Egg["OmanyteCandy"] = "Omanyte Candy";
    Egg["The10KM"] = "10 km";
    Egg["The2KM"] = "2 km";
    Egg["The5KM"] = "5 km";
})(Egg || (Egg = {}));
function getAllPokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        const request = new Request("https://pokeapi.co/api/v2/pokemon?limit=151", {
            method: "GET"
        });
        const response = yield fetch(request);
        if (!response.ok) {
            console.error(response);
        }
        else {
            const validResponse = (yield response.json());
            let i = 1;
            validResponse.results.forEach(element => {
                let temp = new Pokemon(i.toString(), element.name);
                pokemons.push(temp);
                i++;
            });
            console.error(validResponse.results[0].name);
        }
    });
}
const infos = document.getElementById("infos");
function getPokemonInfo(pokeName) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = new Request("https://pokeapi.co/api/v2/pokemon/" + pokeName, {
            method: "GET"
        });
        const response = yield fetch(request);
        if (!response.ok) {
            console.error(response);
        }
        else {
            const validResponse = yield response.json();
            const imgUrl = validResponse.sprites.front_default;
            const imgUrlBack = validResponse.sprites.back_default;
            infos.innerHTML = "<span>" + validResponse.name + "</span><br>" +
                "<img src=" + imgUrl + ">" + "<img src=" + imgUrlBack + "><br>" +
                "<span>Pokémon numéro : " + validResponse.id + "</span><br>" +
                "<span>height : " + validResponse.height + " m</span><br>" +
                "<span>weight : " + validResponse.weight + " kg</span><br>";
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    getAllPokemons();
    pokemons.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.text = p.nom;
        pokemonsselect.add(opt);
    });
});
const pokemons = [];
function tabTypeToString(t) {
    let res = "";
    t.forEach(element => {
        res += element + " ";
    });
    return res;
}
// Ce code permet de récupéter une référence sur l'élement input du DOM (c-à-d l'élément input de la page web dont l'identifiant est "pokeid")
const pokeinput = document.getElementById("pokeid");
// On crée ensuite un objet pokemon
const poke = new Pokemon("7", "Carapuce");
// Cet objet est mis à jour à chaque fois que l'évènement change est émis. 
pokeinput === null || pokeinput === void 0 ? void 0 : pokeinput.addEventListener('change', (event) => {
    var _a;
    console.error(event);
    if ((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement) {
        poke.setId((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
    }
});
const debug = document.getElementById("debug_donnee");
pokeinput === null || pokeinput === void 0 ? void 0 : pokeinput.addEventListener('keyup', (event) => {
    console.error(event);
    if ((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement) {
        const t = event.target.value;
        debug.innerHTML = t;
        /*if (debug) {
            debug.innerHTML = t;
        }*/
    }
});
const pokemonsselect = document.getElementById("allpokemons");
pokemons.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.nom;
    opt.text = p.nom;
    pokemonsselect.add(opt);
});
pokemonsselect.addEventListener('change', (e) => {
    if ((e === null || e === void 0 ? void 0 : e.target) instanceof HTMLSelectElement) {
        console.error(e === null || e === void 0 ? void 0 : e.target.selectedOptions[0].text);
    }
});
function filtrePoke(s) {
    let poke = [];
    if (s != "") {
        pokemons.forEach(p => {
            if (p.nom.toLowerCase().includes(s)) {
                poke.push(p);
            }
            for (let i = pokemonsselect.options.length - 1; i >= 0; i--) {
                pokemonsselect.options.remove(i);
            }
            poke.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.text = p.nom;
                pokemonsselect.add(opt);
            });
        });
    }
}
let s = "";
const filtreinput = document.getElementById("filtre");
filtreinput === null || filtreinput === void 0 ? void 0 : filtreinput.addEventListener('keyup', (event) => {
    console.error(event);
    if ((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement) {
        const t = event.target.value;
        s = t;
        filtrePoke(s);
    }
});
const b = document.getElementById("go");
b.addEventListener('click', () => {
    const temp = pokemonsselect.value;
    if (temp != null)
        console.error(temp);
    getPokemonInfo(temp);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZmljaGllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb25maWNoaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyR0FBMkc7QUFDM0csTUFBTSxPQUFPO0lBS1QsWUFBb0IsQ0FBUyxFQUFFLENBQVM7UUFBcEIsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsRUFBVTtRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDSjtBQXVCRCxJQUFLLEdBTUo7QUFORCxXQUFLLEdBQUc7SUFDSixnQ0FBeUIsQ0FBQTtJQUN6QixxQ0FBOEIsQ0FBQTtJQUM5Qix3QkFBaUIsQ0FBQTtJQUNqQixzQkFBZSxDQUFBO0lBQ2Ysc0JBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTkksR0FBRyxLQUFILEdBQUcsUUFNUDtBQW1CRCxTQUFlLGNBQWM7O1FBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLDZDQUE2QyxFQUFFO1lBQ3ZFLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzNCLENBQUM7YUFBTSxDQUFDO1lBQ0osTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBZ0IsQ0FBQTtZQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMs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