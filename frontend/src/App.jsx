import {createSignal} from 'solid-js';
import {render} from 'solid-js/web';
function App() {
    return (
        <div>
            <h1> number guessing game </h1>
            <p> try to guess a random number from 1 to 10 </p>
        </div>
    );
}
render(() => <App />, document.getElementById('root'));