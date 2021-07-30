import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faNodeJs, faSass, faGit } from '@fortawesome/free-brands-svg-icons'
function Footer() {
    return (
        <div className='main-footer' >
            Made with 
            <FontAwesomeIcon icon={faNodeJs}/>
            <FontAwesomeIcon icon={faReact}/> 
            <FontAwesomeIcon icon={faSass}/>
            <FontAwesomeIcon icon={faGit}/>
            {/* & some <span>❤</span>  */}
            by 
            <a href="https://github.com/neriyarden/crescendo" target='_blank'>Neri Yarden</a> 
        </div>
    )
}

export default Footer
