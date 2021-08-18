import AppContainer from "../../hoc/AppContainer"
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getStorage, setStorage, clearStorage } from "../../storage"

const Startup = () => {
    const [name, setName] = useState("");
    const history = useHistory();

    const user = getStorage("name");
    useEffect(() =>{
        if(user){
            history.push('/translation');
        }
    })

    const handleNameChange = event => {
        setName(event.target.value);
    }

    // A reaaallly bad way of checking if a user exists 
    const checkUserInDatabase = async () => {
        const USER_URL = "http://localhost:3010/users?name=" + getStorage('name');
        const response = await fetch(USER_URL);
        const names = await response.json();
        if(names.length === 0){          
            return false;
        }
        return true;
    }


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
            alert('Invalid input');
        }
    }

    return (
        <AppContainer>
            <div>
                <h1> Hey welcome to the translate app</h1>
                <p className="mt-3"> What is your name? </p>
                <input type="text" onChange= {handleNameChange} />
                <button onClick={handleSubmitNameClick}> Submit name</button>
            </div>
        </AppContainer>     
    )
}

export default Startup