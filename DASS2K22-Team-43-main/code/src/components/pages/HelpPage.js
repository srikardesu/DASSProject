
import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'

export default function HelpPage() {
    return (
        <header style={ HeaderStyle }>
            <p className="main-para text-center" style={{ color: "grey" }}>About Us:</p>
            <p className= "text-center">Malkha's aim is to replace large spinning mills with small units located close to cotton farms and cotton weavers, so that the scale of spinning matches the small scales of farming and weaving.

Malkha hopes to link famers, spinners, and weavers to each other so that they become more than just economic partners, but rather a community of producers who can support and nurture each other. In this way, we hope that the producers of cotton - lint, yarn, and cloth - are also able to wear what they produce.</p>
            <p className="main-para text-center" style={{ color: "grey" }}>The making of Malkha</p>
            <p className='text-center'>The tradition of Indian cotton goes back thousands of years. It has always been diverse, from the seeds used by farmers to the spindles and dyes through which we produce our yarn to the innumerable styles, colours, and textures of cotton cloth throughout the nation.</p>
            <p className='text-center'>Despite the pressures of a global market, Indian cotton remains cheerful and vibrant. Malkha's kora cloth is only one way in which we can see this - from Gujarat to Tamil Nadu to Nagaland we can see cotton worn every day, professionally and personally, formally and informally.</p>
            <p className='text-center'>It is this profound, every-day beauty that Malkha seeks to represent - the beauty of the cotton farmer who looks over the land and sky with a knowing gaze and the natural dyer whose hands have turned blue with indigo.

As an experiment, Malkha has gone through many transformations. As we reconsider and return to what has always been our strength, we also look to the future.</p>
<p className="main-para text-center" style={{ color: "grey" }}>Contact Us:</p>
            <p className='text-center'>Show Room: Third Floor, Crafts Council Telangana Building <br/>
#28/1/3/1, MLA Colony,<br/>
Rd. No. 12, Banjara Hills<br/>  
Hyderabad, Telangana 500034</p>
            <p className='text-center'>Email: yes@malkha.in</p>

        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}