import {  Button } from '@material-ui/core';
import * as React from 'react'
import{Col ,Row} from 'react-bootstrap';
import logo from '../../images/Logo.png'
import MoView from '../../images/MoView.png'
import './Header.css'





interface IProps{
    isLoggedIn:boolean;
    setPage:(page: string) => void;
    setDialog:(nextOpen: boolean) => void;
    
    
}

 


export default class Header extends React.Component<IProps,[]> {
    constructor(props:any){
        super(props)
        
        
    }
    public render(){
    let log:string
    let use:any
    use=<p style={{ position:'absolute',right:10, top:70}}/>
    log="Log in"
    if(this.props.isLoggedIn === true){
        log = "Logged In"
        use=<Button onClick = {() => this.props.setPage("User")}  style= {{color:'white', position:'absolute',right:10, top:70}} >Your Reviews</Button>
        
    }
    return (
        <div className="container-fluid" style={{backgroundImage: 'linear-gradient(to right, #000000, #555555)'}}>
            <Row>
            <Col  sm={6} style={{minHeight:'100px'}}>
            <span className='headerText'><img src={MoView} alt="Paris Itinerary" style={{width:150,  marginLeft:10}}/> <img src={logo} alt="Paris Itinerary" style={{width:113, marginLeft:10}}/></span>
            </Col>
            <Col sm={6} style={{minHeight:'100px'}}>
            <Row>
            <Button onClick = {() => this.props.setPage("Home")}  style= {{color:'white', position:'absolute',right:10, top:10}} >Home</Button>
            </Row>
            
            <Row>
            <Button onClick = {() => this.props.setDialog(true)}style={{color:'white',  position:'absolute',right:10, top:40, outline:'none'}}>
                {log}
            </Button>
            </Row>
            <Row>
            {use}
            </Row>
            </Col>
            </Row>
            
                        
        
            
        </div>
    )
    }
}