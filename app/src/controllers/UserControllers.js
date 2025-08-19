import User from "../models/User";

class UserController {
  async create(req, res){
      try {
      const novoUser = await User.create(req.body)
     res.json(novoUser)
      } catch (error) {
        return res.status(400).json({ errors: error.errors.map(err => err.message) });
      }
  }

  async index(req, res){
    try {
      const user = await User.findAll({ attributes : ['id', 'nome', 'email']})
      return res.json(user)
    } catch (error) {
      return res.json(null)
    }
  }

  async show(req, res){
    try {
      const user = await User.findByPk(req.userId)
      const { id, nome, email} = user
      return res.json({ id, nome, email})
    } catch (error) {
      return res.json(null)
    }
  }

  async update(req, res){
    try {
      const { id } = req.params

      if(!id){
         return res.status(400).json({
          errors: "ID não enviado"
         })
      }

      const user = await User.findByPk(id)
       if(!user){
         return res.status(400).json({
          errors: "Usuário não existe"
         })
      }

      const novoDado = await user.update(req.body)
      const {nome, email} = novoDado
      return res.json({ id, nome, email})
    } catch (error) {
      return res.json(null)
    }
  }

  async delete(req, res){
     const user = await User.findByPk(req.userId)

       if(!user){
         return res.status(400).json({
          errors: "Usuário não existe"
         })
      }

      await user.destroy()
      return res.json(null)
    } catch (error) {
      return res.json(null)
    }
  }

export default new UserController();
