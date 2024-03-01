import type {TTicket} from 'bingo-card-generator';

import EMOJI from '~/constants/emoji';

import css from './styles.module.css';

type Props = {
    matrix: TTicket
};

const Card = ({matrix}: Props) => (
    <div className={css.root}>
        <h2>B2B Bingo Tingo! Эмоциональное лото</h2>
        <div className={css.card}>
            {matrix.map((row) => row.map((cell) => (
                <div className={css.cell}>
                    {cell ? EMOJI[cell - 1] : cell}
                </div>
            )))}
        </div>
    </div>
);

export default Card;
