import TranslationImage from "./TranslationImage"

const TranslationArea = props => {
    return (
        <div>
            {props.letters.map((letter, index) => {
                if(letter.match(/\w/)) {
                    return <TranslationImage src={`./resources/individial_signs/${letter}.png`} key={index} />
                }
                
                if(letter === " ") {
                    return <textarea cols="3" className="invisible" key={index} />
                }

                return <textarea hidden key={index} />
            })}
        </div>
    )
}

export default TranslationArea