import {useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import Spinner from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import {getIsEmptyResult, getCharacterItems, getIsCharacterListLoading} from '~/store/widgets/charactersList/selectors';

import Character from '../Character';
import css from './styles.css';

const Items = () => {
    const items = useSelector(getCharacterItems);
    const isEmpty = useSelector(getIsEmptyResult);
    const isLoading = useSelector(getIsCharacterListLoading);

    if (isEmpty) {
        if (isLoading) {
            return <Spinner />;
        }

        return (
            <Typography variant="overline" display="block" gutterBottom>
                Characters with this name not found
            </Typography>
        );
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
