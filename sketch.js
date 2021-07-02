//trees var//////////////////////////////
let tree = [];
let leaves = [];
let forest = [];

let count = 0;
let recount = 0;
let dieOff = 0;

//sentiment var//////////////////////////
let sentiment;
let statusEl;
let submitBtn;
let inputBox;
let sentimentResult;
let cnv;
let karma = 5;

const robot = ["How do you do, fellow human", "I am not a bot"];

///bot reply arrays///

const trigger = [
//0
["hi", "hey", "hello"],
//1
["how are you", "how are things"],
//2
["what is going on", "what is up"],
//3
["happy", "good", "well", "fantastic", "cool"],
//4
["bad", "bored", "tired", "sad"],
//5
["tell me story", "tell me joke"],
//6
["thanks", "thank you"],
//7
["bye", "good bye", "goodbye"]
];

const reply = [
//0
["Hello!", "Hi!", "Hey!", "Hi there!"],
//1
[
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
//2
[
    "Nothing much",
    "Exciting things!"
  ],
//3
["Glad to hear it"],
//4
["Why?", "Cheer up buddy"],
//5
["What about?", "Once upon a time..."],
//6
["You're welcome", "No problem"],
//7
["Goodbye", "See you later"],
];

const alternative = [
  "Same",
  "Go on...",
  "I'm listening..."
];
//end reply arrays///////////////////////////////////////

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = 0;
  cnv.position(x, y);
}

function setup() {
  frameRate(15);
  cnv = createCanvas(windowWidth-5, windowHeight/2);
  centerCanvas();
  cnv.style('display', 'block');
  // initialize sentiment
  sentiment = ml5.sentiment('movieReviews');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight/2);
  centerCanvas();
}

function keyPressed(){
  if (keyCode === ENTER) {
    getSentiment();
  }
}

function getSentiment() {
  console.log(karma);
  var inputBox = document.getElementById("textInput");
  // get the values from the input
  const text = inputBox.value;
  // console.log(text)
  chatOutput();
  const shortT = reduceStatement();
  // make the prediction
  const prediction = sentiment.predict(shortT);

  // // display sentiment result on html page
  // sentimentResult.html('Sentiment score: ' + prediction.score);

  //bot reply to user
  botReply();

  if (prediction.score > 0.5){
    karma++
  }else{
    karma--
  }

  if (karma < 2){
    wilt();
  }

  if (karma > 5){
    grow();
  }
}

function reduceStatement() {
//remove all characters except word characters and spaces.
  var inputBox = document.getElementById("textInput");
  let textRedu = inputBox.value.replace(/[^\w\s\d]/gi, "");
// 'tell me a story' -> 'tell me story'
// 'i feel happy' -> 'happy'
  textRedu = textRedu
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  return textRedu;
}


//comparing response arrays
function compare(triggerArray, replyArray, string) {
  let botreply;
  let replyFound = false;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (triggerArray[x][y] === string) {
        let replies = replyArray[x];
        botreply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return botreply;
}

function botReply(){
  let product;
  const shortT = reduceStatement();

  //compare arrays
  //then search keyword
  //then random alternative
    if (compare(trigger, reply, shortT)) {
    product = compare(trigger, reply, shortT);
  } else if (shortT.match(/robot/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  setTimeout(function(){$('<p>' + 'Trees: ' + product + '</p>').appendTo('#textRec');},2000);
}

//setting up chatbox

function chatOutput(){
  var inputBox = document.getElementById("textInput");
  //take user input and record that in the chatbox
   $('<p>' + 'Self: ' + inputBox.value + '</p>').appendTo('#textRec');
}

function drawTree(ax, bx, ay, by) {
  let a = createVector(ax, ay);
  let b = createVector(bx, by);
  let root = new Branch(a, b);
  tree[0] = root;
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished && tree[i].depth < 10) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }

  count++;

  if (count === 8){
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  // background(83, 117, 89);
  if (dieOff > 2){
    stroke(173, 148, 80);
  }else{
    stroke(130, 245, 195);
  }
  push();
  drawTree(155,150, height, height-100);
  pop();
  // push();
  // drawTree(300,300, height, height-50);
  // pop();

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  // drawTree(375,375, height, height-100);
  // drawTree(400,400, height, height-40);
  // drawTree(550,550, height, height-100);
  // drawTree(600,610, height, height-80);
  // drawTree(650,650, height, height-120);

  push();
  stroke(61, 60, 42);
  strokeWeight(10);
  line(0,height,width,height);
  pop();

  for (var i = 0; i < leaves.length; i++) {
    fill(253, 194, 255);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    if (dieOff === 1){
      leaves[i].y ++
    }
  }
}

function wilt(){
  for (var i = 0; i < tree.length; i++) {
    tree.length--
  }
  dieOff ++
}

function grow(){
  for (var i = 0; i < tree.length; i++) {
    tree.length++
  }
  // if (recount < 8){
  //   for (let i = tree.length - 1; i >= 0; i--) {
  //     if (!tree[i].finished) {
  //       tree.push(tree[i].branchA());
  //       tree.push(tree[i].branchB());
  //     }
  //     tree[i].finished = true;
  //   }
  //   recount++;
  //
  //   if (recount === 8) {
  //     for (var i = 0; i < tree.length; i++) {
  //       if (!tree[i].finished) {
  //         let leaf = tree[i].end.copy();
  //         leaves.push(leaf);
  //       }
  //     }
  //   }
  // }
}
