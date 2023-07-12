import { DOMcreateElement } from "./JSXParser";

function Upgrade({title, cost}: {title: string, cost: number}) {
    return (
        <div className="upgrade">
            <div className="upgrade-img"></div>
            <div className="upgrade-details">
                <div className="upgrade-title">{title}</div>
                <div className="upgrade-cost">❄️ {cost}</div>
            </div>
        </div>
    );
}
export default Upgrade;
