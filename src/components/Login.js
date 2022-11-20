import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/common.css'
import '../css/login.css'
import loader from '../images/loader.gif'

function Login({ api }) {

    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [userAuth, setUserAuth] = useState(false)
    const [load, setLoad] = useState(true)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post(`${api}/login`, {
            username: username,
            password: password
        }, { withCredentials: true })
            .then(r => alert('Welcome, ' + r.data.user.username + '!'))
            .then(() => navigate('/'))
            .catch(e => alert(e.message))
    }

    useEffect(() => {
        document.title = 'Login | GC'
        const checkLogin = () => {
            axios.get(`${api}/user`, { withCredentials: true })
                .then(r => {
                    setUser(r.data.user)
                    setUserAuth(r.data.loggedIn)
                    setLoad(false)
                })
                .catch(e => alert(e.message))
        }
        checkLogin()
    }, [])

    return (
        <div className='container'>
            {load ? <div>
                <img src={loader} alt='' style={{ height: "125px" }} />
            </div> : <div className='login'>
                {!userAuth ? <>
                    <div className='head'>Login</div>
                    <form onSubmit={e => submitHandler(e)}>
                        <div className='box'>
                            <div className='label'>Username</div>
                            <input
                                type={'text'}
                                placeholder='Username...'
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='box'>
                            <div className='label'>Password</div>
                            <input
                                type={'password'}
                                placeholder='Password...'
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                    <div className='containHr'>
                        <hr className='hr' />
                        <div>OR</div>
                        <hr className='hr' />
                    </div>
                    <div className='navigate'>
                        <div className='des'>Don't have an account?</div>
                        <Link to={'/signup'}>Sign Up</Link>
                    </div></> : <>
                    <div className='logged-in'>Logged in as <span>{user.fname + ' ' + user.lname + ' / @' + user.username}</span></div>
                </>}
            </div>}
        </div>
    )
}

export default Login