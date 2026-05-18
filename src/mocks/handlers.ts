import { http, HttpResponse } from 'msw'

// Mock API handlers
export const handlers = [
  // Mock notification API
  http.post('/api/notifications', async ({ request }) => {
    const newNotification = await request.json()
    return HttpResponse.json({
      ...newNotification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    })
  }),

  // Mock task API
  http.post('/api/tasks', async ({ request }) => {
    const newTask = await request.json()
    return HttpResponse.json({
      ...newTask,
      id: Date.now().toString(),
      completed: false
    })
  }),

  // Mock routine API
  http.post('/api/routines', async ({ request }) => {
    const newRoutine = await request.json()
    return HttpResponse.json({
      ...newRoutine,
      id: Date.now().toString(),
      completed: false
    })
  }),

  // Mock goal API
  http.post('/api/goals', async ({ request }) => {
    const newGoal = await request.json()
    return HttpResponse.json({
      ...newGoal,
      id: Date.now().toString(),
      completed: false,
      progress: 0
    })
  })
]
