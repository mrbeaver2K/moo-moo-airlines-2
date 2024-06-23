function playerControls() {
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || moveRight) {
    player.position.x += speed
    if (player.position.x + sprWidth / 2 > camera.position.x + canvasWidth * 0.375 && camera.position.x < gameWidth - canvasWidth / 2) {
      camera.position.x += speed;
    }
    if (player.position.x + sprWidth / 2 > gameWidth) {
      player.position.x = gameWidth - sprWidth / 2;
    }
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65) || moveLeft) {
    player.position.x -= speed
    if (player.position.x < camera.position.x - canvasWidth * 0.375 + sprWidth / 2 && camera.position.x > canvasWidth / 2) {
      camera.position.x -= speed;
    }
    if (player.position.x < sprWidth / 2) {
      player.position.x = sprWidth / 2;
    }
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87) || moveUp) {
    player.position.y -= speed
    if (player.position.y < camera.position.y - canvasHeight * 0.375 + sprHeight / 2 && camera.position.y > canvasHeight / 2) {
      camera.position.y -= speed;
    }
    if (player.position.y < sprHeight / 2) {
      player.position.y = sprHeight / 2;
    }
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83) || moveDown) {
    player.position.y += speed
    if (player.position.y + sprHeight / 2 > camera.position.y + canvasHeight * 0.375 && camera.position.y < gameHeight - canvasHeight / 2) {
      camera.position.y += speed;
    }
    if (player.position.y + sprHeight / 2 > gameHeight) {
      player.position.y = gameHeight - sprHeight / 2;
    }
  }
  if (keyIsDown(81) || keyIsDown(97)) {
    if (!keyDown) {
      if (destroyMode) {
        destroyMode = false;
      } else {
        destroyMode = true
      }
    }
    keyChecked = true;
  }
  if (keyIsDown(90)) {
    frameRate(fr);
    paused = false;
  }
  if (keyIsDown(88)) {
    frameRate(fr * 2);
    paused = false;
  }
  if (keyIsDown(69) || keyIsDown(96)) {
    if (!keyDown) {
      building(builds[selectedBuild]);
    }
    keyChecked = true;
  }
  if (keyIsDown(70)) {
    if (!keyDown) {
      if (selectedBuild == builds.length - 1) {
        selectedBuild = 0;
      }
      else {
        selectedBuild++;
      }
    }
    keyChecked = true
  }
  if (keyIsDown(84) || keyIsDown(110)) {
    warping();
  }
  if (keyIsDown(191)) {
    eval(prompt("Dev Console"))
  }
  if (keyChecked) {
    keyDown = true;
    keyChecked = false
  }
  else {
    keyDown = false;
  }
}

