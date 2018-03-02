//import the knitout writer code and instantiate it as an object
var knitoutWriter = require('../../knitout-frontend-js/knitoutWriter');
k = new knitoutWriter();

// add some headers relevant to this job
k.addHeader('Machine','SWGXYZ');
k.addHeader('Gauge','15');
k.addHeader('Carriers', '1');

// swatch variables
//height needs to be multiples of 4
var height = 60;
//width needs to be multiples of 3 plus 2
var width = 47; //want to put first stich on the front bed, hack for now
var carrier = 6;
var front = true;
// bring in carrier using yarn inserting hook
k.inhook(carrier);

//helper functions for rows
//row1 follows the pattern of *front front back*front front
function row1()
{
 for (var i = width; i > 0 ; i--)
    {
      if (i%3 == 0)
      {
        k.knit("-", "b"+i, carrier);
      }
      else
      {
        k.knit("-", "f"+i, carrier);
      }
    }
}
//row2 follows the same pattern as row 1
//but yarn carrier moves in the opposite direction
function row2()
{
 for (var i = 0; i <= width ; i++)
    {
      if (i%3 == 0)
      {
        k.knit("+", "b"+i, carrier);
      }
      else
      {
        k.knit("+", "f"+i, carrier);
      }
    }
}

//row 3 also follows the same pattern
//but transfer all stitches on the front bed to the back
function row3()
{
 for (var i = width ; i > 0 ; i--)
    {
      if (i%3 == 0)
      {
        k.knit("-", "b"+i, carrier);
      }
      else
      {
        k.knit("-", "f"+i, carrier);
      }
    }
    for (var i = width; i > 0 ; i--)
    {
      if (i%3 == 0)
      {
        k.xfer("f"+i, "b"+i);
      }
    }

}

//row4 knits the entire row on the back bed
//and then transfer the corresponding stitches to the front bed
function row4()
{
 for (var i = 1; i <= width ; i++)
    {
      k.knit("+","b"+i, carrier);
    }
    for (var i = 1; i <= width ; i++)
    {
      if (i%3 != 0)
      {
        k.xfer("b"+i, "f"+i);
      }
    }
}
//tuck on alternate needles and tuck the rest on the way back
for (var s = width ; s>0 ; s--)
{
  if (s%2 != 0)
  {
    if (s%3 == 0)
    {
      k.tuck("-", "b"+s, carrier);
    }
    else
    {
      k.tuck("-", "f"+s, carrier);
    }
  }
}
for (var s = 1 ; s<=width ; s++)
{
  if (s%2 == 0)
  {
    if (s%3 == 0)
    {
      k.tuck("+", "b"+s, carrier);
    }
    else
    {
      k.tuck("+", "f"+s, carrier);
    }
  }
}

// release the yarn inserting hook
k.releasehook(carrier);

// knit some rows back and forth
for(var h = 1 ; h <= height ; h = h+4)
{
  row1();
  row2();
  row3();
  row4();
}

// bring the yarn out with the yarn inserting hook
k.outhook(carrier);

// write the knitout to a file
k.write('../../swatches/piqueribbing.k');

