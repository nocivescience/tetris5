const shape=[
    [],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],[
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ]
];
const blockSideLength=20;
const rows=20;
const cols=10;
class Piece{
    constructor(shape,ctx){
        this.shape=shape;
        this.ctx=ctx;
        this.x=0;
        this.y=Math.floor(rows/2);
    }
    renderPiece(){
        this.shape.forEach((row,i)=>{
            row.forEach((value,j)=>{
                if(value>0){
                    this.ctx.fillStyle="red";
                    this.ctx.fillRect(this.x+j,this.y+i,1,1);
                }
            });
        });
    }
}
class GameModel{
    constructor(ctx){
        this.ctx=ctx;
        this.fallingPiece=null;
        this.grid=this.makeStartingGrid();
    }
    makeStartingGrid(){
        let grid=[];
        for(let i=0;i<rows;i++){
            grid.push([]);
            for(let j=0;j<cols;j++){
                grid[grid.length-1].push(0);
            }
        }
        return grid;
    }
    move(right){
        if(this.fallingPiece===null){
            return
        }
        let x=this.fallingPiece.x;
        let y=this.fallingPiece.y;
        if(right){
            x+=1;
        }
        this.fallingPiece.renderPiece();
    }
}
const canvas=document.getElementById("game-canvas");
const ctx=canvas.getContext("2d");
const newPiece=new Piece(shape[1],ctx);
const model=new GameModel(ctx);
ctx.scale(blockSideLength,blockSideLength);

if(model.fallingPiece===null){
    model.fallingPiece=newPiece;
    model.fallingPiece.renderPiece();
}else{
    console.log("There is already a piece");
}
console.log(model.fallingPiece);
document.addEventListener("keydown",event=>{
    event.preventDefault();
    switch(event.key){
        case "d":
            model.move(true);
            break;
    }
})