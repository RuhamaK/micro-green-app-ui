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

function App (){

  return (
    <div>
    <Router>
    <NavigationBar />    
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
