import Toggable from "./Toggable"

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <h3>{blog.title} {blog.author} </h3>
            <Toggable buttonLabel="view">
                <p>
                    {blog.url} <br />
                    likes {blog.likes} <button>like</button> <br />
                    {blog.user.username}
                </p>
            </Toggable>
        </div>  
    )
}
export default Blog