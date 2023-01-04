import "./StartScren.css";

const StartScren =({startGame}) =>
{
    return(
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique o Botao para Comer a Jogar</p>
            <button onClick={startGame}>Comecar a Jogar</button>
        </div>
    );
};
export default StartScren;
