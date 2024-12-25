import "./DiaryPage.css"
import { useState } from "react";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from 'uuid';


function DiaryPage() {
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);

    const handleAddEntry = function(){
        if(text === "") return;

        // Converts text to a PDF: 
        const pdf = new jsPDF();
        const filename = new Date().toISOString().slice(0, 10) + ".pdf";

        pdf.text(text, 10, 10);
        pdf.save(filename);
        setHistory([...history, {name: filename, file: pdf}]);
        setText("");
        console.log(history);
    }

    const handleDismiss = function(){
        setText("");
    }

    const handleDownload = (url) => {
        try {
          window.open(url, "_blank");
        } catch (error) {
          console.error("Error opening file in new tab:", error);
        }
      };

    const formatName = (name) => {
        return name.split("_").slice(1).join("_");
      };

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
                            <li key={uuidv4()} className="entry">
                              <img src="Images/file.png" alt=""/>
                              <span
                                className="message-text"
                                onClick={() => handleDownload(file.url())}
                              >
                                {file.name}
                              </span>
                            <img
                              src="Images/downloade.png"
                              alt=""
                              onClick={() => handleDownload(file.url())}
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