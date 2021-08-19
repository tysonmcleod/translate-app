import AppContainer from "../../hoc/AppContainer";
import NavBar from "../../hoc/NavBar";
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStorage, clearStorage } from "../../utils/storage";
import TranslationArea from "../Translation/TranslationArea/TranslationArea";
import { deleteTranslation, getUsersMostRecentTranslations } from "../../utils/API";

const Profile = () => {
    const history = useHistory();
    const [data, setData] = useState(null)
    const user = getStorage("name");

    /**
     * If the user is already logged in, redirect to the translation page.
     * Otherwise, get the most recent active posts (limited to ten)
     */
    useEffect(() =>{
        if(!(getStorage('name'))){
            history.push('/');
        }else{
            getMostRecentTranslations();
        }
    }, [history])

    /**
     * A function used to get the user's 10 most recent posts 
     */
    const getMostRecentTranslations = async () => {
        try {
            const data = await getUsersMostRecentTranslations(getStorage('name'));
            setData(data);
        } catch(error) {
            console.error('Error:', error);
        }
    }
            

    /**
     * Tracks when a user clears the most recent translations.
     * This does not delete the entries from the db, but 
     * rather marks them as inactive.
     */
    const handleClearTranslationsClick = async () => {
        if(data !== null){
            for(let translation of data){
                try {
                    await deleteTranslation(translation);
                    setData(null);
                } catch(error) {
                    console.error('Error:', error);
                }
            }
        } 
    }
        

    /**
     * Tracks when a user wants to log out.
     * This clears the local storage and the user is 
     * redirected to the home page.
     */
    const handleLogOutClick = () => {
        clearStorage('name');
        history.push('/');
    }

    return (
        <main>   
            <NavBar/>     
            <AppContainer>
                <div className="mt-5 mb-5">
                    <h1 className="animate__animated animate__bounceInDown text-center"> Welcome {user} </h1>
                    <h4 className="mb-3 mt-3 text-center"> Here are your latest translations: </h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Phrase</th>
                                <th>Translation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(translation =>
                                <tr key={translation.id}>
                                    <td>{translation.word}</td>
                                    <td><TranslationArea letters={translation.word.toLowerCase().split('')} /> </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="buttons mt-3 ">
                        <button className="btn btn-warning me-2" onClick={handleClearTranslationsClick}> Clear translations</button>
                        <button className="btn btn-danger" onClick={handleLogOutClick}> Log out</button>
                    </div>
                </div>          
            </AppContainer>
        </main>
    )
}

export default Profile
