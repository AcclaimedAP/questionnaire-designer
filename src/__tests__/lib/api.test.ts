import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Api } from '@/lib/api'

describe('Api Class', () => {
  let apiInstance: InstanceType<typeof Api>
  
  beforeEach(() => {
    apiInstance = new Api({
      baseUrl: 'http://test.com',
      headers: {},
      timeout: 200
    })
  })

  describe('Configuration', () => {
    it('should initialize with correct config', () => {
      expect(apiInstance).toHaveProperty('config')
      expect(apiInstance['config'].baseUrl).toBe('http://test.com')
      expect(apiInstance['config'].timeout).toBe(200)
    })

    it('should allow setting headers', () => {
      apiInstance.setHeaders({ 'Authorization': 'Bearer token' })
      expect(apiInstance['config'].headers).toHaveProperty('Authorization', 'Bearer token')
    })
  })

  describe('HTTP Methods', () => {
    beforeEach(() => {
      // Mock the private fetch method
      vi.spyOn(apiInstance as any, 'fetch').mockImplementation(async () => ({
        ok: true,
        json: async () => ({ data: 'test', error: null })
      }))
    })

    it('should make GET requests', async () => {
      const response = await apiInstance.get('/test')
      expect(response).toEqual({ data: 'test', error: null })
    })

    it('should make POST requests with correct headers', async () => {
      const data = { test: true }
      await apiInstance.post('/test', data)
      
      expect((apiInstance as any).fetch).toHaveBeenCalledWith('/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    })

    it('should handle timeouts', async () => {
      vi.spyOn(apiInstance as any, 'fetch').mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 400))
      )

      await expect(apiInstance.get('/test')).rejects.toThrow('Request timeout')
    })

    it('should handle HTTP errors', async () => {
      vi.spyOn(apiInstance as any, 'fetch').mockImplementation(async () => ({
        ok: false,
        status: 404
      }))

      await expect(apiInstance.get('/test')).rejects.toThrow('HTTP error! status: 404')
    })
  })
}) 