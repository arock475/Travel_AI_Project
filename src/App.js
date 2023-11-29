import logo from './logo.svg';
import './App.css';
import OpenAI from 'openai';
import React, { useState, useEffect } from 'react';


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

function App() {
  const [ResponseState, setResponseState] = useState();
  const [userInputState, setUserInputState] = useState();


  function handleSubmit(e){
    e.preventDefault();

    const form = e.target;
    setUserInputState(form.userInputCity.value);
    console.log(form.userInputCity.value);

    const getResponse = async() => {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages:[
          {
            "role": "user",
            "content": `Please give me the top 10 restaurant options in ${ form.userInputCity.value }`,
          }
        ]
      });
      var res = response.choices[0].message.content;
      for(let i = 2; i < 11; i++){
        res = res.replace((String(i) + "."), "\n\n" + String(i) + ".");
      }
      console.log("response: " + res);
      setResponseState(response.choices[0].message.content);
    };
    getResponse();

  }

  return (
    <div className="App">
      <header className="App-header">
        <form method="post" onSubmit={handleSubmit}>
          <label>Enter the city you wish to get restaurant recommendations for</label>
          <p/>
          <input name="userInputCity" />
          <button type="submit">Search</button>
        </form>
        <div className='display-linebreak'>
          { ResponseState }
        </div>
      </header>
    </div>
  );
}

export default App;
