const TranslationForm = props => {
    return (
        <form className="w-50 m-auto mt-5" onSubmit={ props.handleSubmit }>
            <label for="word">What would you like to translate?</label>
            <div className="input-group mb-3">
                <input id="word" type="text" value={props.word} className="form-control" placeholder="Enter your text" onChange={ props.handleInputChange }/>
                <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">Translate</button>
                </div>
            </div>
        </form>
    )
}

export default TranslationForm