function createCows(numberOfCows, typeOfCows, cowX, cowY) {
  if (numberOfCows == null) {
    numberOfCows = 1;
  }
  if (typeOfCows == null) {
    typeOfCows = "cow";
  }
  if (cowX == null) {
    cowX = random(gameWidth);
    doCowX = true;
  }
  if (cowY == null) {
    cowY = random(gameHeight);
    doCowY = true;
  }
  if (typeOfCows == "cow") {
    for (var i = 0; i < numberOfCows; i++) {
      var cow = createSprite(cowX, cowY, sprWidth, sprHeight);
      cow.addImage(cowImg);
      cow.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
      cow.empty = false;
      cow.refill = 150;
      cow.xpositions = [cowX];
      cow.ypositions = [cowY];
      cow.target = 0;
      for (var j = 0; j < airlineComplexity; j++) {
        cow.xpositions.push(Math.abs(cow.xpositions[j] + Math.floor(random(gameWidth / 10) - gameWidth / 20)) % gameWidth);
        cow.ypositions.push(Math.abs(cow.ypositions[j] + Math.floor(random(gameHeight / 10) - gameHeight / 20)) % gameHeight);
      }
      cow.isClassic = true;
      cow.isAttracted = false;
      cows.add(cow);
      if (doCowX) {
        cowX = random(gameWidth);
      }
      if (doCowY) {
        cowY = random(gameHeight);
      }
    }
  }
  if (typeOfCows == "caught cow") {
    for (var i = 0; i < numberOfCows; i++) {
      var cow = createSprite(cowX, cowY, sprWidth, sprHeight);
      cow.addImage(cowImg);
      cow.setCollider("rectangle", 0, 0, sprWidth, sprHeight)
      cow.empty = false;
      cow.refill = 150;
      cow.angle = random(360);
      cow.setSpeed(3, cow.angle);
      cow.water = 500;
      cow.isClassic = true;
      caughtCows.add(cow);
    }
  }
  if (typeOfCows == "salt cow") {
    for (var i = 0; i < numberOfCows; i++) {
      var saltCow = createSprite(cowX, cowY, sprWidth, sprHeight);
      saltCow.addImage(saltCowImg);
      saltCow.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
      saltCow.empty = false;
      saltCow.refill = 150;
      saltCow.angle = random(360);
      saltCow.setSpeed(3, saltCow.angle);
      saltCow.water = 500;
      saltCow.milkType = "saltyMilk";
      saltCow.isClassic = false;
      saltCows.add(saltCow);
    }
  }
  doCowX = false;
  doCowY = false;
}

