export const filterConfigType = (name) => {
  switch (name) {
    case 'color':
    case 'typography':
      return 'global';
    default:
      return 'local';
  }
};

export const filterGlobalValue = (defaultConfig, userConfig) => {
  const valueObject = {};
  const globalArr = ['color', 'typography'];
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

export const getStyleDisplayValue = (displayValue, global) => {
  if (displayValue.startsWith('$')) {
    return global[displayValue].value;
  }
  return displayValue;
};

const displayNameMap = {
  '-border-color': '边框颜色',
  '-font-color': '文字颜色',
  '-background-color': '背景颜色',
  '-font-weight': '文字粗细'
};

export const getStyleDisplayName = (config, componentName) => {
  if (config.name !== '[]') {
    return config.name.replace(/\[?\]?/, '').split(',')[0];
  }
  let displayName = config.key.replace(`$--${componentName}`, '').replace();
  Object.keys(displayNameMap).forEach((name) => {
    displayName = displayName.replace(name, displayNameMap[name]);
  });
  return displayName.replace(/-/g, '');
};

export const invertColor = (color) => {
  let c = color.replace('#', '');
  c = c.length === 3 ? c.replace(/(.)(.)(.)/, '$1$1$2$2$3$3') : c;
  return (parseInt(c, 16) > 0xfffffe) ? '#000' : '#fff';
};

export const updateDomHeadStyle = (id, styleContent) => {
  let styleTag = document.getElementById(id);
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('id', id);
    document.head.appendChild(styleTag);
  }
  styleTag.innerText = styleContent.replace(/@font-face{[^}]+}/, '');
};
