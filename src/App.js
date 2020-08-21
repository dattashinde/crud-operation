import React, { Component } from 'react';
import { Button, Modal,Form,Col,Row,Table} from 'react-bootstrap';
import  './App.css'
import Create from './Create'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
class App extends Component {
    constructor(){
        super();
            this.onChangePassagerName = this.onChangePassagerName.bind(this);
            this.onChangeTicketId = this.onChangeTicketId.bind(this);
            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangeDestStation = this.onChangeDestStation.bind(this);
            this.onChangeSourceStation = this.onChangeSourceStation.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

                this.state = {
                    users:null,
                    show:false,
                    ticketId:"",
                    passengerName:"",
                    sourceStation:"",
                    destStation:"",
                    email:"",
                }

    }
   

                handleClose = () => {
                    this.setState({show:false})
                }

                onChangePassagerName (e) {
                    this.setState({ passengerName: e.target.value })
                }
                onChangeTicketId (e) {
                    this.setState({ ticketId: e.target.value })
                }
                
                 onChangeSourceStation (e) {
                    this.setState({ sourceStation: e.target.value })
                }
                 onChangeDestStation (e) {
                    this.setState({ destStation: e.target.value })
                }
                onChangeEmail (e) {
                    this.setState({ email: e.target.value })
                }


                deleteItemHandler=id=>e=>{ 
                    e.preventDefault();
                    axios.delete('http://localhost:8081/api/tickets/delete/ticket/'+id) 
                    .then(res => {
                        const users = res.data;
                        console.log(res.data)
                        this.setState({users:users})
                    })
                }

                onSubmit(e) {
                    const userObject = {
                        ticketId:this.state.ticketId,
                        passengerName: this.state.passengerName,
                        sourceStation:this.state.sourceStation,
                        destStation:this.state.destStation,
                        email:this.state.email,
                    };

                    axios.put('http://localhost:8081/api/tickets/update/'+userObject.ticketId, userObject)
                        .then((res) => {
                            console.log(res.data)
                        }).catch((error) => {
                            console.log(error)
                        });

                }
   
                handleShow(id,e) {
                    e.preventDefault();
                        this.setState({show:true,})
                            axios.get('http://localhost:8081/api/tickets/ticket/'+id)
                        .then(response => {
               
                    this.setState({
                            show:true,
                            ticketId:response.data.ticketId,
                            passengerName:response.data.passengerName,
                            sourceStation:response.data.sourceStation,
                            destStation:response.data.destStation,
                            email:response.data.email
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }

                componentDidMount(){
                    fetch('http://localhost:8081/api/tickets/ticket/alltickets').then((resp)=>{
                        resp.json().then((result)=>{
                                        
                            this.setState({
                                users:result,
                            })
                        })
                    })

                }

    render(){
        return(

            <div>
             <Create/>
           <div className="App">
           <Table striped bordered hover>
                    <thead>
                        <tr> <th>TicketId</th>
                            <th>PassengerName</th>
                            <th>SourceStation</th>
                            <th>DestStation</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>{
                    this.state.users ?

                    this.state.users.map((item,index)=>
                    <tbody>
                            <tr>
                                <td>{item.ticketId}</td>
                                <td>{item.passengerName}</td>
                                <td>{item.sourceStation}</td>
                                <td>{item.destStation}</td>
                                <td>{item.email}</td>
                                <td><FontAwesomeIcon icon={faEdit} onClick={this.handleShow.bind(this, item.ticketId)}/><FontAwesomeIcon icon={faTrash} className="faTrash" onClick={this.deleteItemHandler(item.ticketId)}/></td>
                            </tr>
                    </tbody>
       )
                    :
                    null
                }
                 </Table>
                 <Modal show={this.state.show} onHide={this.handleClose} className="custom-modal-style">
                    <Form className="form" onSubmit={this.onSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalTicketId">
                            <Form.Label column sm={4}>
                                TicketId
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" placeholder="TicketId"   name="ticketId"
                            value={this.state.ticketId} onChange={this.onChangeTicketId}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassagerName">
                            <Form.Label column sm={4}>
                                PassagerName
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" placeholder="PassagerName"   name="passengerName"
                            value={this.state.passengerName} onChange={this.onChangePassagerName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalSourceStation">
                            <Form.Label column sm={4}>
                              SourceStation
                            </Form.Label>
                            <Col sm={8}>
                              <Form.Control type="text" placeholder="SourceStation" name="sourceStation"
                                value={this.state.sourceStation} onChange={this.onChangeSourceStation}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalDestStation">
                            <Form.Label column sm={4}>
                                DestStation
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control type="text" placeholder="DestStation" name="destStation"
                          value={this.state.destStation} onChange={this.onChangeDestStation}/>
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                Email
                            </Form.Label>
                        <Col sm={8}>
                          <Form.Control type="email" placeholder="Email" name="email"
                           value={this.state.email} onChange={this.onChangeEmail}/>
                        </Col>
                        <Modal.Footer>
                              <Button variant="secondary" onClick={this.handleClose}>
                                Close
                              </Button>
                              <Button variant="primary"  type="submit" onClick={this.handleClose}>
                                Save 
                              </Button>
                        </Modal.Footer>
                        </Form.Group>

                </Form>
        
            </Modal>
                 </div>
            </div>
        )
    }
}
   
export default App;
