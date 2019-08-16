
import {  Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import * as React from 'react';
import {Form} from 'react-bootstrap';
import{Col ,Row} from 'react-bootstrap';
import AsyncSelect from 'react-select/async';  
import './ReviewForm.css';







interface IState{
    movieInput:string
    movieId:number,
    submitted:string,
}



interface IProps{
    value:number,
    inputValue:string,
    searchList:[],
    findReview:() => void
    
    loadOptions:(inputValue: any, callback: any) => Promise<unknown>
    valueChange:(newValue:any)  => void
    getMovie:(newValue:any)  => void
    userKey:number;
    disable:boolean
    
    
}



export default class ReviewForm extends React.Component<IProps,IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            movieInput:"",
            movieId:0,
            submitted:"Submit"
            
            
            
            }
        

        
    }
   

    
    
     
     public  addReview = async () => {
       
       const formReview = document.getElementById("reviewText") as HTMLInputElement;

       await fetch('https://moviewdevops.azurewebsites.net/api/Movies',{
        
        
        method: 'POST',
        headers:{
          
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Movie:this.state.movieInput
          
        })

      }).then((result: any) => {
        return result.json();

    }).then((result:any) =>{
        this.setState({
           movieId: result.movieId
        })
        
    })

        await fetch('https://moviewdevops.azurewebsites.net/api/Reviews',{
            method: 'POST',
            headers:{
            
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            userKey:this.props.userKey,
            movieId:this.state.movieId,
            rating: this.props.value,
            review: formReview.value

            
            })
        })

    }
    
    public render(){
        
    
    return (
        <div className="textbox">
            <Row style={{marginRight:'0'}}>
                <Col sm={6}>
                    <Row >
                        <Col style={{textAlign:"center" ,fontSize:25, borderRight:10,borderRightColor:'#000000',marginBottom:"10px"}}>
                            Look at Reviews
                             
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:"10px"}}>
                            <AsyncSelect
                            
                
                            defaultOptions = {false}
                            cacheOptions = {true}
                            isLoading = {true}
                            loadOptions = {this.props.loadOptions}
                            onChange = {(newValue: any) =>this.props.getMovie(newValue)  }
                            /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick = {() =>{this.props.findReview(); } } style={{outline:'none', width:'100%', marginLeft:'10px' , marginTop:'10px'  }} size="small" variant="contained" color="primary" className="search"  >
                            Search
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col  style={{textAlign:"center",fontSize:25,marginBottom:"10px"}}>
                             Post Your Opinion
                        </Col> 
                    </Row>
                    <Row>
                        <Col xs={4 } style={{fontSize:20, margin:0 }}>
                            <Col  style={{marginLeft:'10px', padding:'0',}}>
                                Movie Watched
                             </Col>

                        </Col> 
                        <Col xs={8}>
                            <AsyncSelect
                            style={{ height:"100px"}}
                            defaultOptions = {false}
                            cacheOptions = {true}
                            isLoading = {true}
                            loadOptions = {this.props.loadOptions}
                            onChange = {(newValue: any) =>{
                                
                                this.setState({movieInput:newValue.value})
                            } }
                            />
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col  style={{textAlign:"center"}}>
                        <Typography  component="legend" style={{fontWeight:"bold"}}>Rating</Typography>
                        <div style={{display: "flex", justifyContent: "center"}}>
                        <Rating 
                        name="simple-controlled"
                        value={this.props.value}
                        onChange={(event, newValue) => {
                            this.props.valueChange(newValue)
                        }}
                        />
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control id="reviewText" type="text" style={{height : "500px", fontSize:"25px",marginLeft:'10px'   }}  placeholder="Enter Review" as ="textarea"  />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            
                            <Button disabled={this.props.disable}  onClick= {() => {this.addReview() ;this.setState({submitted:"Submitted"})}  } variant="contained" color="primary" style={{ outline:'none', width:'100%', marginLeft:'10px' , marginTop:'10px'   }} size="small"    >
                            {this.state.submitted}
                            </Button>
                        </Col>
                        

                    </Row>

                </Col>
            </Row>
            
        </div>
    )
    }
}
