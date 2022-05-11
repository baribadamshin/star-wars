import type {NormalizedSchema} from 'normalizr';

import type {Character} from '~/entities/characters';

export type CharacterOriginal = {
    birth_year: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    created: Date;
    edited: Date;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
}

type Entities = {
    characters: Record<string, Character>;
}

export type CharactersListResult<R = CharacterOriginal> = {
    next: string | null;
    page: number,
    count: number,
    previous: string | null,
    results: R[]
}

export type CharactersListNormalizedResult = NormalizedSchema<Entities, CharactersListResult<string>>;
