import { validate } from 'class-validator';
import express from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";

export const router = express.Router({
  strict: true,
});

// Endpoits
// CREATE
router.post('/products', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  req.body = req.query;
  try {
    const repo = getRepository(Product);
    const { name, description } = req.body;

    const product = repo.create({
      name,
      description,
    });

    const errors = await validate(product);

    if (errors.length === 0) {
      const response = await repo.save(product);
      return res.status(201).json(response);
    }
    return res.status(400).json(errors);
  } catch (err) {
    return res.status(400).send();
  }
});

// READ
// ALL
router.get('/products', async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

// By ID
router.get('/products/:id', async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id
    }
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: "Product not found" })
  }
});

// By Name
router.get('/products/name/:name', async (req, res) => {
  const product = await Product.findOne({
    where: {
      name: req.params.name
    }
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: "Product not found" })
  }
});

// UPDATE
router.put('/products/:id', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  req.body = req.query;
  try {
    const repo = getRepository(Product);
    const { name, description } = req.body;

    const productValidate = repo.create({
      name,
      description,
    });

    const errors = await validate(productValidate);

    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    });

    if (errors.length === 0) {
      if (product) {
        if (name) {
          product.name = name;
        }
        if (description) {
          product.description = description;
        }

        await product.save();
        res.send(product);
      } else {
        res.status(404).send({ message: "Product not found" })
      }
    }
    return res.status(400).json(errors);
  } catch (err) {
    return res.status(400).send();
  }
});

// DELETE
router.delete('/products/:id', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  const product = await Product.findOne({
    where: {
      id: req.params.id
    }
  });
  if (product) {
    await product.remove();
    res.send({ message: 'Product deleted' });
  } else {
    res.status(404).send({ message: "Product not found" })
  }
});
