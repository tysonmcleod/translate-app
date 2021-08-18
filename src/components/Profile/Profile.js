import AppContainer from "../../hoc/AppContainer";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStorage, clearStorage } from "../../storage";

const Profile = () => {
    const history = useHistory();
    const [data, setPosts] = useState(null)
    const user = getStorage("name");
    const POST_URL = "http://localhost:3010/translations/"
    const FILTERED_POST_URL = "http://localhost:3010/translations?_sort=id&_order=desc&_limit=10&status=active&author=";
    /**
     * If the user is already logged in, redirect to the translation page.
     * Otherwise, get the ten most recent active posts
     */
    useEffect(() =>{
        if(!user){
            history.push('/');
        }
        
        getMostRecentPosts();
        
    }, []) // fix the warning

    /**
     * A function used to get the ten most recent posts
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
            setPosts(data);
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
                    setPosts(null)
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
        <AppContainer>
            <div>
                <h1 className="animate__animated animate__bounceInDown"> Welcome {user} </h1>
                <h3> Here are your last translations: </h3>
                <ul className="translations">
                    {data && data.map(translation =>
                        // wonder if we are supposed to save the actual sign translation as well?
                        <li key={translation.id}>{translation.word} equals: {translation.word}</li> 
                    )}
                </ul>

                <div className="buttons mt-3 ">
                    <button onClick={handleClearPostsClick}> Clear translations</button>
                    <button onClick={handleLogOutClick}> Log out</button>
                </div>
            </div>          
        </AppContainer>
    )
}

export default Profile