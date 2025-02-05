import { TodoService } from './todo.service';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Todos') 
@Controller('todos')
export class TodoController {
  constructor(private readonly appService: TodoService) {}

  @ApiOperation({ summary: 'Get all todos' })
  @Get()
  getAllTodos() {
    return this.appService.getAllTodos();
  }

  @ApiOperation({ summary: 'Get a todo by index' })
  @ApiParam({ name: 'index', type: 'number', description: 'Index of the todo' })
  @Get(':index')
  getTodoByIndex(@Param('index') index: number) {
    return this.appService.getTodoByIndex(index);
  }

  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ schema: { type: 'object', properties: { todo: { type: 'string' } } } })
  @Post()
  createTodo(@Body('todo') todo: string) {
    return this.appService.createTodo(todo);
  }

  @ApiOperation({ summary: 'Update a todo by index' })
  @ApiParam({ name: 'index', type: 'number', description: 'Index of the todo' })
  @ApiBody({ schema: { type: 'object', properties: { todo: { type: 'string' } } } })
  @Put(':index')
  updateTodoByIndex(@Param('index') index: number, @Body('todo') newTodo: string) {
    return this.appService.updateTodoByIndex(index, newTodo);
  }

  @ApiOperation({ summary: 'Delete a todo by index' })
  @ApiParam({ name: 'index', type: 'number', description: 'Index of the todo' })
  @Delete(':index')
  deleteTodoByIndex(@Param('index') index: number) {
    return this.appService.deleteTodoByIndex(index);
  }
}


