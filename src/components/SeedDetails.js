import { Component } from 'react';
import axios from 'axios';
import homepagepic2 from "../assets/homepagepicture2.jpeg";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

 class SeedDetails extends Component{

  constructor(){
    super();
    //state object stores property values that belong to the component
    this.state = {
          seed: {
            seedId:"",
            seedName: "",
            qty: "",
            seedingDensity: "",
            seedPresoak: "",
            blackoutTime: "",
            harvestTime: ""
          }
    };
  }
    
      componentDidMount(){
        const {seedId} = this.props.params;
        if(seedId){
        this.fetchSeedDetails(seedId);
        }
      };

    fetchSeedDetails = seedId => {
          axios
            .get(
              `http://localhost:8080/inventory/${seedId}`)
              .then(response => response.data)
              .then((data) => {
                this.setState({seed:data})
                console.log(data)
            });
        };
    
    
    render(){
      return (
        <div className = "container">
          <div class = "wrapper">
          <img
            className="d-block w-100"
            src={homepagepic2}
            alt="Orders"
          />
           <Card border="dark" style={{ width: '81rem' }}>
      <Card.Header as="h5" >Seed Details for {this.state.seed.seedName}</Card.Header>
      <Card.Body>
        {/* <Card.Title>Order Details for {this.state.orders.customer.customerName}</Card.Title> */}
        <Card.Text>
        <p>Seed ID: {this.state.seed.seedId}</p>
        <p>Seed Name: {this.state.seed.seedName}</p>
        <p>Seed Quantity: {this.state.seed.qty}</p>
        <p>Seeding Density: {this.state.seed.seedingDensity}</p>
        <p>Seed Presoak: {this.state.seed.seedPresoak.toString().toUpperCase()}</p>
        <p>Blackout Time: {this.state.seed.blackoutTime}</p>
        <p>Harvest Time: {this.state.seed.harvestTime}</p>
        </Card.Text>
        <Button variant="dark"  onClick={()=>window.open("/inventory", '_self')}>Back to Inventory</Button>
      </Card.Body>
    </Card>
        </div>
               </div>
                  )
                    }
}

export default withParams(SeedDetails);