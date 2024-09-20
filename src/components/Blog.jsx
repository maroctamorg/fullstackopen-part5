import Toggable from './Toggable'

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
                    likes <span data-testid='number-of-likes'>{blog.likes}</span> <button onClick={() => like(blog.id)}>like</button> <br />
                    {blog.user.username} <br />
                    <button onClick={() => remove(blog)}>remove</button>
                </p>
            </Toggable>
        </div>
    )
}
export default Blog