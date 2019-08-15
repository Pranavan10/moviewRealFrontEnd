import {   Card , CardActionArea,  CardContent,  Typography} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import * as React from 'react';



interface IProps {
    name: string,
    movie: string,
    rating: number,
    review: string
}
class ReviewCard extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const card = (
        <Card>
            <CardActionArea>
                
                <CardContent>
                    <Typography gutterBottom= {true} variant="h6" component="h2">
                        
                        {this.props.name}
                    </Typography>
                    <Typography gutterBottom= {true} variant="h5" component="h2">

                        {this.props.movie}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    <Typography component="legend">Rating</Typography>
                        <Rating value={this.props.rating} readOnly={true} />
                        
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.review}
                    </Typography>

                    
                </CardContent>
            </CardActionArea>
            
        </Card>);

        return card;
    }
}

export default ReviewCard;