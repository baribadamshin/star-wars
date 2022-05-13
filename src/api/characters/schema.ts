import {schema} from 'normalizr';

import type {Character} from '~/entities/characters';

import type {CharacterOriginal} from './types';

const getIdAttribute = (url: string) => url.replace(/.+people\/(\d+)\/$/, '$1');

export default new schema.Entity(
    'characters',
    {},
    {
        idAttribute: ({url}: CharacterOriginal) => getIdAttribute(url),
        processStrategy: (data: CharacterOriginal): Character => ({
            id: getIdAttribute(data.url),
            name: data.name,
            gender: data.gender,
            birthYear: data.birth_year,
            height: data.height,
            mass: data.mass,
            hairColor: data.hair_color,
            skinColor: data.skin_color,
            eyeColor: data.eye_color,
        }),
    },
);
