import React from 'react';
import './About.scss';

const About = () => {
  return (
      <div className="about">
          <h2 style={ {marginTop: "20px"} }>Tips</h2>
          <ul className="about-tips">
            <li>
               Videos/captions are automatically updated at 10 AM GMT daily from the DSPGaming and King of Hate Vlog channels.
            </li>
            <li>A very simple system is used to match words, so for example entering 'vest' will return matches for 'invest', 'vestige' etc. (This applies to counts shown on Trends as well).<br/>
               To somewhat get around this, you can add blank spaces to the start and end of the word/phrase e.g. ' vest '. Note that this might result in fewer results in reality though if a caption starts or ends with the word/phrase (as there won't be a space before/after it so it won't match). </li>
            <li>The database is built from YouTube's automatically generated captions so there will be mistakes, misspellings etc.
                Try searching for what you think would be the most common spelling based on the sound of the word. For example
                you'll get more results for 'Fortnight' than 'Fortnite', 'Derrick' than 'Derrich' etc.. </li>
            <li>
                Captions are stored in blocks of text a few words each, and I didn't go to an Ivy League school so my dumb algorithm isn't book smart enough to match across text blocks yet.
                So if you search for "my wife" and the "my" happens to be at the end of a block and the "wife" at the start of the next block, it won't match. 
                Hoping to improve the search so it can handle this in the future but for now if you don't get any results when using multiple words, try reducing the number of words.
            </li>
            <li>
              I have tried to add unrecorded videos where possible from sources such as Mr. Huth but these might take a while to be added and I may miss some.
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
