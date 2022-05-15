import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@mui/material/Button';
import Spinner from '@mui/material/CircularProgress';

import {
    getIsCharacterListLoading,
    getCharacterListCurrentPage,
    getIsCharacterListHasNextPage,
} from '~/store/widgets/charactersList/selectors';
import {nextPage} from '~/store/widgets/charactersList';

const NextPageButton = () => {
    const isLoading = useSelector(getIsCharacterListLoading);
    const hasNextPage = useSelector(getIsCharacterListHasNextPage);
    const currentPage = useSelector(getCharacterListCurrentPage);
    const dispatch = useDispatch();

    const loadNextPage = useCallback(() => {
        dispatch(nextPage(currentPage + 1));
    }, [currentPage, dispatch]);

    if (!hasNextPage) {
        return null;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return <Button variant="outlined" onClick={loadNextPage}>Load next page</Button>;
};

export default NextPageButton;
