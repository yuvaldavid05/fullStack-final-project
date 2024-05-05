import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GeneralContext } from '../../App';
import { useContext } from 'react';

function Searchbar() {
    const { searchWord, setSearchWord } = useContext(GeneralContext);
    return (
        <Form className="d-flex searchInput">
            <Form.Control
                type="search"
                placeholder="search"
                className="me-2"
                aria-label="Search"
                value={searchWord}
                onChange={ev => setSearchWord(ev.target.value)}
            />

        </Form>
    );
}

export default Searchbar;