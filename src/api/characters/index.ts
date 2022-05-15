import type {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {normalize} from 'normalizr';

import type {CharacterId} from '~/entities/characters';
import swapi from '~/utils/swapi';

import type {
    CharactersListNormalizedResult,
    CharactersListResult,
    CharacterOriginal,
    CharacterDetailsNormalizedResult,
} from './types';
import characterEntity from './schema';

type GetListParams = {page: number, search?: string};

const getList = (params: GetListParams): Observable<CharactersListNormalizedResult> => swapi<CharactersListResult>({
    url: '/people/',
    params,
}).pipe(map((data) => normalize(data, {results: [characterEntity]})));

const getById = (id: CharacterId): Observable<CharacterDetailsNormalizedResult> => swapi<CharacterOriginal>({
    url: `/people/${id}`,
}).pipe(map((data) => normalize(data, characterEntity)));

export default {
    getList,
    getById,
};
