import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, ArticleModule, CommentModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService
  ],
})
export class AppModule {}