function building(build) {
  if (build != null) {
    build = build.toLowerCase();
    if (build == "sky cow extractor") {
      if (coins >= 50) {
        coins -= 50
        var skyCowExtractor = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        skyCowExtractor.addAnimation("extract", extractorAnim);
        skyCowExtractor.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        skyCowExtractor.cost = 50
        machines.add(skyCowExtractor);
        skyCowExtractors.add(skyCowExtractor);
      }
    }
    if (build == "milk seller") {
      if (coins >= 50) {
        coins -= 50
        var milkSeller = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        milkSeller.addAnimation("sell milk", milkSellerAnim);
        milkSeller.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        milkSeller.reload = 128
        milkSeller.cost = 50
        machines.add(milkSeller);
        milkSellers.add(milkSeller);
      }
    }
    if (build == "cream dairy") {
      if (coins >= 250) {
        coins -= 250
        var creamDairy = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        creamDairy.addAnimation("make cream", creamDairyAnim);
        creamDairy.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        creamDairy.reload = 240
        creamDairy.cost = 250
        machines.add(creamDairy);
        creamDairies.add(creamDairy);
      }
    }
    if (build == "cream seller") {
      if (coins >= 150) {
        coins -= 150
        var creamSeller = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        creamSeller.addAnimation("sell cream", creamSellerAnim);
        creamSeller.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        creamSeller.reload = 128
        creamSeller.cost = 150
        machines.add(creamSeller);
        creamSellers.add(creamSeller);
      }
    }
    if (build == "butter dairy") {
      if (coins >= 500) {
        coins -= 500
        var butterDairy = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        butterDairy.addAnimation("make butter", butterDairyAnim);
        butterDairy.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        butterDairy.reload = 480
        butterDairy.cost = 500
        machines.add(butterDairy);
        butterDairies.add(butterDairy);
      }
    }
    if (build == "sky cow printer") {
      if (coins >= 250) {
        coins -= 250
        var skyCowPrinter = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        skyCowPrinter.addAnimation("print", printerAnim);
        skyCowPrinter.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        machines.add(skyCowPrinter);
        skyCowPrinters.add(skyCowPrinter);
      }
    }
    if (build == "sky cow catcher") {
      if (coins >= 200 && cream >= 10) {
        coins -= 200
        cream -= 10
        var skyCowCatcher = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        skyCowCatcher.addAnimation("catch", catcherAnim);
        skyCowCatcher.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        var cowToAttract;
        do {
          cowToAttract = cows[Math.floor(random(cows.size()))]
        }
        while (cowToAttract.isAttracted)
          cowToAttract.setSpeed(0, 0);
          cowToAttract.attractionPoint(5, skyCowCatcher.position.x, skyCowCatcher.position.y)
          skyCowCatcher.attractedCow = cowToAttract;
          cowToAttract.isAttracted = true;
        skyCowCatchers.add(skyCowCatcher);
      }
    }
    if (build == "fence") {
      if (coins >= 10) {
        coins -= 10
        var fence = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        fence.addImage(fenceImg);
        fence.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        fence.cost = 10
        machines.add(fence);
        fences.add(fence);
      }
    }
    if (build == "well") {
      if (coins >= 50) {
        coins -= 50
        var well = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        well.addAnimation("well", wellAnim);
        well.addAnimation("broken", brokenWellAnim);
        well.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        well.reload = 150;
        well.uses = 4;
        well.active = true;
        well.repairTick = 0;
        machines.add(well);
        wells.add(well);
      }
    }
    if (build == "field") {
      if (coins >= 300) {
        coins -= 300
        var field = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        field.addImage("empty", fieldImg);
        field.addAnimation("watering", waterFieldAnim);
        field.addAnimation("growing wheat", wheatFieldAnim);
        field.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        field.growTime = 0;
        field.crop = 0;
        field.nutrients = 100;
        machines.add(field);
        fields.add(field);
      }
    }
    if (build == "rotary milker") {
      if (coins >= 450) {
        coins -= 450
        var rotaryMilker = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        rotaryMilker.addAnimation("milk", rotaryMilkerAnim);
        rotaryMilker.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        rotaryMilker.cost = 450
        machines.add(rotaryMilker);
        rotaryMilkers.add(rotaryMilker);
      }
    }

    if (build == "teleport station") {
      if (coins >= 500) {
        coins -= 500
        var warpStation = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        warpStation.addAnimation("teleport", warpStationAnim);
        warpStation.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        warpStation.name = prompt("What would you like to call this Teleport Station?");
        warpStation.cost = 500
        machines.add(warpStation);
        warpStations.add(warpStation);
      }
    }
    if (build == "water drill") {
      if (coins >= 1000) {
        coins -= 1000
        var waterDrill = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        waterDrill.addImage("idle", drillImg);
        waterDrill.addAnimation("drill", waterDrillAnim);
        waterDrill.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        waterDrill.cost = 1000;
        waterDrill.hasCow = false;
        waterDrill.acceptingCow = false;
        waterDrill.interfaceTick = 0;
        waterDrill.recipe = 0;
        waterDrill.craftTime = 0;
        machines.add(waterDrill);
        waterDrills.add(waterDrill);
      }
    }
     if (build == "desalinator") {
      if (coins >= 450) {
        coins -= 450
        var desalinator = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        desalinator.addAnimation("purify", desalinatorAnim);
        desalinator.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        desalinator.reload = 480;
        desalinator.temp = 0
        desalinator.cost = 450;
        machines.add(desalinator);
        desalinators.add(desalinator);
      }
    }
    if (build == "truck bay") {
      if (coins >= 1500 && truckBayOwned == false) {
        coins -= 1500
        var truckBay = createSprite(player.position.x, player.position.y, sprWidth*2, sprHeight*2);
        truckBay.addImage(truckBayImg);
        truckBay.setCollider("rectangle", 0, 0, sprWidth*2, sprHeight*2);
        truckBay.cost = 1
        truckBays.add(truckBay);
        truckBayOwned = true
      }
    }
    if (build == "sky fence") {
      yesno = confirm("⚡🧱 Build a Sky Fence Section for 10 Coins?");
      if (yesno == true && coins >= 20) {
        coins -= 20
        var skyFence = createSprite(player.position.x, player.position.y, sprWidth, sprHeight);
        skyFence.addAnimation("keep", skyFenceAnim);
        skyFence.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
        skyFence.cost = 10
        machines.add(skyFence);
        skyFences.add(skyFence);
      }
      else if(yesno == true) {
        alert("You can't afford this!")
      }
    } 
  }
}

