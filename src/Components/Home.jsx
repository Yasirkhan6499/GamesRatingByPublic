import React, { Component } from 'react';
import BannerImage from './banner';
import GameForm from './gameForm';
import GamePost from './gamePost';
import Auth from './auth';

const Home = () => {
    return (
        <React.Fragment>
        {/* <section>
            <BannerImage />
        </section> */}
        <h2>hiiiiiiiii</h2>
        <section>
            <GameForm />
        </section>
        {/* <section>
            <Auth />
        </section> */}
        {/* <section>
            <GamePost />
        </section> */}
        </React.Fragment>
        
      );
}
 
export default Home;