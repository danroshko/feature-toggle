interface FeatureToggleOptions {
  enabledFeatures?: string[]
  disabledFeatures?: string[]
}

declare class FeatureToggle {
  constructor(options: FeatureToggleOptions)
  isEnabled(feature: string): boolean
  isDisabled(feature: string): boolean
}

export = FeatureToggle
