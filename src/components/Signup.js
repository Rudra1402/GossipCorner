import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/common.css'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loader from '../images/loader.gif'

function Signup({ api }) {

    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [userAuth, setUserAuth] = useState(false)
    const [load, setLoad] = useState(true)

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('male')
    const [email, setEmail] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post(`${api}/signup`, {
            fname: fname,
            lname: lname,
            username: username,
            password: password,
            gender: gender,
            email: email
        }).then(r => {
            alert('Registered Successfully!')
            navigate('/login')
        }).catch(e => alert(e.message))
    }

    useEffect(() => {
        document.title = 'Sign Up | GC'
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
            </div> : <div className='signup'>
                {!userAuth ? <>
                    <div className='head'>Sign Up</div>
                    <form onSubmit={e => submitHandler(e)}>
                        <div className='flex'>
                            <div className='box su'>
                                <div className='label'>First Name</div>
                                <input
                                    type={'text'}
                                    placeholder='First Name...'
                                    onChange={e => setFname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='box su'>
                                <div className='label'>Last Name</div>
                                <input
                                    type={'text'}
                                    placeholder='Last Name...'
                                    onChange={e => setLname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='box su'>
                                <div className='label'>Username</div>
                                <input
                                    type={'text'}
                                    placeholder='Username...'
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='box su'>
                                <div className='label'>Password</div>
                                <input
                                    type={'password'}
                                    placeholder='Password...'
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='box su'>
                                <div className='label'>Gender</div>
                                <select
                                    defaultValue={gender}
                                    onChange={e => setGender(e.target.value)}
                                    required
                                >
                                    <option value={'male'}>Male</option>
                                    <option value={'female'}>Female</option>
                                </select>
                            </div>
                            <div className='box su'>
                                <div className='label'>Email ID</div>
                                <input
                                    type={'email'}
                                    placeholder='Email...'
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type='Submit'>Submit</button>
                    </form>
                    <div className='containHr'>
                        <hr className='hr' />
                        <div>OR</div>
                        <hr className='hr' />
                    </div>
                    <div className='navigate'>
                        <div className='des'>Have an account?</div>
                        <Link to={'/login'}>Login</Link>
                    </div></> : <>
                    <div className='logged-in'>Logged in as <span>{user.fname + ' ' + user.lname + ' / @' + user.username}</span></div>
                </>}
            </div>}
        </div>
    )
}

export default Signup