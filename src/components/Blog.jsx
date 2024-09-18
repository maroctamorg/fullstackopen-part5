import Toggable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, blog, notify }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const like = async () => {
        try {
            const updatedBlog = { ...blog, likes: blog.likes + 1 }
            await blogService.update(blog.id, updatedBlog)
            setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
        }
        catch (exception) {
            notify(`unable to like blog: ${exception.message}`, 'error')
        }
    }

    const remove = async () => {
        try {
            window.confirm(`remove blog ${blog.title} by ${blog.author}`)
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
        catch (exception) {
            notify(`unable to remove blog: ${exception.message}`, 'error')
        }
    }

    return (
        <div style={blogStyle}>
            <h3>{blog.title} {blog.author} </h3>
            <Toggable buttonLabel="view">
                <p>
                    {blog.url} <br />
                    likes {blog.likes} <button onClick={like}>like</button> <br />
                    {blog.user.username} <br />
                    <button onClick={remove}>remove</button>
                </p>
            </Toggable>
        </div>
    )
}
export default Blog