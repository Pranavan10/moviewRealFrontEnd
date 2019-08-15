

import * as React from 'react';
import { isNullOrUndefined } from 'util';
import Header from './components/Header/Header'

import LoginDialog from './components/LoginDialog/LoginDialog'
import Review from './components/Review/Review';
import ReviewForm from  './components/ReviewForm/ReviewForm';
import UserReview from './components/UserReview/UserReview';






interface IState{
  curPage: string,
  isLoggedIn: boolean,
  movieUrl:string,
  name:string,
  open:boolean,
  picture:string
  reviewSearch:boolean,
  userID:string,
  searchList:[],
  value:number,
  inputValue: string,
  userKey:any
  disable:any
  
  
  
  

  
}




class App extends React.Component<any, IState> {
  constructor(props:any){
    super(props)
    this.state = {
      
      curPage: "Home",
      isLoggedIn:false,
      movieUrl:"",
      open:false,
      reviewSearch:false,
      userID:"",
      picture:"",
      name:"",
      searchList: [],
      value:0,
      inputValue:"",
      userKey:1,
      disable:true



      


    }
    
}

public nDisable = () =>{
  this.setState({
    disable:false
  })
}
public addUser = () =>{
      
  fetch('https://moviewdevops.azurewebsites.net/api/Users',{
    
    
    method: 'POST',
    headers:{
      
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId:this.state.userID,
      fullName:this.state.name,
      
    })

  }).then((result: any) => {
    return result.json();

}).then((result:any) =>{
  
    this.setState({
      userKey:result.userKey
    })
    
})
}
public getMovie =(newValue:any) =>{
  
  this.setState({
    inputValue: newValue.value
  })
  
}

public loadOptions = (inputValue: any, callback: any) => {
  return new Promise(resolve => {
      resolve(this.performSearch(inputValue))
      
  });
  
}

public valueChange =(newValue:any) =>{
  this.setState({
    value:newValue
  })
}
public performSearch = (searchTerm:any) => {
  const tempSearchList:any[] = [];
  if( searchTerm!== "" ){
      
      const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1df04ea58d909adbd19cffafbb455fed&language=en-US&page=1&include_adult=false&query=" +searchTerm;
      
      return fetch(urlString, {
          method: 'GET'
      }).then((result: any) => {
          return result.json();
      }).then((searchResults: any) => {
        
          const results= searchResults.results;
          results.forEach((movie:any)=> {
              tempSearchList.push({   
                  label: movie.title,
                  value: movie.title

              });
          })
          return tempSearchList;
          
     })
     
  };

  return tempSearchList;
}

public responseFacebook = (response: any) =>{
  if(response.error !== isNullOrUndefined) {
    
      if(response.status !=="unknown"){
        this.setState({
          isLoggedIn:true,
          name: response.name,
          picture: response.picture === undefined ? "" : response.picture.data.url,
          userID:response.userID,
          
          
          
        })
        
        this.nDisable()
        this.addUser()
    }
    
  }
}
public componentClicked = () => console.log("")


  public findReview = () =>{
    this.setState({
      reviewSearch: true
    })
  }

  public setPage = (page:string) =>{
    this.setState({
      curPage: page,
      reviewSearch:false
    })
  }
  
  public setDialog = (nextOpen:boolean) => {
    
    if(nextOpen !==this.state.open){
      this.setState({
        open:nextOpen
      })
    }
  }

  public getLog = (log:boolean , id:string) => {
    this.setState({
      isLoggedIn:log,
      userID:id
    })
  }

  public render() {
    let curPage: any;

    switch(this.state.curPage){
      case "User":{
        curPage = <UserReview UserID={this.state.userID} loadOptions={this.loadOptions}/>
        break
      } case "Home":{
        if(this.state.reviewSearch===true){
          curPage=<Review inputValue={this.state.inputValue} />
        } else{
          curPage=<ReviewForm findReview={this.findReview} loadOptions={this.loadOptions} value={this.state.value} searchList={this.state.searchList} inputValue={this.state.inputValue} valueChange={this.valueChange} getMovie={this.getMovie} userKey={this.state.userKey} disable={this.state.disable}/>
        }
        break;
      }
   } 
    return (
      <React.Fragment>
        <LoginDialog open={this.state.open} setOpen={this.setDialog} name={this.state.name} isLoggedIn= {this.state.isLoggedIn} userID={this.state.userID} picture = {this.state.picture} responseFacebook={this.responseFacebook} componentClicked={this.componentClicked}  />
        <Header setPage={this.setPage} setDialog = {this.setDialog} isLoggedIn={this.state.isLoggedIn}  />
        {curPage}
      </React.Fragment>
    );
  }
}

export default App;
