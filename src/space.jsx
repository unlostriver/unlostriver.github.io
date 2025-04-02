import {useEffect, useRef} from "react"
import {
    WebGLRenderer,
    PerspectiveCamera,
    SphereGeometry,
    MeshBasicMaterial,
    Mesh,
    Scene,
    DirectionalLight,
    Box3,
    Sphere
} from "three"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader"
import * as R from "ramda"
import lowPolyEarth from "./assets/low-poly-earth/scene.gltf"

let zMin = -500
let zMax = -50
let dz = 0.2
let canvas = null

const nearSize = camera => {
    const tanFOV = Math.tan(0.5 * Math.PI * camera.fov / 180)
    const height = 2 * camera.near * tanFOV
    return [camera.aspect * height, height]
}

const farSize = camera => {
    const tanFOV = Math.tan(0.5 * Math.PI * camera.fov / 180)
    const height = 2 * camera.far * tanFOV
    return [camera.aspect * height, height]
}

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

const addEarth = (scene, camera) => {
    const nRadius = 0.5
    const loader = new GLTFLoader()
    const light = new DirectionalLight(0xffffff, 3)
    let earth = null
    let defaultRadius = null

    const update = dt => {
        if (!earth) {
            return
        }
        const [width, _] = nearSize(camera)
        const radius = nRadius * width
        const scale = radius / defaultRadius
        earth.scale.set(scale, scale, scale)
        earth.position.set(0.6 * (width - radius), 0, -(camera.near + radius))
        earth.rotation.y += 0.0005 * dt
    }

    light.target.position.set(0, 0, -1)
    scene.add(light)
    scene.add(light.target)
    loader.load(
        lowPolyEarth,
        body => {
            earth = body.scene
            const box = new Box3().setFromObject(earth)
            const sphere = new Sphere()
            box.getBoundingSphere(sphere)
            defaultRadius = sphere.radius
            scene.add(earth)
        },
        xhr => {
        },
        err => {
            console.error(err)
        }
    )

    return update
}

const startAnimation = () => {
    const renderer = new WebGLRenderer({canvas, antialias: true})
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, 1, -zMax, -zMin)
    const updateStars = addStars(scene, camera)
    const updateEarth = addEarth(scene, camera)

    const resize = () => {
        if (canvas.width == canvas.clientWidth && canvas.height == canvas.clientHeight) {
            return
        }
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    const render = timePrev => timeNext => {
        const dt = Math.max(0, timeNext - timePrev)
        resize()
        updateStars(dt)
        updateEarth(dt)
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