function cowMovement() {
  for (var i = 0; i < cows.size(); i++) {
    if (cows.get(i).position.x - 12 <= cows.get(i).xpositions[cows.get(i).target] && cows.get(i).position.x + 12 >= cows.get(i).xpositions[cows.get(i).target] && cows.get(i).position.y - 12 <= cows.get(i).ypositions[cows.get(i).target] && cows.get(i).position.y + 12 >= cows.get(i).ypositions[cows.get(i).target]) {
      cows.get(i).target++;
      if (cows.get(i).target > 5) {
        cows.get(i).target = 0;
      }
      cows.get(i).setSpeed(0, 0);
      cows.get(i).attractionPoint(3, cows.get(i).xpositions[cows.get(i).target], cows.get(i).ypositions[cows.get(i).target]);
      console.debug(cows.get(i).target);
    }
    cows.get(i).refill--
    if (cows.get(i).refill == 0) {
      cows.get(i).refill = 150
      cows.get(i).empty = false
    }
  }
  for (var i = 0; i < caughtCows.size(); i++) {
    if (caughtCows.get(i).water == null) {
      caughtCows.get(i).water = 500
    }
    caughtCows.get(i).refill--;
    if (caughtCows.get(i).water > 0) {
      caughtCows.get(i).water--;
    }
    if (caughtCows.get(i).refill == 0 && caughtCows.get(i).water != 0) {
      caughtCows.get(i).refill = 150
      caughtCows.get(i).empty = false
    }
    if (caughtCows.get(i).water <= random(300) && water > 0) {
      water--;
      caughtCows.get(i).water += 500
    }
  }
  for (var i = 0; i < saltCows.size(); i++) {
    if (saltCows.get(i).water == null) {
      saltCows.get(i).water = 500
    }
    saltCows.get(i).refill--;
    if (saltCows.get(i).water > 0) {
      saltCows.get(i).water--;
    }
    if (saltCows.get(i).refill == 0 && saltCows.get(i).water != 0) {
      saltCows.get(i).refill = 150
      saltCows.get(i).empty = false
    }
    if (saltCows.get(i).water <= random(300) && water > 0) {
      water--;
      saltCows.get(i).water += 500
    }
  }
}

function doDeserts() {
  var activateDesert = int(random(desertZoneProbability));
  if (activateDesert == 1) {
    desertActive = true;
  } else {
    desertActive = false;
  }
  if (desertActive == true) {
    var desertZone = createSprite(random(gameWidth), random(gameHeight), sprWidth * 2, sprHeight * 2);
    desertZone.addImage(desertZoneImg);
    desertZone.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
    desertZone.timeLeft = 3000;
    desertZone.cost = -50;
    desertZones.add(desertZone);
  }
  for (var i = 0; i < desertZones.size(); i++) {
    desertZones.get(i).timeLeft--;
    if (desertZones.get(i).timeLeft == 0) {
      desertZones.get(i).remove();
    }
  }
}

