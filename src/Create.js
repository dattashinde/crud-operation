import React, { useState } from 'react'
import { Button, Modal,Form,Col,Row,} from 'react-bootstrap';
import  './App.css';
import axios from 'axios';

function Create() {
  const [show, setShow] = useState(false);
  const initialInputState = { passengerName: "",sourceStation:"",destStation:"",email:"",};
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const {passengerName,sourceStation,email,destStation} = eachEntry;
  const handleInputChange = e => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
        axios.post('http://localhost:8081/api/tickets/create', eachEntry)
          .then(function (response) {
              console.log(response)
          })
          .catch(function (error) {
              console.log(error)
          }) 
    }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="create">
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose} className="custom-modal-style">
        <Form className="form" onSubmit={handleSubmit}>
  <Form.Group as={Row} controlId="formHorizontalPassagerName">
    <Form.Label column sm={4}>
      PassagerName
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="text" placeholder="PassagerName"   name="passengerName"
        value={passengerName} onChange={handleInputChange}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalSourceStation">
    <Form.Label column sm={4}>
      SourceStation
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="text" placeholder="SourceStation" name="sourceStation"
        value={sourceStation} onChange={handleInputChange}/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalDestStation">
    <Form.Label column sm={4}>
      DestStation
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="text" placeholder="DestStation" name="destStation"
      value={destStation} onChange={handleInputChange}/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={4}>
      Email
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="email" placeholder="Email" name="email"
       value={email} onChange={handleInputChange}/>
    </Col>
  </Form.Group>

  <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Save 
          </Button>
  </Modal.Footer>

</Form>
        
      </Modal>
    </div>
  );
}

export default Create;