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
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes - 1))
    }, [blogs])

    const blogFormRef = useRef()

    const likeBlog = async (blogId) => {
        try {
            setBlogs(blogs.map(b => b.id === blogId ? {...b, likes: b.likes+1} : b))
            await blogService.update(blog.id, blog)
        }
        catch (exception) {
            notify(`unable to like blog: ${exception.message}`, 'error')
        }
    }

    const removeBlog = async (blog) => {
        try {
            window.confirm(`remove blog ${blog.title} by ${blog.author}`)
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
        catch (exception) {
            notify(`unable to remove blog: ${exception.message}`, 'error')
        }
    }

    const addNewBlog = async ({ title, author, url }) => {
        try {
            const newBlog = await blogService.create({
                title, author, url
            })
            setBlogs(blogs.concat(newBlog))
            blogFormRef.current.toggleVisibility()
            notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
        }
        catch (exception) {
            notify(`unable to add blog: ${exception.message}`, 'error')
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            { blogs.map(blog => <Blog key={blog.id} blog={blog} like={likeBlog} remove={removeBlog} />) }
            <Toggable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm notify={notify} addNewBlog={addNewBlog} />
            </Toggable>
        </div>
    )
}

export default Blogs