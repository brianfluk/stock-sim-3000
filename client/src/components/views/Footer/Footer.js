import React from 'react'
import { GithubOutlined } from '@ant-design/icons';


function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            margin: '0px'
        }}>
           <p> By Brian <GithubOutlined /></p>
        </div>
    )
}

export default Footer
