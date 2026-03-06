import {createSignal} from 'solid-js';
export function HangMan(props) {
    const [guess, setGuess] = createSignal("");
    const [message, setMessage] = createSignal("");
    const [attempts, setAttempts] = createSignal(0);
    const [word, setWord] = createSignal("");
    const [guesses, setGuesses] = createSignal([]);
    const handleGuess = async () => {
        try {
            const response = await fetch(`http://localhost:8000/hangman/${guess()}`);
            const data = await response.json();
            setWord(data.word);
            setGuess("");
            setAttempts(data.attempts);
            setGuesses(data.guesses);
            setMessage(data.message);

        } catch(error) {
            setMessage(error);
        }
    };
    const handleNewGame = async() => {
        try {
            const response = await fetch(`http://localhost:8000/hangman/new-game`);
            const data = await response.json();
            setWord(data.word);
            setGuess("");
            setAttempts(data.attempts);
            setGuesses([]);
            setMessage(data.message);
        } catch(error) {
            setMessage(error);
        }
    };
    return (
        <div> 
            <h1> Hang Man </h1>
            <p> Word: {word()} </p>
            <p> Attempts left: {attempts()} </p>
            <p> Previously guessed: {guesses().join(", ")} </p>
            <p> Message: {message()} </p>
            <input
                value = {guess()}
                onInput = {(e) => setGuess(e.currentTarget.value)}
                maxLength = {1}
            />
            <button 
                onClick = {handleGuess}> Guess </button>
            <button 
                onClick = {handleNewGame}> New Game </button>
            <button 
                onClick = {props.onBack}> Home </button>
        </div>
    );
}
export default HangMan;