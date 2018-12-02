class TileSheet{
    constructor(tile_size){
        this.image = new Image();
        this.tile_size = tile_size
    }
}

export class Display{

    constructor(canvas){
        this.buffer = document.createElement('canvas').getContext('2d')
        this.context = canvas.getContext('2d')
        this.map_sheet = new TileSheet(16)
    }

    drawMap(map, columns){
        columns = columns - 1
        for(let index = map.length - 1; index > -1; --index){
            let source_x = map[index][0] * this.map_sheet.tile_size
            let source_y = map[index][1] * this.map_sheet.tile_size
            let destination_x = (index % columns) * this.map_sheet.tile_size;
            let destination_y = Math.floor(index / columns) * this.map_sheet.tile_size
            this.buffer.drawImage(this.map_sheet.image, source_x, source_y, this.map_sheet.tile_size, this.map_sheet.tile_size, destination_x, destination_y, this.map_sheet.tile_size, this.map_sheet.tile_size);
        }
    }

    drawRectangle(x, y, width, height, color){
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    }

    fill(color){
        this.buffer.fillStyle = color
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    render(){
        this.context.drawImage(
            this.buffer.canvas,
            0, 0,
            this.buffer.canvas.width,
            this.buffer.canvas.height,
            0, 0,
            this.context.canvas.width,
            this.context.canvas.height
        )
    }

}