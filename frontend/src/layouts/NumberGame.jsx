import {createSignal} from 'solid-js';
export function NumberGame() {
    const [guess, setGuess] = createSignal("");
    const [message, setMessage] = createSignal("try to guess a random number from 1 to 10");
    const handleGuess = async () => {
        const number = parseInt(guess());
        if (isNaN(number)) {
            setMessage("Please enter a valid number.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/guess/${number}`);
            const data = await response.json();
            setMessage(data.message);
            setGuess("");
        } catch (error) {
            setMessage("error connecting to server");
        }
    };
    const handleNewGame = async() => {
        try {
            const response = await fetch(`http://localhost:8000/new-game`);
            const data = await response.json();
            setMessage(data.message);
            setGuess("");
        } catch (error) {
            setMessage("error connecting to server");
        }
    };
    return (
        <div>
            <h1> number guessing game </h1>
            <p> {message()} </p>
            <input
                type = "number"
                min = "1"
                max = "10"
                value = {guess()}
                onInput = {(e) => setGuess(e.target.value)}
                onKeyPress = {(e) => e.key === "Enter" && handleGuess()}
                placeholder = "1-10"></input>
            <button
                onClick = {handleGuess}> Guess </button>
            <button
                onClick = {handleNewGame}> New Game </button>
        </div>
    );
}