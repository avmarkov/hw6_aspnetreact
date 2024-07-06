
import React, { useState } from 'react';

import axios from 'axios';

export function WeatherFunc() {

    const [urlText, setUrl] = useState(`${process.env.REACT_APP_API}/WeatherForecast`);
    const [response, setResponse] = useState('');
    const [errorStr, setErrorStr] = useState('');
    const [color, setColor] = useState('');
    

    const handleButtonClick = async () => {
        try {
            console.log(urlText);
            console.log(`${process.env.REACT_APP_API}/WeatherForecast`);
            const apiResponse = await axios.get(urlText);
            setResponse(JSON.stringify(apiResponse.data, null, 2));
            setColor('black');
            console.log(apiResponse.data);
        } catch (error) {
            setErrorStr(JSON.stringify(error));
            setColor('red');
            setResponse(JSON.stringify(error));
            console.log(`Ошибка: ${error}`);
        }
    };

    return <div>
        <p><b>Погода</b> </p>       
        <button onClick={handleButtonClick}>Запросить</button>
        <div style={{ color: color }}>{response}</div>
    </div>

    
}


//<button onClick={this.handleButtonClick}>Отправить</button>
//       <div style={{ color: this.state.color }}>{this.state.response}</div>