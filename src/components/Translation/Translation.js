import { useState } from "react";
import AppContainer from "../../hoc/AppContainer"
import TranslationImage from "./TranslationImage";

const Translation = () => {
    const [word, setWord] = useState({
        word: '',
        letters: []
    })

    const handleInputChange = event => {
        setWord({
            ...word,
            word: event.target.value
        })
    }

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
                //author: localStorage.getItem('name')
                //Spara usern som gjort översättningen på något sätt
            })
        })
    }

    return (
        <AppContainer>
            <form className="mt-3 mb-3" onSubmit={ handleSubmit }>
                <h1> Welcome to the translation page </h1>
                <div className="form-group mb-3">
                    <label htmlFor="word" className="form-label">What would you like to translate?</label>
                    <input id="word" type="text" className="form-control mb-2" onChange={ handleInputChange }/>
                    <button type="submit" className="btn btn-primary">Translate</button>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="translationArea">Translation</label>
                    <div id="translationArea" className="form-control">
                        {word.letters.map((letter, index) => {
                            return <TranslationImage src={`./resources/individial_signs/${letter}.png`} />
                        })}
                    </div>
                </div>
            </form>
        </AppContainer>
        
    )
}

export default Translation