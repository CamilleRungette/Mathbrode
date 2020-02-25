import React from 'react';
import {  Navbar} from 'reactstrap';
import '../App.css'


class Footer extends React.Component{
    render(){
        return(

<div className="row footer" >

<Navbar expand="sm" style={{fontFamily:"Open Sans", width: "100%" , margin:"auto", backgroundColor:"#7A8AA8"}}>
        <div style={{color:"black", textAlign:"center", margin:"auto", paddingTop:'1em'}}>
                   
            <a href="https://www.instagram.com/mathbrode/?hl=fr"  target="_blank" rel="noopener noreferrer" ><img src="/instagram.png" className="instagram" style={{height:"4em", width:'4em', color:'white'}} alt="Instagram logo" /></a>             
          
          <p style={{fontSize:"1.3em", marginTop:"1em"}}>Mathbrode© 2019</p>
        </div>
    </Navbar>
    

</div> 

        )}
}


export default Footer;