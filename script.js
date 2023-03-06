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
        this.x=Math.floor(cols/2);
        this.y=0;
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
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                if(this.grid[i][j]>0){
                    this.ctx.fillStyle="black";
                    this.ctx.fillRect(j,i,1,1);
                }
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();
        }
    }
    move(right){
        if(this.fallingPiece===null){
            return
        }else{
            if(right){
                this.fallingPiece.x--;
            }
        }
        this.renderGameState();
    }
}
const canvas=document.getElementById("game-canvas");
const ctx=canvas.getContext("2d");
const newPiece=new Piece(shape[0],ctx);
const model=new GameModel(ctx);
model.renderGameState();
if(model.fallingPiece===null){
    model.fallingPiece=newPiece;
}
document.addEventListener("keydown",e=>{
    e.preventDefault();
    switch(e.key){
        case "a":
            model.move(true);
            break;
    }
})