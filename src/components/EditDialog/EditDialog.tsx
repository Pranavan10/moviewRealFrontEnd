
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import * as React from 'react';
import{Col,Row} from 'react-bootstrap'
import {Form} from 'react-bootstrap';



interface IState{
    movieName:any
    value:any,
    review: string,
    open: boolean
}

interface IProps{
    reviewId: number
    getUserReview: () => void;
}




export default class EditDialog extends React.Component<IProps,IState> {
    
    constructor(props: any) {
        super(props);
        this.state ={
            movieName:"",
            value:0,
            review: "",
            open:false
        };
        
        
    }

    public componentDidMount() {
        
        this.getMovie();
    }
    
    public deleteReview = () => {
        
        const urlString = "https://moviewdevops.azurewebsites.net/api/Reviews/" +  this.props.reviewId;
        fetch(urlString, {
            method: 'DELETE'
        }).then((response: any) => {
            this.props.getUserReview();
        });
    }   
    public updateMovie = () => {
        const urlString = "https://moviewdevops.azurewebsites.net/api/Reviews/" +  this.props.reviewId;
        
        
        fetch(urlString, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reviewId: this.props.reviewId,
                rating: this.state.value,
                review: this.state.review
            })
        }).then((response: any) => {
            this.getMovie();
            this.props.getUserReview();
        });
    }
    public getMovie = () => {
        const urlString = "https://moviewdevops.azurewebsites.net/api/Reviews/" +  this.props.reviewId;

        fetch(urlString, {
            method: 'GET'
        }).then((result: any) => {
            return result.json();
        }).then((result: any) => {
            
            this.setState({
                value: result.rating,
                review: result.review,
                movieName: result.movie.movie
            })
        });
    }


    public render() {
        
        return (
            <React.Fragment>
            <Button size="small" href="https://www.facebook.com/sharer/sharer.php?u=https://moviewdevops.azurewebsites.net/index.html" variant="contained" color="primary" >
                
                Share on Facebook
                
                </Button>
                <Button onClick = {() => this.setState((prevState:any) =>  ({open: !prevState.open}))} size="small" variant="contained" color="secondary">
                Edit
                </Button>
                <Button size="small" variant="contained" color="primary" onClick = {this.deleteReview}>
                Delete
                </Button>
              <Dialog fullWidth = {true} open={this.state.open}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit your Review</DialogTitle>
                <DialogContent style={{minHeight:"100"}}>
                  <DialogContentText>
                    <Row>
                        <Col>Movie:</Col>
                    </Row>
                    <Row>
                        <Col style={{color:"#000000"}}>
                            {this.state.movieName} 
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                        Rating:
                        </Col>
                        <Col>
                        <Rating 
                    name="simple-controlled"
                    value={this.state.value}
                    onChange={(event, newValue) => {
                    this.setState({value:newValue})
                }}
                />
                        </Col>
                    
                    </Row>
                    <Row>
                        <Col>
                        Review:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Control value = {this.state.review} onChange = {(e: any) => this.setState({review: e.target.value})} id="reviewEditText" type="text" style={{height : "500px", fontSize:"25px" }}  placeholder="Enter Review" as ="textarea"  />
                        </Col>
                    </Row>
                    
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                <Button 
                onClick = {this.updateMovie}
                     color="primary">
                    Confirm
                  </Button>
                  <Button 
                    onClick = {() => this.setState((prevState:any) =>  ({open: !prevState.open}))} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>

        );
    }

}
