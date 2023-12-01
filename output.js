// PATTERN INSTRUCTIONS ///////////////////////////////

// ----------------------------------------------------
// crochet moss stitch pattern

function getPatternText() {

  patternText = [

      "Crochet pattern for (" + getMagicList(magic) + ") pooling with " + clusters + " stitch clusters" + "\n" + "\n" +
      
      "Color numbers: This pattern assumes that you have already experimented with different hook sizes and tension to obtain the cluster values in the title above for your chosen yarn. Each of the numbers represents the fixed number of stitch clusters that will be worked for each color segment of your yarn. These instructions are for moss stitch, which means that each cluster will be just one sc followed by a ch1; adapt as needed for other types of stitches." + "\n" + "\n" +

      "Total clusters per row: This pattern also assumes that you have already used the app to look through the various pattern options and settled on " + clusters + " as the total number of clusters that you will have per row." + "\n" + "\n" +
      
      "Cast on and set up: With your main hook size, chain " + 2*clusters + " stitches. Shift to a hook that is one to two sizes smaller, ch1 and turn, and then set up for moss stitch by doing sc+ch1 into every other stitch a total of " + clusters + " times, starting at the 4th stitch from the hook (the second main stitch). If you would like to start the main pattern at a particular color then work up a sample cast on and first row to determine how much yarn will be required, and where to tie the slip knot when you start the final work." + "\n" + "\n" +
      
      "Main pattern: Returning to your main hook size, ch2 and turn the work. Work in moss stitch with sc+ch1 into every other stitch, starting with the first gap, a total of " + clusters + " times; after the last sc, do ch2 instead of the usual ch1, and turn work; repeat." + "\n" + "\n" +
      
      "Check pooling as you go: Frog back and re-work every few stitches as needed to ensure that each color is worked in exactly the number of clusters you identified earlier. Focus on particular rows of the pattern in the app to check your work and orient yourself, as needed. Note that the ch2 edge stitches are not considered clusters." + "\n" + "\n" +
      
      "Cast off: Stop when done, or attempt to match cast on with one row of sc."
  
    ];
  
  return(pattern);
  
}