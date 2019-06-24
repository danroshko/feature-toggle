class FeatureToggle {
  /**
   * @param {object} options
   * @param {string[]} [options.enabledFeatures]
   * @param {string[]} [options.disabledFeatures]
   */
  constructor(options) {
    const { enabledFeatures, disabledFeatures } = options

    if (enabledFeatures && disabledFeatures) {
      throw new Error(`Only one of enabledFeatures or disabledFeatures can be defined`)
    }

    this.defaultEnabled = disabledFeatures != null
    this.enabledFeatures = enabledFeatures
    this.disabledFeatures = disabledFeatures
  }

  /**
   * Check if feature is enabled
   * @param {string} feature
   */
  isEnabled(feature) {
    if (this.defaultEnabled) {
      return !this.isDisabled(feature)
    }

    // otherwise features are disabled by default, so to check if some
    // feature is enabled we need to scan enabledFeatures
    return contains(this.enabledFeatures, feature)
  }

  /**
   * Check if feature is disabled
   * @param {string} feature
   */
  isDisabled(feature) {
    if (!this.defaultEnabled) {
      return !this.isEnabled(feature)
    }

    // if features are enabled by default, to check if some feature is disabled
    // wee need to scan disabledFeatures
    return contains(this.disabledFeatures, feature)
  }
}

/**
 * Check if *features* contain *feature*
 * @param {string[]} features
 * @param {string} feature
 */
const contains = (features, feature) => {
  for (const item of features) {
    if (feature === item || feature.startsWith(item + ':')) {
      return true
    }
  }

  // not found
  return false
}

module.exports = FeatureToggle
