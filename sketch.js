/**
 * CLOCK
 * Spec:
 * An animated clock that tracks hours, mminutes and seconds in real time (hopefully).
 * Syncs every 30 minutes
 */

var fps = 30; // starting framerate
var syncFreqMins = 30; // sync frequency in minutes

var secondHandAngle = 0;
var minuteHandAngle = 0;
var hourHandAngle = 0;

function setup()
{
  frameRate( fps ); // so, we're calling `draw()` 1x a second
  angleMode( DEGREES ); // I use degrees. deal with it >:P
  
  createCanvas( 600, 600 );
  
  textAlign( CENTER, TOP );
  textSize( width / 20 );
  
  sync();
}

function draw()
{
  background( "#ffffff" );
  
  // draw clock face
  drawClockFace();
  
  // draw hands
  drawSecondHand();
  drawMinuteHand();
  drawHourHand();
  
  // sync every 10 minutes
  if ( (frameCount / fps / 60) % syncFreqMins == 0 )
    sync();
  
  //console.log( minuteHandAngle );
}

function drawClockFace()
{
  push();
  textAlign( CENTER, TOP );
  textSize( width / 20 );
  
  text( "12", width/2, 5 );
  
  textAlign( RIGHT, CENTER );
  text( "3", width - 5, height/2 );
  
  textAlign( CENTER, BOTTOM );
  text( "6", width/2, height - 5 );
  
  textAlign( LEFT, CENTER );
  text( "9", 5, width/2 );
  
  textAlign( CENTER, CENTER );
  fill( "#00ff00" );
  text( `${hour()}:${getMinute() < 10 ? '0' : ''}${getMinute()}:${getSecond() < 10 ? '0' : ''}${getSecond()}`, width/2, 4/5 * height );
  
  pop();
}

function drawArm( angle, length )
{
  /* draw the arm of the timer @ the specified angle */
  /* Called inside the draw[hand]hand() methods */
  
  push(); // push new state
  
  // translate it to the centre
  translate( width/2, height/2 );
  
  // rotate
  rotate( angle );
  
  // draw arm at origin
  line(
    0, 0,
    0, -length
  );
  
  pop(); // reset
}

function drawSecondHand()
{
  drawArm( secondHandAngle, (width/2 - 10) );
  
  if ( secondHandAngle >= 359 )
    secondHandAngle -= 360;
  else secondHandAngle += 6/fps;
}

function drawMinuteHand()
{
  push();
  strokeWeight( 5 );
  
  drawArm( minuteHandAngle, (width/3) );
  
  if ( minuteHandAngle >= 359 )
    minuteHandAngle -= 360;
  else minuteHandAngle = minuteHandAngle + 1/(6*fps);
  
  pop();
}

function drawHourHand()
{
  push();
  strokeWeight( 5 );
  stroke( "#0000ff" );
  
  drawArm( hourHandAngle, (width/4) );
  
  if ( hourHandAngle >= 359 )
    hourHandAngle -= 360;
  else hourHandAngle += 1/(3600*fps);
  
  pop();
}

function sync()
{
  /* syncs the clock with the computer time by */
  /* setting the hand angle. */
  hourHandAngle = (getHour() * 30) + (30 * getMinute()/60);
  minuteHandAngle = getMinute() * 6 + (6 * getSecond()/60);
  secondHandAngle = getSecond() * 6;
  
  console.log( `Synced to ${getHour() < 10 ? '0' : ''}${getHour()}:${getMinute() < 10 ? '0' : ''}${getMinute()}:${getSecond() < 10 ? '0' : ''}${getSecond()}` );
}

function getHour()
{
  /* 12-hour envelope for hou(r() */
  var temp = hour();
  if ( temp > 12 )
    temp -= 12; // e.g. 13 - 12 = 1
  
  return temp;
}

function getMinute()
{
  /* alias for minute() */
  return minute();
}

function getSecond()
{
  /* Alias for second() */
  return second();
}
