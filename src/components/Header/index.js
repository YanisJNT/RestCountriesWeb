import "./style.css";
import { Icon } from 'semantic-ui-react'

export default function Header () {

    return(
        <header>
            <h1>Where in the world ?</h1>

    
            <nav>
                <a className="button-white"> <Icon disabled name='moon' /> Dark Mode</a>
                
            </nav>
        </header>
    )
}