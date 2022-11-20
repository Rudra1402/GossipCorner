import React, { useEffect, useState } from 'react'
import '../css/common.css'
import '../css/profile.css'
import axios from 'axios'
import mprofile from '../images/profile.jpg'
import fprofile from '../images/fprofile.jpg'
import { Link } from 'react-router-dom'
import loader from '../images/loader.gif'
import { RiDeleteBin6Line } from 'react-icons/ri'

function Profile({ api }) {

    const [user, setUser] = useState(null)
    const [userAuth, setUserAuth] = useState(false)
    const [posts, setPosts] = useState([])
    const [load, setLoad] = useState(true)
    const [outerLoad, setOuterLoad] = useState(true)

    const userPosts = async (id) => {
        await axios.get(`${api}/userposts/${id}`)
            .then(r => {
                setPosts(r.data)
                setLoad(false)
            })
            .catch(e => alert(e.message))
    }

    const userLogout = () => {
        axios.get(`${api}/logout`, { withCredentials: true })
            .then(r => {
                setUser(r.data)
                setUserAuth(r.data.loggedIn)
            })
            .catch(e => alert(e.message))
    }

    const deletePost = async (id) => {
        await axios.delete(`${api}/delpost/${id}`)
            .then(r => {
                userPosts(user.user._id)
                alert('Post Deleted!')
            })
            .catch(e => alert(e.message))
    }

    const deleteUserPosts = async (id) => {
        await axios.delete(`${api}/deluserposts/${id}`)
            .then(r => {
                alert(r.data.message)
                userPosts(user.user._id)
            })
            .catch(e => alert(e.message + ' : Error deleting user data'))
    }

    const delUser = async (id) => {
        await axios.delete(`${api}/deluser/${id}`)
            .then(r => {
                alert(r.data.message)
                userLogout()
            })
            .catch(e => alert(e.message + ' : User not deleted!'))
    }

    useEffect(() => {
        document.title = 'Profile | GC'
        const checkLogin = () => {
            axios.get(`${api}/user`, { withCredentials: true })
                .then(r => {
                    setUser(r.data)
                    setUserAuth(r.data.loggedIn)
                    setOuterLoad(false)
                    if (r.data.loggedIn)
                        userPosts(r.data.user._id)
                })
                .catch(e => alert(e.message))
        }
        checkLogin()
    }, [])

    return (
        <div className='container'>
            {outerLoad ? <img src={loader} alt='' style={{ height: "125px" }} /> : <>
                {userAuth ? <div className='user-profile'>
                    <div className='box-1'>
                        <img src={user.user.gender === 'male' ? mprofile : fprofile} alt='' />
                        <div className='b1-box'>
                            <div className='b1-label'>First Name</div>
                            {/* <div>{user.user.fname}</div> */}
                            <input type={'text'} defaultValue={user.user.fname} disabled />
                        </div>
                        <div className='b1-box'>
                            <div className='b1-label'>Last Name</div>
                            {/* <div>{user.user.lname}</div> */}
                            <input type={'text'} defaultValue={user.user.lname} disabled />
                        </div>
                        <div className='b1-box'>
                            <div className='b1-label'>Username</div>
                            {/* <div>{user.user.username}</div> */}
                            <input type={'text'} defaultValue={user.user.username} disabled />
                        </div>
                        <div className='b1-box'>
                            <div className='b1-label'>Email ID</div>
                            {/* <div>{user.user.email}</div> */}
                            <input type={'text'} defaultValue={user.user.email} disabled />
                        </div>
                        <div className='pBtns'>
                            <button onClick={() => userLogout()}>Logout</button>
                            <button onClick={() => {
                                if (posts.length !== 0) {
                                    if (window.confirm('Delete all Gossips?'))
                                        deleteUserPosts(user.user._id)
                                }
                                else
                                    alert('No Gossips to Delete!')
                            }}>Delete Gossips</button>
                            <button onClick={() => {
                                if (posts.length === 0) {
                                    if (window.confirm('Delete Profile?'))
                                        delUser(user.user._id)
                                }
                                else
                                    alert('Delete your Gossips to Delete Profile!')
                            }}>Delete Profile</button>
                        </div>
                    </div>
                    {load ? <div className='box-2'>
                        <img src={loader} alt='' style={{ height: "125px" }} />
                    </div> : <div className='user-gossips-list'>
                        <div className='yg-head'>Your Gossips</div>
                        <div className='box-2'>
                            {posts.length !== 0 ? <>{posts.slice(0).reverse().map((post) => (
                                <div className='gossip-card' key={post._id}>
                                    <div className='card-head'>
                                        <img src={user.user.gender === 'male' ? mprofile : fprofile} alt='' />
                                        <div className='name-head'>
                                            <div className='name'>{post.fname} {post.lname}</div>
                                            <div className='username'>@{post.username}</div>
                                        </div>
                                        <RiDeleteBin6Line
                                            className='del'
                                            onClick={() => {
                                                if (window.confirm('Delete the post?')) {
                                                    deletePost(post._id)
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className='message-box'>
                                        <div className='message'>{post.message}</div>
                                        <div className='footer'>
                                            <hr />
                                            {/* <div className='date'>15/12/2022 - 9:30 PM</div> */}
                                            <div className='date'>{(new Date(post.createdAt)).toLocaleDateString()} / {(new Date(post.createdAt)).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}</> : <div style={{ margin: "15px 0", textAlign: "center", lineHeight: "1.5", fontSize: "18px" }}>Nothing to show!<br /><Link to={'/gossips'} style={{ color: "orange" }}>Gossip</Link></div>}
                        </div>
                    </div>}
                </div> : <div className='logged-out'>
                    <div className='not-logged-in'>Please Login</div>
                    <Link to={'/login'}>Login</Link>
                </div>}
            </>}
        </div>
    )
}

export default Profile