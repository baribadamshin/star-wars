import {useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import Spinner from '@mui/material/CircularProgress';

import {getIsEmptyResult, getCharacterItems, getIsCharacterListLoading} from '~/store/widgets/charactersList/selectors';

import Character from '../Character';
import css from './styles.css';

const Items = () => {
    const items = useSelector(getCharacterItems);
    const isEmpty = useSelector(getIsEmptyResult);
    const isLoading = useSelector(getIsCharacterListLoading);

    if (isEmpty) {
        if (!isLoading) {
            return <div>NOT FOUND</div>;
        }

        if (isLoading) {
            return <Spinner />;
        }
    }

    return (
        <Grid container>
            {items.map((id) => (
                <Character className={css.card} key={id} id={id} />
            ))}
        </Grid>
    );
};

export default Items;
