export function getInitials(name = '') {
  const [a = '', b = ''] = name.split(' ').filter(Boolean);
  const a1 = a[0] ?? '';
  const b1 = b[0] ?? '';
  return `${a1}${b1}`;
}
