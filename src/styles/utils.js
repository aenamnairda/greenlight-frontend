const unit = 8;

// FIX: https://github.com/mui/material-ui/issues/37904
export function spacingToGap(spacing) {
  if (!spacing) {
    return undefined;
  }

  if (typeof spacing === 'object') {
    return Object.entries(spacing).reduce((acc, curr) => {
      const [key, value] = curr;
      acc[key] = toUnit(value);
      return acc;
    }, {});
  }

  return toUnit(spacing);
}

function toUnit(value) {
  if (typeof value === 'number') {
    return `${value * unit}px`;
  }

  if (typeof value === 'string') {
    if (value.endsWith('em') || value.endsWith('px')) {
      return value;
    }

    const parsed = parseInt(value);

    if (!isNaN(parsed)) {
      return `${parsed * unit}px`;
    }
  }

  return 0;
}
