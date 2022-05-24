function outputConsoleSay(htmlstring) {
    $("#outputpremessage").hide()
    $('#outputBoxContent').html(htmlstring)
}

function resetOutputConsole() {
    $("#outputpremessage").show()
    $('#outputBoxContent').html("")
}