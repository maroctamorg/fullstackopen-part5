import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({ notify }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const newBlogs = blogs
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes + 1))
    }, [blogs])

    const blogFormRef = useRef()

    return (
        <div>
            <h2>blogs</h2>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} notify={notify} blogs={blogs} setBlogs={setBlogs}/>) }
            <Toggable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm notify={notify} setBlogs={setBlogs} blogs={blogs} blogFormRef={blogFormRef} />
            </Toggable>
        </div>
    )
}

export default Blogs