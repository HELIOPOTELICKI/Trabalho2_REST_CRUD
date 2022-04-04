import { validate } from "class-validator";
import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const router = express.Router({
  strict: true,
});

// Endpoits
// CREATE
router.post('/users', async (req, res) => {
  req.body = req.query;
  try {
    const repo = getRepository(User);
    const { username, password } = req.body;

    const user = repo.create({
      username,
      password,
    });

    const errors = await validate(user);

    if (errors.length === 0) {
      const response = await repo.save(user);
      return res.status(201).json(response);
    }
    return res.status(400).json(errors);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// READ
// ALL
router.get('/users', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  const users = await User.find();
  //users.forEach(user => {
  //   user.password = "*"
  //});
  res.send(users);
});

// By ID
router.get('/users/:id', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "User not found" })
  }
});

// By Name
router.get('/users/username/:username', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "User not found" })
  }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  req.body = req.query;
  try {
    const repo = getRepository(User);
    const { username, password } = req.body;

    const userValidate = repo.create({
      username,
      password,
    });

    const errors = await validate(userValidate);

    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });

    if (errors.length === 0) {
      if (user) {
        if (username) {
          user.username = username;
        }
        if (password) {
          user.password = password;
        }
        await user.save();
        res.send(user);
      } else {
        res.status(404).send({ message: "User not found" })
      }
    }
    return res.status(400).json(errors);
  } catch (err) {
    return res.status(400).send(err);
  }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
  if (!(req.session as any).loggedin) {
    res.status(403).send({ msg: "Faça login para acessar esta função" });
  }
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  if (user) {
    await user.remove();
    res.send({ message: 'User deleted' });
  } else {
    res.status(404).send({ message: "User not found" })
  }
});