import React from 'react';
import {  Navbar} from 'reactstrap';
import '../../App.css'


class FooterAdmin extends React.Component{
    render(){
        return(

<div className="row footer" >

    <Navbar expand="sm" style={{fontFamily:"Raleway", width: "100%" , margin:"auto", backgroundColor:"rgba(0, 0, 0, 0.8)"}}>
        <div style={{color:"white", textAlign:"center", margin:"auto", paddingTop:'1em'}}>
                   
            <a href="https://www.instagram.com/mathbrode/?hl=fr"  target="_blank" ><img src="/logo-instagram-blanc.png" className="instagram" style={{height:"4em", width:'4em', color:'white'}} alt="Alt text" /></a>             
          
          <p style={{fontSize:"1.3em", marginTop:"1em"}}>Mathbrode© 2019</p>
        </div>
    </Navbar>

</div>

        )}
}


export default FooterAdmin;