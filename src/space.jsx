import {useEffect, useRef} from "react"
import {WebGLRenderer, PerspectiveCamera, SphereGeometry, MeshBasicMaterial, Mesh, Scene} from "three"
import * as R from "ramda"

export default () => {
    const ref = useRef()
    const zMin = -5
    const starGeometry = new SphereGeometry(1, 8, 8)
    const starMaterial = new MeshBasicMaterial({color: 0xffffff})

    const newStarMesh = () => new Mesh(starGeometry, starMaterial)

    const resetPosition = star => {
    }

    useEffect(() => {
        const renderer = new WebGLRenderer({antialias: true, canvas: ref.current})
        const camera = new PerspectiveCamera(75, 2, 0, -zMin)
        const scene = new Scene()
        const stars = R.map(newStarMesh, R.range(0, 50))
        R.forEach(star => scene.add(star), stars)
    }, [])

    return <canvas className="fixed -z-1 w-screen h-screen bg-black" ref={ref}></canvas>
}

