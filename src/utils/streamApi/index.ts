import {throwError} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {switchMap} from 'rxjs/operators';

export default (url: string) => fromFetch(url).pipe(
    switchMap(response => (response.ok ? response.json() : throwError(() => response))),
);
