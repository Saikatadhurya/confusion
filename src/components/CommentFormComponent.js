import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment )
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
 export default CommentForm;