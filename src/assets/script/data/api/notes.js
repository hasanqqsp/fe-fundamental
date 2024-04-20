const BASE_URL = "https://notes-api.dicoding.dev/v2";

const getNotes = async () => {
  const notesFetched = await fetch(BASE_URL + "/notes");
  const notesJson = await notesFetched.json();
  return notesJson.data;
};

const getArchivedNotes = async () => {
  const notesFetched = await fetch(BASE_URL + "/notes/archived");
  const notesJson = await notesFetched.json();
  return notesJson.data;
};

const addNote = async ({ title, body }) => {
  try {
    const addedNote = await fetch(BASE_URL + "/notes", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await addedNote.json();
    if (responseJson.status === "success") {
      Swal.fire({
        title: "Sukses!",
        text: "Sukses menambahkan catatan!",
        icon: "success",
        confirmButtonText: "OK",
      });
      return responseJson.data;
    }
  } catch (err) {
    Swal.fire({
      title: "Gagal!",
      text: "Gagal menambahkan catatan!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const deleteNote = async (id) => {
  const addedNote = await fetch(BASE_URL + "/notes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await addedNote.json();
  if (responseJson.status === "success") {
    Swal.fire({
      title: "Sukses!",
      text: "Sukses menghapus catatan!",
      icon: "info",
      confirmButtonText: "OK",
    });
    return responseJson.data;
  }
};

const archiveNote = async (id) => {
  const archived = await fetch(BASE_URL + "/notes/" + id + "/archive", {
    method: "POST",
  });
  const responseJson = await archived.json();
  if (responseJson.status === "success") {
    return responseJson.data;
  } else {
  }
};
const unarchiveNote = async (id) => {
  const archived = await fetch(BASE_URL + "/notes/" + id + "/unarchive", {
    method: "POST",
  });
  const responseJson = await archived.json();
  if (responseJson.status === "success") {
    return responseJson.data;
  } else {
    r;
  }
};
export {
  getNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
};
