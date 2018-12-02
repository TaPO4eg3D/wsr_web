class ButtonInput{

    constructor(){
        this.down = false
        this.active = this.down
    }

    getInput(down){
        if(this.down != down){
            this.active = down
        }
        this.down = down
    }

}

export class Controller{
    constructor(){
        this.left = new ButtonInput()
        this.right = new ButtonInput()
        this.up = new ButtonInput()
    }

    keyDownUp(type, key_code){

        let down = (type == "keydown") ? true : false

        switch(key_code){
            case 37:
                this.left.getInput(down)
                break
            case 38:
                this.up.getInput(down)
                break
            case 39:
                this.right.getInput(down)
                break
        }

    }

}