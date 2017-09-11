import React, { Component } from 'react'

class Post extends Component {

  render() {
    const post = this.props.post;
    return (
      <div className='post'>
          <h2>{post.title}</h2>
          <div className='body'>
           {post.body}
          </div>
        </div>
    )
  }
}

export default Post;
