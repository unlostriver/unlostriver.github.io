import {useEffect, useState} from "react"

let loadedKey = null

const loadKey = async () => {
    if (loadedKey) {
        return loadedKey
    }

    const jwk = JSON.parse(atob(
        "eyJhbGciOiJBMjU2R0NNIiwiZXh0Ijp0cnVlLCJrIjoibFIyTU9MbGRkV0MwdXFhMUtxUVpOeEN4T0ZKdTlpeFFNTDh1VkVmTnpSOCIsImtleV9" +
        "vcHMiOlsiZW5jcnlwdCIsImRlY3J5cHQiXSwia3R5Ijoib2N0In0="
    ))
    loadedKey = await crypto.subtle.importKey("jwk", jwk, "AES-GCM", false, ["encrypt", "decrypt"])
    return loadedKey
}

export const encrypt = async s => {
    const key = await loadKey()
    const encoder = new TextEncoder()
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encrypted = await crypto.subtle.encrypt(
        {name: "AES-GCM", iv}, key, encoder.encode(s)
    )
    return btoa(String.fromCharCode(...iv)) + "." + btoa(String.fromCharCode(...new Uint8Array(encrypted)))
}

export const decrypt = async s => {
    const key = await loadKey()
    const decoder = new TextDecoder()
    let [iv, ciphertext] = s.split(".")
    iv = new Uint8Array(atob(iv).split("").map(c => c.charCodeAt(0)))
    ciphertext = new Uint8Array(atob(ciphertext).split("").map(c => c.charCodeAt(0)))
    const decrypted = await crypto.subtle.decrypt(
        {name: "AES-GCM", iv}, key, ciphertext
    )
    return decoder.decode(decrypted)
}

export const useString = s => {
    const [state, setState] = useState(null)

    useEffect(() => {
        decrypt(s).then(s => setState(s))
    }, [])

    return state
}

