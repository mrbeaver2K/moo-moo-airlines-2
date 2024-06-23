var canvasWidth = window.screen.width - 1;
var canvasHeight = window.screen.height - 170;
var gameWidth = 8000;
var gameHeight = 8000;
var cowNum = 128;// = Math.ceil((window.screen.width * window.screen.height) / (131336 + (1 / 3)))
var airlineComplexity = 5;
var sprWidth = 64;
var sprHeight = 64;
var player;
var speed = 4;
var cows;
var coins = 100;
var build;
var builds = ["Sky Cow Extractor"];
var selectedBuild = 0;
var machines;
var skyCowExtractors;
var milk = 0;
var milkSellers;
var fr = 60;
var creamDairies;
var butterDairies;
var cream = 0;
var creamSellers;
var butter = 0;
var butterDairies;
var skyCowPrinters;
var skyCowCatchers;
var fences;
var caughtCows;
var wells;
var water = 0;
var destroyMode = false;
var fields;
var wheat = 0;
var rotaryMilkers;
var buildButton;
var warpStations;
var warpButton;
var cheatCodeBozoAvalible = true;
//var switchButton;
//var currentToolbar = 0;
var saltCows;
var waterDrills;
var desertZoneProbability = 1000; // Set to 0 to disable. 1000 is the recomended size.
var desertZones;
var desertActive = false;
var saltyMilk = 0;
var doCowX;
var doCowY;
var gamepad = false;
var paused = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var desalinators;
var steamBursts;
var salt = 0;
var truckBayOwned = false;
var truckBay;
var trucks;
var exportRequest;
var skyFences;
var keyDown = false;
var keyChecked = false;
var playerGroup;

