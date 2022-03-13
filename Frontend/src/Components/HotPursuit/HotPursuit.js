import React, {useRef, useEffect } from 'react'

const Canvas = props => {

    const {draw, ...rest} = props
    const canvasRef = useRef(null)

    // const draw = (ctx, frameCount) => {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    //     ctx.fillStyle = '#000000'
    //     ctx.beginPath()
    //     ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    //     ctx.fill()
    // }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        let frameCount = 0
        let animationFrameId
        let canvasWidth;
        let canvasHeight;

        //Our draw come here
        const render = () => {
            frameCount++
            canvasWidth = 480;
            canvasHeight = 320;
            draw(context,frameCount, canvasWidth, canvasHeight);
            // animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {

                // window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas