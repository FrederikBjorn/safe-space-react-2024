import "./DiaryPage.css"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Parse from "parse";


function DiaryPage() {
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = Parse.User.current().id;
            const userQuerry = new Parse.Query("_User");
            userQuerry.equalTo("objectId", userId);

            const user = await userQuerry.first();
            const diaryEntries = user.get("diaryHistory") || [];

            console.log("UserDiaries: " + diaryEntries);
            setHistory(diaryEntries);
        };
    
        fetchUserData();
    },[]);

    const handleAddEntry = async function(){
        if(text === "") return;

        const textFile = new Blob([text], { type: 'text/plain' });
        const filename = new Date().toISOString().slice(0, 10) + ".txt";
        const url = URL.createObjectURL(textFile);

        //updates diarylist and empties text: 
        setHistory([...history, {id: uuidv4(), name: filename, file: textFile, url: url}]);
        setText("");
        console.log(history);

        //Saves new list of diaries in database:
        try { 
            const user = Parse.User.current();
            user.set("diaryHistory", history);

            await user.save();
            console.log("Diary entry saved to the database.");
        } catch (error){
            console.log("Failed to save Diary Entry: " + error)
        }
    }

    const handleDismiss = function () {
        setText("");
    }

    const handleDownload = (url) => {
        try {
          window.open(url, "_blank");
        } catch (error) {
          console.error("Error opening file in new tab:", error);
        }
      };

    const handleDelete = async function (fileId) {
        setHistory(history.filter((oldfile)=> oldfile.id !== fileId))

        //Saves new list of diaries in database:
        try { 
            const user = Parse.User.current();
            user.set("diaryHistory", history);

            await user.save();
            console.log("Diary entry deleted.");
        } catch (error){
            console.log("Failed to delete Diary Entry: " + error)
        }

    };


    return(
        <div className="diary">
            <div className="diary-container">
                <div className="diary-entry-container">
                    <div className="diary-header"> 
                        <img src="Images/file.png" alt=""/>
                        <h2 className="text-small-header">New Diary Entry</h2>
                        <div></div>
                    </div>

                    <div className="diary-body">
                        <textarea placeholder="How are you feeling today?" value = {text} onChange={(e)=>setText(e.target.value)}/>
                    </div>
                    <div className="entry-buttons">
                        <button onClick={handleAddEntry}>Add Diary Entry</button>
                        <button onClick={handleDismiss}>Dismiss</button>
                    </div>
                </div>
                <div className="diary-history-container">
                    <div className="history-header">
                        <img src="Images/selftracking2.png" alt=""/>
                        <h2 className="text-small-header"> History </h2>
                    </div>
            
                    <ul className="items">
                        {history.map((file)=>(
                            <li key={file.id} className="entry">
                            <img src="Images/deleteIcon.png" alt="" onClick = {()=>handleDelete(file.id)}/>
                            
                            <div>
                                <img src="Images/file.png" alt=""/>
                                <span
                                    className="message-text"
                                    onClick={() => handleDownload(file.url)}
                                >
                                    {file.name}
                                </span>
                            </div>

                            <img
                              src="Images/downloade.png"
                              alt=""
                              onClick={() => handleDownload(file.url)}
                            />
                          </li>
                        ))}
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