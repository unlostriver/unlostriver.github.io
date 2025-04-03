import * as R from "ramda"
import {encrypt, useString} from "./noscrap"
import {LinkButton, SimpleDetails, TitleIcon} from "./layouts"

export const Home = () => {
    const title = useString("420BUMzrtG25vjol.KJhu+ujrPrigJ1fgVncM4T0JjKzCTm06AFEWaLu1Zbrtzg==")

    return (
        <div className="p-10 pl-20 pr-20 flex flex-col gap-10">
            <h1>{title}</h1>
            <dl id="nav-bar">
                <section>
                    <dt>About me</dt>
                    <div>
                        <dd><LinkButton to="/biography">Biography</LinkButton></dd>
                        <dd><LinkButton to="/skills">Technical Skills</LinkButton></dd>
                        <dd><LinkButton to="/education">Education</LinkButton></dd>
                    </div>
                </section>
                <section>
                    <dt>Projects</dt>
                    <div>
                        <dd><LinkButton to="https://github.com/unlostriver/bvr" target="_blank">BVR</LinkButton></dd>
                        <dd><LinkButton to="https://github.com/unlostriver/mediversed" target="_blank">Mediversed</LinkButton></dd>
                        <dd><LinkButton to="https://github.com/unlostriver/my-camp-site" target="_blank">My Camp Site</LinkButton></dd>
                        <dd><LinkButton to="https://github.com/unlostriver" target="_blank">More...</LinkButton></dd>
                    </div>
                </section>
            </dl>
        </div>
    )
}

export const Biography = () => {
    const email = useString("rPqfmTF+G6hReyRS.3uqwqT0mqoADKd9wt/OoZzt27qNHY0H+zcGC144yk7ZUNeiMdg==")

    return (
        <SimpleDetails title="Biography">
            <p>Hello,</p>
            <p>I'm a computer science graduate from the University of Toronto. Throughout my time at the university and various internships, I've grown accustomed to full-stack web development as well as native app development. I'm experienced in working in large, enterprise level software development environments, as well as small, fast-paced startup environments. In my opinion, while codebases, paradigms, and procedures vary from company to company, the one crucial constant among all good development teams is effective communication and personal initiative. A product is only as good as the teamwork behind it, that's why I pay close attention to my ability to communicate, organize, and lead when working on any engineering tasks, be it a small bug fix or a major feature.</p>
            <p>Fun story: during my time working as an iOS app developer at BDC, I was given a trivial task of changing a localization string. It was nothing more than a quick 10-minute detour during my usual work day, but as it turned out, disaster awaited. When my simple change in the localization string was sent to production and subsequently updated on all the account managers' iPads, their app stopped functioning entirely. My team quickly took over, and after their investigation, they found that an old bug in an obscure part of the codebase was causing localized strings (rather than the more appropriate values) to be sent as part of a REST API call. At the time, I felt like I would be unfairly blamed for the production crash, even though my team reassured me that the problem was not my fault. However, eventually I learned two important lessons from this experience:
            <br />1. Software development is a team effort, not a place for individual show-offs. The team shares the achievements of a successful product, and we also share the responsibilities.
            <br />2. Always be prepared to be surprised. Software development is complex and accidents happen. Sometimes even the best test coverage can't foresee freak accidents. Knowing my tools and my limits is crucial for good preparedness.</p>
            <p>If you're still reading, thanks for your attention 🙂. Speaking of attention, I've recently developed an interest in deep learning. Since graduating from UofT, I've returned to studies at GBC to explore applied artificial intelligence. While I'm still pretty new to the field, I've made major progress in my studies in under just a year. I've become proficient with foundational data engineering tools such as NumPy, Scikit-Learn, and various data preprocessing and visualization tools. I'm also an active self-learner, and in the process of familiarizing myself with deep learning models such as YOLO, so that I can work on interesting AI-based projects in the near future. But for now, perhaps you can check out my past projects instead:</p>
            <LinkButton to="/">Projects</LinkButton>
            <p>Or, if you'd like to get in touch about project collaboration, work opportunities, or just want to get to know me more, please feel free to contact me by email:</p>
            <LinkButton to={"mailto:" + email}><span>{email}</span></LinkButton>
        </SimpleDetails>
    )
}

export const Skills = () => {
    const renderIcons = R.compose(R.values, R.mapObjIndexed(
        (image, title) => <TitleIcon title={title} image={image} key={title} />
    ))

    return (
        <SimpleDetails title="Technical Skills">
            <h2>Languages</h2>
            <div className="grid grid-cols-[repeat(auto-fill,150px)] gap-5">
                {...renderIcons({
                    Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
                    TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
                    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
                    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
                    C: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
                    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
                    Lua: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg",
                    Swift: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
                    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
                    Bash: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
                    PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
                    MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
                })}
            </div>
            <h2>Frameworks and Libraries</h2>
            <div className="grid grid-cols-[repeat(auto-fill,150px)] gap-5">
                {...renderIcons({
                    "scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
                    NumPy: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
                    Pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
                    PyTorch: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
                    TensorFlow: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
                    "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
                    React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
                    "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
                    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
                    Express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
                    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
                    Flask: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
                    Django: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
                    UIKit: null,
                    Arduino: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg"
                })}
            </div>
            <h2>DevOps</h2>
            <div className="grid grid-cols-[repeat(auto-fill,150px)] gap-5">
                {...renderIcons({
                    "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
                    Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
                    "Arch Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/archlinux/archlinux-original.svg",
                    Fedora: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fedora/fedora-original.svg",
                    Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
                })}
            </div>
            <h2>Software Platforms</h2>
            <div className="grid grid-cols-[repeat(auto-fill,150px)] gap-5">
                {...renderIcons({
                    Cloudflare: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
                    "Google Cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
                    AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
                    Azure: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
                    Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
                    Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
                })}
            </div>
        </SimpleDetails>
    )
}

export const Education = () => {
    const line1 = useString("mXB4SnVATBzoyRQP.0pgEfFXuDgusWiWjA27qGh02RVKHGYSBz4QQFhjNpkmHIGBowmMtu9XBkHnWXLbYNjz1qXmnkX0YwHn4gBdyCWpiu1/mWf5Dvaw=")
    const line2 = useString("rNNOEGDFbC4mFVoe.p8DPD0ahFanFaI7seVWXq+5EIj2FNl5UWNsk1lPaETrcdZLMXrUnwd8MmeOed1Pb7Lj4qI6r9X/oa6sYDCb9izpg4iPClZbvTnogQuhkDwOV597xaQXL")

    return (
        <SimpleDetails title="Education">
            <p>{line1}</p>
            <p>{line2}</p>
        </SimpleDetails>
    )
}

