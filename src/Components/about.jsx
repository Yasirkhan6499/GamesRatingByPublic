import React, { Component } from 'react';
import yasir from "../img/Yasir.JPG";
import RatingSystem from './rating';
import { signInWithEmailAndPassword } from 'firebase/auth';
const About = () => {
    return ( 
       <div className='about-section'>
         <h2>GRBP Story</h2>
         <div className="about-content">
            <img src={yasir} alt="" />
            <p>Hello, my name is Yasir Khan, and I am the owner of
                "Games Rating By Public." This website has a clear goal: to provide a platform where
                 visitors can easily discover how much a particular game is 
                 loved by the public. Additionally, it offers the opportunity 
                 for anyone to rate games on a scale of 1 to 5 stars. A rating of
                  1 signifies disappointment, while a rating of 5 indicates immense
                   love for the game. I might add additional features in the near 
                   fututre. If you have any suggestions, I would love to hear from you! Please 
                    don't hesitate to contact me directly at 
                    <a className='email-link' href="mailto:yasirkhan6499@gmail.com"> yasirkhan6499@gmail.com</a>.
            </p>
         </div>
        </div>
     );
}
 
export default About;