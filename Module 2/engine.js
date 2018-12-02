export class Engine{

    constructor(time_step, render, update){

        this.accumulated_time = 0 // Amount of time that's accumulated since the last update
        this.animation_frame_request = undefined
        this.time = undefined // The most recent timestamp of loop execution
        this.time_step = time_step // Frames per second

        this.updated = false

        this.update = update
        this.render = render

    }

    start(){
        this.accumulated_time = this.time_step
        this.time = window.performance.now()
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun.bind(this))
    }

    stop(){
        window.cancelAnimationFrame(this.animation_frame_request)
    }

    run(time_stamp){
        this.accumulated_time += time_stamp - this.time
        this.time = time_stamp

        if(this.accumulated_time >= this.time_step * 3){
            this.accumulated_time = this.time_step
        }

        while(this.accumulated_time >= this.time_step){
            this.accumulated_time -= this.time_step
            this.update(time_stamp)
            this.updated = true
        }

        if(this.updated){
            this.updated = false
            this.render(time_stamp)
        }

        this.animation_frame_request = window.requestAnimationFrame(this.handleRun.bind(this))

    }

    handleRun(time_stamp){
        this.run(time_stamp)
    }

}