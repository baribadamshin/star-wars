import {Ticket} from 'bingo-card-generator';

import Card from './components/Card';
import css from './styles.css';

const Bingo = () => (
    <div className={css.list}>
        {
            Ticket.generateStrip().map((matrix, index) => (
                <Card key={index} matrix={matrix} />
            ))
        }
    </div>

);

export default Bingo;
