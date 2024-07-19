import { TryCatch } from "../middlewares/error.js";

export const searchUser = TryCatch(
  async (req, res) => {

    const { name } = req.query;

    return res.status(200).json({ message: name })

  }
)

