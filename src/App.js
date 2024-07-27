import './App.css';
import Game from './components/Game';
import RampCarousel from './components/RampCarousel';
import MiddleSection from './components/MiddleSection';
import { useEffect } from 'react';

function App() {

  const handleArrowClick = (evt) => {
    const direction = evt.target.textContent;    
    // need reference to the .card-slider-container. to move it, and full container width
    const cardSliderContainer = document.querySelector(".card-slider-container");
    const cards = document.querySelectorAll(".card");
    // need size reference of the .card, offsetWidth
    const cardWidth = cards[0].offsetWidth;
    const maxWidth = cards.length * cardWidth;
    const containerDomRect = cardSliderContainer.getBoundingClientRect();
    
    let currPos = direction === 'right' ? containerDomRect.x - cardWidth : containerDomRect.x + cardWidth
    
    const remainder = Math.abs(((containerDomRect.x - cardWidth) % cardWidth))
    const halfCardWidth = Math.floor(cardWidth / 2)
    let xPos = remainder <= halfCardWidth ? currPos + remainder : currPos - remainder // modulo math to fix right at nearest min or max
    console.log(`Remainder: ${remainder}, half card width: ${halfCardWidth}`)
    // when scrolling manually, or in any way, always update the currentX. So clicking the buttons can react accordingly
    const accurateXPos = Math.round(xPos / cardWidth) * cardWidth
    cardSliderContainer.parentElement.scroll({
      left: -accurateXPos,
      // include animation to .card-slider-container
      behavior: 'smooth'
    })
  }

  useEffect(() => {

    // Click and dragging the card slider
    const cardSliderContainer = document.querySelector(".card-slider-container");
    let mouseDown = false;
    let initialX, scrollLeft;

    const startDragging = (evt) => {
      mouseDown = true;
      initialX = evt.pageX - cardSliderContainer.parentElement.offsetLeft;
      scrollLeft = cardSliderContainer.parentElement.scrollLeft
    }

    const stopDragging = () => {
      mouseDown = false
    }

    const move = (evt) => {
      evt.preventDefault();
      if (!mouseDown) return;
      const x = evt.pageX - cardSliderContainer.offsetLeft;
      const scroll = x - initialX;
      console.log(scroll)
      cardSliderContainer.parentElement.scrollLeft = scrollLeft - scroll
    }

    cardSliderContainer.addEventListener('mousemove', move, )
    cardSliderContainer.addEventListener('mousedown', startDragging)
    cardSliderContainer.addEventListener('mouseup', stopDragging)
    document.addEventListener('mouseup', stopDragging)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>FE Widgets</h1>
        <Game />
        <MiddleSection buttonAction={(evt) => handleArrowClick(evt)} />
        <RampCarousel />
      </header>
    </div>
  );
}

export default App;
