import type {Observable} from 'rxjs';
import queryString from 'query-string';

import streamApi from '~/utils/streamApi';

type Params = {
    url: string;
    params?: Record<string, string | number>,
}

export default <R>({url, params}: Params): Observable<R> => {
    const query = params ? queryString.stringify(params) : null;

    let destination = `https://swapi.dev/api${url}`;

    if (query) {
        destination += `?${query}`;
    }

    return streamApi(destination);
};
