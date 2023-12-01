// GUIS ///////////////////////////////////////////////
  
// ----------------------------------------------------
// yarn select dropdown menu

function createGUI_yarn() {
  
  yPos = topMargin + 5;
  
  fill(150);
  textFont("Helvetica");
  textSize(16);
  text("Choose a yarn, type of stitch, and direction of work. You can also enter your own colors and magic stitch counts below, or press \"r\" for random colors and numbers. ", sideIndent, yPos, controlWidth-sideIndent);
  
  fill(100);
  textFont("Helvetica");
  textSize(14);
  text("Yarn Samples", sideIndent, yPos + 122);
  
  yarnSelect = createSelect();
  yarnSelect.position(sideIndent, yPos + 129);
  for (i=0; i<yarns.length; i++) {
     yarnSelect.option(yarns[i].name);
  }
  yarnSelect.option("Custom (make your own)");
  yarnSelect.option("Random (press r for more)")
  yarnSelect.style("padding","4px");
  yarnSelect.style("border-color", "#cccccc");
  yarnSelect.changed(updateYarnSelection);
  
}

function updateYarnSelection() {
  
  for (i=0; i<yarns.length; i++) {
    if (yarnSelect.value() == yarns[i].name) {
      setYarn(i);
      return;
    }
  }
  if (yarnSelect.value() == "Random (press r for more)") {
    randomizeMagicAndColors();
  }
  
  redraw();

}

// ----------------------------------------------------
// staggered/stacked stitch dropdown

function createGUI_stitch() {
  
  yPos = topMargin + 186;
  
  fill(100);
  textFont("Helvetica");
  textSize(14);
  text("Stitch Type", sideIndent, yPos);
  
  stitchSelect = createSelect();
  stitchSelect.position(sideIndent, yPos + 7);
  stitchSelect.option("Staggered (moss, shells)");
  stitchSelect.option("Stacked (single crochet, knitting)");
  stitchSelect.style("padding","4px");
  stitchSelect.style("border-color", "#cccccc");
  stitchSelect.changed(updateStitchSelection);
}
  
function updateStitchSelection() {
    
  if (stitchSelect.value().slice(0,4) == "Stag") {
    staggered = true;
    clustersInput.value(floor(clusters/2));
    clustersSlider.elt.min = floor(clustersSlider.elt.min)/2;
    clustersSlider.elt.max = floor(clustersSlider.elt.max)/2;
    updateClustersSlider();
    focusInput.value(focusRow * 2);
    updateFocusValue();
    gauge = 2;
  } 
    else if (stitchSelect.value().slice(0,4) == "Stac") {
    staggered = false;
    clustersInput.value(2*clusters+1);
    clustersSlider.elt.min = clustersSlider.elt.min * 2;
    clustersSlider.elt.max = clustersSlider.elt.max * 2;
    updateClustersSlider();
    focusInput.value(max(1,floor(focusRow/2)));
    updateFocusValue();
    gauge = 1.3;
  }
  
  redraw();
  
}

// ----------------------------------------------------
// flat/round stitch dropdown

function createGUI_direction() {
  
  yPos = topMargin + 245;
  
  fill(100);
  textFont("Helvetica");
  textSize(14);
  text("Work Direction", sideIndent, yPos);
  
  directionSelect = createSelect();
  directionSelect.position(sideIndent, yPos + 7);
  directionSelect.option("Flat (back and forth)");
  directionSelect.option("Circular (in the round)");
  directionSelect.style("padding","4px");
  directionSelect.style("border-color", "#cccccc");
  directionSelect.changed(updateDirectionSelection);
  
}

function updateDirectionSelection() {
  
  if (directionSelect.value().slice(0,4) == "Flat") {
    flat = true;
  } 
    else if (directionSelect.value().slice(0,4) == "Circ") {
    flat = false
  }
  
  redraw();

}

// ----------------------------------------------------
// clusters text field and slider

