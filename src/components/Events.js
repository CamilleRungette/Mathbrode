import React, { Component } from 'react';
import Footer from './Footer'
import Navigbar from './Navbar2'
import Event from './cards/Event-item'
import PastEvent from './cards/Past-Event-Item'
import ip from './ip'


class Events extends Component{

  constructor(props){
    super(props)
    this.state= {
      events: [],
      pastEvents: [],
    }
  }

  componentDidMount(){
    let ctx = this
    fetch(`${ip}/events`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({events: data.allEvents, pastEvents: data.allPastEvents})
      
    })
    .catch(function(error) {
      console.log('Request failed ->', error)
  });
  }   


  render(){
    let eventList = this.state.events.map(function(event, i){
      return <Event key={i}
        eventName={event.name}
        eventAddress={event.address}
        eventZipCode={event.zip_code}
        eventCity={event.city}
        eventDate={event.date}
        eventStart={event.starting_time}
        eventEnd={event.ending_time}
        eventPhoto={event.photo} 
        eventLink={event.link}
      />
    }, this)

    let pastEventList = this.state.pastEvents.map(function(event, i){
      return <PastEvent key={i}
        eventName={event.name}
        eventAddress={event.address}
        eventZipCode={event.zip_code}
        eventCity={event.city}
        eventDate={event.date}
        eventStart={event.starting_time}
        eventEnd={event.ending_time}
        eventPhoto={event.photo} 
        eventLink={event.link}
      />
    }, this)

  
    return(
    <div >

      <Navigbar/>
        <div style={{height:"10em"}}></div>
        <div style={{minHeight:"65vh"}}>
            <h1 style={{textAlign:"center", fontSize:"3.5em", marginTop:"0.5em"}} >Mes Événements</h1>
            <div style={{height:"8em"}}></div>
            <h2 class="past-event-title">À venir:</h2>
             <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", margin:"auto"}} className="col-9">
               {this.state.events.length === 0?(
                  <div style={{fontFamily:"Open Sans", margin:'auto'}}>
                    <p style={{fontSize: "140%"}}>Il n'y a aucun évènement à venir pour le moment ...</p>
                  </div>
                 ):(
                   {eventList}
                 )}
            </div>

        <div style={{height:"8em"}}></div>
            <h2 class="past-event-title">Événements Passés:</h2>
            <div style={{height:"6em"}}></div>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", margin:"auto"}} className="col-9">
                   {pastEventList}
            </div>
            <div style={{height:"6em"}}></div>
        </div>
      <Footer/>
    </div>
    )}
}

export default Events ;