import { Component } from 'react';
import axios from 'axios';
import homepagepic3 from "../assets/homepagepicture3.jpeg";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

 class DetailOrders extends Component{

  constructor(){
    super();
    //state object stores property values that belong to the component
    this.state = {
      orders:{
          orderId: '',
          orderDate: '',
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
  }
    
      componentDidMount(){
        const {orderId} = this.props.params;
        if(orderId){
        this.fetchDetailOrders(orderId);
        }
      };

    fetchDetailOrders = orderId => {
          axios
            .get(
              `http://localhost:8080/orders/${orderId}`)
              .then(response => response.data)
              .then((data) => {
                this.setState({orders:data})
                console.log(data)
            });
        };
    
    
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
            <h2 class = "header" className='text-center'> Order Details</h2>
            </div>
          </div>
          <div>
            <p>Order ID: {this.state.orders.orderId}</p>
            <p>Customer Name: {this.state.orders.customer.customerName}</p>
            <p>Order Date: {this.state.orders.orderDate}</p>
            <p>Delivery Date: {this.state.orders.deliveryDate}</p>
            <p>Order Quantity: {this.state.orders.orderDetails[0].qty}</p>
            <p>Seed Name: {this.state.orders.orderDetails[0].seed.seedName}</p>
        </div>
               </div>
                  )
                    }
}

export default withParams(DetailOrders);