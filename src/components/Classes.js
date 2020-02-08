import React, { Component } from 'react';
import Footer from './Footer'
import Navbar from './Navbar'
import {Button, Input, Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';
import {Modal, Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import ip from './ip'


let modalStyle={
  width:"50em",
  backgroundColor: "white",
  fontFamily: "Raleway",
}


class Classes extends Component{
  constructor(){
    super();
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.sendMessage = this.sendMessage.bind(this)  
    this.uploadMessageImage = this.uploadMessageImage.bind(this);

    this.state = {
      workshops:[],
      show: false,
      SendMessageContent: '',
      SendMessageEmail: '',
      SendMessagePhoto: '', 
      SendMessageName:'', 
      loading: '',
    }
  }

  handleClose(){
    this.setState({show: false})
  }

  handleShow(){
    this.setState({show:true})
  }

  sendMessage(){
    this.setState({show:false});
    fetch(`${ip}/users/create-message`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `object=Atelier&content=${this.state.SendMessageContent}&sender_email=${this.state.SendMessageEmail}&photo=${this.state.SendMessagePhoto}&sender_name=${this.state.SendMessageName}`
    })
  }

  async uploadMessageImage(e){
    const files = e.target.files
    const data= new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'camille')
    this.setState({loading: true})
    const res = await fetch('https://api.cloudinary.com/v1_1/dduugb9jy/image/upload', {
        method: 'POST',
        body: data
      })
    const file = await res.json()
    console.log("==================>", file.secure_url)
    
    this.setState({SendMessagePhoto: file.secure_url})
    this.setState({loading: false})
  }


  componentDidMount(){
    let ctx = this
    fetch(`${ip}/workshops`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({workshops: data.allWorkshops})
      console.log("THE STATE", ctx.state.workshops)
    })
    .catch(function(error){
      console.log("FAILED")
    });

  } 

  render(){
    return(
    <div style={{fontFamily:"Raleway"}}>
      <Navbar/>
      <div style={{height:"8em"}}></div>
      <Col sm={11} style={{margin:"auto"}}>
      <h1 style={{textAlign:"center", fontSize:"3.5em", marginTop:"0.5em"}}>Les Ateliers</h1>
      <div style={{height:"8em"}}></div>
      <div style={{margin:"auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
      {this.state.workshops.map((workshop, i) =>(
        <div>
          <Card style={{maxWidth:'33em', marginBottom:'3em'}}>
          <CardImg variant="top" style={{height:"18em"}} src={workshop.photo}/>
          <CardBody>
            <CardTitle style={{fontSize:"1.3em", textAlign:"center"}}> <strong> {workshop.title} </strong></CardTitle>
            <br/>
            <CardText style={{fontSize:"1.1em", width:'95%', margin:"auto", textAlign:'justify'}}>
              {workshop.desc}
            </CardText>
          </CardBody>
          <CardBody style={{display:"flex", justifyContent:"space-around", fontSize:'1.2em'}}>
              <CardText > <strong>Prix : </strong> {workshop.price} €</CardText>
              <CardText > <strong>Durée: </strong> {workshop.duration}</CardText>
          </CardBody>
          <ListGroup>
            <ListGroupItem style={{textAlign:"center", fontSize:'1.2em', fontWeight:"bold", cursor:"pointer"}}  onClick={this.handleShow} >Réserver un créneau </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
       ))} 
       </div>
       </Col>
       <div style={{height:"8em"}}></div>

      <Footer />

      <Modal show={this.state.show} onHide={this.handleClose} className="col-lg-10" >
         <div style={modalStyle}>
          <Modal.Header closeButton>
            <Modal.Title>Message pour réservation d'atelier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Row>
            <Col>
              <Form.Group>
                {this.props.user == null?(
                  <Form.Control type="text" placeholder="Nom" onChange={(e)=> this.setState({SendMessageName: e.target.value})}
                  value={this.state.SendMessageName} />
                ):(
                  <Input type="text" placeholder="Nom" value={this.props.user.first_name}/>
                  )}
              </Form.Group>
            </Col>

            <Col>
            <Form.Group>
              {this.props.user == null ? (
                <Form.Control type="email" placeholder="Email" onChange={(e)=> this.setState({SendMessageEmail: e.target.value})}
                value={this.state.SendMessageEmail} />
              ):(
                <Input type="Email"  placeholder="Email" value={this.props.user.email} />

              )}
            </Form.Group>
            </Col>
            </Row>

            <Form.Group controlId="formBasicPassword">
              <Form.Control as="textarea" placeholder="Message" onChange={(e)=> this.setState({SendMessageContent: e.target.value})} 
              value={this.state.SendMessageContent} />
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column sm={2}>Photo</Form.Label>
                <Col sm={10}>
                <input type="file"
                placeholder="upload an image"
                onChange={this.uploadMessageImage} 
                />
                  </Col>  
                {this.state.loading ? (
                  <h6> Chargement ...</h6>
                ) : (
                 <img src={this.state.SendMessagePhoto} alt=" " style={{width:"10em", marginLeft:'8em'}} />
                )}
            </Form.Group>
          </Form>
          <Button style={{backgroundColor:"#1B263B", border:"none"}} variant="secondary" onClick={this.sendMessage}> 
              Envoyer
            </Button>
          </Modal.Body>
         </div>
       </Modal>


      
    </div>
    )}
}

function mapStatetoProps(state){
  console.log(state)
  return  {user: state.user.userSigned}
}

export default connect(
  mapStatetoProps,
  null
)(Classes);
