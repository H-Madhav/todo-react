import {addTodo, findById, toggleTodo, updateTodo,
removeTodo, filterTodos} from './todoHelpers'

test('addTodo should add passed todo to the list', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false}
  ]
  const newTodo = {id: 3, name: 'Ship it', isComplete: false}
  const expected = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false},
    {id: 3, name: 'Ship it', isComplete: false}
  ]
  const result = addTodo(startTodo, newTodo);
  expect(result).toEqual(expected)
})

test('findById should return an expected item from list', ()=> {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false}
  ]
    const expected = {id: 2, name: 'Build An Awesome App', isComplete: false}
    const result = findById(2, startTodo)
    expect(result).toEqual(expected)
})

test('toggleTodo should be able to toggle the isComplete prop of a todo', () => {
  const startTodo = {id: 1, name: 'Learn Jsx', isComplete: false}
  const expected =  {id: 1, name: 'Learn Jsx', isComplete: true}
  const result = toggleTodo(startTodo)
  expect(result).toEqual(expected)
})

test('toggleTodo should mutate original todo', () => {
  const startTodo = {id: 1, name: 'Learn Jsx', isComplete: false}
  const result = toggleTodo(startTodo)
  expect(result).not.toBe(startTodo)
})

test('updateTodo should update an item in the list', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false},
    {id: 3, name: 'Ship it', isComplete: false}
  ]

  const updatedTodo = {id: 2, name: 'Build An Awesome App', isComplete: true}
  const expected = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: true},
    {id: 3, name: 'Ship it', isComplete: false}
  ]
  const result = updateTodo(startTodo, updatedTodo);
  expect(result).toEqual(expected)
})

test('updateTodo should not mutate todos', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false},
    {id: 3, name: 'Ship it', isComplete: false}
  ]

  const updatedTodo = {id: 2, name: 'Build An Awesome App', isComplete: true}
  const result = updateTodo(startTodo, updatedTodo);
  expect(result).not.toBe(startTodo)
})

test('removeTodo should not mutate todos', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false},
    {id: 3, name: 'Ship it', isComplete: false}
  ]
  const targetId = 2
  const result = removeTodo(startTodo, targetId);
  expect(result).not.toBe(startTodo)
})

test('filterTodos should return all items for the root route', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: false}
  ]
  const result = filterTodos(startTodo, '/')
  expect(result).toEqual(startTodo)
})

test('filterTodos should return complete items for the complete route', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: true}
  ]
  const expected = [{id: 2, name: 'Build An Awesome App', isComplete: true}]
  const result = filterTodos(startTodo, '/complete')
  expect(result).toEqual(expected)
})

test('filterTodos should return incomplete items for the active route', () => {
  const startTodo = [
    {id: 1, name: 'Learn Jsx', isComplete: false},
    {id: 2, name: 'Build An Awesome App', isComplete: true}
  ]
  const expected = [{id: 1, name: 'Learn Jsx', isComplete: false}]
  const result = filterTodos(startTodo, '/active')
  expect(result).toEqual(expected)
})
