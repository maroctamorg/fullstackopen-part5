import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ notify }) => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
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
        notify('unable to add blog', 'error')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>create new</h2>
        <form onSubmit={handleSubmit}>
            <div>title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/></div>
            <div>author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
            <div>url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/></div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default Blogs