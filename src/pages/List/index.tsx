import {useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import Spinner from '@mui/material/CircularProgress';

import {getCharacterItems} from '~/store/widgets/charactersList/selectors';

import NextPageButton from './components/NextPageButton';
import Search from './components/Search';
import Character from './components/Character';
import css from './styles.css';

const List = () => {
    const items = useSelector(getCharacterItems);

    return (
        <>
            <Search />
            {
                // тут еще нужно учесть ситуацию с пустым списком из-за того что ничего не найдено
                (items.length === 0) ? <Spinner /> : (
                    <>
                        <Grid container>
                            {items.map((id) => (
                                <Character className={css.card} key={id} id={id} />
                            ))}
                        </Grid>
                        <footer className={css.footer}>
                            <NextPageButton />
                        </footer>
                    </>
                )
            }
        </>
    );
};

export default List;
