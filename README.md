# espresso
a simple discord.js bot, uses pnpm and typescript

to run any of the scripts mentioned here, running ``tsc`` is necessary

based on the [discord.js guide](https://discordjs.guide/), adapted for dotenv and typescript.

# setup
this section shows you how to run espresso locally
## packages

install the packages with your preferred package managed, pnpm is preffered.

## enviornment
create a ``.env`` in the top-level directory with the values given

```toml
TOKEN="Your bot's token"
APP_ID="Your application's ID"
GUILD_ID="Your testing guild's (server) ID"
```

# usage
just 2 slightly inconvenient steps

## setting up commands
register the commands by running either ``dist/scripts/deployCommands.js`` or ``dist/scripts/deployGuildCommands.js``

if these are not present, use ``tsc`` or ``pnpm run build``.
depending on whether you have typescript installed globally

### difference between deployGuildCommands and deployCommands
as stated in the guide, the only difference is the scope at which commadns can be accessed.

``deployGuildCommands.js`` will deploy the commands to ``GUILD_ID`` (specified in .env).
commands will only be accessible in the guild.

``deployCommands.js`` will deploy the commands globally.
commands will be accessible everywhere.

## running the dev server
depending on your package manager, run the equivalent of

```shell
pnpm run dev
```

considering you did everything else correctly, it should be running locally