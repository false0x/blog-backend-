import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { NotModifiedException } from './exceptions/not-modified.exception'
import { returnArticleObject } from './return-article.object'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {
  }

  async getAll(pageOrAll?: number | 'all') {
    const articlesOnPage = 5
    const totalArticles = await this.prisma.article.count()

    if (pageOrAll === 'all') {
      const allArticles = await this.prisma.article.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: returnArticleObject,
      })

      return {
        articles: allArticles,
        pageInfo: {
          currentPage: 1,
          totalPages: 1,
          remainingPages: 0,
        },
      }
    }

    const page = typeof pageOrAll === 'number' ? pageOrAll : 1
    const skipCount = Math.max((page - 1) * articlesOnPage, 0)
    const totalPages = Math.ceil(totalArticles / articlesOnPage)
    const remainingPages = Math.max(totalPages - page, 0)

    const paginatedArticles = await this.prisma.article.findMany({
      skip: skipCount,
      take: articlesOnPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: returnArticleObject,
    })

    return {
      articles: paginatedArticles,
      pageInfo: {
        currentPage: page,
        totalPages: totalPages,
        remainingPages: remainingPages,
      },
    }
  }

  async get(id: number) {
    if (!Number(id)) throw new BadRequestException()

    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
      include: returnArticleObject,
    })

    if (!article) throw new NotFoundException('Article not found')

    return article
  }

  async create(data: CreateArticleDto) {
    return this.prisma.article.create({
      data,
      include: returnArticleObject,
    })
  }

  async update(data: CreateArticleDto, id: number) {
    const article = await this.get(id)

    if (article.title === data.title && article.content === data.content)
      throw new NotModifiedException()

    return this.prisma.article.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        shortContent: data.shortContent,
      },
      include: returnArticleObject,
    })
  }

  async delete(id: number) {
    const article = await this.get(id)

    if (!article) throw new NotFoundException('Article not found')

    return this.prisma.article.delete({
      where: {
        id,
      },
    })
  }
}
