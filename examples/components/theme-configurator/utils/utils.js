export const filterConfigType = (name) => {
  switch (name) {
    case 'color':
      return 'global';
    default:
      return 'local';
  }
};

export const filterGlobalValue = (defaultConfig, userConfig) => {
  const valueObject = {};
  const globalArr = ['color'];
  globalArr.forEach((global) => {
    const configObj = {};
    defaultConfig.find((config) => {
      return config.name === global;
    }).config.forEach((c) => {
      configObj[c.key] = c;
    });
    valueObject[global] = configObj;
    Object.keys(configObj).forEach((c) => {
      if (userConfig.global[c]) {
        configObj[c].value = userConfig.global[c];
      }
    });
  });
  return valueObject;
};

export const getColorFromName = (displayValue, golbalColor) => {
  if (displayValue.startsWith('$')) {
    return golbalColor[displayValue].value;
  }
  return displayValue;
};
