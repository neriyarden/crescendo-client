import React from 'react'

const Loader = () => {
    return (
        <div className="loader">
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="shadows">
            <span className="shadow"></span>
            <span className="shadow"></span><span className="shadow"></span>
          </div>
        </div>
    )
}

export default Loader
