import express from "express";
import { User } from "../entity/User";

export const router = express.Router({
  strict: true,
});

router.post("/logout", (req, res) => {
  (req.session as any).loggedin = false;
  (req.session as any).username = "";
  res.status(200).send({ msg: "Usuário desconectado" });
});

router.post("/login", async (req, res) => {
  req.body = req.query;
  const { username, password } = req.body;

  if (username && password) {
    const user = await User.findOne({
      where: { username, password },
    });

    if (user) {
      (req.session as any).loggedin = true;
      (req.session as any).username = username;
    } else {
      res.status(404).send({ msg: "Usuário ou Senha incorretos." });
    }

    res.status(200).send({ msg: "Login efetuado com sucesso!" });
  }
});
