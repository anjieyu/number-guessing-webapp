import {render} from 'solid-js/web';
import { Home } from './layouts/Home';
import {createSignal} from 'solid-js';
import {NumberGame} from './layouts/NumberGame';

function App() {
    const [currentPage, setCurrentPage] = createSignal('home');
    return (
        <div>
            {currentPage() === 'home' && <Home onSelectGame = {setCurrentPage}/>}
            {currentPage() === 'numberGame' && <NumberGame onBack = {() => setCurrentPage('home')}/>}
        </div>
    );
};
render(() => <App />, document.getElementById('root'));