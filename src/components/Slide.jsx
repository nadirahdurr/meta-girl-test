import useTilt from "./Tile";


const  Slide = ({ slide, offset }) =>{
  return (
  <div class="slide" style={{ '--offset': offset }}>{slide.title} {offset}</div>

    );
  }

  export default Slide