function outputConsoleSay(htmlstring) {
    clearOutputConsole(() => {
        $("#outputpremessage").fadeOut("fast", () => {
            $('#outputBoxContent').html(htmlstring)
            $('#outputBoxContent').fadeIn("fast")
        })
    })
}

function resetOutputConsole(callback=function() {}) {
    clearOutputConsole(() => {
        $("#outputpremessage").fadeIn("fast")
        callback()
    })
}

function clearOutputConsole(callback=function() {}) {
    $('#outputBoxContent').fadeOut("fast", () => {
        $('#outputBoxContent').html("")
        callback()
    })
}