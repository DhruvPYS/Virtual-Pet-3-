//Create variables here
var dogimage, happydog, database, foodS, foodStock, dog, feeddog, addFood, lastFed,
fedTime

function preload()
{
	//load images here
  dogimage = loadImage("Dog.png")

  happydog = loadImage("happydog.png")

  bedroomimg = loadImage("images/BedRoom.png")

  gardenimg = loadImage("images/Wash Room.png")
  washroomimg = loadImage("images/Garden.png")
  sadDog = loadImage("images/deadDog.png")

}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database ()
  
  

foodobject = new Food()

foodStock = database.ref ('Food')
foodStock.on("value", readStock)

dog = createSprite(820, 250, 50, 50)
  dog.addImage(dogimage)
dog.scale = 0.2

addFood = createButton("Add more FOOD!")
addFood.position(900, 100)
addFood.mousePressed(addFoods)

feeddog =  createButton("Feed the DOG!")
feeddog.position(1050,100)
feeddog.mousePressed(feedDog)

readState = database.ref("gameState")
readState.on("value", function (data)
{
gameState = data.val()
})

//lol = createSprite(80, 100, 10, 10)
}


function draw() {  
background(46,139, 87)
 foodobject.display()
 fedTime = database.ref('FeedTime')
 fedTime.on("value", function(data){
  lastFed = data.val()
 })
 fill ("white")
 currentTime = hour()
if(currentTime === (lastFed + 1))
{
update("Playing")
foodobject.garden()
} else if(currentTime=== (lastFed + 2))
{
update("Sleeping")
foodobject.bedroom()
} else if(currentTime>(lastFed + 2) && currentTime <=(lastFed + 4))  
{
update("Bathing")
foodobject.washroom()
} else 
{
update ("Hungry")
foodobject.display()

if(lastFed>= 12)
{
text("Last Fed:" + lastFed %12 + "PM", 350, 30)

} else if(lastFed === 0)
{
text("Last Fed: 12AM", 350,30)
}
else {
text ("Last fed: " + lastFed + "AM", 350, 30)
}
//if(keyWentDown(UP_ARROW))
//{
//writeStock(foodS)
//dog.addImage(happydog)
//}
if(gameState != "Hungry")
{
  feeddog.hide()
  addFood.hide()
  dog.remove()
} else
{
feeddog.show()
addFood.show()
dog.addImage(sadDog)
}

}
  drawSprites();
  //add styles here

  //text("Food Remaining:" + foodS, 180, 200)
  //text("NOTE: Press the UP ARROW to feed Bruno!", 120, 20)
textSize(10)

}



function readStock(data)
{
foodS = data.val()
foodobject.updateFoodStock(foodS)
}

function feedDog()
{
dog.addImage(happydog)

foodobject.updateFoodStock(foodobject.getFoodStock()-1)
database.ref("/").update({
  Food: foodobject.getFoodStock(),
  FeedTime: hour ()
})
}

function addFoods()
{
foodS++
database.ref("/").update
({
Food: foodS
})
}

function update(state)
{
database.ref('/').update({
gameState: state
})
}

function writeStock(x)
{
  if(x<=0)
  {
    x = 0
  }  else 
  {
  x =x -1
  }
  
}


//database.ref("/").update({Food: x})