function preload() {
  playerImg = loadImage("images/Player.png");
  cowImg = loadImage("images/Cow.png");
  extractorImg = loadSpriteSheet("images/SkyCowExtractor.png", sprWidth, sprHeight, 4);
  extractorAnim = loadAnimation(extractorImg);
  milkSellerImg = loadSpriteSheet("images/MilkSeller.png", sprWidth, sprHeight, 32);
  milkSellerAnim = loadAnimation(milkSellerImg);
  creamDairyImg = loadSpriteSheet("images/CreamMaker.png", sprWidth, sprHeight, 8);
  creamDairyAnim = loadAnimation(creamDairyImg);
  butterDairyImg = loadSpriteSheet("images/ButterMaker.png", sprWidth, sprHeight, 8);
  butterDairyAnim = loadAnimation(butterDairyImg);
  creamSellerImg = loadSpriteSheet("images/CreamSeller.png", sprWidth, sprHeight, 32);
  creamSellerAnim = loadAnimation(creamSellerImg);
  printerImg = loadSpriteSheet("images/SkyCowPrinter.png", sprWidth, sprHeight, 4);
  printerAnim = loadAnimation(printerImg);
  catcherImg = loadSpriteSheet("images/SkyCowCatcher.png", sprWidth, sprHeight, 4);
  catcherAnim = loadAnimation(catcherImg);
  fenceImg = loadImage("images/Fence.png");
  wellImg = loadSpriteSheet("images/Well.png", sprWidth, sprHeight, 4);
  wellAnim = loadAnimation(wellImg);
  brokenWellImg = loadSpriteSheet("images/BrokenWell.png", sprWidth, sprHeight, 4);
  brokenWellAnim = loadAnimation(brokenWellImg);
  rotaryMilkerImg = loadSpriteSheet("images/RotaryMilker.png", sprWidth, sprHeight, 4);
  rotaryMilkerAnim = loadAnimation(rotaryMilkerImg);
  fieldImg = loadImage("images/Field.png");
  waterFieldImg = loadSpriteSheet("images/WaterField.png", sprWidth, sprHeight, 21);
  waterFieldAnim = loadAnimation(waterFieldImg);
  wheatFieldImg = loadSpriteSheet("images/WheatField.png", sprWidth, sprHeight, 15);
  wheatFieldAnim = loadAnimation(wheatFieldImg);
  warpStationImg = loadSpriteSheet("images/WarpStation.png", sprWidth, sprHeight, 8);
  warpStationAnim = loadAnimation(warpStationImg);
  drillImg = loadImage("images/Drill.png");
  waterDrillImg = loadSpriteSheet("images/WaterDrill.png", sprWidth, sprHeight, 16)
  waterDrillAnim = loadAnimation(waterDrillImg);
  saltCowImg = loadImage("images/SaltCow.png");
  desertZoneImg = loadImage("images/DesertZone.png");
  desalinatorImg = loadSpriteSheet("images/Desalinator.png", sprWidth, sprHeight, 2);
  desalinatorAnim = loadAnimation(desalinatorImg);
  overheatImg = loadSpriteSheet("images/Overheat.png", sprWidth, sprHeight, 2);
  overheatAnim = loadAnimation(overheatImg);
  steamBurstImg = loadImage("images/Steam Burst.png");
  truckBayImg = loadImage("images/Truck Bay.png");
  truckImg = loadImage("images/Truck.png");
  skyFenceImg = loadSpriteSheet("images/Sky Fence.png", sprWidth, sprHeight, 15);
  skyFenceAnim = loadAnimation(skyFenceImg);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = createSprite(random(canvasWidth), random(canvasHeight), sprWidth, sprHeight);
  player.addImage(playerImg);
  player.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
  cows = new Group();
  machines = new Group();
  skyCowExtractors = new Group();
  milkSellers = new Group();
  creamDairies = new Group();
  creamSellers = new Group();
  butterDairies = new Group();
  skyCowPrinters = new Group();
  skyCowCatchers = new Group();
  caughtCows = new Group();
  fences = new Group();
  wells = new Group();
  fields = new Group();
  rotaryMilkers = new Group();
  warpStations = new Group();
  waterDrills = new Group();
  saltCows = new Group();
  desertZones = new Group();
  desalinators = new Group();
  steamBursts = new Group();
  truckBays = new Group();
  skyFences = new Group();
  playerGroup = new Group();
  playerGroup.add(player);
  frameRate(fr);
  if (getItem("highScore") == null) {
    storeItem("highScore", 100);
  }
  alert("🥇 The local high score is " + getItem("highScore") + " coins. Can you beat it?");
  createCows(cowNum);
  buildButton = new Clickable();
  buildButton.locate(canvasWidth - 100, canvasHeight - 100);
  buildButton.text = "Build Something";
  buildButton.stroke = "#008000";
  buildButton.onOutside = function() {
    buildButton.color = "#008000";
  }

  buildButton.onHover = function() {
    buildButton.color = "#03fcfc";
  }
  buildButton.onPress = function() {
    building(builds[selectedBuild]);
  }
  rotateButton = new Clickable();
  rotateButton.locate(canvasWidth - 100, canvasHeight - 150);
  rotateButton.text = "⏩";
  rotateButton.stroke = "#008000";
  rotateButton.onOutside = function() {
    rotateButton.color = "#008000";
  }

  rotateButton.onHover = function() {
    rotateButton.color = "#03fcfc";
  }
  rotateButton.onPress = function() {
    if (selectedBuild == builds.length - 1) {
      selectedBuild = 0;
    }
    else {
      selectedBuild++;
    }
  }
  warpButton = new Clickable();
  warpButton.locate(canvasWidth - 100, canvasHeight - 200);
  warpButton.text = "Warp Somewhere";
  warpButton.stroke = "#008000";
  warpButton.onOutside = function() {
    warpButton.color = "#008000";
  }

  warpButton.onHover = function() {
    warpButton.color = "#8c00ff";
  }
  warpButton.onPress = function() {
    warping();
  }
  dealButton = new Clickable();
  dealButton.locate(canvasWidth - 100, canvasHeight - 250);
  dealButton.text = "View Contracts";
  dealButton.stroke = "#008000";
  dealButton.onOutside = function() {
    dealButton.color = "#008000";
  }

  dealButton.onHover = function() {
    warpButton.color = "#f5fa93";
  }
  dealButton.onPress = function() {
    contracts();
  }
  /*switchButton = new Clickable();
  switchButton.locate(0, 0);
  switchButton.text = "⏩ Next Toolbar";
  switchButton.stroke = "#008000";
  switchButton.onOutside = function() {
    switchButton.color = "#008000";
  }

  switchButton.onHover = function() {
    switchButton.color = "#2dba20";
  }
  switchButton.onPress = function() {
    if (currentToolbar < 2) {
      currentToolbar++;
    } else {
      currentToolbar = 0;
    }
  }*/
  pauseButton = new Clickable();
  pauseButton.locate(canvasWidth - 100, canvasHeight - 50);
  pauseButton.text = "Menu";
  pauseButton.stroke = "#008000";
  pauseButton.color = "#008000";
  pauseButton.onPress = function() {
    if (paused) {
      paused = false;
    }
    else {
      paused = true;
    }
  }
  gameEndButton = new Clickable();
  gameEndButton.locate(canvasWidth - 170, canvasHeight - 50);
  gameEndButton.text = "Freeze Game";
  gameEndButton.stroke = "#008000";
  gameEndButton.color = "#008000";
  gameEndButton.onPress = function() {
    if (confirm("❌🐮 Freeze the game?")) {
      background("#8fffe7");
      drawSprites();
      text("💲 Coins: " + coins, 10, 30);
      text("💧 Water: " + water, 10, 100);
      text("🥛 Milk: " + milk, 10, 170);
      text("🧂🥛 Salty Milk: " + saltyMilk, 10, 240);
      text("🍨 Cream: " + cream, 100, 30);
      text("🧈 Butter: " + butter, 100, 100);
      text("🧂 Salt: " + salt, 100, 170);
      text("🌾 Wheat: " + wheat, 200, 30);
      frameRate(0);
    }
  }
  gamepadButton = new Clickable();
  gamepadButton.locate(canvasWidth - 240, canvasHeight - 50);
  gamepadButton.text = "Activate Gamepad 🕹";
  gamepadButton.stroke = "#008000";
  gamepadButton.color = "#008000";
  gamepadButton.onPress = function() {
    gamepad = true
    paused = false;
  }
  gamepadUpButton = new Clickable();
  gamepadUpButton.locate(60, canvasHeight - 150);
  gamepadUpButton.resize(50, 50);
  gamepadUpButton.text = "⬆";
  gamepadUpButton.stroke = "#008000";
  gamepadUpButton.color = "#008000";
  gamepadUpButton.onPress = function() {
    moveUp = true
    moveDown = false
  }
  gamepadUpButton.onRelease = function() {
    moveUp = false
  }
  gamepadRightButton = new Clickable();
  gamepadRightButton.locate(110, canvasHeight - 100);
  gamepadRightButton.resize(50, 50);
  gamepadRightButton.text = "➡";
  gamepadRightButton.stroke = "#008000";
  gamepadRightButton.color = "#008000";
  gamepadRightButton.onPress = function() {
    moveRight = true
    moveLeft = false
  }
  gamepadRightButton.onRelease = function() {
    moveRight = false
  }
  gamepadDownButton = new Clickable();
  gamepadDownButton.locate(60, canvasHeight - 50);
  gamepadDownButton.resize(50, 50);
  gamepadDownButton.text = "⬇";
  gamepadDownButton.stroke = "#008000";
  gamepadDownButton.color = "#008000";
  gamepadDownButton.onPress = function() {
    moveDown = true
    moveUp = false
  }
  gamepadDownButton.onRelease = function() {
    moveDown = false
  }
  gamepadLeftButton = new Clickable();
  gamepadLeftButton.locate(10, canvasHeight - 100);
  gamepadLeftButton.resize(50, 50);
  gamepadLeftButton.text = "⬅";
  gamepadLeftButton.stroke = "#008000";
  gamepadLeftButton.color = "#008000";
  gamepadLeftButton.onPress = function() {
    moveLeft = true
    moveRight = false
  }
  gamepadLeftButton.onRelease = function() {
    moveLeft = false
  }
  destroyButton = new Clickable();
  destroyButton.locate(110, canvasHeight - 150);
  destroyButton.resize(50, 50);
  destroyButton.text = "❌";
  destroyButton.stroke = "#ff0000";
  destroyButton.color = "#008000";
  destroyButton.onPress = function() {
    if (destroyMode) {
      destroyMode = false
    }
    else {
      destroyMode = true
    }
  }
}

