let splashTexts = [
    "Tip: Saving a preset as the same name as an existing one will overwrite it/update it",
    "<a href='https://github.com/Sammot/polyDice'>Click here to make suggestions (github page)</a>",
    "This was made for a nation DnD game",
    "Gigantic rolls may take a while",
    "<a href='byeol.online'>Click to check out my friend byron's socials website</a>",
    "<a href='cyanseraph.net'>I make other stuff, check them out here</a>"
]

$('#splash').html(splashTexts[Math.floor(Math.random() * splashTexts.length)])