function collisions() {
  cows.overlap(skyCowExtractors, extract);
  skyCowExtractors.overlap(player, destroy);
  milkSellers.overlap(player, destroy);
  creamDairies.overlap(player, destroy);
  creamSellers.overlap(player, destroy);
  butterDairies.overlap(player, destroy);
  desalinators.overlap(player, destroy);
  skyCowPrinters.overlap(player, make);
  skyCowPrinters.overlap(player, destroy);
  caughtCows.collide(fences, reloadCowAngle);
  skyCowCatchers.overlap(cows, capture);
  caughtCows.collide(player, extract);
  caughtCows.collide(caughtCows, reloadCowAngleDoStampede);
  wells.overlap(player, repairWell);
  wells.overlap(player, destroy);
  fields.collide(player, setField);
  caughtCows.overlap(rotaryMilkers, milkCow);
  fences.overlap(player, destroy);
  warpStations.overlap(player, destroy);
  desertZones.overlap(player, destroy);
  caughtCows.overlap(waterDrills, acceptCow);
  waterDrills.overlap(player, drillWithWater);
  saltCows.collide(fences, reloadCowAngle);
  saltCows.collide(saltCows, reloadCowAngleDoStampede);
  saltCows.collide(caughtCows, reloadCowAngleDoStampede);
  saltCows.overlap(rotaryMilkers, milkCow);
  truckBays.overlap(player, destroy);
  caughtCows.collide(skyFences, reloadCowAngle);
  cows.collide(skyFences, reloadCowAngle);
  player.overlap(skyFences, destroy);
  steamBursts.overlap()
  cows.overlap(player, observeSkyCow);
  if (keyIsDown(82)) {
    skyCowExtractors.collide(player);
    milkSellers.collide(player);
    creamDairies.collide(player);
    creamSellers.collide(player);
    butterDairies.collide(player);
    wells.collide(player);
    skyCowCatchers.collide(player);
    desalinators.collide(player);
  }
}

function repairWell(wellToRepair) {
  if (wellToRepair.uses == 0 && coins >= 30 && wellToRepair.repairTick == 0) {
    yesno = confirm("💦 Repair well for 30 Coins?");
    if (yesno) {
      coins -= 30;
      wellToRepair.active = true;
      wellToRepair.uses = 10;
      wellToRepair.changeAnimation("well");
    } else {
      wellToRepair.repairTick = 100
    }
  }
}

function explode(machine) {
  if (machine.cost != null) {
    machine.remove()
  }
}

function setField(fieldToSet) {
  if (fieldToSet.crop != 0) {
    return;
  }
  var toPlant = prompt("🌾 What would you like to plant? This field has " + fieldToSet.nutrients + " nutrients.");
  if (toPlant == null) {
    return;
  }
  toPlant.toLowerCase();
  if (toPlant == "water") {
    yesno = confirm("💧 Water field for 5 water?");
    if (yesno == true && water >= 5) {
      water -= 5;
      fieldToSet.growTime = 420
      fieldToSet.crop = 1;
      fieldToSet.nutrients += 50
      if (fieldToSet.nutrients > 100) {
        fieldToSet.nutrients = 100;
      }
      fieldToSet.changeAnimation("watering");
    }
  }
  if (toPlant == "wheat") {
    if (water >= 10 && coins >= 100 && fieldToSet.nutrients >= 30) {
      water -= 10
      coins -= 100
      fieldToSet.nutrients -= 30
      fieldToSet.growTime = 600
      fieldToSet.crop = 2;
      fieldToSet.changeAnimation("growing wheat");
    }
  }
}

function contracts() {
  exportRequest = floor(random(coins/10))
  yesno = confirm("Would you like to ship " + str(exportRequest) + " salt for " + str(exportRequest * 20) + " coins?")
  if(yesno == true && salt >= exportRequest){
    salt = salt - exportRequest;
    coins = coins + exportRequest * 20;
  }
}

function warping() {
  if (warpStations.size() > 0) {
    var warpTo = prompt("⏩ Which station would you like to teleport to?");
    if (warpTo == "Bozo International" && cheatCodeBozoAvalible) {
      cheatCodeBozoAvalible = false;
      alert("🤡 Welcome to Bozo International. We hope you enjoy your stay.");
      coins += 1500;
    }
    for (var i = 0; i < warpStations.size(); i++) {
      if (warpStations.get(i).name == warpTo) {
        var warpNum = warpStations.get(i);
        player.position.x = warpNum.position.x;
        player.position.y = warpNum.position.y;
      }
    }
  }
}

function observeSkyCow(observedCow) {
  stroke("blue")
  for (var i = 0; i < 5; i++) {
    line(observedCow.xpositions[i], observedCow.ypositions[i], observedCow.xpositions[i + 1], observedCow.ypositions[i + 1]);
  }
  line(observedCow.xpositions[0], observedCow.ypositions[0], observedCow.xpositions[5], observedCow.ypositions[5])
}

