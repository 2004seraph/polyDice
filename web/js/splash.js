let splashTexts = [
    "Tip: Saving a preset as the same name as an existing one will overwrite it/update it",
    "<a href='https://github.com/Sammot/polyDice'>Click here to make suggestions (github page)</a>",
    "This was made for a nation DnD game",
    "Gigantic rolls may take a while",
    "<a href='https://byeol.online/'>Click to check out my friend byron's socials website</a>",
    "<a href='https://cyanseraph.net/'>I make other stuff, check them out here</a>"
]

let splashIndex = Math.floor(Math.random() * splashTexts.length)

$('#splash').html(splashTexts[splashIndex])

setInterval(() => {
    $('#splash').slideUp("slow", () => {
        splashIndex = (splashIndex + 1) % splashTexts.length
        $('#splash').html(splashTexts[splashIndex])
        $('#splash').slideDown()
    })
}, 5000)