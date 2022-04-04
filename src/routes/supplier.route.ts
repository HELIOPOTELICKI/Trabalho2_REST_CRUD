import express from "express";
import { Supplier } from "../entity/Supplier";
import { validate } from "class-validator";
import { getRepository } from "typeorm";

export const router = express.Router({
  strict: true,
});

// Endpoits
// CREATE
router.post("/suppliers", async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  req.body = req.query;
  try {
    const repo = getRepository(Supplier);
    const { cnpj, name, phone, zipcode } = req.body;

    const supplier = repo.create({
      cnpj,
      name,
      phone,
      zipcode,
    });

    const errors = await validate(supplier);

    if (errors.length === 0) {
      const response = await repo.save(supplier);
      return res.status(201).json(response);
    }
    return res.status(400).json(errors);
  } catch (err) {
    return res.status(400).send();
  }
});

// READ
// ALL
router.get("/suppliers", async (req, res) => {
  const supplier = await Supplier.find();
  res.send(supplier);
});

// By ID
router.get("/suppliers/:id", async (req, res) => {
  const supplier = await Supplier.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).send({ message: "Supplier not found" });
  }
});

// By Name
router.get("/suppliers/name/:name", async (req, res) => {
  const supplier = await Supplier.findOne({
    where: {
      name: req.params.name,
    },
  });
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).send({ message: "Supplier not found" });
  }
});

// By phoneNumber
router.get("/suppliers/phone/:phone", async (req, res) => {
  const supplier = await Supplier.findOne({
    where: {
      phone: req.params.phone,
    },
  });
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).send({ message: "Supplier not found" });
  }
});

// UPDATE
router.put("/suppliers/:id", async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  req.body = req.query;
  try {
    const repo = getRepository(Supplier);
    const { cnpj, name, phone, zipcode } = req.body;

    const supplierValidate = repo.create({
      cnpj,
      name,
      phone,
      zipcode,
    });

    const errors = await validate(supplierValidate);

    const supplier = await Supplier.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (errors.length === 0) {
      if (supplier) {
        if (cnpj) {
          supplier.cnpj = cnpj;
        }
        if (name) {
          supplier.name = name;
        }
        if (phone) {
          supplier.phone = phone;
        }
        if (zipcode) {
          supplier.zipcode = zipcode;
        }

        await supplier.save();
        res.send(supplier);
      } else {
        res.status(404).send({ message: "Supplier not found" });
      }
    }
    return res.status(400).json(errors);
  } catch (err) {
    return res.status(400).send();
  }
});

// DELETE
router.delete("/suppliers/:id", async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  const supplier = await Supplier.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (supplier) {
    await supplier.remove();
    res.send({ message: "Supplier deleted" });
  } else {
    res.status(404).send({ message: "Supplier not found" });
  }
});
