import React, { Component} from "react";
import Select from "react-select";

import axios from "axios";

class OrdersN extends Component{

  constructor(props){
    super(props);
    this.state = {
        customerOptions: [],
        customerId: "",
        customerName:''
    };
  }


  async getCustomerOptions(){
    const res = await axios.get(`http://localhost:8080/customers`)
    const data = res.data

    const options = data.map(d =>({
        "value": d.customerName,
        "label": d.customerName
    }))
    this.setState({customerOptions: options})
  }


  componentDidMount(){
    this.getCustomerOptions()

}

handleChange(e){
    this.setState({customerName:e.value, customerName:e.label})
   }


  render(){
    console.log(this.state.customerOptions)
   
    return (
        <div>
          <Select options={this.state.customerOptions} onChange={this.handleChange.bind(this)}/>
          {/* <p>You have selected <strong>{this.state.customerName}</strong> whose id is <strong>{this.state.customerId}</strong></p> */}
        </div>
      )
}
}


export default OrdersN;

