const Sidebar = ({
  notes,
  onAddNote,
  activeNote,
  setActiveNote,
  toggle_sidebar
}) => { const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const extractTextContent = (html) => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(html, "text/html");
      return parsed.documentElement.textContent;
  };

  return (
      <div className={`sidebar ${toggle_sidebar ? "hide" : ""}`}>
        <div className="sidebarHeader">
          <h1>Notes</h1>
          <button onClick={onAddNote}>&#43;</button>
        </div>
        <div className="sidebarNotes">
          {sortedNotes.map(({ id, title, body, lastModified }) => (
            <div key={id} className={`individualNoteSidebar ${id === activeNote && "active"}`} onClick={() => setActiveNote(id)}>
              <div className="individualNoteSidebarTitle">
                <strong>
                  {title}
                </strong>
              </div>
              <p>
                {body && extractTextContent(body.substr(0, 100)) + "..."}
              </p>
              <small className="metaData">
                Last Modified{":  "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Sidebar;