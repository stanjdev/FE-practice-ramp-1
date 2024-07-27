import React from 'react'
import Logo from '../../src/logo.svg'


export default function Card({text}) {
  return (
    <div className='card'>
      <img draggable="false" src={Logo} alt={'card logo'} width={'150px'}/>
      <div className='card-text'>
        <h5>Header Title</h5>
        <p>{text}</p>
      </div>
    </div>
  )
}
