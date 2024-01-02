import { Body, Controller, Param, Post } from '@nestjs/common'
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':articleId')
  create(@Body() createCommentDto: CreateCommentDto, @Param('articleId') articleId: string) {
    return this.commentService.create(createCommentDto, +articleId)
  }
}
