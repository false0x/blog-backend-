import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../prisma.service'
import { ArticleService } from '../article/article.service'

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, ArticleService]
})
export class CommentModule {}
