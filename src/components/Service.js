import React, {Component} from 'react';
import { Row, Col, Card, CardText, CardBody,
  CardTitle, Button, CardLink, Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut, faCalendarAlt, faHandshake } from '@fortawesome/free-solid-svg-icons'
import {Modal, Form} from 'react-bootstrap'
import '../App.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import ip from './ip'


let modalStyle={
  width:"50em",
  backgroundColor: "white",
  fontFamily: "Raleway"
}

class Service extends Component{
constructor(){
  super();
  this.handleClose = this.handleClose.bind(this)
  this.handleShow = this.handleShow.bind(this)
  this.sendMessage = this.sendMessage.bind(this)
  this.onDrop = this.onDrop.bind(this);
  this.uploadMessageImage = this.uploadMessageImage.bind(this);
  this.state={
    show: false,
    SendMessageContent: '',
    SendMessageEmail: '',
    SendMessagePhoto: '',
    SendMessageName:'', 
  }
}

onDrop(picture) {
  this.setState({
      CreateItemPhoto: this.state.CreateItemPhoto.concat(picture),
  });
}

  sendMessage(){
    this.setState({show:false});
    fetch(`${ip}/users/create-message`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `object=Projet_personnalisé&content=${this.state.SendMessageContent}&sender_email=${this.state.SendMessageEmail}&photo=${this.state.SendMessagePhoto}&sender_name=${this.state.SendMessageName}`
    })
  }

  handleClose(){
    this.setState({show: false})
  }

  handleShow(){
    this.setState({show:true})
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
    
    this.setState({SendMessagePhoto: file.secure_url})
    this.setState({loading: false})
  }

  render(){
    if (this.props.user){
      console.log("voila", this.props.user)
    }

    return(
    <div style={{fontFamily: 'Raleway', marginBottom:"10em"}}>
        <h1 style={{fontSize:"3.5em", textAlign:"center"}} > Mes Prestations</h1>

        <div style={{height:"10em"}}></div>



        <Row className="col-10 mx-auto" style={{ fontFamily:"Raleway", display:"flex", paddingLeft:'5%'}}>
          <Col style={{display:"flex",marginBottom:"3em"}}>
            <Card style={{cursor:"pointer", backgroundColor:"#EDF3F7", width:"20em", height:"15em", padding:"1em", border:"none"}}>
              <CardBody >
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"0.6em"}} >
                <Link to="/classes" ><CardTitle style={{ fontSize:"1.2em", color:"black"}} ><strong>Atelier d'initiation</strong> </CardTitle></Link>
                <FontAwesomeIcon icon={faCalendarAlt} className="fa-2x"/>
                </div>
                  <CardText>Je vous propose de vous initier aux bases de la broderie pendant un cours de 2h. Réservez-votre créneau</CardText>
                </CardBody>
            </Card>
          </Col>

          <Col style={{display:"flex", marginBottom:"3em"}}>
            <Card style={{cursor:"pointer", backgroundColor:"#EDF3F7", width:"20em", height:"15em", padding:"1em", border:"none"}}>
              <CardBody onClick={this.handleShow} >
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"0.6em"}} >
                <CardLink style={{ fontSize:"1.2em"}} ><strong>Projets personnalisés</strong> </CardLink>
                <FontAwesomeIcon icon={faCut} className={"fa-2x"}/>
                </div>
                  <CardText>Une idée de modèle ? Vous pouvez me contacter pour des projets personnels. Dessins, prénom, couronnes .. Demandez-moi</CardText>
                </CardBody>
            </Card>
          </Col>

          <Col style={{display:"flex", marginBottom:"2em"}}>
            <Card style={{cursor:"pointer", backgroundColor:"#EDF3F7", width:"20em", height:"15em", padding:"1em", border:"none"}}>
              <CardBody >
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"0.6em"}} >
                <Link to="/events"> <CardTitle style={{ color: "black", fontSize:"1.2em"}} ><strong>Rencontrez-moi</strong> </CardTitle> </Link>
                <FontAwesomeIcon icon={faHandshake} className={"fa-2x"}/>
                </div>
                 <CardText>Venez me rencontrer directement sur les marchés auxquels je participe régulièrement.</CardText>
                </CardBody>
            </Card>
          </Col>

        </Row>

 
     
       
       <Modal show={this.state.show} onHide={this.handleClose} className="col-lg-10" >
         <div style={modalStyle}>
          <Modal.Header closeButton>
            <Modal.Title>Message pour projet personnalisé</Modal.Title>
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
                    <Input type="text" placeholder="Nom" value={this.props.user.first_name} />
                  )}
                </Form.Group>
              </Col>

              <Col>
              <Form.Group>
                {this.props.user == null ? (
                  <Form.Control type="email" placeholder="Email" onChange={(e)=> this.setState({SendMessageEmail: e.target.value})}
                  value={this.state.SendMessageEmail} />
                ):(
                  <Input type="email" placeholder="Email" value={this.props.user.email} />
                )}
              </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicPassword">
              <Form.Control as="textarea" placeholder="Message" onChange={(e)=> this.setState({SendMessageContent: e.target.value})} 
              value={this.state.SendMessageContent} />
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPicture">
              <Form.Label column sm={2}>Photo</Form.Label>
                <Col sm={10}>
                <input type="file"
                placeholder=""
                onChange={this.uploadMessageImage} 
                />
                  </Col>  
                {this.state.loading ? (
                  <h6> Chargement ...</h6>
                ) : (
                 <img src={this.state.SendMessagePhoto} alt="item chosen photo" style={{width:"10em", marginLeft:'8em'}} />
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
    )
  }
}


function mapStatetoProps(state){
  return  {user: state.user.userSigned}
}

export default connect(
  mapStatetoProps,
  null
)(Service)