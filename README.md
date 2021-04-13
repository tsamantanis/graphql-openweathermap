# A GraphQL for the OpenWeatherMap API

## Installation

Make sure you have `npm` installed. The run:

```
npm install
```
to install the dependencies

## Setup

Navigate to [OpenWeatherMap](https://openweathermap.org) and create an account. Choose the `API keys` tab and generate a new key. The copy and paste that key into a `.env` in the format found inside `.env.example`

## Usage

Run the server with the following command:
```
npm start
```

Open your browser and navigate to `localhost:PORT/graphql` replacing `PORT` with the port you declared in your `.env` file. If you didn't declare one, the server will default at `PORT=5000`.
You can then make a GraphQL query like this:

```
{
    getWeather(zip: 94122) {
        temperature
        description
        feels_like
        temp_min
        temp_max
        pressure
        humidity
        cod
        message
    }
}
```

In the case that your query is not fulfilled successfully, the GraphQL response will look like the following:
```
{
    "data": {
        "getWeather": {
            "temperature": null,
            "description": null,
            "feels_like": null,
            "temp_min": null,
            "temp_max": null,
            "pressure": null,
            "humidity": null,
            "cod": 404,
            "message": "city not found"
        }
    }
}

```
