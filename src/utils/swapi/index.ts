import type {AxiosRequestConfig} from 'axios';
import type {Observable} from 'rxjs';
import axios from 'axios';
import {mergeMap} from 'rxjs/operators';
import {from, of, throwError} from 'rxjs';

export default <R>({url, params}: AxiosRequestConfig): Observable<R> => from(axios.get(url!, {
    baseURL: 'https://swapi.dev/api',
    params,
})).pipe(
    mergeMap(({status, data}) => {
        if (status === 200) {
            return of(data);
        }

        return throwError(data);
    }),
);
