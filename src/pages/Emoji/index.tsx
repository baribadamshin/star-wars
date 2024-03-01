import {useState} from 'react';

import EMOJI from '~/constants/emoji';

import css from './styles.css';

export default function Emoji() {
    const [emoji, setEmoji] = useState<string[]>(EMOJI);
    const [current, setCurrent] = useState<string | null>(null);

    const onClick = () => {
        const min = 0;
        const max = emoji.length - 1;

        const emojiIndex = Math.floor(Math.random() * (max - min + 1) + min);

        setCurrent(emoji[emojiIndex]);

        setEmoji(emoji.filter((_, index) => index !== emojiIndex));
    };

    return (
        <div className={css.root}>
            <div className={css.current}>{current}</div>
            <button onClick={onClick} className={css.button} type="button">{emoji.length ? 'Жмяк' : 'Конец'}</button>
            <div className={css.all}>
                {emoji.map((value, index) => <span key={index}>{value}</span>)}
            </div>
        </div>
    );
}
