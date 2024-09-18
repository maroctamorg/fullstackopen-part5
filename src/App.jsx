import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
    const [user, setUser] = useState(null)

    const TYPE = {
        ERROR: 'error',
        SUCCESS: 'success'
    }
    const [ notification, setNotification ] = useState( { message: null, type: TYPE.ERROR })

    const updateNotification = (message, type) => {
        setNotification( { message: message, type: type } )
        setTimeout( () => { setNotification( { message: null, type: null } ) }, 5000)
    }

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

    return (
        <div>
            <Notification message={notification.message} type={notification.type} />
            {
                user === null
                    ? <Login setUser={setUser} notify={updateNotification} />
                    : <div>
                        <p>{user.username} logged-in</p>
                        <button onClick={logout}>logout</button>
                        <Blogs notify={updateNotification} />
                    </div>
            }
        </div>
    )
}

export default App