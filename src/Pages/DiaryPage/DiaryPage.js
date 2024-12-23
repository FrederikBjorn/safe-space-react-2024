function DiaryPage() {

    return(
        <>
        <div className="diary-entry-container">
            <div className="diary-header"> 
                <img src="Images/downloade.png" alt=""/>
                <h2 className="header-title">New Diary Entry</h2>
                <img src="Images/downloade.png" alt=""/>
            </div>

            <div className="diary-body">
                <input placeholder="How are you feeling today?"> </input>
                <button>Add Diary Entry</button>
                <button> Dismiss</button>
            </div>
        </div>
        <div className="diary-history-container">
            <div className="history-header">
                <img src="Images/downloade.png" alt=""/>
                <h2 className="header-title"> History </h2>
            </div>
    
            <ul className="diary-items">
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
            </ul>
        </div>
        </>
    );

}