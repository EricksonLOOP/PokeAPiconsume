export interface Result {
    name: string;
    url: string;
}
export interface PokemonStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: PokemonAbility[];
    stats: PokemonStats[];
    types: PokemonType[];
    sprites: PokemonSprites;
    species: {
        name: string;
        url: string;
    };
}
