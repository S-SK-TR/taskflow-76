import { describe, it, expect } from 'vitest'
import { cn } from './index'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles conditional classes', () => {
    expect(cn('bg-red-500', false && 'text-white')).toBe('bg-red-500')
    expect(cn('bg-red-500', true && 'text-white')).toBe('bg-red-500 text-white')
  })

  it('resolves tailwind conflicts', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles array input', () => {
    expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white')
  })
})
