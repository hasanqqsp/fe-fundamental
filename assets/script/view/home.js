// import Utils from "../utils.js";
import notesData from "../data/local/notes.js";

const home = () => {
  const addNoteForm = document.getElementsByTagName("add-note-form")[0];
  const addNoteButton = document.getElementsByTagName("add-note-button")[0];
  const notesListElement = document.querySelector("notes-list");

  const notesListContainer = notesListElement._shadowRoot.querySelector(
    "#notes-list-container"
  );

  const displayResult = (notes) => {
    let notesItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");

      noteItemElement.note = note;
      return noteItemElement;
    });
    // Utils.emptyElement(noteListElement);
    notesListElement._emptyContent();

    if (notesItemElements.length) {
      notesListContainer.append(...notesItemElements);
      notesListContainer.querySelectorAll("note-item").forEach((item) => {
        item.addEventListener("delete-note", (ev) => {
          const index = notesData.findIndex((note) => note.id !== ev.detail);
          notesData.splice(index, 1);
          displayResult(notesData);
        });
      });
    } else {
      const noData = document.createElement("p");
      noData.textContent = "Tidak ada catatan yang dapat ditampilkan";
      noData.style.textAlign = "center";
      noData.style.fontWeight = "bold";
      noData.style.fontSize = "1.1rem";

      notesListContainer.parentElement.append(noData);
    }
    notesItemElements = [];
  };
  displayResult(notesData);

  addNoteButton.addEventListener("toggle-form", () => {
    addNoteForm.display = addNoteForm.display == "none" ? "block" : "none";
  });

  const newNote = ({ title, body }) => ({
    id: String(+new Date()),
    title,
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  });

  addNoteForm.addEventListener("add-note", (ev) => {
    notesData.push(newNote(ev.detail));
    displayResult(notesData);
  });
};
home();
export default home;
