import { Router } from "express";
import {
  createNote,
  deleteNote,
  updateNote,
  fetchNotes,
  fetchNotesById,
} from "./notes.service";

export const router = new Router();

router.get("/notes", async (req, res) => {
  try {
    const query = req.query;
    const { notes, page, totalNotes, totalPages } = await fetchNotes(query);
    res.status(200).json({
      message: "success",
      totalNotes: totalNotes,
      currentPage: page,
      totalPages: totalPages,
      data: notes,
    });
  } catch (error) {
    console.log("Error fetch note", error);
    res.status(500).json({ message: "Error fetch note", error: error.message });
  }
});
router.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await fetchNotesById(id);
    if (note === null) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json({
      message: "success",
      data: note,
    });
  } catch (error) {
    console.log("Error fetch note", error);
    res.status(500).json({
      message: "Error fetch note",
      error: error.message,
    });
  }
});
router.post("/notes", async (req, res) => {
  try {
    const newNote = await createNote(req.body);
    res.status(201).json({
      message: "success",
      data: newNote,
    });
  } catch (error) {
    console.log("Error creating", error);
    res.status(500).json({
      message: "Error create note",
      error: error.message,
    });
  }
});

router.patch("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = req.body;
    const updatedNote = await updateNote(id, note);
    res.status(200).json({ message: "success", data: updatedNote });
  } catch (error) {
    console.log("Error update note", error);
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
});

router.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await deleteNote(id);
    res.status(200).json({ message: "success", data: deletedNote });
  } catch (error) {
    console.log("Error delete note");
    res.status(500).json({
      message: "Error delete note",
      error: error.message,
    });
  }
});
