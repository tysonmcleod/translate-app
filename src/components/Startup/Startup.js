import AppContainer from "../../hoc/AppContainer"
import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { getStorage, setStorage } from "../../storage"

const Startup = () => {
    const [name, setName] = useState("");
    const history = useHistory();

    const handleNameChange = event => {
        setName(event.target.value);
    }

    // create function to check if name is already in database?
    // perhaps also unccessary since you only need to enter your name
    const userInDatabase = false;

    const handleSubmitNameClick = async () => {
        // maybe uneccessary to check this since you only need to enter your name
        if(userInDatabase){
            alert('Name already exists')
        }else if(name.match(/^[a-zA-Z\-]+$/)){
            setStorage("name", name);
            await fetch('http://localhost:3010/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name 
            })
        })
        history.push("/translation");
        }else{
            alert('Invalid input');
        }
    }

    const checkUserLoggedIn = () => {
        const user = getStorage("name");
        if(user){
            return true;
        }
        return false;
    }

    const isUserLoggedIn = checkUserLoggedIn();

    return (

        <AppContainer>
        <div>
            {isUserLoggedIn && <Redirect to="/translation" />}
            <div>
                <h1> Hey welcome to the translate app</h1>
                <p className="mt-3"> What is your name? </p>
                <input type="text" onChange= {handleNameChange} />
                <button onClick={handleSubmitNameClick}> Submit name</button>
            </div>
        </div> 
        </AppContainer>
        
    )
}

export default Startup