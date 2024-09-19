import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        addNewBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>title: <input type="text" value={title} placeholder='Title' onChange={({ target }) => setTitle(target.value)}/></div>
                <div>author: <input type="text" value={author} placeholder='Author' onChange={({ target }) => setAuthor(target.value)}/></div>
                <div>url: <input type="text" value={url} placeholder='URL' onChange={({ target }) => setUrl(target.value)}/></div>
                <button type="submit">create</button>
            </form>
        </div>)
}

export default BlogForm