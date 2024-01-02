import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { ArticleService } from '../article/article.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService,
              private articleService: ArticleService) {
  }

  async create(data: CreateCommentDto, id: number) {
    await this.articleService.get(id)

    return this.prisma.comment.create({
      data: {
        ...data,
        articleId: id
      }
    })
  }
}
