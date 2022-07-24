import React, {useState, useEffect} from 'react'
import homepagepic from "../assets/homepagepicture.jpeg";
import homepagepic2 from "../assets/homepagepicture2.jpeg";
import homepagepic3 from "../assets/homepagepicture3.jpeg";
import Carousel from 'react-bootstrap/Carousel'
import NewCalendar from './NewCalendar';

const Home = () => {
 

  return (
    <div>
      <Carousel class="slideshow">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={homepagepic}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Ingi's Microgreens</h3>
            <p>Growers of non-GMO microgreens, shoots and wheatgrass. Organic, sustainable and nutritous produce born and raised in Frankemuth, Michigan; Pictured: Broccoli</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={homepagepic2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Purple rambo radish</h3>
            <p>Taste exactly like grown radishes with a stronger flavor. Great for sandwiches and salads.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={homepagepic3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Daikon radish</h3>
            <p>One of the most popular radish falvors. Amazing for a salad</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

<NewCalendar></NewCalendar>
    </div>
    
  )
}

export default Home;