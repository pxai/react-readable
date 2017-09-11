import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import  { uuid ,uniqueId}  from '../utils/uuid'

class PostModal extends Component {
  handleSubmit =  (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, {hash: true});
    console.log(values);
    values.timestamp = +Date.now();   // + makes valueOf to be returned
    values.id = uniqueId();
    if (this.props.onCreatePost)
        this.props.onCreatePost(values);
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
            <label for="title">Title</label>
            <input class="u-full-width" placeholder="Post title here..." name="title" id="title" type="text" />
        </div>
        <div>
            <label for="author">Author</label>
            <input class="u-full-width" placeholder="Put yout name" name="author" id="author" type="text" />
        </div>
        <div class="six columns">
              <label for="categoryName">Category</label>
              <select class="u-full-width" id="categoryName" name="category">
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
                ))}
              </select>
        </div>
        <div>    
            <label for="body">Post body</label>
            <textarea class="u-full-width" placeholder="I'm Batman, I'm awesome..." id="body" name="body"></textarea>
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