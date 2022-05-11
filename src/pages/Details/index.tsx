import dummyImage from './images/no.jpeg';
import css from './styles.css';

const Details = () => (
    <div>
        <img className={css.image} src={dummyImage} alt="Damn!" />
    </div>
);

export default Details;
