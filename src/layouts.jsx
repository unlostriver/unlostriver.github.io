import {Link} from "react-router"

export const LinkButton = (props) => {
    return (
        <Link {...props}>
            <button className="attention-button">{props.children}</button>
        </Link>
    )
}

export const BackToHome = (props) => {
    let title = props.title
    if (typeof title == "string") {
        title = <h1>{title}</h1>
    }

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="flex gap-20 pt-10 pl-20 pr-20">
                <LinkButton to="/">Home</LinkButton>
                {title}
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export const SimpleDetails = (props) => {
    return (
        <BackToHome {...props}>
            <div className="m-[5em] p-[1.5em] attention-box">
                {props.children}
            </div>
        </BackToHome>
    )
}

export const TitleIcon = (props) => {
    return (
        <div className="flex flex-col gap-1 items-center">
            <img className="w-15 h-15" src={props.image} />
            <span>{props.title}</span>
        </div>
    )
}

