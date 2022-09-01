import React, { Component} from "react";
import {Card, Form, Button, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faSave } from "@fortawesome/free-solid-svg-icons";
import homepagepic3 from "../assets/homepagepicture3.jpeg";
import { useParams } from "react-router-dom";

import axios from "axios";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Orders extends Component{

  constructor(props){
    super(props);
    console.log(props);
    //state object stores property values that belong to the component
    this.state = this.initialState;
    this.orderChange = this.orderChange.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }


  initialState = {
    CustomerData: [],
    TrayData:[],
    SeedData:[],
    order:{
    orderId: '',
    orderDate: new Date().toISOString().split('T', 1).toString(),
    deliveryDate: '',
    orderDetails: [ 
      {
      qty: "",
    seed: {
      seedName: ""
    },
    tray:{
      trayType:""
    }
      }
    ],
    customer:{
      customerName:''
    }
    }
    };
  
    componentDidMount(){
        const {orderId} = this.props.params;
        if(orderId){
          this.fetchData(orderId)
        }
      
    

    // componentDidMount() {
      axios.get(`http://localhost:8080/customers`).then(response => {
      console.log(response.data);
      this.setState({
      CustomerData: response.data
      });
      });

      axios.get(`http://localhost:8080/trays`).then(response => {
      console.log(response.data);
      this.setState({
      TrayData: response.data
      });
      });

      axios.get(`http://localhost:8080/seeds`).then(response => {
        console.log(response.data);
        this.setState({
        SeedData: response.data
        });
        });
      }

    fetchData = orderId =>{
      axios.get(`http://localhost:8080/orders/${orderId}`)
      .then(response =>{
        if (response.data!=null){
            console.log(response.data)
          this.setState({
            orderId: response.data.orderId,
            customerName: response.data.customer.customerName,
            orderDate: response.data.orderDate,
            deliveryDate: response.data.deliveryDate,
            qty: response.data.orderDetails[0].qty,
            seedName: response.data.orderDetails[0].seed.seedName,
            trayType:response.data.orderDetails[0].tray.trayType
          });
        }
      }).catch((error)=>{
        console.log("Error:" +error);
      });
    }
    

  resetOrder = ()=>{
    this.setState(()=>this.initialState);
  };

  updateOrder = event => {
    event.preventDefault();

    const {orderId} = this.props.params;
    const order = {
      orderId:this.state.orderId,
      orderDate: this.state.orderDate,
      deliveryDate: this.state.deliveryDate,
      customer:{
      customerName: this.state.customerName
      },
      orderDetails:[
        {
            qty: this.state.qty,
            seed:{
                seedName: this.state.seedName
            },
            tray:{
                trayType:this.state.trayType
            }
        }
      ]
          }         

    axios.put(`http://localhost:8080/orders/update/${orderId}`, order)
    .then(response => {
      if(response.data != null){
        alert("Order updated successfully");
        // window.location.replace("http://localhost:3000/orders");
      }
  })
}


  submitOrder = event => {
    event.preventDefault();

    const order = {
      orderDate: this.state.orderDate,
      deliveryDate: this.state.deliveryDate,
      customer:{
        customerName:this.state.customerName
      },
      orderDetails: 
      [
        {
          qty: this.state.qty,
          seed:
          {
            seedName: this.state.seedName
          },
          tray:
          {
            trayType:this.state.trayType
          }
        }      
        ]
    };

    axios.post("http://localhost:8080/orders/add", order)
    .then(response => {
      if(response.data != null){
        this.setState(this.initialState);
        alert("Order saved successfully");
        // window.location.replace("http://localhost:3000/orders");
      }
    }).catch(err => {
      if(err.response){
        alert(err.response.data.message);
      }    
    });
  }


  orderChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }


  //add new order form
  render(){
    const {customerName, seedName, trayType, qty, orderDate, deliveryDate} = this.state;

    return (
      <div className = "container">
      <div class = "wrapper">
      <img
        className="d-block w-100"
        src={homepagepic3}
        alt="Orders"
      />
      </div>
      <Card className="border border-dark formcard">
        <Card.Header as="h5">{this.state.orderId ? "Update Order" : "Add New Order"}</Card.Header>
        <Form onReset ={this.resetOrder} onSubmit={this.state.orderId ? this.updateOrder :this.submitOrder} id = "orderFormId">
          <Card.Body>
    <Form.Group as = {Col}>
    <div>  
    <div class="row" className="hdr">  
    <div as ="h5">Customer Name</div> 
    </div>  
    <div className="form-group dropdn">  
    <select className="form-control" name="customerName" value={customerName} onChange={this.orderChange}  >  
    <option>Select Customer</option>  
    {this.state.CustomerData.map((e, key) => {  
    return <option key={key} value={e.customerName}>{e.customerName}</option>;  
    })}  
    </select>    
    </div>  
    </div>  
  </Form.Group>  
  <Form.Group as = {Col}>
  <div>  
    <div class="row" className="hdr">  
    <div >Seed Name</div> 
    </div>  
    <div className="form-group dropdn">  
    <select className="form-control" name="seedName" value={seedName} onChange={this.orderChange}  >  
    <option>Select Seed</option>  
    {this.state.SeedData.map((e, key) => {  
    return <option key={key} value={e.seedName}>{e.seedName}</option>;  
    })}  
    </select>    
    </div>  
    </div>  
  </Form.Group>
  <Form.Group as = {Col}>
  <div>  
<div class="row" className="hdr">  
<div >Tray Size</div> 
</div>  
<div className="form-group dropdn">  
<select className="form-control" name="trayType" value={trayType} onChange={this.orderChange}  >  
<option>Select Tray Size</option>  
{this.state.TrayData.map((e, key) => {  
return <option key={key} value={e.trayType}>{e.trayType}</option>;  
})}  
</select>    
</div>  
</div>  
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Order Quantity</Form.Label>
    <Form.Control required autoComplete="off"
     type = "number" name = "qty"
    placeholder="Enter Order Quantity"
    value = {qty}
    onChange={this.orderChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Order Date</Form.Label>
    <Form.Control required autoComplete="off"
    type = "date" name = "orderDate"
    placeholder="YYYY-MM-DD"
    value = {orderDate}
    onChange={this.orderChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Delivery Date</Form.Label>
    <Form.Control required autoComplete="off"
    type = "date" name = "deliveryDate"
    placeholder="YYYY-MM-DD"
    value = {deliveryDate}
    onChange={this.orderChange}/>
  </Form.Group>
  </Card.Body>
<Card.Footer>
  <Button  variant = "success" type="submit">
    <FontAwesomeIcon icon = {faSave}/>
   {this.state.orderId ? "Update" : "Save"}
  </Button>{' '}
  <Button  variant = "info" type="reset">
    <FontAwesomeIcon icon = {faUndo}/>
    Reset
  </Button>
  </Card.Footer>
  </Form>
  </Card>
  </div>
         ) 
}
}


export default withParams(Orders);