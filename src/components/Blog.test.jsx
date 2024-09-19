import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author, but not URL or likes by default', () => {
    const blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 5,
        user: { username: 'testuser' }
    }

    const { container } = render(<Blog blog={blog} />)

    // Check that title and author are rendered
    const blogHeader = container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent('Test Blog Title Test Author')
    expect(blogHeader.closest('div')).not.toHaveStyle('display: none')

    // Check that URL and likes are not rendered by default
    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails.closest('div')).toHaveStyle('display: none')
})

test('shows URL and number of likes when toggled', async () => {
    const blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 5,
        user: { username: 'testuser' }
    }

    const { container } = render(<Blog blog={blog} />)
    const agent = userEvent.setup()
    const toggleButton = screen.getByText('view')
    await agent.click(toggleButton)

    // Check that URL and likes are not rendered by default
    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails.closest('div')).not.toHaveStyle('display: none')
})

test('event handler is called twice when like button is clicked twice', async () => {
    const blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 5,
        user: { username: 'testuser' }
    }

    const mockLike = vi.fn()
    render(<Blog blog={blog} like={mockLike} />)

    const agent = userEvent.setup()
    const likeButton = screen.getByText('like')
    await agent.click(likeButton)
    await agent.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
})

test('form calls addNewBlog with the right details when a new blog is created', async () => {
    const addNewBlog = vi.fn()
    render(<BlogForm addNewBlog={addNewBlog} />)

    const agent = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const createButton = screen.getByText('create')

    await agent.type(titleInput, 'Test Blog Title')
    await agent.type(authorInput, 'Test Author')
    await agent.type(urlInput, 'http://testurl.com')
    await agent.click(createButton)

    expect(addNewBlog).toHaveBeenCalledTimes(1)
    expect(addNewBlog).toHaveBeenCalledWith({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testurl.com'
    })
})