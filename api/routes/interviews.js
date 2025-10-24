const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/auth/authToken");
const { authRole } = require("../middlewares/authorization/authRole");
const { endpointCreate, endpointSearch, endpointUpdate, endpointDelete } = require("../controllers/handlers/endpointHandler");
const { Interview, Note, Representative, Status } = require("../models/index");

router.use(authToken);

// ENTREVISTAS
router.get("/", authRole("Interview", "read"), endpointSearch({
  model: Interview,
  filters: [
    { field: "title", type: "string" },
    { field: "representativeId", type: "int" },
    { field: "statusId", type: "int" },
    { field: "scheduledDate", type: "date" }
  ]
}));

router.post("/", authRole("Interview", "create"), endpointCreate({
  model: Interview,
  columnNames: ["representativeId", "title", "scheduledDate", "description", "statusId"]
}));

router.put("/:id/status", authRole("Interview", "update"), async (req, res) => {
  try {
    const { statusId } = req.body;
    await Interview.update({ statusId }, { where: { id: req.params.id } });
    res.json({ message: "Estado de entrevista actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
});

// NOTAS DE ENTREVISTA
router.get("/:id/notes", authRole("Note", "read"), endpointSearch({
  model: Note,
  filters: [
    { field: "interviewId", type: "int" },
    { field: "content", type: "string" }
  ]
}));

router.post("/:id/notes", authRole("Note", "create"), endpointCreate({
  model: Note,
  columnNames: ["interviewId", "content", "authorId"]
}));

router.put("/:id/notes/:noteId", authRole("Note", "update"), endpointUpdate({
  model: Note,
  columnNames: ["content"]
}));

router.delete("/:id/notes/:noteId", authRole("Note", "delete"), endpointDelete({ model: Note }));

module.exports = router;