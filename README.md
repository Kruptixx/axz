# R<nd0m axz E40 | The bot with no axz
@ Kruptixx
Bot app for Discord

Requires:
- Node.js (ES6)
- Discord.js - Discord API wrapper
- Axios for HTTP requests
- Jest for unit tests
- config file (JSON type) with token to access as a bot

config.json example
```JS
{
  "fullname" : "DiscordLoginNameHere",
  "secret" : "ClientSecretHere",
  "id" : "BotIDHere",
  "token" : "BotTokenHere",
  "prefix" : "BotPrefixForCommandsHere",
  "authorid" : "AuthorIDHere",
  "weather": {
    "url": "http://api.openweathermap.org/data/2.5/weather",
    "appid": "YourAppid"
  }
}
```
