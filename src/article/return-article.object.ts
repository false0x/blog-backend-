import { Prisma } from '.prisma/client'

export const returnArticleObject: Prisma.ArticleInclude = {
  comments: {
    orderBy: {
      createdAt: 'desc'
    }
  }
}