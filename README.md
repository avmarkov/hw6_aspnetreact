# Домашняя работа: Создать проект для React.js и связать с проектом по API
### Развёртывание на одном хосте:
#### 1. Создайте новый проект из шаблона ASP.NET Core Web Application with React.js.
Создал
#### 2. Убедитесь, что в файле Startup.cs добавлено SPA-middleware.
SPA-middleware В .Net 8, как я понял здесь:
<image src="images/SPA.png" alt="result">

#### 3. Запустите ваш проект и убедитесь что фронтенд и бекенд работают правильно.
Запустил, вроде все правильно:
<image src="images/res.png" alt="result">

#### 4. Также можете запустить сборку фронтенда отдельно от процесса сборки бекенда. Для этого используйте метод UseProxyToSpaDevelopmentServer().
Сборка фронтенда в .Net 8 проиходит отдельно от процесса сборки бекенда

### Развёртывание на разных хостах:
#### 1. Создайте новый бекенд проект из шаблона ASP.NET Core Web Application with API.
Создал проект WebAppBack
#### 2. Создайте новый фронтенд проект с помощью create-react-app.
Создал reactapp
#### 3. На бекенде настройте CORS для адреса вашего фронтенд приложения.
Настроил:
```cs
var myCors = "MyCors";
builder.Services.AddCors(options=>
{
    options.AddPolicy(name: myCors,
        corsBuilder =>
        {
            corsBuilder.WithOrigins(builder.Configuration.GetSection("CORS:Origins").Get<string[]>())
            .WithHeaders(builder.Configuration.GetSection("CORS:Headers").Get<string[]>())
            .WithMethods(builder.Configuration.GetSection("CORS:Methods").Get<string[]>());
        });
});

......

app.UseCors(myCors);

```

Файл appsettings.json:

```cs
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "CORS": {
    "Headers": [ "*" ],
    "Origins": [ "*" ],
    "Methods": [ "DELETE" ]
  }

}
```


#### 4. На фронтенде создайте страницу с отображением погоды. Данные о погоде получайте с вашего бекенд приложения.

Страницу создал:
<image src="images/weather.png" alt="result">

Исходник страницы
```ts
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

```

Url бекенда беру из переменной среды окружения REACT_APP_API=http://localhost:5511