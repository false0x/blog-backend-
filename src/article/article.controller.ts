import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { Auth } from '../auth/decorators/auth.guard'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.articleService.get(+id)
  }

  @Get()
  getAll(@Query('page') page?: string) {
    if (page && page.toLowerCase() === 'all')
      return this.articleService.getAll('all')

    return this.articleService.getAll(page ? +page : undefined)
  }

  @Auth()
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Auth()
  @Put(':id')
  update(@Body() updateArticleDto: CreateArticleDto, @Param('id') id: string) {
    return this.articleService.update(updateArticleDto, +id)
  }

  @Auth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articleService.delete(+id)
  }
}
