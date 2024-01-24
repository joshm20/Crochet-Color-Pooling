// DEBUG //////////////////////////////////////////////


// print numbers in each cell in order
function showCellNumbers(i, x, y) {
    if (i < 3 * clusters) {
        fill(255);
        noStroke();
        text(i, x + 2, y + ySize - 3);
    }
}

// show outlines of main regions
function showRegionOutlines() {

    noFill();
    strokeWeight(3);

    // entire canvas
    stroke("#ff6600");
    rect(0, 0, width, height);

    // control area
    stroke("#0000ff");
    rect(0, topMargin, controlWidth, controlHeight);

    // side indent
    stroke("#cccccc");
    rect(0, topMargin, sideIndent, controlHeight);

    // pattern display area
    stroke("#00feca");
    rect(controlWidth + patternMargin, topMargin, patternWidth, patternHeight);

    // margins around pattern display area
    stroke("#ff22ff")
    rect(controlWidth, topMargin, patternMargin, patternHeight);
    rect(controlWidth + patternMargin + patternWidth, topMargin,
        patternMargin, patternHeight);
}