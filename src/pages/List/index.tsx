import {useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import {getCharacterItems, getIsCharacterListFreshLoading} from '~/store/widgets/charactersList/selectors';

import NextPageButton from './components/NextPageButton';
import Header from './components/Header';
import Character from './components/Character';
import css from './styles.css';

const List = () => {
    const items = useSelector(getCharacterItems);
    const isFreshLoading = useSelector(getIsCharacterListFreshLoading);

    if (isFreshLoading) {
        return (
            <>
                <Header />
                <Grid container>
                    <Skeleton className={css.skeleton} variant="rectangular" />
                    <Skeleton className={css.skeleton} variant="rectangular" />
                    <Skeleton className={css.skeleton} variant="rectangular" />
                    <Skeleton className={css.skeleton} variant="rectangular" />
                </Grid>
            </>
        );
    }

    return (
        <>
            <Header />
            <Grid container>
                {items.map(id => (
                    <Character className={css.card} key={id} id={id} />
                ))}
            </Grid>
            <footer className={css.footer}>
                <NextPageButton />
            </footer>
        </>
    );
};

export default List;
