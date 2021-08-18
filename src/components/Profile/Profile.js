import AppContainer from "../../hoc/AppContainer";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getStorage } from "../../storage";

const Profile = () => {
    const history = useHistory();
    const user = getStorage("name");

    useEffect(() =>{
        if(!user){
            history.push('/');
        }
    })

    return (
        <AppContainer>
            <div>
                <h1 className="animate__animated animate__bounceInDown"> Welcome ... </h1>
            </div>          
        </AppContainer>
    )
}

export default Profile