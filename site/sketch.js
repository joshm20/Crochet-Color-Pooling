// mathgrrl Crochet Color Pooling
// made with p5.js March 2023

// online at mathgrrl.com/crochet-color-pooling
// uploaded at geekhaus.com/cpanel 
// in folder www/testmathgrrl/crochet-color-pooling

// TODO - shuffle color order
// TODO - add "good ones" button next to Clusters input

// INITIALIZE /////////////////////////////////////////

// from yarn info in yarns.js
magicInitial = yarns[0].magic;
colorsInitial = yarns[0].colors;
clusters = yarns[0].clusters;
numberOfColors = yarns[0].colors.length;

// initial values
gauge = 2;
focusRow = 1;
focus = false;
staggered = true;
flat = true;
borders = true;
debug = false;

// for testing colors; see calc.js
t = 55;

// preload font
function preload() {
  titleFont = loadFont("fonts/Baloo2-ExtraBold.ttf");
}

// SETUP //////////////////////////////////////////////

function setup() {

  createCanvas(1230, 920);
  background(255);
  noLoop();

  // --------------------------------------------------
  // set up region sizes to fill canvas

  topMargin = 140;
  patternMargin = 65;
  sideIndent = 60;
  verticalGap = 80;

  controlWidth = 320;
  controlHeight = height - topMargin;

  colorsWidth = width - controlWidth - 2 * patternMargin;
  colorsHeight = 100;

  patternWidth = colorsWidth;
  patternHeight = controlHeight - colorsHeight;

  // --------------------------------------------------
  // create user interfaces with gui.js

  createGUI_magic();
  createGUI_colors();
  createGUI_clusters();
  createGUI_stitch();
  createGUI_direction();
  createGUI_focus();
  createGUI_yarn();

}

// DRAW ///////////////////////////////////////////////

function draw() {

  // --------------------------------------------------
  // redraw background only width of pattern and pattern margin
  fill(255);
  noStroke();
  rect(controlWidth, 0, 2 * patternMargin + patternWidth, height);


  // --------------------------------------------------
  // calculations from calc.js

  xSize = rectangleSize().xSize;
  ySize = rectangleSize().ySize;
  rowCount = rectangleSize().rowCount;
  numberOfCells = rectangleCount();
  magicSums = magicSumsList();

  // --------------------------------------------------
  // draw rectangles snaking up from bottom right
  for (i = 0; i < numberOfCells; i++) {

    // calculate position and color of i-th rectangle
    x = findCoordinates(i).x;
    y = findCoordinates(i).y;
    colorIndex = findColorIndex(i);

    // draw the rectangle
    stroke(250);
    strokeWeight(0.06 * xSize);
    if (!borders) noStroke();
    fill(colors[colorIndex].value());
    rect(x, y, xSize, ySize);

    if (debug) showCellNumbers(i, x, y);

    // gray out all but one row if in focus mode
    if (focus && (currentRow !== int(focusRow))) {
      fill(255, 255, 255, 200);
      rect(x, y, xSize, ySize);
    }
  }

  // --------------------------------------------------
  // text and decorations from decor.js

  if (frameCount == 1) redraw(); // cheap font pre-load

  drawTitleAndHeader();
  drawQuickNotes();
  drawKeyboardShortcutsList();
  drawMagicSum();

  drawArrowAtRow(1);
  drawArrowAtRow(2);
  drawArrowAtRow(3);
  //if (focus) drawArrowAtRow(focusRow, "bold");
  drawArrowAtRow(focusRow, "bold");

  // --------------------------------------------------
  // debug 

  if (debug) showRegionOutlines();

}

// KEYBOARD ACTIONS ///////////////////////////////////

function keyPressed() {

  // --------------------------------------------------
  // up/down through focus rows

  if (keyCode === UP_ARROW) {
    if (focusRow < numberOfCells / clusters - 2) {
      focusInput.value(int(focusRow) + 1);
      updateFocusValue();
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (focusRow > 1) {
      focusInput.value(int(focusRow) - 1);
      updateFocusValue();
    }
  }

  // --------------------------------------------------
  // right/left through cluster counts

  if (keyCode === RIGHT_ARROW) {
    if (int(clusters) < int(clustersSlider.elt.max)) {
      clustersInput.value(int(clusters) + 1);
      clusters = clustersInput.value();
      updateClustersSlider();
    }
  }
  if (keyCode === LEFT_ARROW) {
    if (clusters > 1) {
      clustersInput.value(int(clusters) - 1);
      updateClustersSlider();
    }
  }

  // --------------------------------------------------
  //  toggle borders

  if (key == "b") {
    borders = !borders;
    redraw();
  }

  // --------------------------------------------------
  //  cycle nonzero colors to get new starting color

  if (key == "c") cycleColors();

  // --------------------------------------------------
  //  randomize colors and numbers

  if (key == "r") {
    randomizeMagicAndColors();
    yarnSelect.value("Random (press r for more)");
  }

  // --------------------------------------------------
  // shuffle color order and magic values
  // this allows you to try variations in the current color scheme
  // overall total stays the same so cluster value will still be good

  if (key == "f") shuffleColors();

  // --------------------------------------------------
  //  glitch it!

  if (key == "g") {
    // todo
  }

  // --------------------------------------------------
  //  export PNG screenshot of pattern with params in filename

  if (key == "s") {
    img = get(controlWidth + patternMargin, topMargin,
      patternWidth, patternHeight - ySize / 2);
    paramString = getFileName(magic, clusters);
    img.save(paramString);
    console.log("saved pattern image:", paramString + ".png");
  }

  // --------------------------------------------------
  //  export TXT file with complete crochet pattern

  if (key == "p") {
    paramString = getFileName(magic, clusters);
    pattern = createWriter(paramString + '.txt');

    getPatternText(); // stored in patterns.js

    pattern.write(patternText);
    pattern.close();
    console.log("saved crochet pattern:", paramString + ".txt");
  }

}

