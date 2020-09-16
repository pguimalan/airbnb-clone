import React from 'react'

function Point(props) {     
    return (        
        <div>
            <div className="point-title">{props.point}</div>
            <div className="point-desc">{props.pointDesc}</div>
        </div>
    )
}

export default Point
