// TITLES AND TEXT DECORATIONS /////////////////////////

// ----------------------------------------------------
// draw title with header bar for clean edge at top of pattern

function drawTitleAndHeader() {

    // rectangle header
    fill(255);
    noStroke();
    rect(0, 0, width, topMargin);

    // title
    titleString = "Crochet Color Pooling"
    for (i = 21; i > 0; i--) {
        //textFont("Baloo"); // google font ltextFoin index.html
        textFont(titleFont); // downloaded to fonts folder
        textSize(56);
        stroke(255);

        // don't increment color index over spaces
        if (i < 8) {
            fill(colors[findColorIndex(i - 1)].value());
        } else if (i < 14) {
            fill(colors[findColorIndex(i - 2)].value());
        } else {
            fill(colors[findColorIndex(i - 3)].value());
        }
        text(str(titleString.slice(0, i)), sideIndent, 95);
    }

}

function drawQuickNotes() {
    fill(150);
    textFont("Helvetica");
    textSize(14);
    textStyle(ITALIC);
    text("Just want to see pretty patterns?", width - 430, 70);
    text("Press \"r\" for random colors, then \"f\" to shuffle those colors.", width - 430, 90);
    text("Then play with the clusters slider!", width - 430, 110);
}

// ----------------------------------------------------
// text describing keyboard shortcuts

function drawKeyboardShortcutsList() {
    fill(150);
    textFont("Helvetica");
    textSize(14);
    textStyle(NORMAL);
    text("b = toggle borders", sideIndent, height - 86);
    text("c = cycle starting color", sideIndent, height - 64);
    text("s = download screenshot of image", sideIndent, height - 42);
    text("p = download written crochet pattern", sideIndent, height - 20);
}

// ----------------------------------------------------
// arrows

// small arrow pointing to the left or right

function drawArrow(xTip, yTip, direction) {
    if (direction == "point_left") {
        line(xTip, yTip, xTip + 20, yTip);
        line(xTip, yTip, xTip + 5, yTip - 5);
        line(xTip, yTip, xTip + 5, yTip + 5);
    } else {
        line(xTip, yTip, xTip - 20, yTip);
        line(xTip, yTip, xTip - 5, yTip - 5);
        line(xTip, yTip, xTip - 5, yTip + 5);
    }
}

// ----------------------------------------------------
// draw arrow with row count label

function drawArrowAtRow(rowNumber, weight = "normal") {

    // find x-coordinate of arrow tip 
    xFirstRight = controlWidth + patternMargin + patternWidth + 10;
    xFirstLeft = controlWidth + patternMargin - 10;
    xTip = ((rowNumber % 2) || !flat) ? xFirstRight : xFirstLeft;

    // find y coordinate of arrow tip
    yFirst = topMargin + patternHeight;
    yTipFirst = topMargin + patternHeight - rowNumber * ySize / 2;
    yTip = staggered ?
        yFirst - rowNumber * ySize / 2 :
        yFirst - rowNumber * ySize + ySize / 2;

    // find direction of arrow
    direction = ((rowNumber % 2) || !flat) ?
        "point_left" : "point_right";

    // draw the arrow
    stroke(150);
    if (weight == "bold") {
        strokeWeight(2);
    } else {
        strokeWeight(.5);
    }
    //strokeWeight(2);
    drawArrow(xTip, yTip, direction);

    // draw text label at starting end of arrow
    push();
    textSize(14);
    strokeWeight(.5);
    if (direction == "point_left") {
        textAlign(LEFT);
        text(rowNumber, xTip + 23, yTip + 4);
    } else {
        textAlign(RIGHT);
        text(rowNumber, xTip - 24, yTip + 4);
    }
    pop();

}