import { Link } from 'react-router-dom'
import AppContainer from '../../hoc/AppContainer'

const NotFound = () => {
    return (
        <AppContainer>
        <main>
            <h4 className="mt-3 mb-3"> Hey you seem lost</h4>
            <p> This page does not exist </p>
            <Link to="/"> Take me home</Link>
        </main>
        </AppContainer>
        
    )
}

export default NotFound