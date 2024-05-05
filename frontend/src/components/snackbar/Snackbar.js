import "./Snackbar.css";
import Alert from 'react-bootstrap/Alert';

function Snackbar({ text }) {
    return (
        <div id='snackbar'>
            {/* <Alert key="dark" variant="dark">
                {text} shdshdishd
            </Alert> */}
            {text}
        </div>
    );
}

export default Snackbar;