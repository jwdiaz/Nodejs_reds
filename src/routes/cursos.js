const express = require("express");
const router = express.Router();

// Models
const Curso = require("../models/Curso");

router.get("/cursos", async (req, res) => {
  const curso = await Curso.find({
    estado: "disponible"
  }).sort({
    nombre: 1
  });

  res.render("cursos/listar-cursos", {
    curso
  });
});

router.get("/new-curso", (req, res) => {
  res.render("cursos/crear-cursos");
});

router.get("/ver-curso/:id", async (req, res) => {
  const id = req.params.id;
  const infoCurso = await Curso.find({
    idCurso: id
  });
  //res.send(curso);
  res.render("cursos/ver-curso", {
    infoCurso
  });
});

router.get("/ver-cursos", async (req, res) => {
  const Cursos = await Curso.find();
  //res.send(curso);
  res.render("cursos/todoscursos", {
    Cursos
  });
});

router.get("/estado-cursos/:id/:estado", async (req, res) => {
  const id = req.params.id;
  const Cursos = await Curso.find();
  //res.send(curso);
  res.redirect("/ver-cursos");
});
router.get("/eliminar-curso/:id", async (req, res) => {
  await Curso.findByIdAndRemove(req.params.id);
  //res.send(curso);

  res.redirect("/ver-cursos");
});

router.post("/cursos/new", async (req, res) => {
  const body = req.body;

  // Saving a New curso
  const newCurso = new Curso({
    idCurso: body["idCurso"],
    nombre: body["nombre"],
    descripcion: body["descripcion"],
    valor: body["valor"],
    intensidad: body["intensidadHoraria"],
    modalidad: body["modalidad"],
    estado: "disponible"
  });

  await newCurso.save();

  res.redirect("/ver-cursos");
});

module.exports = router;
