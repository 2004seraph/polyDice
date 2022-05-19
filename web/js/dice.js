"use strict"

function resetRoll() {
  //$('#customCount').val('')
  $("#outputpremessage").show()
  $('#outputBoxContent').html("")
}

function getDiceSetup() {
  let diceSetupData = {}
  
  diceSetupData.amountIn = parseInt($('#Amount').val())
  diceSetupData.sizeIn = parseInt($('#Sides').val())
  diceSetupData.customCounts = $('#customCount').val()
  diceSetupData.israw = $('#Raw').is(":checked")
  diceSetupData.iscount = $('#Count').is(":checked")

  //console.log(diceSetupData)

  return diceSetupData
}

function setDiceSetup(data) {
  $('#Amount').val(data.amountIn)
  $('#Sides').val(data.sizeIn)
  $('#customCount').val(data.customCounts)
  $('#Raw').prop('checked', data.israw)
  $('#Count').prop('checked', data.iscount)
}

function diceRoll(amount, side) {
  let results = []

  for (let a = 0; a < amount; a++) {
    results.push(Math.ceil(Math.random() * side))
  }

  return results
}

function userRoll() {
  let diceData = getDiceSetup()

  if (isNaN(diceData.amountIn) == true || isNaN(diceData.sizeIn) == true || diceData.amountIn < 1 || diceData.sizeIn < 2) {
    $('#outputBoxContent').html("<p>Please enter a valid dice configuration</p>")

    return
  }

  let roll = diceRoll(diceData.amountIn, diceData.sizeIn)

  let numberCount = {}

  for (var c = 0; c <= diceData.sizeIn; c++) {
    numberCount[c] = 0
  }
  for (var i = 0; i < diceData.amountIn; i++) {
    numberCount[roll[i]]++
  }
  for (var d = diceData.sizeIn; d >= 0; d--) {
    if (numberCount[d] == 0 || numberCount[d] == null) {
      delete numberCount[d]
    }
  }

  var numberCountString = ""

  if (diceData.israw) {
    numberCountString += "Each dice roll: " + "<br>" + JSON.stringify(roll) + "<br><br>"
  }

  if (diceData.iscount) {
    numberCountString += "Numbers (side: count, sum): " + "<br>"

    let numbers = Object.keys(numberCount)
    for (let [index, item] of numbers.entries()) {
      numberCountString += item.toString() + ": Count=" + numberCount[item] + ", Sum=" + (item * numberCount[item]).toString() + "<br>"
    }
  }

  let output = "<p>" + numberCountString
  
  //custom counting
  var customCountsIsValid = /^[0-9,]*$/.test(diceData.customCounts);

  if (!customCountsIsValid) {
    output += "<br>Invalid custom count input, it has been ignored."
  } else {
    if (diceData.customCounts != "") {
      let customCountNumbers = diceData.customCounts.split(",")

      let customSum = 0
      let customCount = 0

      for (let cnum of roll) {
        if (customCountNumbers.includes(cnum.toString())) {
          customSum += cnum
          customCount++
        }
      }

      output += "<br>Custom number selection [" + diceData.customCounts.toString() + "]: Count=" + customCount.toString() + ", sum=" + customSum.toString()
    }
  }

  $("#outputpremessage").hide()

  $('#outputBoxContent').html(output + "</p>")
}

//reset everything
// $(document).ready(function() {
// })