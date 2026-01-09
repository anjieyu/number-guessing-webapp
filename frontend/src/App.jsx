import {render} from 'solid-js/web';
import { NumberGame } from './layouts/NumberGame';
function App() {
    return (
        <div>
            <NumberGame/>
        </div>
    );
}
render(() => <App />, document.getElementById('root'));