import React from 'react'

import Testimonials from '../misc/Testimonials'
import Pricing from '../misc/Pricing'
import Header from '../misc/Header'
import MainContent from '../misc/MainContent';

const Home = () => {
    return (
        <React.Fragment>
            <Header />
            <MainContent/>
            <Pricing />
            <Testimonials />
        </React.Fragment>
    )
}

export default Home;

/*
            <Pricing />
            <Testimonials />

*/