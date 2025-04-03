import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router"
import Space from "./space"
import {Home, Biography, Skills, Education} from "./pages"
import "./index.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <title>Portfolio</title>
        <Space />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/biography" element={<Biography />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/education" element={<Education />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)

