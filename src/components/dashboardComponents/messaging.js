import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import FooterAdmin from './footerAdmin'
import MessageItem from '../cards/Message-item';
import {Card} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ip from '../ip'

const givenSize ={
  height: '70vh',
  marginBottom:"3em"
}

const noGivenSize={
  marginBottom:"3em"
}

class Messages extends React.Component{

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
    this.state= {
      messages: [],
    }
  }

  handleClick(){
    console.log("coucou")
    let ctx = this;
    fetch(`${ip}/admins/messages`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({messages: data.allMessages})
     console.log("THE STATE FROM HANDLE CLICK ===========>", ctx.state.messages)
    })
  }

  componentDidMount(){
    let ctx = this;
    fetch(`${ip}/admins/messages`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({messages: data.allMessages})
     console.log("THE STATE ===========>", ctx.state.messages)
    })
  }

    render(){
      if (this.props.adminConnected == false || this.props.adminConnected == null){
        return <Redirect to="/loginadmin" />
     }

      let messageList = this.state.messages.map(function(message, i){
        return <MessageItem handleClickParent={this.handleClick} key={i}
        messageObject={message.object}
        messageContent={message.content}
        messageSender={message.sender_email}
        messageDate={message.date}
        messageId = {message._id}
        messageRead = {message.read}
        messagePhoto = {message.photo}
        />
      }, this)

      let size;
      if (messageList.length <= 1) {
        size = givenSize
      } else{
        size= noGivenSize
      }
        return(
          <div style={{fontFamily:"Raleway"}} className="mainBack">
          <NavbarAdmin/>
          <div style={size}>
          <div style={{height:"6em"}}></div>
          <Card className="col-8 mx-auto" style={{maxHeight:"160vh", overflow:"auto"}} >
          <h2 style={{textAlign:"center", fontSize:"3em", marginTop:'1em'}}>Messagerie ({messageList.length})</h2>
          <div style={{height:"1em"}}></div>
          {messageList.length === 0?(
            <div>
              <div style={{fontSize:'1.3em', textAlign:'center', marginTop:"2em"}} >Pas de messages</div>
            </div>
          ):(
            <div>           
              {messageList}
            </div>

          )}
            <div style={{height:"6em"}}></div>
            </Card>
            <div style={{height:"6em"}}></div>
          <FooterAdmin/>
            </div>
          </div>     
        )}
}


function mapStatetoProps(state){
  console.log("======>", state)
  return {adminConnected: state.admin.isAdminExist}
}


export default connect(
  mapStatetoProps,
  null
  )(Messages);



