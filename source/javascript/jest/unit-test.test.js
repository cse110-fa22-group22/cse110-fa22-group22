const sum = require('../shopping/sum.js');

test('Testing sum', () => {
    expect(sum(2, 3)).toBe(5)
})

test('Testing sum 1', () => {
    expect(sum(3, 3)).toBe(6)
})

test('Testing sum 2', () => {
    expect(sum(3, 5)).toBe(8)
})
