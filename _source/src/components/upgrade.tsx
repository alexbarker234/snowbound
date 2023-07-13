import { DOMcreateElement } from "./JSXParser";

function Upgrade({title, cost, total}: {title: string, cost: number, total:number}) {
    return (
        <div className="upgrade">
            <div className="upgrade-img"></div>
            <div className="upgrade-details">
                <div className="upgrade-title">{title}</div>
                <div className="upgrade-cost">❄️ <span className="amount">{cost}</span></div>
            </div>
            <div className="upgrade-total">{total}</div>
        </div>
    );
}
export default Upgrade;
