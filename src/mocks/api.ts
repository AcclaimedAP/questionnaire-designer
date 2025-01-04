import MockDb from './db';

const mockApi = async (route: string, options: RequestInit) => {
  if (import.meta.env.PROD) {
    throw new Error('Mock API is only available in development and test environments')
  }
  const delay = () => new Promise(resolve => setTimeout(resolve, import.meta.env.MOCK_DELAY || 1000));
  await delay();
  const db = new MockDb();
  const routeParts = route.split('/');
  const lastPart = routeParts[routeParts.length - 1];
  if (options.method !== "GET" ) {
    switch (options.method) {
      case 'POST':
        if (!options.body) {
          return errorResponse(400, 'Body is required');
        }
        return successResponse(201, db.create(lastPart, options.body))
        
      case 'PUT':
        if (!options.body) {
          return errorResponse(400, 'Body is required');
        }
        return successResponse(200, db.update(routeParts[routeParts.length - 2], parseInt(lastPart), options.body))
        
      case 'DELETE':
        return successResponse(200, db.delete(routeParts[routeParts.length - 2], parseInt(lastPart)))
      
      default:
        return errorResponse(405, 'Method not allowed');
    }
  } else if (!isNaN(parseInt(lastPart))) {
    return successResponse(200, db.find(routeParts[routeParts.length - 2], parseInt(lastPart)))
  } 
  switch (route) {
    case '/api/ping':
      return successResponse(200, {
        message: 'pong'
      })
    case '/api/forms':
      return successResponse(200, db.where('forms'))
    default:
      return errorResponse(404, 'Not found')
  }
}

const errorResponse = (status: number, message: string) => {
  return new Response(JSON.stringify({
    error: message
  }), {
    status: status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const successResponse = (status: number, data: any) => {
  return new Response(JSON.stringify({
    data: data
  }), {
    status: status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default mockApi;