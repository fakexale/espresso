# espresso
a simple discord.js bot, uses [bun](https://bun.sh) and typescript

based on the [discord.js guide](https://discordjs.guide/), adapted to use bun and typescript.

## setting up
1. install the packages with ``bun i``, all the packages needed should be ready to go

2. create a ``.env`` file in the top-level director ywith these values

```toml
TOKEN="The bot's token"
APP_ID="The application ID for the bot"
GUILD_ID="The guild (ID) where guild commands are deployed to"
```

*GUILD_ID can be ommited as it is mostly used for testing, 
however you will have to deploy your commands as application commands
(as mentioned below)

3. run either ``bun run deploy`` or ``bun run deploy:guild`` depending on the scope of the commands
(guild or application commands)

4. run ``bun run dev`` to spin up the local dev server, your bot should be running