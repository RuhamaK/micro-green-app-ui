import { Component } from "react";
import {Card, Form, Button, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import homepagepic2 from "../assets/homepagepicture2.jpeg";

export default class Inventory extends Component{

  constructor(props){
    super(props);
    //state object stores property values that belong to the component
    this.state = this.initialState;
    this.inventoryChange = this.inventoryChange.bind(this);
    this.submitInventory = this.submitInventory.bind(this);
  }

  initialState = {
    seedName: '',  qty:0, seedPresoak:false, seedingDensity:0, blackoutTime:0, harvestTime:0
  }

  resetInventory = ()=>{
    this.setState(()=>this.initialState);
  }

  submitInventory = event => {
    // alert('Seed Name: '+this.state.seedName+', Quantity: '+this.state.qty'');
    event.preventDefault();

    const inventory = {
      seedName: this.state.seedName,
      qty: this.state.qty,
      seedingDensity: this.state.seedingDensity,
      seedPresoak: this.state.seedPresoak,
      blackoutTime: this.state.blackoutTime,
      harvestTime: this.state.harvestTime
    };

    axios.post("http://localhost:8080/inventory/add", inventory)
    .then(response => {
      if(response.data != null){
        this.setState(this.initialState);
        alert("Seed saved successfully");
      }
    });
  }


  inventoryChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }
  //add new seed form
  render(){
    const {seedName, qty, seedingDensity, seedPresoak, blackoutTime, harvestTime} = this.state;

    return (
      <div className = "container">
          <div class = "wrapper">
          <img
            className="d-block w-100"
            src={homepagepic2}
            alt="Orders"
          />
          </div>
      <Card className="border border-dark formcard">
        <Card.Header as="h5">Add New Seed</Card.Header>
        <Form onReset ={this.resetInventory} onSubmit={this.submitInventory} id = "inventoryFormId">
          <Card.Body>
    <Form.Group as = {Col}>
    <Form.Label>Seed Name</Form.Label>
    <Form.Control required autoComplete="off"
    type = "text" name ="seedName"
    placeholder="Enter Seed Name"
    value = {seedName}
    onChange={this.inventoryChange}/>
  </Form.Group>  
  <Form.Group as = {Col}>
    <Form.Label>Quantity</Form.Label>
    <Form.Control required autoComplete="off"
     type = "number" name = "qty"
    placeholder="Enter Quantity"
    value = {qty}
    onChange={this.inventoryChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Seeding Density (Number per Tray)</Form.Label>
    <Form.Control required autoComplete="off"
     type = "number" name = "seedingDensity"
    placeholder="Enter Seeding Density"
    value = {seedingDensity}
    onChange={this.inventoryChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Seed Presoak</Form.Label>
    <Form.Check
     type = "radio" label="true" name = "seedPresoak"
    value = {true}
    onChange={this.inventoryChange}/>
    <Form.Check
     type = "radio" label="false" name = "seedPresoak"
    value = {false}
    onChange={this.inventoryChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Blackout Time (Days)</Form.Label>
    <Form.Control required autoComplete="off"
     type = "number" name = "blackoutTime"
    placeholder="Enter Blackout Time"
    value = {blackoutTime}
    onChange={this.inventoryChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Harvest Time (Days)</Form.Label>
    <Form.Control required autoComplete="off"
     type = "number" name = "harvestTime"
    placeholder="Enter Harvest Time"
    value = {harvestTime}
    onChange={this.inventoryChange}/>
  </Form.Group>
  </Card.Body>
<Card.Footer>
  <Button  variant = "success" type="submit">
    <FontAwesomeIcon icon = {faSave}/>
    Submit
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









