import { DOMcreateElement } from "./JSXParser";

function Research({ title, cost, total, max }: { title: string; cost: number; total: number; max: number }) {
    return (
        <div className="purchasable research">
            <div className="purchase-details">
                <div className="purchase-title">{title}</div>
                <div className="purchase-cost">
                    ❄️ <span className="amount">{cost}</span>
                </div>
            </div>
            <div className="progress-bar">
                <div className="inner" style={`width: ${(total / max) * 100}%`}></div>
            </div>
        </div>
    );
}
export default Research;
