export default function Header() {
    return (
        <div className="header">
            <div className="header-inner">
                <div>
                    <p className="header-label">CPU SCHEDULING SIMULATOR</p>
                    <h1 className="header-title">Priority vs SRTF</h1>
                </div>
                <div className="header-rule">
                    <p className="header-rule-label">PRIORITY RULE</p>
                    <p className="header-rule-text">Lower number = Higher priority &nbsp;|&nbsp; Ties → Earliest arrival first</p>
                </div>
            </div>
        </div>
    );
}