import {createSignal} from 'solid-js';
export function BullGame(props) {
    return (
        <div> 
            <h1> Bulls and Cows </h1>
            <button
                onClick = {props.onBack}> Home </button>
        </div>
    )
}
export default BullGame;