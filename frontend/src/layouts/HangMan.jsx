import {createSignal} from 'solid-js';
export function HangMan(props) {
    const [guess, setGuess] = createSignal("");
    const handleGuess = async () => {
    };
    const handleNewGame = async() => {
    };
    return (
        <div> 
            <h1> Hang Man </h1>
            <p> {message()} </p>
        </div>
    );
}
export default HangMan;