//Create variables here
var dog,dogimg,happydogimg,database,foods,foodstock
var database
function preload()
{
  //load images here
  happydogimg = loadImage("dogImg.png")
  dogimg = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(700, 600);
  database = firebase.database()
  dog = createSprite(300,300)
  dog.addImage("dog",dogimg)
  dog.scale = 0.2
  foodstock = database.ref('Food')
  foodstock.on("value",readStock)
}

function readStock(data){
  foods = data.val()
}

//Function to write values in DB
function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      Food:x
    }
  )
}

function draw() {  
  background("cyan");

  //Function to read values from DB
  if(keyWentDown(UP_ARROW)){
    writeStock(foods)
    dog.addImage("dog",happydogimg)
  } 
  fill("blue")
  textSize(20)
  text("Food Available:" + foods,250,560)
  drawSprites();
  //add styles here
  fill("blue")
  textSize(30)
  text("Press the Up arrow to feed the Dog",100,100)
  text("Name:-Tenny",200,200)
}



