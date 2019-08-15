
import * as React from 'react'
import  { Component, } from 'react'
import EditDialog from '../EditDialog/EditDialog'
import ReviewCard from '../ReviewCard/ReviewCard';



interface IState{
    
    reviewsFromDb: []
    name:string
    open:boolean

}

interface IProps{
    UserID:any;
    loadOptions:(inputValue: any, callback: any) => Promise<unknown>
    
}



/*interface IMovieReview {
    name:string,
    movie: string,
    review: string,
    rating: number,
    
    
}*/

export default class UserReview extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            reviewsFromDb: [],
            name:"",
            open:false
            }
        this.getUserReveiw()
    }
    public getUserReveiw = () =>{

        const urlString= "https://moviewdevops.azurewebsites.net/api/Users/SearchByUser/" +  this.props.UserID
        return fetch(urlString, {
            method: 'GET'
        }).then((result: any) => {
            return result.json();

        }).then((result:any) =>{
            if(result[0] !== undefined){
                this.setState({
                    
                    name:result[0].fullName,
                    reviewsFromDb:result[0].reviews
                })
            }
            
        })
    }
    public setDialog = (nextOpen:boolean) => {
        
        if(nextOpen !==this.state.open){
          this.setState({
            open:nextOpen
          })
        }
      }
    public render(){
        
        return (
            
            
            this.state.reviewsFromDb.map((reviews: any, i: number) => {
                
                return (
                    
                    <React.Fragment key={i} >
                      
                    <ReviewCard key = {i}  rating = {reviews.rating} review= {reviews.review} name={this.state.name} movie = {reviews.movie.movie}/>
                    <EditDialog reviewId = {reviews.reviewId} getUserReview = {this.getUserReveiw} />  
                    </React.Fragment>
                )
            })
        )
    }
}