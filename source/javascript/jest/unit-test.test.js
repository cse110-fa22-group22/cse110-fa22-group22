const sum = require('./shopping/test.js');

test('Testing sum', () => {
    expect(sum(2, 3)).toBe(5)
})
