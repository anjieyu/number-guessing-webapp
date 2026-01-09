import {render} from 'solid-js/web';
import { Home } from './layouts/Home';
function App() {
    return (
        <div>
            <Home/>
        </div>
    );
};
render(() => <App />, document.getElementById('root'));