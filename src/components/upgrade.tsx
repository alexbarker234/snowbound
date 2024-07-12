import { DOMcreateElement } from "./JSXParser";

function Upgrade({title, cost, total}: {title: string, cost: number, total:number}) {
    return (
        <div className="purchasable upgrade">
            <div className="upgrade-img"></div>
            <div className="purchase-details">
                <div className="purchase-title">{title}</div>
                <div className="purchase-cost">❄️ <span className="amount">{cost}</span></div>
            </div>
            <div className="upgrade-total">{total}</div>
        </div>
    );
}
export default Upgrade;
