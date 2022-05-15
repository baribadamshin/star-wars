import {useMemo, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import Spinner from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import type {State} from '~/store';
import {makeGetCharacterById} from '~/store/collections/characters/selectors';
import {getCurrentCharacterId, getIsCharacterLoading} from '~/store/widgets/characterDetails/selectors';

import dummyImage from './images/no.jpeg';
import css from './styles.css';

const Character = () => {
    const [isDestroyed, destroy] = useState(false);
    const characterId = useSelector(getCurrentCharacterId);
    const isLoading = useSelector(getIsCharacterLoading);
    const getCharacterById = useMemo(() => makeGetCharacterById(), []);
    const character = useSelector((state: State) => getCharacterById(state, characterId));
    const onDestroyButtonClick = useCallback(() => {
        destroy(true);
    }, [destroy]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link component={RouterLink} to="/">
                    Characters list
                </Link>
                <Typography color="text.primary">Details</Typography>
            </Breadcrumbs>
            <Typography variant="h1" component="div">
                {character.name}
            </Typography>
            {
                isDestroyed
                    ? <img className={css.image} src={dummyImage} alt="Damn!" />
                    : (
                        <Button
                            size="large"
                            color="error"
                            variant="outlined"
                            onClick={onDestroyButtonClick}
                        >
                            Don&apos;t push
                        </Button>
                    )
            }

        </>
    );
};

export default Character;
