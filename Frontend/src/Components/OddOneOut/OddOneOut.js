import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const {draw, ...rest} = props
    const canvasRef = useRef(null)

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
            draw(context,frameCount, canvasWidth, canvasHeight)
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