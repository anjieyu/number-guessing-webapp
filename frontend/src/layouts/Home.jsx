export function Home(props) {
    return (
        <div>
            <h1> Anjie's Webgames </h1>
            <button onClick = {() => props.onSelectGame('numberGame')}> Number Guessing Game </button>
        </div>
    );
};
export default Home;