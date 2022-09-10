import React from "react";
import {Link} from 'react-router-dom'
import './styles/Landing.css'

export default function LandingPage(){
    return(
        <div id="LandingPage">
            <h1 id="LandingH1">Welcome to world 🌎</h1>
            <Link to = './Home'>
                <button id="LandingButton">INGRESS ✈️</button>
            </Link>
        </div>
    )
}