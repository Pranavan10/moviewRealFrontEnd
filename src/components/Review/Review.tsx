
import * as React from 'react'
import  { Component, } from 'react'
import ReviewCard from '../ReviewCard/ReviewCard';


interface IState{
    
    reviewsFromDb: []
    movieName:string
}

interface IProps{
    inputValue:string
}





export default class UserReview extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            reviewsFromDb: [],
            movieName:""
                
            }
        this.getMovieReveiw()
    }
    public getMovieReveiw = () =>{

        const urlString= "https://moviewdevops.azurewebsites.net/api/Movies/SearchByMovie/" + this.props.inputValue
        return fetch(urlString, {
            method: 'GET'
        }).then((result: any) => {
            return result.json();

        }).then((result:any) =>{
            if (result[0] !== undefined){

            
                this.setState({
                    movieName:result[0].movie,
                    reviewsFromDb:result[0].reviews
                })
            }
        })
    }
    public render(){
        
        return (
            
            this.state.reviewsFromDb.map((review: any, i: number) => {
                return (
                    <React.Fragment key = {i}>
                    <ReviewCard key = {i} rating = {review.rating} review= {review.review} name={review.userKeyNavigation.fullName} movie = {this.state.movieName} />
                    
                    </React.Fragment>
                )
            })
        )
    }
}