class Food 
{


constructor ()
{
    this.foodStock = 0

this.image = loadImage("Milk.png")
this.lastFed

}

updateFoodStock(foodS)
{
this.foodStock = foodS
}

getFedTime(lastFed)
{
this.lastFed = lastFed
}

deductFood()
{
if(this.foodStock>0)
{
this.foodStock = this.foodStock - 1
}
}

getFoodStock()
{
return this.foodStock
}

bedroom()
{
background(bedroomimg, 550, 500)

garden ()
{
background(gardenimg, 550, 500)
}

washroom()
{
background(washroomimg,550,500)
}

}
display()
{
var x = 80, y = 100

imageMode (CENTER)
image(this.image, 720, 220, 70,70)

if(this.foodStock !=0){
for(var i = 0; i< this.foodStock; i++){
if(i%10==0){
x = 80
y=y + 50
} 
image (this.image,x,y,50,50)
x = x + 30
     }
    } 

    }
}