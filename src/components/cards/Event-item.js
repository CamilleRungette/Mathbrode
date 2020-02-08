import React from 'react';
import { 
  Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem 
  } from 'reactstrap';
  import DateFormat from '../function'




class Event extends React.Component{
  render(){
    return(
      <div style={{fontFamily:"Raleway", maxWidth:"33em", margin:'auto'}} className="col-xl-6 col-12 mb-5">
       <Card style={{fontSize:"1.3em"}} >
        <CardImg src={this.props.eventPhoto} />
        <CardBody>
          <CardTitle> <strong> {this.props.eventName} </strong></CardTitle>
          <CardText>
            {this.props.eventAddress}
          </CardText>
        </CardBody>
        <CardBody className="list-group-flush">
          <CardText >Le {DateFormat(this.props.eventDate)}  <br/>
        De {this.props.eventStart}h à {this.props.eventEnd}h </CardText>
        </CardBody>
        <ListGroup>
          <ListGroupItem> <a href={this.props.eventLink} target="_blank">Voir l'évènement sur Facebook</a> </ListGroupItem>
        </ListGroup>
      </Card>
      </div>  
    )}
  }


export default Event;