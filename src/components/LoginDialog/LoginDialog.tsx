
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as React from 'react';
import{Col,Row} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';




interface IProps{
    setOpen:(open:boolean) => void
    open: boolean
    isLoggedIn: boolean,
    userID:string,
    name:string,
    picture:string
    responseFacebook:(response:any) => void
    componentClicked:() => void
    
}



export default class LoginDialog extends React.Component<IProps,[]> {
   
    constructor(props: any) {
        super(props);
        
        
    }
    
   
    
    public render() {

      let fbContent;

      if(this.props.isLoggedIn){
        fbContent=(
          <React.Fragment>
            <Row>
              <Col style={{textAlign:'center'}}>
                <img src={this.props.picture} alt ={this.props.name} />
              </Col>
            </Row>
            <Row>
              <Col>
                Welcome {this.props.name}
              </Col>
            </Row>
          </React.Fragment>
        )
      } else{
        fbContent=(<FacebookLogin
          appId="2240066002771424"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.props.componentClicked}
          callback={this.props.responseFacebook} />)
      }
        return (
            <React.Fragment>
              <Dialog fullWidth={true} open={this.props.open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login with Facebook</DialogTitle>
                <DialogContent style={{textAlign:'center'}}>
                  <DialogContentText>
                    <div>
                      {fbContent}
                    </div>
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button 
                    onClick= {() => { this.props.setOpen(false)}}  color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>

        )
    }

}
