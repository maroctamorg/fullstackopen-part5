import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
    const [user, setUser] = useState(null)

    const logout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return user === null
        ? <Login setUser={setUser} />
        : <div>
            <p>{user.username} logged-in</p>
            <button onClick={logout}>logout</button>
            <Blogs />
        </div>
}

export default App