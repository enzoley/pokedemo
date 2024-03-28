// Une classe métier nommée pokemon. Notez la syntaxe typescript pour créer un objet qui a un attribut id. 
class Pokemon {
    id: string;
    nom: string;


    constructor(private i: string, n: string) {
        this.id = i;
        this.nom = n;
    }

    setId(id: string) {
        this.id = id;
    }
}

interface PokeInfo {
    [x: string]: any;
    id: number;
    num: string;
    name: string;
    img: string;
    type: string;
    height: string;
    weight: string;
    candy: string;
    candy_count?: number;
    egg: Egg;
    spawn_chance: number;
    avg_spawns: number;
    spawn_time: string;
    multipliers: number[] | null;
    weaknesses: string[];
    next_evolution?: Evolution[];
    prev_evolution?: Evolution[];
}

enum Egg {
    NotInEggs = "Not in Eggs",
    OmanyteCandy = "Omanyte Candy",
    The10KM = "10 km",
    The2KM = "2 km",
    The5KM = "5 km",
}

interface Evolution {
    num: string;
    name: string;
}

interface FetchResult {
    count: number;
    next: string;
    previous: null;
    results: PokemonFetch[];
}

interface PokemonFetch {
    name: string;
    url: string;
}

async function getAllPokemons(): Promise<void> {
    const request = new Request("https://pokeapi.co/api/v2/pokemon?limit=151", {
        method: "GET"
    });

    const response = await fetch(request)
    if (!response.ok) {
        console.error(response)
    } else {
        const validResponse = (await response.json()) as FetchResult
        let i = 1;
        validResponse.results.forEach(element => {
            let temp: Pokemon = new Pokemon(i.toString(), element.name)
            pokemons.push(temp)
            i++;
        });
        console.error(validResponse.results[0].name)
    }
}


const infos = document.getElementById("infos");

async function getPokemonInfo(pokeName: string): Promise<void> {
    const request = new Request("https://pokeapi.co/api/v2/pokemon/" + pokeName, {
        method: "GET"
    });
    const response = await fetch(request)
    if (!response.ok) {
        console.error(response)
    } else {
        const validResponse = await response.json() as PokeInfo
        const imgUrl = validResponse.sprites.front_default
        const imgUrlBack = validResponse.sprites.back_default
        infos!.innerHTML = "<span>" + validResponse.name + "</span><br>" +
            "<img src=" + imgUrl + ">" + "<img src=" + imgUrlBack + "><br>" +
            "<span>Pokémon numéro : " + validResponse.id + "</span><br>" +
            "<span>height : " + validResponse.height + " m</span><br>" +
            "<span>weight : " + validResponse.weight + " kg</span><br>"


    }
}


document.addEventListener('DOMContentLoaded', function () {
    getAllPokemons()

    pokemons.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.text = p.nom;
        pokemonsselect.add(opt)
    });
});
const pokemons: Pokemon[] = [];


function tabTypeToString(t: string[]): string {
    let res = ""
    t.forEach(element => {
        res += element + " "
    });
    return res
}

// Ce code permet de récupéter une référence sur l'élement input du DOM (c-à-d l'élément input de la page web dont l'identifiant est "pokeid")
const pokeinput = document.getElementById("pokeid");

// On crée ensuite un objet pokemon
const poke = new Pokemon("7", "Carapuce");

// Cet objet est mis à jour à chaque fois que l'évènement change est émis. 
pokeinput?.addEventListener('change', (event) => {
    console.error(event)
    if (event?.target instanceof HTMLInputElement) {
        poke.setId(event?.target?.value);
    }
})

const debug = document.getElementById("debug_donnee");

pokeinput?.addEventListener('keyup', (event) => {
    console.error(event)
    if (event?.target instanceof HTMLInputElement) {
        const t = event.target.value;
        debug!.innerHTML = t;
        /*if (debug) {
            debug.innerHTML = t;
        }*/
    }
})

const pokemonsselect = document.getElementById("allpokemons") as HTMLSelectElement;
pokemons.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.nom;
    opt.text = p.nom;
    pokemonsselect.add(opt)
});

pokemonsselect.addEventListener('change', (e) => {
    if (e?.target instanceof HTMLSelectElement) {
        console.error(e?.target.selectedOptions[0].text);
    }
});

function filtrePoke(s: string) {
    let poke: Pokemon[] = [];
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
                pokemonsselect.add(opt)
            });



        });
    }

}

let s = ""
const filtreinput = document.getElementById("filtre")
filtreinput?.addEventListener('keyup', (event) => {
    console.error(event)
    if (event?.target instanceof HTMLInputElement) {
        const t = event.target.value;
        s = t
        filtrePoke(s);
    }
})

const b = document.getElementById("go") as HTMLButtonElement;
b.addEventListener('click', () => {
    const temp = pokemonsselect.value;
    if (temp != null)
        console.error(temp)
    getPokemonInfo(temp)
})






