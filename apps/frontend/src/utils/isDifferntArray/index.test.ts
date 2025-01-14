import { describe, it, expect } from 'vitest'

import { isDifferentArray } from './'

describe('isDifferentArray', () => {
  it('should return false for identical arrays', () => {
    expect(isDifferentArray([1, 2, 3], [1, 2, 3])).toBe(false)
    expect(isDifferentArray(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(false)
    expect(isDifferentArray([true, false], [true, false])).toBe(false)
  })

  it('should return true for arrays with different lengths', () => {
    expect(isDifferentArray([1, 2], [1, 2, 3])).toBe(true)
    expect(isDifferentArray(['a'], ['a', 'b'])).toBe(true)
  })

  it('should return true for arrays with different values', () => {
    expect(isDifferentArray([1, 2, 3], [1, 2, 4])).toBe(true)
    expect(isDifferentArray(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(true)
    expect(isDifferentArray([true, false], [true, true])).toBe(true)
  })

  it('should return false for empty arrays', () => {
    expect(isDifferentArray([], [])).toBe(false)
  })

  it('should handle arrays with different types', () => {
    expect(isDifferentArray([1, '2', true], [1, '2', true])).toBe(false)
    expect(isDifferentArray([1, '2', true], [1, '2', false])).toBe(true)
  })

  it('should handle arrays with nested objects', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: 1 }
    expect(isDifferentArray([obj1], [obj1])).toBe(false) // Same reference
    expect(isDifferentArray([obj1], [obj2])).toBe(true) // Different references
  })
})
