import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,
  Modal, ModalHeader, ModalBody, Button, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform , Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length; //check val is >0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
  constructor(props){
      super(props);
      this.state = {
          isModalOpen: false   
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

toggleModal(){
  this.setState({
      isModalOpen: !this.state.isModalOpen
  });
}
handleSubmit(values) {
  this.toggleModal();
  this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment )
}
  render(){
   return(
       <>
      <div>
          <Button color="secondary" outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
      </div>
         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
         <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
         <ModalBody>
         <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="container">
                      <Row className="form-group">
                          <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                      className="form-control">
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Control.select>
                         </Row>
                          
                      <Row className="form-group">
                              <Label htmlFor="yourname">Your Name </Label>
                              
                              <Control.text model=".yourname" id="yourname" name="yourname"
                                      placeholder="Your Name"
                                      className="form-control"
                                      validators={{
                                          required, minLength: minLength(3), maxLength: maxLength(15)
                                      }}
                                       />
                                  <Errors
                                      className="text-danger"
                                      model=".yourname"
                                      show="touched"
                                      messages={{
                                          required: 'Required',
                                          minLength: 'Must be greater than 2 characters',
                                          maxLength: 'Must be 15 characters or less'
                                      }}
                                   />
                                
                                 
                             </Row>
                         <Row className="form-group">
                              <Label htmlfor="comment">Comment</Label>  
                              <Control.textarea model=".comment" id="comment" name="comment"
                                              rows="6"
                                              className="form-control" />
                         </Row>
                          <Row className="form-group">
                                  <Button type="submit" color="primary">
                                  Submit
                                  </Button>
                          </Row>
                          </div>
                      </LocalForm>
         </ModalBody>
     </Modal>
     </>
   );
  }
}

  function RenderDish({dish}){
    return(
      <div className="col-md-5 m-1">
      <FadeTransform in
                transformProps = {{
                    exitTransform: 'scale(0.5) translateY(-50%'
        }}>
          <Card>
              <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name }/>
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody> 
          </Card>
     </FadeTransform>

      </div>
      );
  }
    function RenderComments({comment, postComment, dishId}){
    
      return(
        <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
      <Stagger in>
          { comment.map((data)=>{
            const d = new Date(data.date)
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
            return(
             <Fade in>
                 <li key={data.id}>{data.comment}<br/>--{data.author}, {mo} {da}, {ye}</li>
            </Fade> 
            )
          })}
       </Stagger>
       </ul>
       <CommentForm dishId={dishId} postComment = {postComment} />
       </div>
    );
      }

    const DishDetail = (props) =>{
      if (props.isLoading){
        return(
          <div className="container">
            <div className="row">
              <Loading />
            </div>
          </div>
        );
      }
      else if(props.errMess){
        return(
          <div className="container">
            <div className="row">
              <h4>{props.errMess}</h4>
            </div>
          </div>
        );
      }
    else{
      return(
        <div className="container">
           <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
        <div className="row">
            {/* {props.dish?(console.log(props.dish.name)):null}   */}

              {props.dish ? 
              
              <>
              {/* <React.Fragment> can be written in short as <> */}
                  <RenderDish dish = {props.dish} />
                  <RenderComments comment={props.comments} 
                    postComment = {props.postComment}
                    dishId = {props.dish.id}
                  />

              </>
              : null}
        
        </div>
        </div>
       
            );
    }
  }

export default DishDetail;