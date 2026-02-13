import {createSignal} from 'solid-js';
export function BullGame(props) {
    const [guess, setGuess] = createSignal("");
    const [message, setMessage] = createSignal("try to guess a 4 digit number");
    const [guesses, setGuesses] = createSignal([]);
    const handleGuess = async () => {
        const number = parseInt(guess());
        if (isNaN(number)) {
            setMessage("Please enter a valid number.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/bulls/${number}`);
            const data = await response.json();
            setMessage(data.message);
            setGuesses(data.guesses);
            setGuess("");
        } catch (error) {
            setMessage("error connecting to server");
        }
    };
    const handleNewGame = async() => {
        try {
            const response = await fetch(`http://localhost:8000/bulls/new-game`);
            const data = await response.json();
            setMessage(data.message);
            setGuesses([]);
            setGuess("");
        } catch (error) {
            setMessage("error connecting to server");
        }
    };

    return (
        <div> 
            <h1> Bulls and Cows </h1>
            <p> {message()} </p>
            <input
                type = "number"
                min = "1111"
                max = "9999"
                value = {guess()}
                onInput = {(e) => setGuess(e.target.value)}
                onKeyPress = {(e) => e.key === "Enter" && handleGuess()}
                placeholder = "1111-9999"></input>
            <button
                onClick = {handleGuess}> Guess </button>
            <button
                onClick = {handleNewGame}> New Game </button>
            {guesses().length > 0 ? (
                <div>
                    <h2> Previous Guesses </h2>
                    <ul style={{"list-style": "none", "padding": "0"}}>
                        {guesses().map((g) => (
                            <li style={{"padding": "8px", "margin": "5px 0", "border-radius": "4px"}}>
                                {g}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
            <button
                onClick = {props.onBack}> Home </button>
        </div>
    )
}
export default BullGame;