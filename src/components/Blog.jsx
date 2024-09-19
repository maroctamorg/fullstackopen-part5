import Toggable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog, like, remove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <h3 className='blog-header'>{blog.title} {blog.author} </h3>
            <Toggable buttonLabel="view">
                <p className='blog-details'>
                    {blog.url} <br />
                    likes {blog.likes} <button onClick={() => like(blog)}>like</button> <br />
                    {blog.user.username} <br />
                    <button onClick={() => remove(blog)}>remove</button>
                </p>
            </Toggable>
        </div>
    )
}
export default Blog