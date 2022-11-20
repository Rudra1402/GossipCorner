import React, { useState, useEffect } from 'react'
import '../css/common.css'
import '../css/gossips.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import mprofile from '../images/profile.jpg'
import fprofile from '../images/fprofile.jpg'
import loader from '../images/loader.gif'
import gc from '../images/gc.png'

function Gossips({ api }) {

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [userAuth, setUserAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState(true)
    const [outerLoad, setOuterLoad] = useState(true)

    const getPosts = async () => {
        await axios.get(`${api}/getposts`)
            .then(r => {
                setPosts(r.data)
                setLoad(false)
            })
            .catch(e => alert(e.message))
    }

    const addPost = async (e, userid, fname, lname, username, gender, message) => {
        e.preventDefault()
        await axios.post(`${api}/createpost`, {
            userid: userid,
            fname: fname,
            lname: lname,
            username: username,
            gender: gender,
            message: message
        }).then(r => getPosts())
            .catch(e => alert(e.message))
    }

    useEffect(() => {
        document.title = 'Gossips | GC'
        const checkLogin = () => {
            axios.get(`${api}/user`, { withCredentials: true })
                .then(r => {
                    setUser(r.data.user)
                    setUserAuth(r.data.loggedIn)
                    setOuterLoad(false)
                })
                .catch(e => alert(e.message))
        }
        checkLogin()
        getPosts()
    }, [])

    return (
        <div className='container'>
            {outerLoad ? <img src={loader} alt='' style={{ height: "125px" }} /> : <div className='gossips'>
                <div className='g-head'>
                    <div className='g-title'>Gossips</div>
                    {userAuth ? <Link to={'/profile'}>{user.username}</Link> : <Link to={'/login'}>Login</Link>}
                </div>
                <div className='g-main'>
                    {load ? <div className='map-gossips'>
                        <img src={loader} alt='' style={{ height: "125px" }} />
                    </div> : <div className='map-gossips'>
                        {posts.slice(0).reverse().map((post) => (
                            <div className='gossip-card' key={post._id}>
                                <div className='card-head'>
                                    <img src={post.gender === 'male' ? mprofile : fprofile} alt='' />
                                    <div className='name-head'>
                                        <div className='name'>{post.fname} {post.lname}</div>
                                        <div className='username'>@{post.username}</div>
                                    </div>
                                </div>
                                <div className='message-box'>
                                    <div className='message'>{post.message}</div>
                                    <div className='footer'>
                                        <hr />
                                        <div className='date'>{(new Date(post.createdAt)).toLocaleDateString()} / {(new Date(post.createdAt)).toLocaleTimeString()}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}
                    <div className='create-gossip'>
                        {userAuth ? <form onSubmit={(e) => addPost(e, user._id, user.fname, user.lname, user.username, user.gender, msg)}>
                            <div className='cg-head'>Gossip as <span>{user.fname + ' ' + user.lname}</span></div>
                            <textarea
                                placeholder='gossip...'
                                onChange={e => setMsg(e.target.value)}
                                disabled={userAuth ? false : true}
                                required
                            />
                            <button type='submit'>Post</button>
                        </form> : <>
                            <img src={gc} alt='' style={{ width: "50px", borderRadius: "50%", marginBottom: "20px" }} />
                            <div style={{ fontSize: "20px" }}>Login to GossipCorner!</div>
                            <hr style={{ width: "75%", margin: "20px 0" }} />
                            <div style={{ fontSize: "20px" }}>Perks of GossipCorner</div>
                            <ul style={{ lineHeight: "1.5" }}>
                                <li>Easy to use</li>
                                <li>Faster access</li>
                                <li>Easy to manage</li>
                            </ul>
                            <hr style={{ width: "75%", margin: "20px 0" }} />
                            <div style={{ width: "70%", textAlign: "center", fontSize: "18px" }}>Stay tuned! more features coming to make it more fun.</div>
                        </>}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Gossips