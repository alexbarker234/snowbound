import { DOMcreateElement } from "./JSXParser";

function Research({ title, description, cost, total, max, progressText }: { title: string; description: string; cost: number; total: number; max: number; progressText:string }) {
    return (
        <div className={`purchasable research ${total >= max ? 'full' : ''}`}>
            <div className="purchase-details">
                <div className="purchase-title">{title}</div>
                <div className="description">{description}</div>
                <div className="purchase-cost">
                    ❄️ <span className="amount">{cost}</span>
                </div>
            </div>
            <div className="progress-bar">
                <div className="text">{progressText}</div>
                <div className="inner" style={`width: ${(total / max) * 100}%`}></div>
            </div>
        </div>
    );
}
export default Research;
