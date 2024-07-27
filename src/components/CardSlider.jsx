import React from 'react'
import Card from './Card.jsx'

export default function CardSlider() {
  const cardsArray = new Array(14).fill("")
  const renderedCards = cardsArray.map((card, idx) => <Card text={idx} key={`Key: ${idx}`} />)

  return (
    <div className='card-slider-container'>
      {renderedCards}
    </div>
  )
}
