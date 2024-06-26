
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavComp() {
    const token = localStorage.getItem("token") || "";

    const handleLogout = () => {
        if (token) {
            localStorage.removeItem("token");
            alert("You are logged out !!");
        }
    }
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Task Manager</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/tasks">All Tasks</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                        {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
                        {token ? "" : <Nav.Link href="/signup">Signup</Nav.Link>}

                        <NavDropdown title="Profile" id="navbarScrollingDropdown">
                            {/* <NavDropdown.Item href="#action3"></NavDropdown.Item> */}
                            <NavDropdown.Item href={token ? "/signup" : "/login"} onClick={handleLogout}>
                                {token ? "Logout" : "Login"}
                            </NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>

                </Container>
            </Navbar>
        </>
    );
}

export default NavComp;