function milkCow(cowToMilk) {
  if (cowToMilk.isClassic && cowToMilk.empty == false && wheat > 0) {
    wheat--;
    milk += 3;
    cowToMilk.empty = true;
  }
  else if (cowToMilk.empty == false && wheat > 0) {
    eval(cowToMilk.milkType + " += 1");
    wheat--;
    cowToMilk.empty = true;
  }
}

function acceptCow(cowToCatch, machine) {
  if (machine.acceptingCow) {
    machine.acceptingCow = false;
    machine.hasCow = true;
    cowToCatch.remove();
  }
}

function drillWithWater(drillInQuestion) {
  if (drillInQuestion.interfaceTick > 0) {
    return;
  }
  if (drillInQuestion.hasCow) {
    var toDrill = prompt("What would you like to drill for?");
    if (toDrill == null) {
      return;
    }
    if (toDrill == "release cow") {
      createCows(1, "caught cow");
    }
    if (toDrill == "salt cow" && water >= 30) {
      water -= 30;
      drillInQuestion.craftTime = 600;
      drillInQuestion.hasCow = false;
      drillInQuestion.recipe = 1;
      drillInQuestion.changeAnimation("drill");
    }
  } 
  else {
    if (drillInQuestion.acceptingCow == false && drillInQuestion) {
      yesno = confirm("Open for a Cow?");
      if (yesno) {
        drillInQuestion.acceptingCow = true;
      }
    }
  }
  drillInQuestion.interfaceTick = 60;
}

function make(printer) {
  var toPrint = prompt("🧈 What would you like to print?");
  if (toPrint == null) {
    alert("⌨ Please type something.");
    return
  }
  toPrint.toLowerCase();
  if (toPrint == "cow" && butter >= 5) {
    butter -= 5
    createCows();
  }
  if (toPrint == "cows" && butter >= 50) {
    butter -= 50
    createCows(10);
  }
  if (toPrint == "amazing cow" && butter >= 20) {
    butter -= 20
    var cow = createSprite(printer.position.x, printer.position.y, sprWidth, sprHeight);
    cow.addImage(cowImg);
    cow.setCollider("rectangle", 0, 0, sprWidth, sprHeight);
    cow.empty = false;
    cow.refill = 150;
    cow.angle = 0;
    cow.setSpeed(3, cow.angle);
    cows.add(cow);
  }
  if (toPrint == "salt cow" && butter >= 10 && salt >= 15) {
    butter -= 10
    salt -= 15
    createCows(1, "salt");
  }
}

function capture(catcher, cowInQuestion) {
  catcher.attractedCow.setSpeed(3, catcher.attractedCow.angle);
  catcher.remove();
  cows.remove(cowInQuestion);
  caughtCows.add(cowInQuestion);
}

function reloadCowAngle(cowToReload) {
  cowToReload.angle = random(360);
  cowToReload.setSpeed(3, cowToReload.angle);
}

function reloadCowAngleDoStampede(cowToReload, secondCowToReload) {
  cowToReload.angle = random(360);
  cowToReload.setSpeed(3, cowToReload.angle);
  secondCowToReload.angle = random(360);
  secondCowToReload.setSpeed(3, secondCowToReload.angle);
}

function destroy(machine) {
  if (destroyMode) {
    if (machine.cost%10 != 0) {
      if (machine.cost == 1) {
        coins += 1500;
        machine.remove();
        truckBayOwned = false;
      }
    }
    else {
      coins += machine.cost;
      machine.remove();
    }
  }
  destroyMode = false;
}

