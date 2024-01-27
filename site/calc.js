// CALCULATORS AND FUNCTIONS //////////////////////////

// ----------------------------------------------------
// size of rectangles to draw

function rectangleSize() {
  if (staggered) {
    var xSize = patternWidth / (2 * clusters);
    var ySize = xSize * gauge;
    var rowCount = floor(2 * patternHeight / ySize) + 1;
  } else {
    var xSize = patternWidth / clusters;
    var ySize = xSize * gauge;
    var rowCount = floor(patternHeight / ySize);
  }
  return { xSize, ySize, rowCount };
}

// ----------------------------------------------------
// number of rectangles to draw 

function rectangleCount() {
  if (staggered) {
    numberOfCells = (rowCount) * clusters;
  } else {
    numberOfCells = rowCount * clusters;
  }
  return numberOfCells;
}

// ----------------------------------------------------
// coordinates of i-th rectangle

function findCoordinates(i) {

  // calculate row and column of i-th rectangle
  currentRow = floor(i / clusters + 1);
  currentCol = floor(i % clusters);

  // coordinates at bottom left of the pattern region
  xLeft = controlWidth + patternMargin;
  yBottom = topMargin + patternHeight;

  if (staggered && flat) {
    x = (currentRow % 2) ?
      xLeft + patternWidth - 2 * xSize * (currentCol + 1) :
      xLeft + 2 * xSize * (currentCol + 1 / 2);
    y = yBottom - (currentRow + 1) * ySize / 2;
  }

  else if (staggered && !flat) {
    x = (currentRow % 2) ?
      xLeft + patternWidth - 2 * xSize * (currentCol + 1) :
      xLeft + patternWidth - 2 * xSize * (currentCol + 1 / 2);
    y = yBottom - (currentRow + 1) * ySize / 2;
  }

  else if (!staggered && flat) {
    x = ((currentRow % 2)) ?
      xLeft + patternWidth - xSize * (currentCol + 1) :
      controlWidth + patternMargin + xSize * currentCol;
    y = yBottom - currentRow * ySize;
  }

  else if (!staggered && !flat) {
    x = xLeft + patternWidth - xSize * (currentCol + 1);
    y = yBottom - currentRow * ySize;
  }

  return { x, y };
}

// ----------------------------------------------------
// partial sums of the set of color numbers

function magicSumsList() {
  magicSums = [];
  for (j = 0; j < numberOfColors; j++) {
    magicSums[j] = 0;
    for (k = 0; k < j + 1; k++) {
      magicSums[j] += int(magic[k].value());
    }
  }
  return magicSums;
}

// Total sum of magic
function magicSumTotal() {
  magicTotal = 0;
  for (i = 0; i < numberOfColors; i++) {
    magicTotal += int(magic[i].value());
  }
  return magicTotal;
}

// ----------------------------------------------------
// color of i-th rectangle

function findColorIndex(i) {
  colorIndex = 0;
  totalSum = magicSums[numberOfColors - 1];
  for (j = 0; j < numberOfColors; j++) {
    if ((i % totalSum) + 1 > magicSums[j]) { colorIndex = j + 1; };
    // GLITCH ATTEMPT
    //if ((i%totalSum)+1 > magicSums[j+floor(random(-2,2))]) { 
    //  colorIndex = j+1;
    //}
  }
  return colorIndex;
}

// ----------------------------------------------------
// obtain text string of nonzero magic values with commas

function getMagicList() {
  string = magic[0].value();
  for (j = 1; j < magic.length; j++) {
    if (magic[j].value() != 0) {
      string = string + "," + magic[j].value();
    }
  }
  return string;
}

// ----------------------------------------------------
// obtain text string of nonzero magic values with underscores
function getMagicString() {
  string = magic[0].value();
  for (j = 1; j < magic.length; j++) {
    if (magic[j].value() != 0) {
      string = string + "_" + magic[j].value();
    }
  }
  return string;
}

// ----------------------------------------------------
// obtain text string for filenames
function getFileName() {
  string = "pooling_" + getMagicString(magic) + "_C" + clusters;
  return string;
}

// ----------------------------------------------------
// replace magic, colors, and clusters based on an existing yarn

function setYarn(index) {
  for (j = 0; j < numberOfColors; j++) {
    magic[j].value(yarns[index].magic[j]);
    colors[j].value(yarns[index].colors[j]);
  }
  if (staggered) {
    clustersSlider.value(yarns[index].clusters);
  } else {
    clustersSlider.value(2 * yarns[index].clusters);
  }
  updateClustersInput();
  redraw();
}

// ----------------------------------------------------
// walk through from j= 0 to numberOfColors and build new lists
// assumes that all nonzero colors are at the start

