type Row = {
  name: string;
  value: number;
};
const rows: Row[] = [
  { name: 'foo', value: 1 },
  { name: 'bar', value: 2 },
  { name: 'baz', value: 3 },
  { name: 'bar', value: 2 },
];
const summary = rows.reduce<Record<string, Row>>((acc, current) => {
  const key = current.name;
  return { ...acc, [key]: { ...acc[key], value: (acc[key]?.value ?? 0) + current.value } };
}, {});

console.log(summary); // { foo: { value: 1 }, bar: { value: 4 }, baz: { value: 3 } }
