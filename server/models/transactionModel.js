const { PrismaClient } = require('@prisma/client')
const Joi = require('joi')

const prisma = new PrismaClient()

class Transaction {
  static async getAll(id) {
    const transactions = await prisma.Transaction.findMany({
      where: { userId: id },
      include: {
        concepts: {
          select: {
            name: true,
            categories: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    return transactions
  }

  static async remove(id) {
    const deleteTransaction = await prisma.Transaction.deleteMany({
      where: { id: Number(id) }
    })

    return deleteTransaction
  }

  static async create(transaction) {
    const { concept: name, categoryId } = transaction

    const newConcept = await prisma.Concept.upsert({
      where: { name },
      update: { name, categoryId },
      create: { name, categoryId }
    })

    const newTransaction = await prisma.transaction.create({
      data: {
        ammount: transaction.ammount,
        registrationDate: transaction.date,
        score: String(transaction.score),
        userId: transaction.userId,
        conceptId: newConcept.id
      }
    })

    return newTransaction
  }

  static validateTransaction(transaction) {
    const schema = Joi.object({
      date: Joi.date().iso().max('now').required().label('Date'),
      categoryId: Joi.number().min(1).required().label('Category'),
      concept: Joi.string().min(3).max(25).required().label('Concept'),
      ammount: Joi.number().required().label('Ammount'),
      score: Joi.number().min(1).max(5).required().label('Score'),
      userId: Joi.number().min(1).required().label('User')
    })
    return schema.validate(transaction)
  }
}

module.exports = Transaction
