import React from 'react';
import { Link } from 'react-router-dom';
import './dugme.css';


const Dugme = (props) => {
    const { icon, text, width, height } = props;

    let w, h;
    if (width) {
        w = width;
    } else {
        w = "60";
    }

    if (height) {
        h = height;
    } else {
        h = "60";
    }

    return (
        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 p-2 dugme-ic" >
            <div className="d-block dugme-ic">
                <Link className="card rounded-lg shadow w-160 h-160" to="#" >
                    <i className="material-icons" style={{ width: w, height: h }}>{icon}</i>
                    <span className="dugme-text">{text}</span>
                </Link>
            </div>
        </div>
    );
};

export default Dugme;