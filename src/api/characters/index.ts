import type {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {normalize} from 'normalizr';

import get from '~/utils/swapi';

import type {CharactersListNormalizedResult, CharactersListResult} from './types';
import characterEntity from './schema';

type Params = {page: number, search?: string};

const getList = (params: Params): Observable<CharactersListNormalizedResult> => get<CharactersListResult>({
    url: '/people/',
    params,
}).pipe(map((data) => normalize(data, {results: [characterEntity]})));

export default {
    getList,
};
