import { Controller } from "./controller.js";
import { Display } from "./display.js";
import { Game } from "./game.js";
import { Engine } from "./engine.js";

let canvas = document.querySelector('canvas')

window.addEventListener('load', () => {

    //
    /// FUNCTIONS
    //

    let render = function () {
        display.drawMap(game.world.map, game.world.columns)
        //display.fill(game.world.bgcolor)
        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color)
        display.render()
    }

    let update = function () {

        if(controller.left.active){
            game.world.player.moveLeft()
        }
        
        if(controller.right.active){
            game.world.player.moveRight()
        }

        if(controller.up.active){
            game.world.player.jump()
            controller.up.active = false
        }

        game.update()
    }

    let keyDownUp = function(event) {
        controller.keyDownUp(event.type, event.keyCode)
    }

    //
    /// CLASSES
    //

    // Handles user's input
    let controller = new Controller()
    // Handles rendering and other related stuff
    let display = new Display(canvas)
    // Handles game logic
    let game = new Game()
    // Handles interactions of above sections
    let engine = new Engine(1000/40, render, update)


    //
    /// INITALIZE
    //

    display.buffer.canvas.width = game.world.width
    display.buffer.canvas.height = game.world.height

    canvas.width = game.world.width
    canvas.height = game.world.height

    display.map_sheet.image.addEventListener('load', () => {
        engine.start()
    }, {once:true})

    // Init sprites
    display.map_sheet.image.src = './sprites/tiles.png'

    // Listen for player actions
    window.addEventListener('keydown', keyDownUp)
    window.addEventListener('keyup', keyDownUp)

})