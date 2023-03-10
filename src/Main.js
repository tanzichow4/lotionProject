import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Main = ({ activeNote, onUpdateNote, onDeleteNote}) => {
    const onEditField = (field, value) => {
      onUpdateNote({...activeNote, [field]: value, lastModified: Date.now()});
    };
    const [editMode, seteditMode] = useState(true);
    const SaveClick = () => {
        seteditMode(false);
    }
    const Calenderchange = (date) =>{
        const updatedNote = {
            ...activeNote, lastModified: date.getTime(),
        };
        onUpdateNote(updatedNote);
    }
    const EditClick = () => {
        seteditMode(true);
    }
    const DeleteClick = () => {
        if(window.confirm("Are you sure?")){
            onDeleteNote(activeNote.id);
        }
    };
    const formatDate = (when) => {
      const formatted = new Date(when).toLocaleString("en-US", options);
      if (formatted === "Invalid Date") {
          return "";
      }
      return formatted;
    };
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    
    if (!activeNote) return <div className="no-active-note">Select a note, or make a new one.</div>;

    return (
        <div className="mainApp">
            <div className="metaData"></div>
        
            <div className="noteEdit">
                <span>
                    <input type="text" id="noteName" placeholder="Pick a name." value={activeNote.title} onChange={(e) => onEditField("noteName", e.target.value)} />
                    
                    <span id = "bottomSpace">
                        {editMode ? 
                            <button id = "saveButton" className="button" onClick={SaveClick}>Save</button>
                        :
                            <button id = "editButton" className="button" onClick={EditClick}>Edit</button>
                        }
                        <button id = "deleteButton" className="button" onClick={DeleteClick}>Delete</button>
                        </span>
                    </span>
                    
                    {editMode ? (
                    <div className="typeStuff">
                        <input type="datetime-local" id = "dateSelect" value={formatDate(activeNote.lastModified)} onChange = {(e) => Calenderchange(new Date(e.target.value))}/>
                        <ReactQuill id = "edit" value = {activeNote.body} onChange = {(value)=>onEditField('body',value)}/>
                    </div>
                    ):(
                    
                    <div className="noteDisplay">
                        <div className="editing" dangerouslySetInnerHTML={{__html:activeNote.body}}></div>
                    </div>
                )}
            </div>
        </div>
        
    );
    };
    
    export default Main;