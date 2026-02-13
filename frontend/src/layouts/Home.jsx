export function Home(props) {
    return (
        <div>
            <h1> Anjie's Webgames </h1>
            <button onClick = {() => props.onSelectGame('numberGame')}> Number Guessing Game </button>
            <button onClick = {() => props.onSelectGame('bullGame')}> Bulls and Cows </button>
            <button onClick = {() => props.onSelectGame('hangMan')}> Hang Man </button>
        </div>
    );
};
export default Home;