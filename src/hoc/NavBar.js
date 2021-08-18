import { Nav, Navbar } from "react-bootstrap";
import { getStorage } from "../utils/storage";
import AppContainer from "./AppContainer";
const NavBar = ({ children }) => {
    const user = getStorage('name');
    return (
        <>
            <Navbar collapseOnSelect fixed='top'  bg='dark' variant = 'dark'>
                <AppContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href="/translation">Translate</Nav.Link>
                            <Nav.Link href="/profile">{user}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </AppContainer>
            </Navbar>


        </>
        
    )
}
export default NavBar;