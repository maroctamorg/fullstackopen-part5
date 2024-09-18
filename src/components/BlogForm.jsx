import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ notify, setBlogs, blogs, blogFormRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()
            const newBlog = await blogService.create({
                title, author, url
            })
            setBlogs(blogs.concat(newBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
        }
        catch (exception) {
            console.error(exception)
            notify('unable to add blog', 'error')
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/></div>
                <div>author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
                <div>url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/></div>
                <button type="submit">create</button>
            </form>
        </div>)
}

export default BlogForm