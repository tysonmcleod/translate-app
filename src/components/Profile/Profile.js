import AppContainer from "../../hoc/AppContainer";
import NavBar from "../../hoc/NavBar";
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStorage, clearStorage } from "../../utils/storage";

const Profile = () => {
    const history = useHistory();
    const [data, setData] = useState(null)
    const user = getStorage("name");
    const POST_URL = "http://localhost:3010/translations/"
    const FILTERED_POST_URL = "http://localhost:3010/translations?_sort=id&_order=desc&_limit=10&status=active&author=";
    /**
     * If the user is already logged in, redirect to the translation page.
     * Otherwise, get the most recent active posts (limited to ten)
     */
    useEffect(() =>{
        if(!(getStorage('name'))){
            history.push('/');
        }
        getMostRecentPosts();
    }, [history]) // double check this

    /**
     * A function used to get the 10 most recent posts 
     */
    const getMostRecentPosts = async () => {
        await fetch(FILTERED_POST_URL+getStorage('name'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data=> {
            setData(data);
        })
        .catch((error) => {
            console.error('Error', error);
        });
    }
            

    /**
     * Tracks when a user clears the most recent posts.
     * This does not delete the entries from the db, but 
     * rather marks them as inactive.
     */
    const handleClearPostsClick = async () => {
        if(data !== null){
            for(let translation of data){
                translation.status = "inactive";
                await fetch(POST_URL + translation.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(translation)
                })
                .then(response => response.json())
                .then(data => {
                    setData(null)
                })
                .catch((error) =>{
                    console.error('Error:', error);
                });
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
                <div className="mt-5">
                    <h1 className="animate__animated animate__bounceInDown"> Welcome {user} </h1>
                    <h4 className="mb-3 mt-3"> Here are your last translations: </h4>
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
                                    <td>{translation.author}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="buttons mt-3 ">
                        <button onClick={handleClearPostsClick}> Clear translations</button>
                        <button onClick={handleLogOutClick}> Log out</button>
                    </div>
                </div>          
            </AppContainer>
        </main>
    )
}

export default Profile