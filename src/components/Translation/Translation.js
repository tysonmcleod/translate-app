import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppContainer from "../../hoc/AppContainer"
import NavBar from "../../hoc/NavBar";
import { getStorage } from "../../utils/storage"
import TranslationArea from "./TranslationArea/TranslationArea";
import TranslationForm from "./TranslationForm.js";

const Translation = () => {
    const history = useHistory();
    const user = getStorage("name");

    useEffect(() =>{
        if(!user){
            history.push('/');
        }
    })

    const [word, setWord] = useState({
        word: '',
        letters: []
    })

    /**
     * Tracks the word inputted from the user, and updates the state if it changes.
     */
    const handleInputChange = event => {
        setWord({
            ...word,
            word: event.target.value
        })
    }

    /**
     * When the user presses the translate button, the word is split into seperate letters which will be translated, and the translation is stored in the database.
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        setWord({
            ...word,
            letters: word.word.toLowerCase().split('')
        })
        if(word.word.length > 40){
            alert("word is too long ");
            setWord({
                ...word,
                word: "",
            })
        }else if(word.word.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)){
            await fetch('http://localhost:3010/translations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                word: word.word,
                author: getStorage('name'),
                status: "active"
            })
        })
        }else{
            alert("Invalid input - enter a phrase consisting of only letters and max one space");
            setWord({
                ...word,
                word: "",
            })
        }        
    }

    return (
        <main>
            <NavBar/> 
            <AppContainer>
                <h1 className="text-center mt-5"> Welcome to the translation page </h1>
                
                <TranslationForm word={word.word} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />

                { word.letters.length > 0 && 
                    <div className="mt-3 p-4 w-75 m-auto">
                        <h3 className="text-center">Translation</h3>
                        <TranslationArea letters={word.letters} />
                    </div>
                }
            </AppContainer>
        </main>
    )
}

export default Translation
