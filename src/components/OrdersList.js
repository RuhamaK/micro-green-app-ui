import { Component } from 'react';
import {Table, Button, ButtonGroup} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEdit, faTrash, faPlusSquare, faInfo } from '@fortawesome/free-solid-svg-icons';
import microgreens3 from "../assets/microgreens3.jpg";
import homepagepic3 from "../assets/homepagepicture3.jpeg";


export default class OrdersList extends Component{

  constructor(props){
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount(){
    this.getAllOrders();
    };
  

  getAllOrders(){
    axios.get("http://localhost:8080/orders")
    .then(response => response.data)
    .then((data) => {
      this.setState({orders:data});
  });
}


deleteOrder = (orderId) => {
  axios.delete(`http://localhost:8080/orders/delete/${orderId}`)
  .then(response=>{
    if(response.data != null){
      alert("Order deleted successfully.");
      this.setState({
        orders: this.state.orders.filter(order=>order.orderId !== orderId)
      })
    }
  });
};

// seedDetails(seedingDensity, seedPresoak, blackoutTime, harvestTime) {
//   let txt = `Seeding Density: ${seedingDensity}\n` + `Seeding Presoak: ${seedPresoak}\n` + `Blackout Time: ${blackoutTime}\n` + `Harvest Time: ${harvestTime}`;
//   alert(txt);
// }

    render(){
      return (
        <div className = "container">
          <div class = "wrapper">
          <img
            className="d-block w-100"
            src={homepagepic3}
            alt="Orders"
          />
          <div class = "overlay">
            <h2 class = "header" className='text-center'> Orders</h2>
            </div>
          </div>

          
          <Button variant="dark" class="item" id="addOrdersBtn" onClick={()=>window.open("/orders/add", '_self')}><FontAwesomeIcon icon = {faPlusSquare}/>ADD ORDERS</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Order Quantity</th>
              <th>Seed Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.length === 0 ? 
            <tr align = "center">
              <td colSpan="6">Orders</td>
            </tr>:
            this.state.orders.map((order) => (
              <tr key ={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customer.customerName}</td>
                <td>{order.orderDate}</td>
                <td>{order.deliveryDate}</td>
                {order.orderDetails.map((orderDetail) =>(
                  <>
                  <td>{orderDetail.qty}</td>
                  <td>{orderDetail.seed.seedName}</td>
                  
                  </>
                )
                )}

                 <td>
                  <ButtonGroup>
                    <Link to = {`update/${order.orderId}`} className ="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon = {faEdit}/></Link>
                    <Link to = {`${order.orderId}`} className ="btn btn-sm btn-outline-primary" style = {{marginLeft:"10px"}}><FontAwesomeIcon icon = {faInfo}/></Link>
                    <button size = "sm" variant = "outline-primary" onClick= {this.deleteOrder.bind(this, order.orderId)} style = {{marginLeft:"10px"}}> <FontAwesomeIcon icon = {faTrash}/></button>
                    {/* <button size = "sm" variant = "outline-primary" onClick={() => { this.seedDetails(seed.seedingDensity, seed.seedPresoak, seed.blackoutTime, seed.harvestTime)}}><FontAwesomeIcon icon = {faInfo}/></button> */}
                  </ButtonGroup>
                </td>
              </tr>
            ))
          }
          </tbody>
             </Table>   
               </div>
                  )
                    }
  }