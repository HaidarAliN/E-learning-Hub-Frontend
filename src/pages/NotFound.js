import { Link } from 'react-router-dom';
import { useState } from "react";

const NotFound = () => {
    const [logedIn, setLogedin] = useState(JSON.parse( localStorage.getItem('access_token') ));

    return ( 
      <div className="not-found">
        <h2>404!</h2>
        <p>That page cannot be found</p>
        { logedIn && <Link to="/home">Back to the homepage...</Link>}
        { !logedIn && <Link to="/">Back to the homepage...</Link>}
      </div>
     );
}
 
export default NotFound;