function cycleColors() {
  // initialize and save first values
  let saveFirstMagic = magic[0].value();
  let saveFirstColors = colors[0].value();
  let j = 0;

  // cycle values back one index until you reach a zero or until the end
  while ((magic[(j + 1) % numberOfColors].value() != 0) && (j < numberOfColors - 1)) {

    magic[j].value(magic[j + 1].value());
    colors[j].value(colors[j + 1].value());
    j++;
  }

  // put previous first value in last nonzero spot
  magic[j].value(saveFirstMagic);
  colors[j].value(saveFirstColors);

  redraw();
}

// ----------------------------------------------------
// shuffle color order and magic values
// took COPILOT out for a test drive on this one
// had to help it out a little bit with the nonzero lists :)

function shuffleColors() {

  // initialize and save first values
  let saveFirstMagic = magic[0].value();
  let saveFirstColors = colors[0].value();
  let j = 0;

  // create temporary lists of nonzero magic and colors
  let nonzeroMagic = [];
  let nonzeroColors = [];
  for (j = 0; j < numberOfColors; j++) {
    if (magic[j].value() != 0) {
      nonzeroMagic.push(magic[j].value());
      nonzeroColors.push(colors[j].value());
    }
  }

  // shuffle the temporary lists
  nonzeroMagic = shuffle(nonzeroMagic);
  nonzeroColors = shuffle(nonzeroColors);

  // put the shuffled values back in the magic and colors lists
  j = 0;
  for (k = 0; k < nonzeroMagic.length; k++) {
    magic[j].value(nonzeroMagic[k]);
    colors[j].value(nonzeroColors[k]);
    j++;
  }

  redraw();
}

// ----------------------------------------------------
// set new random colors with new random magic values

function randomizeMagicAndColors() {

  // randomly choose color palette data and create a new 13-color palette
  // use shuffled palette 30% of the time
  randomPalette = palettes[floor(random(palettes.length))];
  shuffledPalette = shuffle(randomPalette);
  newPalette = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff"];
  if (random(1) < .7) {
    newPalette.splice(0, randomPalette.length, ...randomPalette);
  } else {
    newPalette.splice(0, shuffledPalette.length, ...shuffledPalette);
  }

  // // TESTING - go through palettes one at a time (t=0 set in sketch)
  // // first plain and then two shuffles
  // console.log(t, "-----------------------------");
  // randomPalette = palettes[floor(t/3)];
  // shuffledPalette1 = shuffle(randomPalette);
  // shuffledPalette2 = shuffle(randomPalette);
  // newPalette = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
  //               "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", 
  //               "#ffffff", "#ffffff", "#ffffff"];
  // if (t % 3 == 0) {
  //   newPalette.splice(0, randomPalette.length, ...randomPalette);
  //   console.log("newPalette is ", newPalette);
  // } else if (t % 3 == 1) {
  //   newPalette.splice(0, shuffledPalette.length, ...shuffledPalette1);
  //   console.log("first shuffle is ", newPalette);
  // } else if (t % 3 == 2) {
  //   newPalette.splice(0, shuffledPalette.length, ...shuffledPalette2);
  //   console.log("second shuffle is ", newPalette);
  // }
  // t++


  // randomly choose the magic numbers for each nonblank color in new palette
  newMagic = [];
  newNumberOfColors = randomPalette.length;
  for (i = 0; i < numberOfColors; i++) {
    if (i < newNumberOfColors) {
      newMagic.push(str(10 - floor(pow(random(2, 99), .5))));
    } else {
      newMagic.push('0');
    }
  }

  // choose clusters to be something good
  newSum = 0;
  for (i = 0; i < newNumberOfColors; i++) { newSum += int(newMagic[i]); }
  if (newSum < 20) newSum = 2 * newSum;
  if (newSum < 40) newSum = 2 * newSum;
  randomChoice = floor(random(0, 4));
  goodClusters = [newSum - 1, newSum + 1,
  floor((3 / 2) * newSum) - 1, floor((3 / 2) * newSum) + 1,
  floor((5 / 2) * newSum) - 1, floor((5 / 2) * newSum) + 1,
  floor((5 / 4) * newSum) - 1, floor((5 / 4) * newSum) + 1,
  floor((7 / 4) * newSum) - 1, floor((7 / 4) * newSum) + 1];
  newClusters = goodClusters[randomChoice];
  if (newClusters > clustersSlider.elt.max) {
    newClusters = newSum - 1;
  }
  clusters = newClusters;
  clustersInput.value(clusters);
  clustersSlider.value(clusters);

  // update everything
  for (j = 0; j < numberOfColors; j++) {
    magic[j].value(newMagic[j]);
    colors[j].value(newPalette[j]);
  }

  // set dropdown value


  redraw();

}


