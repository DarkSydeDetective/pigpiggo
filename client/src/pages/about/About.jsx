import React from 'react';
import './About.css';

const About = () => {
  return (
      <div className="about">
          <h2>Updates</h2>
          <ul className="about-tips">
            <li>2019/10/17 Added THEKINGOFHATEVLOGS videos</li>
          </ul>
          <h2 style={ {marginTop: "20px"} }>Tips</h2>
          <ul className="about-tips">
            <li>The database is built from YouTube's automatically generated captions so there will be mistakes, misspellings etc.
                Try searching for what you think would be the most common spelling based on the sound of the word. For example
                you'll get more results for 'Fortnight' than 'Fortnite', 'Derrick' than 'Derrich' etc.. </li>
            <li>
                Captions are stored in blocks of text a few words each, and I didn't go to an Ivy League school so my dumb algorithm isn't book smart enough to match across text blocks yet.
                So if you search for "my wife" and the "my" happens to be at the end of a block and the "wife" at the start of the next block, it won't match. 
                Hoping to improve the search so it can handle this in the future but for now if you don't get any results when using multiple words, try reducing the number of words.
            </li>
            <li>
              Dave being the most prolific content creator of our time has a shit ton of videos, not all of which have been incorporated yet.
              I hope to have all the videos in there very soon but if what you want isn't coming up it's possible the video containing the part you're looking for just hasn't been added yet.
              New videos may also take me a day or two to add but hopefully I can automate this in the future.
            </li>
            <li>
              Data is currently only taken from the DSPGaming channel so if it's something unrecorded or on another channel, it won't show up. Again, I hope to add more channels/videos soon.
            </li>
          </ul>
          <h2 style={ {marginTop: "20px"} }>Feedback</h2>
          <p>
            This is just for the lulz so not gonna be putting too much work into it, but having said that if you have a feature that you think would be really good or want to get in touch feel free to on twitter <a href="https://twitter.com/DetectiveSyde" target="_blank" rel="noopener noreferrer">@DetectiveSyde</a>. 
            I don't wanna promise the world and then let people down dood.
          </p>
      </div>
  );
}

export default About;
