import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppContainer from "../../hoc/AppContainer"
import TranslationImage from "./TranslationImage";
import { getStorage } from "../../storage"

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
            letters: word.word.split('')
        })

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
    }

    return (
        <AppContainer>
            <h1 className="text-center mt-5"> Welcome to the translation page </h1>
            <form className="w-50 m-auto mt-5" onSubmit={ handleSubmit }>
                <p>What would you like to translate</p>
                <div className="input-group mb-3">
                    <input id="word" type="text" className="form-control mb-2" placeholder="Enter your text" onChange={ handleInputChange }/>
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary">Translate</button>
                    </div>
                </div>
            </form>

            { word.letters.length > 0 && 
                <div className="mt-3 p-4 w-75 m-auto">
                    <h3 className="text-center">Translation</h3>
                    <div id="translationArea">
                        {word.letters.map((letter, index) => {
                            return <TranslationImage src={`./resources/individial_signs/${letter}.png`} key={index} />
                        })}
                    </div>
                </div>
            }
        </AppContainer>
    )
}

export default Translation