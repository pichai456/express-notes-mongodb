import NoteModel from "../../models/notes.model";

export async function fetchNotes(query) {
  let bestQuery = {};
  if (query.search) {
    bestQuery = {
      ...bestQuery,
      ...{
        title: {
          $regex: new RegExp(query.search, "i"),
        },
      },
    };
  }
  if (query.status) {
    bestQuery = {
      ...bestQuery,
      status: query.status,
    };
  }
  if (query.tags) {
    bestQuery = {
      ...bestQuery,
      tags: {
        $in: query.tags,
      },
    };
  }
  if (query.subscribeStart || query.subscribeEnd) {
    let subscribeConditions = {};
    if (query.subscribeStart) {
      subscribeConditions.$gte = query.subscribeStart;
    }
    if (query.subscribeEnd) {
      subscribeConditions.$lte = query.subscribeEnd;
    }
    bestQuery = {
      ...bestQuery,
      subscribeCount: subscribeConditions,
    };
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skipIndex = (page - 1) * limit;
  const notes = await NoteModel.find(bestQuery)
    .skip(skipIndex)
    .limit(limit)
    .exec();
  const totalNotes = await NoteModel.countDocuments(bestQuery);
  const totalPages = Math.ceil(totalNotes / limit);
  return { notes, page, totalNotes, totalPages };
}
export async function fetchNotesById(id) {
  const note = NoteModel.findById({ _id: id });
  return note;
}
export async function createNote(noteData) {
  const newNote = new NoteModel(noteData);
  if (!newNote) {
    throw new Error("Note not created");
  }
  return newNote.save();
}
export async function updateNote(id, noteData) {
  const updatedNote = await NoteModel.findByIdAndUpdate(id, noteData, {
    new: true,
  });
  if (!updatedNote) {
    throw new Error("Note not found");
  }
  return updatedNote;
}
export async function deleteNote(id) {
  const deletedNote = await NoteModel.findByIdAndDelete(id);
  if (!deletedNote) {
    throw new Error("Note not found");
  }
  return deletedNote;
}
