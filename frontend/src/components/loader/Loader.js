import Spinner from 'react-bootstrap/Spinner';
import './Loader.css';

function Loader() {
    return (
        <div className='frameLoader'>
            <Spinner animation="grow" variant="light" className='bodyLoader' />
        </div>
    )
}

export default Loader;