import React, {Component} from 'react';
import { Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrashAlt, faReply, faTimes } from '@fortawesome/free-solid-svg-icons'
import DateFormat from '../function'
import ip from '../ip'
import Mailto from 'react-protected-mailto'


const readMessage ={
  backgroundColor:"#ededed",
  fontSize: "0.8em"
}


class MessageItem extends Component{
  constructor(props){
    super(props);
    this.onReadClick = this.onReadClick.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state={
      readFromDb: this.props.messageRead,
      display: true,
    }
  }

  onReadClick(data){
    let ctx = this;
    fetch(`${ip}/admins/read-message`,{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `message_id=${data}&`
     })
     .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({readFromDb: data.newMessage.read})
    })
    
  }

  deleteMessage(data){
    let ctx = this
     fetch(`${ip}/admins/delete-message`,{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `message_id=${data}`
       })
       .then(function(response) {
        return response.json();
      })
      .then(function(data){
        ctx.setState({display: false})
        ctx.handleClick()
      }) 
   }

   handleClick(){
    this.props.handleClickParent()
   }

  render(){
    var iconMessage = faCheck
    var marker = "Marquer comme lu"
    var styleMessage;
    if (this.state.readFromDb === true){
      styleMessage = readMessage
      iconMessage = faTimes
      marker = "Marquer comme non lu"
    }
    if (this.state.display === false){
      console.log("pas de message")
    }

    return(
      <div style={{ display:"flex", justifyContent:"center", paddingTop:"4%"}}>
      <Col sm="9">  
        <div style={styleMessage} class="roww">
        <Col lg={11}>
        <div  class="content">  
        <h4>Sujet : {this.props.messageObject}</h4>
        <p>De la part de:  {this.props.messageSender}</p>
          <p>{this.props.messageContent}  </p>
          {this.props.messagePhoto != null ?(
            <div>
            <img style={{width:"10em", marginLeft:'10%'}} alt=" " src={this.props.messagePhoto} />
            </div>
          ):(
            <div></div>
          )}
          <p>Envoyé le : {DateFormat(this.props.messageDate)} </p>
        </div>
        </Col>
        <Col lg={1}>
          <div>
            <Button style={{backgroundColor: "#1B263B", border:"none"}}><a style={{color:"white"}} href={"mailto:"+this.props.messageSender}> <FontAwesomeIcon style={{backgroundColor:'#1B263B'}} icon={faReply} /></a></Button>
            <br></br>
            <br></br>
            <Button onClick={() => this.onReadClick(this.props.messageId)} style={{backgroundColor: "#1B263B", border:"none"}}><FontAwesomeIcon  style={{color:"white"}} title={marker} icon={iconMessage} /></Button>
            <br></br>
            <br></br>
            <Button onClick={() => this.deleteMessage(this.props.messageId)} style={{backgroundColor: "#1B263B", border:"none"}}> <FontAwesomeIcon style={{color:"white"}} icon={faTrashAlt} /></Button>
          </div>                    
          </Col>
          </div> 
        </Col>

    </div>
    )
  }
}

export default MessageItem;