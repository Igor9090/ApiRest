import Aluno from "../models/Aluno";
import Image from "../models/Image";

class AlunoController {
  async index(req, res){
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Image, 'id', 'DESC']],
      include: {
        model: Image,
        attributes: ['url', 'filename']
      }
    })
    res.json(alunos)
  }

  async create(req , res){
    try {
      const aluno = await Aluno.create(req.body)
      return res.json(aluno)

    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message)
      })
    }
  }

  async show(req , res){
    try {
      const {id} = req.params

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id, {
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Image, 'id', 'DESC']],
      include: {
        model: Image,
        attributes: ['url','filename']
      }
    })

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

      return res.json(aluno)
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message)
      })
    }
  }

  async update(req , res){
    try {
      const {id} = req.params

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

      await aluno.update(req.body)

      return res.json("Aluno editado com sucesso")
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message)
      })
    }
  }

  async delete(req , res){
    try {
      const {id} = req.params

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

      await aluno.destroy()
      return res.json("Aluno apagado com sucesso")
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message)
      })
    }
  }

}

export default new AlunoController();
