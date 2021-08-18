import AppContainer from "../../hoc/AppContainer"
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getStorage, setStorage, clearStorage } from "../../utils/storage"

const Startup = () => {
    const [name, setName] = useState("");
    const history = useHistory();

    const user = getStorage("name");

    /**
     * If the user is already logged in, redirect to the translation page.
     */
    useEffect(() =>{
        if(user){
            history.push('/translation');
        }
    })

    /**
     * Tracks the name inputted from the user, and updates the state if it changes.
     */
    const handleNameChange = event => {
        setName(event.target.value);
    }

    /**
     * A function used to check if a user exists.
     */
    const checkUserInDatabase = async () => {
        const USER_URL = "http://localhost:3010/users?name=" + getStorage('name');
        const response = await fetch(USER_URL);
        const names = await response.json();
        if(names.length === 0){          
            return false;
        }
        return true;
    }

    /**
     * When the user submits their chosen name, it is firstly added to the local storage. Then we check the database to see if the name is already in there. 
     * If it is, the user is routed to the translation page. If it is not, the name is added to the database if it is a valid name,
     * otherwise the user is prompted to input a valid name.
     */
    const handleSubmitNameClick = async () => {
        setStorage("name", name);
        const userInDatabase = await checkUserInDatabase();
        if(userInDatabase){
            history.push("/translation");
        }else if(!userInDatabase && name.match(/^[a-zA-Z-]+$/)){
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
            clearStorage('name');
            alert('Invalid input! Please enter a valid name, consisting of only letters');
        }
    }

    return (
        <main>
            <AppContainer>
                <h1 className="text-center mt-5"> Welcome to the translation app</h1>
                <form className="w-50 m-auto mt-5">
                    <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="What is your name?" onChange= {handleNameChange} />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={handleSubmitNameClick}>Submit</button>
                    </div>
                </div>
                </form>
            </AppContainer>
        </main>    
    )
}

export default Startup