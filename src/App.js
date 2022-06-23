//import nav bar component
import NavigationBar from './components/NavigationBar.js';

//import react-router-dom to display pages & navigate between them
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import pages to create route for home, inventory, orders, calendar
import Inventory from "./components/Inventory.js";

import InventoryList from "./components/InventoryList.js";
import Home from "./components/Home.js"
import Orders from "./components/Orders.js";
import NewCalendar from "./components/NewCalendar.js";
import OrdersList from "./components/OrdersList"
import CustomerList from "./components/CustomerList.js";
import CustomerAdd from "./components/CustomerAdd.js";
import CustomerEdit from "./components/CustomerEdit.js";
import DetailOrders from './components/DetailOrders.js';



//import slideshow banner
import homepagepic from "./assets/homepagepicture.jpeg";
import homepagepic2 from "./assets/homepagepicture2.jpeg";
import homepagepic3 from "./assets/homepagepicture3.jpeg";
import Carousel from 'react-bootstrap/Carousel'




function App (){

  return (
    <div>
    <Router>
    <NavigationBar />
{/* 
    <Carousel >
  <Carousel.Item >
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
      <h3>Diakon radish</h3>
      <p>One of the most popular radish falvors. Amazing for a salad</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> */}
    
    <div>
    <Routes>
      <Route exact path = "/" element = {<Home/>}/>
      <Route path = "/inventory" element = {<InventoryList/>}/>
      <Route path = "/inventory/add" element = {<Inventory/>}/>
      <Route path = "/inventory/delete/{seedId}" element = {<Inventory/>}/>
      <Route path = "/inventory/update/{seedId}" element = {<Inventory/>}/>
      <Route path = "/orders" element = {<OrdersList/>}/>
      <Route path = "/orders/:orderId" element = {<DetailOrders/>}/>
      <Route path = "/orders/update/:orderId" element = {<Orders/>}/>
      {/* <Route path = "/customers" element = {<CustomerList/>}/> */}
      <Route path = "/customers/add" element = {<CustomerAdd/>}/>
      <Route path = "/customers/{customerId}" element = {<CustomerEdit/>}/>
      <Route path = "/orders/add" element = {<Orders/>}/> 
      <Route path = "/customers" element = {<CustomerList/>}/> 
      <Route path = "/NewCalendar" element = {<NewCalendar/>}/>
      <Route path = "/Home" element = {<Home/>}/>
    </Routes>
  </div>
</Router>  
   </div>
  );
}

export default App;
