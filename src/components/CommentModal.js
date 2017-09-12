import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import  { uuid ,uniqueId}  from '../utils/uuid'

class CommentModal extends Component {

  handleSubmit =  (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    values.timestamp = +Date.now();   // + makes valueOf to be returned
    values.id = uuid();
    values.parentId = this.props.post.id;
    if (this.props.onCreateComment)
        this.props.onCreateComment(values);

    this.props.closeCommentModal();
  }

  render() {
    const post = this.props.post;
    return (
      <div>
      <h3 className='subheader'>
        Add new comment
      </h3>
      <form onSubmit={this.handleSubmit}>
        <div>
            <label for="author">Author</label>
            <input class="u-full-width" placeholder="Put yout name" name="author" id="author" type="text" />
        </div>
        <div>    
            <label for="body">Post body</label>
            <textarea class="u-full-width" placeholder="I'm Batman, I'm awesome..." id="body" name="body"></textarea>
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