import React from "react";
import './footer.scss';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footerContent">
            <span>©Johannes Roth</span>
            <div>
               <Link to="/imprint" >Impressum</Link>
            </div>
        </div>
    )
}
export default Footer