function selling() {
  if (milkSellers.size() > 0) {
    for (var i = 0; i < milkSellers.size(); i++) {
      milkSellers.get(i).reload--
      if (milkSellers.get(i).reload == 0 && milk > 0) {
        milkSellers.get(i).reload = 128
        coins += 10
        milk--;
      } else if (milkSellers.get(i).reload == 0) {
        milkSellers.get(i).reload = 128
      }
    }
  }
  if (creamDairies.size() > 0) {
    for (var i = 0; i < creamDairies.size(); i++) {
      creamDairies.get(i).reload--
      if (creamDairies.get(i).reload == 0 && milk > 1) {
        creamDairies.get(i).reload = 128
        cream++;
        milk--;
        milk--;
      } else if (creamDairies.get(i).reload == 0) {
        creamDairies.get(i).reload = 128
      }
    }
  }
  if (creamSellers.size() > 0) {
    for (var i = 0; i < creamSellers.size(); i++) {
      creamSellers.get(i).reload--
      if (creamSellers.get(i).reload == 0 && cream > 0) {
        creamSellers.get(i).reload = 128
        coins += 40
        cream--;
      } else if (creamSellers.get(i).reload == 0) {
        creamSellers.get(i).reload = 128
      }
    }
  }
  if (butterDairies.size() > 0) {
    for (var i = 0; i < butterDairies.size(); i++) {
      butterDairies.get(i).reload--
      if (butterDairies.get(i).reload == 0 && milk > 0 && cream > 0) {
        butterDairies.get(i).reload = 128
        butter++;
        butter++;
        cream--;
        milk--;
      } else if (butterDairies.get(i).reload == 0) {
        butterDairies.get(i).reload = 128
      }
    }
  }
  if (wells.size() > 0) {
    for (var i = 0; i < wells.size(); i++) {
      wells.get(i).reload--
      if (wells.get(i).repairTick > 0) {
        wells.get(i).repairTick--;
      }
      if (wells.get(i).reload == 0 && wells.get(i).active == true) {
        wells.get(i).reload = 120
        water++;
        wells.get(i).uses--;
        if (wells.get(i).uses == 0) {
          wells.get(i).active = false;
          wells.get(i).changeAnimation("broken");
        }
      }
      else if (wells.get(i).reload == 0) {
        wells.get(i).reload = 128
      }
    }
  }
  if (fields.size() > 0) {
    for (var i = 0; i < fields.size(); i++) {
      if (fields.get(i).crop != 0) {
        fields.get(i).growTime--;
      }
      if (fields.get(i).growTime == 0) {
        fields.get(i).changeImage("empty");
        if (fields.get(i).crop == 2) {
          wheat += 10;
        }
        fields.get(i).crop = 0;
      }
    }
  }
  if (waterDrills.size() > 0) {
    for (var i = 0; i < waterDrills.size(); i++) {
      if (waterDrills.get(i).interfaceTick > 0) {
        waterDrills.get(i).interfaceTick--;
      }
      if (waterDrills.get(i).recipe != 0) {
        waterDrills.get(i).craftTime--;
      }
      if (waterDrills.get(i).craftTime == 0) {
        waterDrills.get(i).changeImage("idle");
        if (waterDrills.get(i).recipe == 1) {
          createCows(1, "salt cow", waterDrills.get(i).position.x, waterDrills.get(i).position.y);
        }
        waterDrills.get(i).recipe = 0;
      }
    }
  }
  if (desalinators.size() > 0) {
    for (var i = 0; i < desalinators.size(); i++) {
      desalinators.get(i).reload--
      if (desalinators.get(i).reload == 0 && saltyMilk > 0 && desalinators.get(i).temp > 2 && desalinators.get(i).temp < 11) {
        desalinators.get(i).reload = 480;
        desalinators.get(i).temp++;
        milk++;
        salt++;
        saltyMilk--;
        if (desalinators.get(i).temp == 9){
          var steamBurst = createSprite(desalinators.get(i).position.x, desalinators.get(i).position.y, sprWidth * 2, sprHeight * 2);
          steamBurst.addImage(steamBurstImg);
          steamBurst.setCollider("circle", 0, 0, sprWidth);
          steamBurst.temp = 960;
          steamBursts.add(steamBurst);
        }
      }
      else if (desalinators.get(i).reload == 0 && desalinators.get(i).temp < 3) {
        desalinators.get(i).reload = 480;
        desalinators.get(i).temp++;
      }
      else if (desalinators.get(i).reload == 0 && desalinators.get(i).temp < 9) {
        desalinators.get(i).reload = 480;
        desalinators.get(i).temp--;
      }
      else if (desalinators.get(i).reload == 0 && desalinators.get(i).temp < 11){
        desalinators.get(i).reload = 5280;
        desalinators.get(i).temp = 0;
      }
    }
  }
  if (steamBursts.size() > 0) {
    for (var i = 0; i < steamBursts.size(); i++) {
      steamBursts.get(i).temp--;
      if (steamBursts.get(i).temp == 0) {
        steamBursts.get(i).remove();
      }
    }
  }
}

