export type CharacterId = string;

export type Character = {
    id: CharacterId;
    name: string,
    height: string,
    mass: string,
    hairColor: string,
    skinColor: string,
    eyeColor: string,
    birthYear: string,
    gender: string,
}

export type CharacterCollections = Record<CharacterId, Character>;
