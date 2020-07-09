import React from 'react'

function Footer() {
    return (
        <>
            <footer className="page-footer font-small" style={{backgroundColor:'#6b00b3'}}>
                <div className="container-fluid text-center text-md-left">
                    <div className="footer-copyright text-center py-2 text-white">
                        Developer: <a href="https://github.com/hkm007" style={{color:'white'}}>HKM007</a> <br />
                        Copyright © {new Date().getFullYear()}. All Rights Reserved. 
                    </div>
                </div>
            </footer>   
        </>
    )
}

export default Footer
