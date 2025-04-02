import {useEffect, useRef} from "react"
import {WebGLRenderer, PerspectiveCamera, SphereGeometry, MeshBasicMaterial, Mesh, Scene, MeshNormalMaterial, Vector3} from "three"
import * as R from "ramda"

let zMin = -500
let zMax = -50
let dz = 0.2
let canvas = null

const addStars = (scene, camera) => {
    const starGeometry = new SphereGeometry(1, 6, 6)
    const starMaterial = new MeshBasicMaterial({color: 0xffffff})
    const stars = R.map(() => new Mesh(starGeometry, starMaterial), R.range(0, 70))
    R.forEach(star => scene.add(star), stars)

    const resetStar = star => {
        const random = (min, max) => min + Math.random() * (max - min)

        const startPosition = (min, max) =>
            (Math.random() < 0.5 ? -1 : 1) * random(min, max)

        const tanFOV = Math.tan(0.5 * Math.PI * camera.fov / 180)
        const yMin = zMin * tanFOV
        const yMax = zMax * tanFOV
        let z = random(zMin, zMax)
        if (star.position.z != 0) {  // init position = 0, won't be 0 afterwards unless zMax is 0.
            z += zMin - zMax
        }
        star.position.set(
            startPosition(yMin, yMax) * camera.aspect,
            startPosition(yMin, yMax),
            z
        )
    }

    const update = dt => {
        R.forEach(star => {
            if (star.position.z > zMax) {
                resetStar(star)
            }
            star.position.z += dt * dz
        }, stars)
    }

    return update
}

const startAnimation = () => {
    const renderer = new WebGLRenderer({canvas, antialias: true})
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, 1, -zMax, -zMin)
    const updateStars = addStars(scene, camera)

    const resize = () => {
        if (canvas.width == canvas.clientWidth && canvas.height == canvas.clientHeight) {
            return
        }
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    const render = timePrev => timeNext => {
        resize()
        updateStars(Math.max(0, timeNext - timePrev))
        renderer.render(scene, camera)
        requestAnimationFrame(render(timeNext))
    }

    requestAnimationFrame(render(performance.now()))
}

export default () => {
    const ref = useRef()

    useEffect(() => {
        if (ref.current && !canvas) {
            canvas = ref.current
            startAnimation()
        }
    })

    return <canvas className="fixed -z-1 w-screen h-screen bg-black" ref={ref}></canvas>
}

