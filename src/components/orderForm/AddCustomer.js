// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// // import csc from 'country-state-city';
// import axios from 'axios';
// // import { BASE_API_URL } from '../utils/constants';

// const AddCustomer = (props) => {
//   const [customers, setCustomers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [selectedCustomer, setSelectedCustomer] = useState('');

// //   useEffect(() => {
// //    const getCustomers = async () => {
// //      try {
// //        const result = await axios.get(`http://localhost:8080/customers`);
// //        console.log(result);
// //      } catch (error) {}
// //     };

// //     getCustomers();
// //   }, []);

//   useEffect(() => {
//     const getCustomers = async () => {
//       try {
//         setIsLoading(true);
//         const result = await axios.get(`http://localhost:8080/customers`);
//         let allCustomers = [];
//         allCustomers = result?.map(({ customerId, customerName }) => ({
//           customerId,
//           customerName
//         }));
//         const [{ customerId: firstCustomer } = {}] = allCustomers;
//         setCustomers(allCustomers);
//         setSelectedCustomer(firstCustomer);
//         setIsLoading(false);
//       } catch (error) {
//         setCustomers([]);
//         setIsLoading(false);
//       }
//     };
  
//     getCustomers();
//   }, []);


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Form className="input-form" onSubmit={handleSubmit}>
//       <div className="col-md-6 offset-md-3">
//         <Form.Group controlId="customer">
//           {isLoading && (
//             <p className="loading">Loading customers. Please wait...</p>
//           )}
//           <Form.Label>Customer Name</Form.Label>
//           <Form.Control
//             as="select"
//             name="customer"
//             value={selectedCustomer}
//             onChange={(event) => setSelectedCustomer(event.target.value)}
//           >
//             {customers.map(({ customerId, customerName }) => (
//               <option value={customerId} key={customerId}>
//                 {customerName}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//       </div>
//     </Form>
//   );
//             }
            
// export default AddCustomer;

import React, {Component } from 'react'
import axios from 'axios';

export class AddCustomer extends Component {
constructor(props) {
super(props)
this.state = {
customerId: '',
CustomerData: []
}
}
componentDidMount() {
axios.get(`http://localhost:8080/customers`).then(response => {
console.log(response.data);
this.setState({
CustomerData: response.data
});
});
}
ChangeteState = (e) => {
this.setState({
customerId: e.target.value
});
}

render() {  
return (  
<div>  
<div class="row" className="hdr">  
<div class="col-sm-12 btn btn-info">  
 Customer Name
</div>  
</div>  
<div className="form-group dropdn">  
<select className="form-control" name="customer" value={this.state.customerId} onChange={this.ChangeteState}  >  
<option>Select Customer</option>  
{this.state.CustomerData.map((e, key) => {  
return <option key={key} value={e.customerId}>{e.customerName}</option>;  
})}  
</select>    
</div>  
</div>  
)  
}  
}  
export default AddCustomer;  

