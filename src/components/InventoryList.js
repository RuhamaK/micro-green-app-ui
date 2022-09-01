import { Component } from 'react';
import {Table, Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import homepagepic2 from "../assets/homepagepicture2.jpeg";

export default class InventoryList extends Component{

  constructor(props){
    super(props);
    this.state = {
      inventory: []
    };
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount(){
    this.getAllInventory();
    };
  

  getAllInventory(){
    axios.get("http://localhost:8080/inventory")
    .then(response => response.data)
    .then((data) => {
      this.setState({inventory:data});
  });
}

  updateQuantity(seedId) {


    let quantity = window.prompt("Please input seed quantity change", 0);
    if (quantity == null || quantity == "") {
      alert("you have not changed the quantity");
    } else {
      let quantityNum = Number(quantity);
      axios.post(`http://localhost:8080/inventory/update/${seedId}`, {qty: quantityNum}).then(response => response.data)
      .then(response =>  {
          this.setState({
          qty: response.data
        });
      });  
      window.location.reload();
    }
  }

  deleteSeed(seedId) {
    let txt = ""
    if(window.confirm("Are you sure you would like to delete the seed?")) {
      axios.delete(`http://localhost:8080/inventory/delete/${seedId}`).then(response => response.data)
      .then((data) => {
        this.setState({inventory:data});
      })
      txt = "You have deleted the seed";
      window.location.reload();
    } else {
      txt = "You have not deleted the seed";
    }
    alert(txt);
  }


    render(){
      return (
        <div className = "container">
          <div class = "wrapper">
          <img
            className="d-block w-100"
            src={homepagepic2}
            alt="Orders"
          />
          </div>
        <div className = "container">
          <h2 className='text-center'>Inventory</h2>
          <Link to = {"/inventory/add"}><Button variant="dark" class="item" id="addInventoryBtn"><FontAwesomeIcon icon = {faPlusSquare}/>ADD NEW SEED</Button></Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Seed Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.inventory.length === 0 ? 
            <tr align = "center">
              <td colSpan="6"> Inventory</td>
            </tr>:
            this.state.inventory.map((seed) => (
              <tr key ={seed.seedId}>
                <td>{seed.seedName}</td>
                <td>{seed.qty}</td>

                 <td>
                  <ButtonGroup>
                  <button size = "sm" variant = "outline-primary" onClick={() => { this.updateQuantity(seed.seedId)}}><FontAwesomeIcon icon = {faEdit}/></button>
                  <Link to = {`${seed.seedId}`} className ="btn btn-sm btn-outline-primary" style = {{marginLeft:"10px"}}><FontAwesomeIcon icon = {faInfo}/></Link>
                  <button size = "sm" variant = "outline-primary" style = {{marginLeft:"10px"}} onClick={() => { this.deleteSeed(seed.seedId)}}> <FontAwesomeIcon icon = {faTrash}/></button>
                  </ButtonGroup>
                </td>
              </tr>
            ))
          }
          </tbody>
             </Table>   
               </div>
               </div>
                  )
                    }
  }