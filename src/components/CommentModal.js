import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import  { uuid }  from '../utils/uuid'

class CommentModal extends Component {

  handleSubmit =  (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true})
    if (this.props.comment.id === undefined) {
      console.log('Or coming here', this.props.comment);   
      values.timestamp = +Date.now();   // + makes valueOf to be returned
      values.id = uuid();
      values.parentId = this.props.post.id;

    } else {   
      console.log('coming here', this.props.comment.id);
      values.id = this.props.comment.id;
    }

    if (this.props.onCreateComment)
        this.props.onCreateComment(values);

    console.log('Values sent: ', values);
    this.props.closeCommentModal();
  }

  render() {
    const comment = this.props.comment || { author: '', body: ''}
    return (
      <div>
      <h3 className='subheader'>
        Add new comment
      </h3>
      <form onSubmit={this.handleSubmit}>
        <div>
            <label htmlFor="author">Author</label>
            <input className="u-full-width" placeholder="Put yout name" name="author" id="author" type="text" defaultValue={comment.author} />
        </div>
        <div>    
            <label htmlFor="body">Post body</label>
            <textarea className="u-full-width" placeholder="I'm Batman, I'm awesome..." id="body" name="body" defaultValue={comment.body} ></textarea>
        </div>
        <div>
        <button>Save comment</button>
        </div>
      </form>

    </div>
    )
  }
}


export default CommentModal;