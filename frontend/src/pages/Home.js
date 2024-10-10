import React from 'react'
import '../styles/Home.css';
import '../assets/about.txt';

function Home() {
  return (
    <div className="description">
        <div className="slogan">
            CHALLENGE YOURSELF TODAY.
        </div>
        <div className="about">
            Turn fitness into a fun, social experience with daily challenges designed to keep you active and motivated. Each day, you’ll receive a new fitness prompt—whether it’s “Do 20 push-ups” or “Take a 15-minute walk”. Complete the challenge solo or invite friends to join the fun. Track your progress, share workout results with photos, and see your fitness scores rise as you stay engaged. Fitness is better together—start your journey with WeAreFit today!
        </div>
    </div>
  )
}

export default Home
