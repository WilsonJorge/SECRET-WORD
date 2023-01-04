// CSS
import './App.css';

// React
import {useCallback,useEffect,useState} from "react";

//Data

import {wordsList} from "./data/words";

//Compentes
import StartScren from './componentes/StartScren';
import Game from './componentes/Game';
import GameOver from './componentes/GameOver';

const stages=[
  {id: 1,name :"start"},
  {id: 2,name :"game"},
  {id: 3,name :"end"},
]
const guessesQty =3 
function App() {
  const [gameStage,setGameStage] =useState(stages[0].name);
  const[words]=useState(wordsList);

  const [pickedWord,setpickedWord] = useState("");
  const [pickedCategory,setpickedCategory] = useState("");
  const [letters,setLetters] = useState([]);


  const [guessedLetters,setGuessedLetters] = useState([])
  const[wrongLetters,setWrongLetters] =useState([])
  const [guesses,setGuesses] =useState(guessesQty)
  const [score,setScore]=useState(0)
  //Chamada da Tela Inicial 1

  //Vamos criar uma funcao para pegar as palavras e as categorias

  const pickWordAndCategory =()=>{
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];

   // Funcao para pegar a palavra escolhida 
  const word = words[category][Math.floor(Math.random()*words[category].length)];
   console.log(word);

   return{word,category};
  };

  const startGame =() =>{
    const {word,category} =pickWordAndCategory();
    clearLetterStates();

    //Criar array de letras
    let wordLetters = word.split("");

    wordLetters =wordLetters.map((l)=>l.toLowerCase());
    console.log(word,category);
    console.log(wordLetters);

    //
    setpickedWord(word);
    setpickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  //Processar as entradas
  const verifyletter =(letter) =>{
    
    const normalizedLetter = letter.toLowerCase();

    //verificar se as letras ja foram usadas
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter))
    {
      return;
    }

    if(letters.includes(normalizedLetter))
    {
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,normalizedLetter,
      ])
    }
    else{
         setWrongLetters((actualWrongLetters)=>
         [
          ...actualWrongLetters,normalizedLetter,
         ]);
         setGuesses((actualGuesses)=>actualGuesses - 1);
    }
    
  };

  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Vamos verificar a condicao de vitoria

  useEffect(()=>
  {
    const uniqueLetters =[ ...new Set(letters)];

    //Vericar a condicao de ganhar

    if(guessedLetters.length === uniqueLetters.length)
    {
      //adicinar pontuacao
      setScore((actualScore) => (actualScore += 100));
      //Recomecar o jogo
      startGame();
    }
  }, [guessedLetters,letters,startGame]);
  //vamos usar o usEffect para o controlo de estado
  useEffect(()=>{
    if(guesses<=0){
      //reset all states
     clearLetterStates();
      setGameStage(stages[2].name)
    }
  },[guesses]);

  //Recomecar o jogo
  const retry =() =>{
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }
  return (
    <div className="App">
      {gameStage==="start" && <StartScren startGame={startGame}/>}
      {gameStage==="game" && <Game verifyletter ={verifyletter} 
      pickedWord={pickedWord} pickedCategory={pickedCategory} 
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}/>}
      {gameStage==="end" && <GameOver retry= {retry} score={score}/>}

      

    </div>
  );
}

export default App;
