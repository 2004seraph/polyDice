"use strict"

var lastResults = {}

function resetRoll() {
  //$('#customCount').val('')
  $("#outputpremessage").show()
  $('#outputBoxContent').html("")

  lastResults = {}
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

  lastResults.rolled = true
  lastResults.dice = {amount: diceData.amountIn, sides: diceData.sizeIn}

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

  lastResults.roll = {}
  if (diceData.israw) {
    lastResults.roll.is = true
    lastResults.roll.rolls = roll
    numberCountString += "<p>Each dice roll:</p>" + "<ul><li>" + JSON.stringify(roll) + "</li></ul>"
  }

  lastResults.counts = {}
  if (diceData.iscount) {
    numberCountString += "<p>Totals:</p>"
    numberCountString += "<ul>"

    lastResults.counts.items = {}

    let numbers = Object.keys(numberCount)
    for (let [index, item] of numbers.entries()) {
      lastResults.counts.is = true
      lastResults.counts.items[item] = {count: numberCount[item], sum: item * numberCount[item]}
      numberCountString += "<li>[" + item.toString() + "]: Count=" + numberCount[item] + ", Sum=" + (item * numberCount[item]).toString() + "</li>"
    }
    numberCountString += "</ul><ul><li>count represents how many times that side was rolled</li><li>sum represents the side number multiplied by the count</li></ul>"
  }

  let output = numberCountString
  
  //custom counting
  var customCountsIsValid = /^[0-9,]*$/.test(diceData.customCounts);
  lastResults.customCount = {}
  if (!customCountsIsValid) {
    output += "<p>Invalid custom count input, it has been ignored.</p>"
  } else {
    if (diceData.customCounts != "") {
      lastResults.customCount.is = true
      let customCountNumbers = diceData.customCounts.split(",")

      let customSum = 0
      let customCount = 0

      for (let cnum of roll) {
        if (customCountNumbers.includes(cnum.toString())) {
          lastResults.counts.is = true
          customSum += cnum
          customCount++
        }
      }

      lastResults.customCount.numbers = customCountNumbers
      lastResults.customCount.count = customCount
      lastResults.customCount.sum = customSum

      output += "<p>Custom number selection [" + diceData.customCounts.toString() + "]: Count=" + customCount.toString() + ", sum=" + customSum.toString() + "</p>"
    }
  }

  $("#outputpremessage").hide()

  $('#outputBoxContent').html(output)
}

function saveRoll() {
  if ("rolled" in lastResults) {
    let fileData = "polyDice Roll @ " + window.location.href + "\n\n"

    fileData += "rolled " + lastResults.dice.amount + " " + lastResults.dice.sides + "-sided dice\n\n"

    if ("is" in lastResults.roll) {
      fileData += "Each Roll: " + JSON.stringify(lastResults.roll.rolls) + "\n\n"
    }

    if ("is" in lastResults.counts) {
      for (var i in lastResults.counts.items) {
        fileData += i + ": Count=" + lastResults.counts.items[i].count + ", Sum=" + lastResults.counts.items[i].sum + "\n"
      }
    }

    if ("is" in lastResults.customCount) {
      fileData += "\nCustom Totals of " + JSON.stringify(lastResults.customCount.numbers) + ": Count=" + lastResults.customCount.count + ", Sum=" + lastResults.customCount.sum
    }
    var a = document.getElementById("downloadSink")
    var d = new Date()
    var t = d.toLocaleDateString() + "_" + d.toLocaleTimeString().replace(/\s+/g, '')
    a.setAttribute("download", "diceRoll_" + t + ".txt")
    a.setAttribute("href", "data:text/txt," + fileData)
    document.body.appendChild(a)
    a.click()
  }
}

//reset everything
// $(document).ready(function() {
// })