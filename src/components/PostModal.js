import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import  {uniqueId}  from '../utils/uuid'

class PostModal extends Component {
  handleSubmit =  (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    values.timestamp = +Date.now();   // + makes valueOf to be returned
    values.id = uniqueId();
    if (this.props.onCreatePost)
        this.props.onCreatePost(values);

    this.props.closePostModal();
  }

  render() {
    const categories = this.props.categories;
    return (
      <div>
      <h3 className='subheader'>
        Insert new Post
      </h3>
      <form onSubmit={this.handleSubmit}>
        <div >
            <label htmlFor="title">Title</label>
            <input className="u-full-width" placeholder="Post title here..." name="title" id="title" type="text" />
        </div>
        <div>
            <label htmlFor="author">Author</label>
            <input className="u-full-width" placeholder="Put yout name" name="author" id="author" type="text" />
        </div>
        <div className="six columns">
              <label htmlFor="categoryName">Category</label>
              <select className="u-full-width" id="categoryName" name="category">
              {categories.map((category) => (
                <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>
        </div>
        <div>    
            <label htmlFor="body">Post body</label>
            <textarea className="u-full-width" placeholder="I'm Batman, I'm awesome..." id="body" name="body"></textarea>
        </div>
        <div>
        <button>Save post</button>
        </div>
</form>

    </div>
    )
  }
}


export default PostModal;