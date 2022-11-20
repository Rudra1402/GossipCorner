import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/common.css'
import '../css/home.css'
import gccard from '../images/gc-card.png'
import gc from '../images/gc.png'
import { Link } from 'react-router-dom'
import loader from '../images/loader.gif'

function Home({ api }) {

    const [userAuth, setUserAuth] = useState(false)
    const [user, setUser] = useState({})
    const [load, setLoad] = useState(true)

    const checkLogin = () => {
        axios.get(`${api}/user`, { withCredentials: true })
            .then(r => {
                setUser(r.data.user)
                setUserAuth(r.data.loggedIn)
                setLoad(false)
            })
            .catch(e => alert(e.message))
    }

    useEffect(() => {
        document.title = 'Home | GC'
        checkLogin()
    }, [])

    return (
        <div className='container'>
            <div className='home'>
                <img src={gccard} alt='' />
                <div className='home-main'>
                    <div className='home-head'>Gossip Corner <img src={gc} alt='' /></div>
                    <div className='home-des'>One of the best places to share your gossips with the world and have fun together</div>
                    {load ? <img src={loader} alt='' style={{ height: "62px" }} /> : <>{!userAuth ? <div className='containBtns'>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Sign Up</Link>
                    </div> : <div className='welcome-user'>
                        <div>Hi
                            <Link to={'/profile'}>{user.fname + ' ' + user.lname}</Link>
                            ,<br />It's great to see you back!</div>
                        {/* <Link>Gossip</Link> */}
                    </div>}</>}
                </div>
            </div>
        </div>
    )
}

export default Home