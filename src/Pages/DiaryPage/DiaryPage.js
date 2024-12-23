import "./DiaryPage.css"
function DiaryPage() {

    return(
        <div className="diary">
            <div className="diary-container">
                <div className="diary-entry-container">
                    <div className="diary-header"> 
                        <img src="Images/file.png" alt=""/>
                        <h2 className="text-small-header">New Diary Entry</h2>
                        <img src="Images/downloade.png" alt=""/>
                    </div>

                    <div className="diary-body">
                        <textarea placeholder="How are you feeling today?"/>
                    </div>
                    <div className="entry-buttons">
                        <button>Add Diary Entry</button>
                        <button> Dismiss</button>
                    </div>
                </div>
                <div className="diary-history-container">
                    <div className="history-header">
                        <img src="Images/selftracking2.png" alt=""/>
                        <h2 className="text-small-header"> History </h2>
                    </div>
            
                    <ul className="items">
                        <li>item 1</li>
                        <li>item 2</li>
                        <li>item 3</li>
                    </ul>
                    <div className="download-history">
                        <button>Download All</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DiaryPage;