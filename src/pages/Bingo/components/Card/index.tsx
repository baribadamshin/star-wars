import type {TTicket} from 'bingo-card-generator';

import css from './styles.module.css';
import {EMOJI} from '../../constants';

type Props = {
    matrix: TTicket
};

const Card = ({matrix}: Props) => (
    <>
        <h2>B2B Bingo Tingo! Эмоциональное лото (не качели)</h2>
        <div className={css.card}>
            {matrix.map((row) => row.map((cell) => (
                <div className={css.cell}>
                    {cell ? EMOJI[cell - 1] : null}
                </div>
            )))}
        </div>
    </>
);

export default Card;
