import React, {Component} from 'react';
import NavbarAdmin from './NavbarAdmin';
import FooterAdmin from './footerAdmin'
import { connect } from 'react-redux';
import {Card, Modal, Form, Col, Row} from 'react-bootstrap';
import DateFormat from '../function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'
import { Redirect } from 'react-router-dom';
import ip from '../ip'
import {Button} from 'reactstrap'


let modalStyle={
  width:"50em",
  backgroundColor: "white",
  fontFamily: "Open Sans"
}


class ClassesEvents extends Component{
  constructor(){
    super();
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)  
    this.updateEvent = this.updateEvent.bind(this)
    this.onDeleteEventClick = this.onDeleteEventClick.bind(this)
    this.onDeleteClassClick = this.onDeleteClassClick.bind(this)
    this.state={
      eventsList: [], classesList: [],
      show: false,
      thisEvent: "", upEvAddress: "", upEvDate: "", upEvEnd: "", upEvStart: "", upEvLink: "", upEvName: "",
      thisClass: "", upClDesc: "", upClDur: "", upClPrice: "", upClTitle: "",
    }
  }

  handleClose(){
    this.setState({
      show: false, 
    })
  }

  updateEvent(id){
    this.setState({show: false})
    console.log(id);
    let ctx = this;
    fetch(`${ip}/admins/update-event`,{
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `id=${id}&address=${this.state.upEvAddress}&date=${this.state.upEvDate}&ending_time=${this.state.upEvEnd}&link=${this.state.upEvLink}&name=${this.state.upEvName}&starting_time=${this.state.upEvStart}`
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("DATAT", data);
      ctx.setState({eventsList: data.allEvents, thisEvent: "", upEvAddress: "", upEvDate: "", upEvEnd: "", upEvStart: "", upEvLink: "", upEvName: ""})
    })
    
  }

  handleShow(eventid, classid){
    this.setState({show:true})
    let ctx = this;
    fetch(`${ip}/admins/update-service?eventid=${eventid}&classid=${classid}`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      if (data.thisEvent){
        ctx.setState({thisEvent: data.thisEvent, thisClass: "", upEvAddress: data.thisEvent.address, upEvDate: data.thisEvent.date, upEvEnd: data.thisEvent.ending_time, upEvLink:data.thisEvent.link, upEvName: data.thisEvent.name, upEvStart: data.thisEvent.starting_time })
        console.log(ctx.state);
      } else if (data.thisClass){
        ctx.setState({thisClass: data.thisClass, thisEvent: ""})
        console.log(ctx.state);
      }
    })
  }


  onDeleteEventClick(id){
    let ctx = this;
    fetch(`${ip}/admins/delete-event`,{
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `id=${id}`
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("DATAT", data);
      
      ctx.setState({eventsList: data.allEvents})
    })
    console.log(id);
  }

  onDeleteClassClick(id){
    let ctx = this;
    fetch(`${ip}/admins/delete-class`,{
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `id=${id}`
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("DATATAT", data)
      ctx.setState({classesList: data.allClasses})
    })
  }


  componentDidMount(){
    let ctx = this;
    fetch(`${ip}/admins/classesevents`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      ctx.setState({classesList: data.allClasses, eventsList: data.allEvents})
    })  
  }

    render(){      
      if (this.props.adminConnected === false || this.props.adminConnected === undefined){
        return <Redirect to="/loginadmin" />
     }


    return(
      <div style={{fontFamily:"Raleway"}} className="mainBack">
      <NavbarAdmin/>
        <div class="dashboard-container">
        <Card className="col-8 mx-auto" style={{maxHeight:"60vh", overflow:"auto", marginTop:"10%"}} >
          <h2 style={{textAlign:"center", fontSize:"3em", marginTop:'1em'}}>Événements</h2>
          <div style={{height:"1em"}}></div>
          {this.state.eventsList.length === 0?(
            <div>
              <div style={{fontSize:'1.3em', textAlign:'center', marginTop:"2em"}} >Pas d'événements</div>
            </div>
          ):(
            <div>  
              {this.state.eventsList.map((event, i)=>(
                <div className="event-card">
                  
                  <div>
                    <p styl={{marginBottom:"50%"}}>{DateFormat(event.date)} </p>
                    <p>{event.starting_time} - {event.ending_time} </p> 
                  </div>
                  <div>
                    <p styl={{marginBottom:"50%"}}>{event.name}</p>
                    <p>{event.address}</p>
                  </div>
                  <img src={event.photo} alt={event.name} style={{width:"25%"}} />
                  <div>
                    <FontAwesomeIcon className={"fa-2x"} style={{marginBottom:"50%", cursor:"pointer"}}  onClick={() => this.handleShow(event._id, "")} icon={faEdit} /> <br/>
                    <FontAwesomeIcon className={"fa-2x"} style={{cursor:"pointer"}} icon={faTrashAlt} onClick={() => this.onDeleteEventClick(event._id)} />
                  </div>
                </div>
              ))}         
            </div>
          )}
            <div style={{height:"6em"}}></div>
            </Card>


          <Card className="col-8 mx-auto" style={{maxHeight:"60vh", overflow:"auto", marginTop:"10%", marginBottom:"10%"}} >
          <h2 style={{textAlign:"center", fontSize:"3em", marginTop:'1em', marginBottom: "2%"}}>Ateliers</h2>
          <div style={{height:"1em"}}></div>
          {this.state.classesList.length === 0?(
            <div>
              <div style={{fontSize:'1.3em', textAlign:'center', marginTop:"2em"}} >Pas d'ateliers</div>
            </div>
          ):(
            <div>  
              {this.state.classesList.map((classe, i)=>(
                <div className="event-card">
                  
                  <div style={{width:"7%"}}>
                    <p styl={{marginBottom:"50%"}}>{classe.duration} </p>
                    <p>{classe.price} € </p> 
                  </div>
                  <div style={{width:"58%"}}>
                    <p className="class-title">{classe.title}</p>
                    <p className="class-para">{classe.desc}</p>
                  </div>
                  <img src={classe.photo} alt={classe.title} style={{width:"25%"}} />
                  <div style={{width:"7%"}}>
                    <FontAwesomeIcon className={"fa-2x"} style={{marginBottom:"50%", cursor:"pointer"}} icon={faEdit} onClick={() => this.handleShow("", classe._id)} /> <br/>
                    <FontAwesomeIcon className={"fa-2x"} style={{cursor:"pointer"}} icon={faTrashAlt} onClick={() => this.onDeleteClassClick(classe._id)} />
                  </div>
                </div>
              ))}         
            </div>
          )}
            <div style={{height:"6em"}}></div>
            </Card>
        </div>
      <FooterAdmin />



      <Modal show={this.state.show} onHide={this.handleClose} className="col-lg-10" >
         <div style={modalStyle}>
           {this.state.thisEvent !== "" ?(
             <div>
              <Modal.Header closeButton>
                <Modal.Title>Modifier un événement</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                <Form.Group as={Row} style={{margin:"auto"}}>
                  <Col xs={6}>
                    <Form.Label>Nom de l'événement</Form.Label>
                    <Form.Control type="text" value={this.state.upEvName} onChange={(e)=> this.setState({upEvName: e.target.value})}/> 
                  </Col>
                  <Col xs={6}>
                    <Form.Label>Lien</Form.Label>
                    <Form.Control type="text" value={this.state.upEvLink} onChange={(e)=> this.setState({upEvLink: e.target.value})}  />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{margin:"auto"}}>
                  <Col xs={12}>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control type="text" value={this.state.upEvAddress} onChange={(e)=> this.setState({upEvAddress: e.target.value})}/> 
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{margin:"auto"}}>
                  <Col xs={4}>
                    <Form.Label>Date ({DateFormat(this.state.upEvDate)})</Form.Label>
                    <Form.Control type="date" value={this.state.upEvDate} onChange={(e)=> this.setState({upEvDate: e.target.value})}/> 
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Heure de début</Form.Label>
                    <Form.Control type="text" value={this.state.upEvStart} onChange={(e)=> this.setState({upEvStart: e.target.value})}  />
                  </Col>
                  <Col xs={4}>
                    <Form.Label>Heure de fin</Form.Label>
                    <Form.Control type="text" value={this.state.upEvEnd} onChange={(e)=> this.setState({upEvEnd: e.target.value})}  />
                  </Col>
                </Form.Group>                
                </Form>
                <Button style={{backgroundColor:"#1B263B", border:"none", marginTop:"3%", marginLeft:"47%"}} variant="secondary" onClick={()=> this.updateEvent(this.state.thisEvent._id)}>
                  Envoyer
                </Button>
              </Modal.Body>
              </div>
             ):(
               <div>
              <Modal.Header closeButton>
                <Modal.Title>Modifier un atelier</Modal.Title>
              </Modal.Header>
              <Form.Group as={Row} style={{margin:"auto"}}>
                  <Col xs={12}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control as="textarea" placeholder="Description " onChange={(e)=> this.setState({CreateItemDesc: e.target.value})}
                        value={this.state.CreateItemDesc} />
                  </Col>
                  </Form.Group>
            <Button style={{backgroundColor:"#1B263B", border:"none"}} variant="secondary" onClick={this.updateService}>
            Envoyer
          </Button>
          </div>
)}
           
         

         </div>
       </Modal>




      </div>
    )
  }
}

function mapStatetoProps(state){
  console.log("======>", state)
  return {adminConnected: state.admin.isAdminExist}
}


export default connect(
  mapStatetoProps,
  null
  )(ClassesEvents);

