const FeatureToggle = require('../index')

describe('FeatureToggle', () => {
  it('does not allow passing both enabledFeatures and disabledFeatures', () => {
    expect(() => {
      const toggle = new FeatureToggle({ enabledFeatures: [], disabledFeatures: [] })
    }).toThrow('Only one of enabledFeatures or disabledFeatures can be defined')
  })

  it('works with enabledFeatures', () => {
    const toggle = new FeatureToggle({ enabledFeatures: ['foo', 'bar', 'a:b', '1:2:3:4:5'] })

    expect(toggle.isEnabled('foo')).toBe(true)
    expect(toggle.isEnabled('a:b')).toBe(true)
    expect(toggle.isEnabled('foo:123')).toBe(true)
    expect(toggle.isEnabled('1234')).toBe(false)
    expect(toggle.isEnabled('a')).toBe(false)
    expect(toggle.isEnabled('1:2:3:4:5:6:7')).toBe(true)

    expect(toggle.isDisabled('bar')).toBe(false)
    expect(toggle.isDisabled('bar:nested')).toBe(false)
    expect(toggle.isDisabled('zzzz')).toBe(true)
  })

  it('works with disabledFeatures', () => {
    const toggle = new FeatureToggle({ disabledFeatures: ['a', 'b', 'c:d'] })

    expect(toggle.isEnabled('a')).toBe(false)
    expect(toggle.isEnabled('c:d')).toBe(false)
    expect(toggle.isEnabled('c:e')).toBe(true)
    expect(toggle.isEnabled('f')).toBe(true)
    expect(toggle.isEnabled('f:g')).toBe(true)

    expect(toggle.isDisabled('a')).toBe(true)
    expect(toggle.isDisabled('a:a')).toBe(true)
    expect(toggle.isDisabled('f')).toBe(false)
  })
})
