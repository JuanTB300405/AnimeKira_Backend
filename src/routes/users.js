import { Router } from "express";
import { conectarDB } from "../db.js";
import { ObjectId } from "mongodb";
const usuariosRutas = Router();

usuariosRutas.get("/", async (req, res) => {
  try {
    const db = await conectarDB();
    const usuarios = await db.collection("usuarios").find().toArray();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

usuariosRutas.get("/:id", async (req, res) => {
  try {
    const db = await conectarDB();
    const { id } = req.params || req.body;
    const objectId = new ObjectId(id);
    const usuario = await db.collection("usuarios").findOne({ _id: objectId });
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

usuariosRutas.post("/", async (req, res) => {
  try {
    const db = await conectarDB();
    const { user, pass } = req.body;

    const result = await db.collection("usuarios").insertOne({ user, pass });
    //result === true
    if (result) {
      res.status(201).json({ mensaje: "usuario creado" });
    } else {
      res.status(500).json({ error: "error al crear el usuario" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar usuario" });
  }
});

usuariosRutas.patch("/", async (req, res) => {
  try {
    const db = await conectarDB();
    const { _id, ...input } = req.body;
    const objectId = new ObjectId(_id);

    console.log({ _id, ...input });

    const { acknowledged, modifiedCount, ...otro } = await db
      .collection("usuarios")
      .updateOne({ _id: objectId }, { $set: input });

    if (!acknowledged) {
      res.status(400).json({ error: "No se pudo modificar" });
      return false;
    }

    if (modifiedCount === 0) {
      res.status(400).json({ error: "No modificaste nada" });
      return false;
    }

    const usuarioActualizado = await db
      .collection("usuarios")
      .findOne({ _id: objectId });

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

usuariosRutas.delete("/", async (req, res) => {
  try {
    const db = await conectarDB();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const { deletedCount } = await db
      .collection("usuarios")
      .deleteOne({ _id: objectId });

    if (deletedCount === 1) {
      return res.status(200).json({ mensaje: "eliminado con exito" });
    } else {
      return res.status(500).json({ error: "error al eliminar" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al borrar usuario" });
  }
});

export default usuariosRutas;
