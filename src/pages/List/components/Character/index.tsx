import type {FunctionComponent} from 'react';
import {useMemo, useCallback} from 'react';
import {generatePath} from 'react-router';
import {push} from '@lagunovsky/redux-react-router';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';

import {
    makeGetCharactersById,
} from '~/store/collections/characters/selectors';
import type {CharacterId} from '~/entities/characters';
import ROUTES from '~/constants/routing';

type Props = {
    id: CharacterId;
    className: string;
}

const Character: FunctionComponent<Props> = ({id, className}) => {
    const dispatch = useDispatch();

    const getCharacterById = useMemo(() => makeGetCharactersById(id), [id]);
    const characterDetailPage = useMemo(() => generatePath(ROUTES.details, {id}), [id]);

    const character = useSelector(getCharacterById);

    const detailsClick = useCallback(() => {
        dispatch(push(characterDetailPage));
    }, [dispatch, characterDetailPage]);

    return (
        <Card className={className}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {character.name}
                </Typography>
                <Typography color="text.secondary">
                    {character.birthYear}
                </Typography>
                <Typography variant="body2">
                    hair color is
                    {' '}
                    {character.hairColor}
                    <br />
                    and skin color is
                    {' '}
                    {character.skinColor}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" onClick={detailsClick}>Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default Character;
