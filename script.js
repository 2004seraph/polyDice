var siteWidth = 1280
var scale = screen.width /siteWidth

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'')



function diceRoll(amount, side) {
  let results = []

  for (let a = 0; a < amount; a++) {
    results.push(Math.ceil(Math.random() * side))
  }

  return results
}

function userRoll() {
  var amountIn = parseInt($('#Amount').val())
  var sizeIn = parseInt($('#Sides').val())

  if (isNaN(amountIn) == true || isNaN(sizeIn) == true || amountIn < 1 || sizeIn < 2) {
    $('#outputBox').html("<p>Please enter a valid dice configuration</p>")

    return
  }

  let roll = diceRoll(amountIn, sizeIn)

  let numberCount = {}

  for (var c = 0; c <= sizeIn; c++) {
    numberCount[c] = 0
  }
  for (var i = 0; i < amountIn; i++) {
    numberCount[roll[i]]++
  }
  for (var d = sizeIn; d >= 0; d--) {
    if (numberCount[d] == 0 || numberCount[d] == null) {
      delete numberCount[d]
    }
  }

  var numberCountString = ""

  if ($('#Raw').is(":checked")) {
    numberCountString += "Raw: " + "<br>" + JSON.stringify(roll) + "<br><br>"
  }

  if ($('#Count').is(":checked")) {
    numberCountString += "Numbers (side: count, sum): " + "<br>"

    let numbers = Object.keys(numberCount)
    for (let [index, item] of numbers.entries()) {
      numberCountString += item.toString() + ": Count=" + numberCount[item] + ", Sum=" + (item * numberCount[item]).toString() + "<br>"
    }
  }

  let output = "<p>" + numberCountString
  
  //custom counting
  let customCounts = $('#customCount').val()

  if (customCounts != "") {
    let customCountNumbers = customCounts.split(",")

    let customSum = 0
    let customCount = 0

    for (let cnum of roll) {
      if (customCountNumbers.includes(cnum.toString())) {
        customSum += cnum
        customCount++
      }
    }

    output += "<br>Custom number selection [" + customCounts.toString() + "]: Count=" + customCount.toString() + ", sum=" + customSum.toString()
  }

  $('#outputBox').html(output + "</p>")
}

//reset everything
$(document).ready(function() {
  $('form').on('reset', function(e) {
    $('#customCount').val('')
    $('#outputBox').html("<p>Make sure to only type numbers and commas in the custom count entry, no spaces</p>")
  })
})