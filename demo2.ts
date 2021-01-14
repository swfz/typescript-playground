type Row = {
  name: "foo" | "bar" | "baz";
  date: string;
  column1: string;
  value: number;
};

type AggregatedRow = {
  name: "foo" | "bar" | "baz";
  // name: string;
  date: string;
  sum: number;
};

type Summary = {
  foo: Record<string, AggregatedRow>;
  bar: Record<string, AggregatedRow>;
  baz: Record<string, AggregatedRow>;
};

const rows: Row[] = [
  { name: "foo", date: "2021-01-02", column1: "hoge", value: 2 },
  { name: "bar", date: "2021-01-02", column1: "hoge", value: 2 },
  { name: "baz", date: "2021-01-02", column1: "hoge", value: 3 },
  { name: "foo", date: "2021-01-03", column1: "hoge", value: 1 },
  { name: "bar", date: "2021-01-03", column1: "hoge", value: 2 },
  { name: "baz", date: "2021-01-03", column1: "hoge", value: 1 },
  { name: "foo", date: "2021-01-02", column1: "fuga", value: 2 },
  { name: "bar", date: "2021-01-02", column1: "fuga", value: 1 },
  { name: "baz", date: "2021-01-02", column1: "fuga", value: 3 },
  { name: "foo", date: "2021-01-03", column1: "fuga", value: 6 },
  { name: "bar", date: "2021-01-03", column1: "fuga", value: 2 },
  { name: "baz", date: "2021-01-03", column1: "fuga", value: 3 },
];

const aggregateFn = (acc: Summary, current: Row): Summary => {
  const name = current.name;
  const date = current.date;
  // name,dateキーの更新用データを生成 Optional Chainingで既に該当キーに値があるか判定しあれば計算して結果をマージ、なければ生成する
  const aggregated = acc?.[name]?.[date]
    ? { ...acc[name][date], sum: acc[name][date].sum + current.value }
    : { ...{ name, date }, sum: current.value };
  // nameキーの更新用データを生成
  const updateValue: Record<string, AggregatedRow> = {
    ...acc[name],
    [date]: aggregated,
  };

  return { ...acc, [name]: updateValue };
};

const summary = rows.reduce(aggregateFn, {} as Summary);

console.log(summary);
// {
//   foo: {
//     '2021-01-02': { name: 'foo', date: '2021-01-02', sum: 4 },
//     '2021-01-03': { name: 'foo', date: '2021-01-03', sum: 7 }
//   },
//   bar: {
//     '2021-01-02': { name: 'bar', date: '2021-01-02', sum: 3 },
//     '2021-01-03': { name: 'bar', date: '2021-01-03', sum: 4 }
//   },
//   baz: {
//     '2021-01-02': { name: 'baz', date: '2021-01-02', sum: 6 },
//     '2021-01-03': { name: 'baz', date: '2021-01-03', sum: 4 }
//   }
// }
