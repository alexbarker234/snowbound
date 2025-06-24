export default function Store() {
  return (
    <div className="store-container">
      <input type="checkbox" defaultChecked />
      <div className="hamburger">
        <span className="meat"></span>
        <span className="meat"></span>
        <span className="meat"></span>
      </div>
      <div className="store">
        <div className="store-title">Store</div>
        <hr />
        <div className="tab-buttons">
          <button className="tab-button selected" data-target="upgrades">
            Auto Clickers
          </button>
          <button className="tab-button" data-target="research">
            Research
          </button>
        </div>
        <hr />
        <div className="tabs">
          <div id="upgrades" className="tab"></div>
          <div id="research" className="tab disabled"></div>
        </div>
      </div>
    </div>
  );
}