function createGUI_clusters(){
  
  yPos= topMargin + 316;
  
  fill(150);
  textFont("Helvetica");
  textSize(16);
  text("Try out different values for the Clusters until you find a design you want. This is the fun part! You can also use the right/left arrow keys to change this clusters number.", sideIndent, yPos, controlWidth-sideIndent);
  
  // While you're crocheting/knitting you can use the Focus tool to check the colors in your working row.
  
  fill(100);
  textFont("Helvetica");
  textSize(14);
  text("Clusters = ", sideIndent, yPos+125);
  
  clustersInput = createInput(str(clusters));
  clustersInput.position(sideIndent+70, yPos+110);
  clustersInput.size(40);
  clustersInput.changed(updateClustersSlider);
  
  clustersSlider = createSlider(5, 80, clusters);
  clustersSlider.position(sideIndent, yPos+139);
  clustersSlider.size(220);
  clustersSlider.mouseMoved(updateClustersInput);
  
}
  
function updateClustersSlider() {
  clustersSlider.value(clustersInput.value());
  clusters = clustersInput.value();
  redraw();
}

function updateClustersInput() {
  clusters = clustersSlider.value();
  clustersInput.value(clustersSlider.value());
  redraw();
}

// ----------------------------------------------------
// focus row button and text field

function createGUI_focus() {
  
  yPos = topMargin + 510;
  
  fill(150);
  textFont("Helvetica");
  textSize(16);
  text("While you're working you can use the Focus button to double-check the colors in your current row. You can also use the up/down arrow keys to change this row number.", sideIndent, yPos, controlWidth-sideIndent);
  
  fill(100);
  textFont("Helvetica");
  textSize(14);
  text("Focus Row = ", sideIndent, yPos+125);
  
  focusInput = createInput(str(focusRow));
  focusInput.size(40);
  focusInput.position(sideIndent+90, yPos+110);
  focusInput.changed(updateFocusValue);
  
  focusButton = createButton("Focus On/Off");
  focusButton.position(sideIndent+150, yPos+110);
  focusButton.mousePressed(toggleFocus);
  
}
  
function updateFocusValue() {
  focusRow = focusInput.value();
  redraw();
}
  
function toggleFocus() {
  focus = !focus;
  redraw();
}

// ----------------------------------------------------
// magic values - text input

function createGUI_magic() {
  magic = [];
  for (j=0; j<numberOfColors; j++) {
    magic[j] = createInput(magicInitial[j]);
    magic[j].size(40);
    magic[j].position(controlWidth+patternMargin+61*j, 
                      topMargin+patternHeight+25);
    magic[j].changed(updateAfterMagicChange);
  }
}

function updateAfterMagicChange() {
  yarnSelect.value("Custom (make your own)");
  redraw();
}

// ----------------------------------------------------
// color pickers

function createGUI_colors() {
  colors = [];
  for (j=0; j<numberOfColors; j++) {
    colors[j] = createColorPicker(colorsInitial[j]);
    colors[j].position(controlWidth+patternMargin+61*j, 
                       topMargin+patternHeight+55);
    colors[j].changed(updateAfterColorsChange);
  }
}

function updateAfterColorsChange() {
  yarnSelect.value("Custom (make your own)");
  redraw();
}

// ----------------------------------------------------
// magic values - text input

function createGUI_magic() {
  magic = [];
  for (j=0; j<numberOfColors; j++) {
    magic[j] = createInput(magicInitial[j]);
    magic[j].size(40);
    magic[j].position(controlWidth+patternMargin+61*j, 
                      topMargin+patternHeight+25);
    magic[j].changed(updateAfterMagicChange);
  }
}

function updateAfterMagicChange() {
  yarnSelect.value("Custom (make your own)");
  redraw();
}

// ----------------------------------------------------
// color pickers

function createGUI_colors() {
  colors = [];
  for (j=0; j<numberOfColors; j++) {
    colors[j] = createColorPicker(colorsInitial[j]);
    colors[j].position(controlWidth+patternMargin+61*j, 
                       topMargin+patternHeight+55);
    colors[j].changed(updateAfterColorsChange);
  }
}

function updateAfterColorsChange() {
  yarnSelect.value("Custom (make your own)");
  redraw();
}