function safeAdd(list, item) {
  if (!list.includes(item)) {
    list.push(item)
  }
}

function doResearch() {
  if (milk > 0) {
    safeAdd(builds, "Milk Seller")
  }
  if (coins > 100) {
    safeAdd(builds, "Cream Dairy")
  }
  if (cream > 0) {
    safeAdd(builds, "Cream Seller")
    safeAdd(builds, "Butter Dairy")
  }
  if (cream >= 10) {
    safeAdd(builds, "Sky Cow Catcher")
    safeAdd(builds, "Fence")
  }
  if (butter > 0) {
    safeAdd(builds, "Sky Cow Printer")
  }
}

function extract(cowInQuestion) {
  if (cowInQuestion.empty == false) {
    cowInQuestion.empty = true
    milk++;
  }
}

function draw() {
  background("blue");
  stroke("blue");
  fill("green");
  rect(0, 0, gameWidth, gameHeight);
  stroke("black");
  fill("black");
  playerControls();
  cowMovement();
  doDeserts();
  doResearch();
  camera.off();
  textSize(32);
  textAlign(LEFT);
  text("💲 Coins: " + coins, 10, 30);
  text("💧 Water: " + water, 10, 100);
  text("🥛 Milk: " + milk, 10, 170);
  text("🧂🥛 Salty Milk: " + saltyMilk, 10, 240);
  text("🍨 Cream: " + cream, 10, 310);
  text("🧈 Butter: " + butter, 10, 380);
  text("🧂 Salt: " + salt, 10, 450);
  text("🌾 Wheat: " + wheat, 10, 520);
  if (destroyMode && !gamepad) {
    text("Destroy Mode On. Press Q or 1 to turn off.", 10, canvasHeight - 40);
  }
  if (destroyMode) {
    destroyButton.color = "#ff0000";
  }
  else {
    destroyButton.color = "#008000";
  }
  //switchButton.draw();
  pauseButton.draw();
  buildButton.text = builds[selectedBuild];
  buildButton.draw();
  rotateButton.draw();
  if (warpStations.size() > 0) {
    warpButton.draw();
  }
  if (truckBayOwned == true) {
    dealButton.draw();
  }
  if (paused) {
    gameEndButton.draw();
  }
  if (paused && !gamepad) {
    gamepadButton.draw();
  }
  if (gamepad) {
    gamepadRightButton.draw();
    gamepadUpButton.draw();
    gamepadDownButton.draw();
    gamepadLeftButton.draw();
    destroyButton.draw();
  }
  camera.on();
  desertZones.draw();
  skyCowCatchers.draw();
  truckBays.draw();
  machines.draw();
  caughtCows.draw();
  saltCows.draw();
  playerGroup.draw();
  cows.draw();
  collisions();
  if (keyIsDown(73)) {
    for (var i = 0; i < cows.length;i++) {
      observeSkyCow(cows.get(i));
    }
  }
  selling();
  if (coins > getItem("highScore")) {
    removeItem("highScore");
    storeItem("highScore", str(coins));
  }
}