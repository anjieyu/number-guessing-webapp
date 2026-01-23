import {render} from 'solid-js/web';
import { Home } from './layouts/Home';
import {createSignal} from 'solid-js';
import {NumberGame} from './layouts/NumberGame';
import {BullGame} from './layouts/BullGame';

function App() {
    const [currentPage, setCurrentPage] = createSignal('home');
    return (
        <div>
            {currentPage() === 'home' && <Home onSelectGame = {setCurrentPage}/>}
            {currentPage() === 'numberGame' && <NumberGame onBack = {() => setCurrentPage('home')}/>}
            {currentPage() === 'bullGame' && <BullGame onBack = {() => setCurrentPage('home')}/>}
        </div>
    );
};
render(() => <App />, document.getElementById('root'));