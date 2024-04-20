import {
  getNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../data/api/notes.js";

// import Utils from "../utils.js";
const home = async () => {
  const loading = document.getElementsByTagName("loading-fs")[0];
  const showLoading = async (state) => {
    if (state) {
      loading.style.display = "flex";
    } else {
      await new Promise((resolve) => {
        setTimeout((_) => resolve(), 250);
      });
      loading.style.display = "none";
    }
  };
  const addNoteForm = document.getElementsByTagName("add-note-form")[0];
  const addNoteButton = document.getElementsByTagName("add-note-button")[0];
  const notesListElement = document.querySelector("notes-list.main-list");
  const notesListArchivedElement = document.querySelector(
    "notes-list.archived-list",
  );

  const notesListContainer = notesListElement._shadowRoot.querySelector(
    ".notes-list-container",
  );
  const notesArchivedListContainer =
    notesListArchivedElement._shadowRoot.querySelector(".notes-list-container");

  const displayNotes = async () => {
    const notesData = await getNotes();
    const notesArchivedData = await getArchivedNotes();
    notesListElement.notesData = notesData;
    notesListArchivedElement.notesData = notesArchivedData;
  };
  showLoading(true);
  await displayNotes();
  showLoading(false);

  addNoteButton.addEventListener("toggle-form", (event) => {
    addNoteForm.display = addNoteForm.display == "none" ? "block" : "none";
  });

  // const newNote = ({ title, body }) => ({
  //   id: String(+new Date()),
  //   title,
  //   body,
  //   createdAt: new Date().toISOString(),
  //   archived: false,
  // });

  addNoteForm.addEventListener("add-note", async (ev) => {
    await addNote(ev.detail);
    await displayNotes();
  });
  const handleAction = async (ev) => {
    switch (ev.detail.action) {
      case "delete":
        await Swal.fire({
          title: "Yakin ingin menghapus?",
          showDenyButton: true,
          confirmButtonText: "Ya",
          denyButtonText: "Tidak",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteNote(ev.detail.id);
          }
        });

        break;
      case "archive":
        await archiveNote(ev.detail.id);
        break;
      case "unarchive":
        await unarchiveNote(ev.detail.id);
        break;
    }
    // if (ev.detail.action === "delete ") await deleteNote(ev.detail.id);
    // else if (ev.detail.action === "archive") await archiveNote(ev.detail.id);
    await displayNotes();
  };
  notesListElement.addEventListener("action-note", handleAction);
  notesListArchivedElement.addEventListener("action-note", handleAction);
};

export default home;
