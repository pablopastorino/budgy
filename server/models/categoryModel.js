const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
class Category {
	static async getAll() {
		const categories = await prisma.Category.findMany()
		return categories
	}
}

module.exports = Category
