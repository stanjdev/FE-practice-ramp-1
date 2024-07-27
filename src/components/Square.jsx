import React from 'react';

export default function Square({shape, clickAction, winningColor}) {
  return (
    <div className='square' onClick={clickAction} style={{backgroundColor: winningColor ? 'green' : undefined}}>{shape}</div>
  );
};
