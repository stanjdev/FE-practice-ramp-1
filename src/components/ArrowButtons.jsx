import React from 'react'

export default function ArrowButtons({buttonAction}) {

  return (
    <div>
      <button onClick={buttonAction} className="arrow-button">left</button>
      <button onClick={buttonAction} className="arrow-button">right</button>
    </div>
  )
}
