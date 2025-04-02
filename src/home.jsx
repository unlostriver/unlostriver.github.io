import AttentionButton from "./attention-button"
import {encrypt, useString} from "./noscrap"

export default () => {
    const title = useString("420BUMzrtG25vjol.KJhu+ujrPrigJ1fgVncM4T0JjKzCTm06AFEWaLu1Zbrtzg==")

    return (
        <div className="p-20 flex flex-col gap-20">
            <h1>{title}</h1>
            <ul className="pl-10 flex flex-col gap-10">
                <li><AttentionButton>Button</AttentionButton></li>
                <li><AttentionButton>Button</AttentionButton></li>
            </ul>
        </div>
    )
}

