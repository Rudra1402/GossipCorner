import React from 'react'
import '../css/navbar.css'
import gc from '../images/gc.png'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineUserAdd } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogIn } from 'react-icons/io'
import { MdOutlineForum } from 'react-icons/md'
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

function Navbar() {
    return (
        <div className='navbar'>
            {/* {toggle ?
                <GiHamburgerMenu className='ham' onClick={() => setToggle(!toggle)} /> :
                <MdOutlineCancel className='cross' onClick={() => setToggle(!toggle)} />} */}
            <div className='top'>
                <img src={gc} alt='GossipCorner' className='logo' />
                <div className='containLinks'>
                    <Link to={'/'}><AiOutlineHome />&nbsp;Home</Link>
                    <Link to={'/gossips'}><MdOutlineForum />&nbsp;Gossips</Link>
                    <Link to={'/profile'}><CgProfile />&nbsp;Profile</Link>
                    <Link to={'/login'}><IoIosLogIn />&nbsp;Login</Link>
                    <Link to={'/signup'}><AiOutlineUserAdd />&nbsp;Sign Up</Link>
                </div>
            </div>
            <div className='bottom'>
                <div className='socials'>
                    <a target={'_blank'} href='https://github.com/Rudra1402' rel="noreferrer">
                        <FaGithub className='s-logo' />
                    </a>
                    <a target={'_blank'} href='https://twitter.com/rp14ok' rel="noreferrer">
                        <FaTwitter className='s-logo' />
                    </a>
                    <a target={'_blank'} href='https://www.instagram.com/rudra.patel.14' rel="noreferrer">
                        <FaInstagram className='s-logo' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar