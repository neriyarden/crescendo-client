import React from 'react'

function WordsBg({ height }) {
    return (
        <div className='words-bg-container'>

            {
                [...Array(10)].map((e, i) => (
                    <div className='words-bg'>
                        {[...Array(height)].map((f, j) => (
                            <div className='words-bg-bulk'>
                                <p>Bringing <span>Music</span> And People Together Bringing <span>Music</span></p>
                                <p>Music And People <span>Together</span> Bringing Music And</p>
                                <p>And <span>People</span> Together Bringing Music And</p>
                                <p>People Together Bringing <span>Music</span> And People</p>
                                <p><span>Together</span> Bringing Music And People <span>Together</span></p>
                            </div>
                        ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default WordsBg
