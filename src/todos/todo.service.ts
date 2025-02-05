import { Injectable } from '@nestjs/common';

 @Injectable()
export class TodoService {
  private todos: string[] = [];
  
  getAllTodos(): string[] {
    return this.todos;
  }
  
  getTodoByIndex(index: number): string | { message: string } {
    return this.todos[index] !== undefined ? this.todos[index] : { message: 'Todo not found' };
  }

  createTodo(todo: string): { message: string } {
    this.todos.push(todo);
    return { message: 'Todo created successfully' };
  }

  updateTodoByIndex(index: number, newTodo: string): { message: string } {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = newTodo;
      return { message: 'Todo updated successfully' };
    }
    return { message: 'Invalid index' };
  }

  deleteTodoByIndex(index: number): { message: string } {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
      return { message: 'Todo deleted successfully' };
    }
    return { message: 'Invalid index' };
  }
}
