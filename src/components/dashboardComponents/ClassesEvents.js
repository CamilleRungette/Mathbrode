import React, {Component} from 'react';
import NavbarAdmin from './NavbarAdmin';
import FooterAdmin from './footerAdmin'
import { connect } from 'react-redux';
import {Card} from 'react-bootstrap';
import DateFormat from '../function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'
import { Redirect } from 'react-router-dom';


class ClassesEvents extends Component{
  constructor(){
    super();
    this.onDeleteEventClick = this.onDeleteEventClick.bind(this)
    this.onDeleteClassClick = this.onDeleteClassClick.bind(this)
    this.state={
      eventsList: [],
      classesList: [],
    }
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
    fetch(`http://localhost:3000/admins/classesevents`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      ctx.setState({classesList: data.allClasses, eventsList: data.allEvents})
    })  
  }

    render(){
      console.log(this.props.adminConnected);
      
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
                    <FontAwesomeIcon className={"fa-2x"} style={{marginBottom:"50%", cursor:"pointer"}} icon={faEdit} /> <br/>
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
                    <FontAwesomeIcon className={"fa-2x"} style={{marginBottom:"50%", cursor:"pointer"}} icon={faEdit} /> <br/>
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

