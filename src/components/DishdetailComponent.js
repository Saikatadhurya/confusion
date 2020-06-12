import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';

class DishDetail extends Component{
   

    renderComments(comment){
    
      return(comment.map((data)=>{
        const d = new Date(data.date)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        return(
        <li key={data.id}>{data.comment}<br/>--{data.author}, {mo} {da}, {ye}</li>
        )
       }));
    }
    render(){

        let {name} =  this.props.dish;
   console.log(name,"this is name")

        console.log(this.props.dish,"this is the dish");
        return(
        <div className="container">
{/* {JSON.stringify(Object.keys( this.props.dish)} */}
           {
           
           /* <div className="col-md-5 m-1">
              <Card>
                    <CardImg width="100%" src={ this.props.dish.image} alt={ this.props.dish.name }/>
                      <CardBody>
                      <CardTitle>{ this.props.dish.name}</CardTitle>
                      <CardText>{ this.props.dish.description}</CardText>
                      </CardBody> 
                </Card>
                </div>
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                  
                    </ul>
        </div>*/}
        </div>
            );
    }
}
export default DishDetail;