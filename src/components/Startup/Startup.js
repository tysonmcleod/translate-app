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
            <h1 className="text-center mt-5"> Welcome to the translation app</h1>
            <form className="w-25 m-auto mt-5">
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="What is your name?" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">Translate</button>
                </div>
            </div>
            </form>
        </AppContainer>     
    )
}

export default Startup