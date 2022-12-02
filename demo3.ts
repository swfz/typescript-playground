// template literal type でPrefix、Suffixを指定して中身の文字列を取り出して型とする
type ExtractCenter<T> = T extends `Prefix${infer S}Suffix` ? S : never;

const user: ExtractCenter<"PrefixUserSuffix"> = 'User';

console.log(user);

// 特定キーの値をas constとして扱いその値を元にTemplateLiteralTypeでSuffixをつけた型を定義する

type EventType<T> = T extends { event: infer U } ? U : never
type EventTypeName<T> = T extends string ? `${T}Event` : never

interface Params {
  event: string;
}

const hoge = {
  event: 'Click'
}

const fuga = {
  event: 'View'
}

function toEventTypeName(params: Params): EventTypeName<EventType<Params>> {
  return `${params.event}Event`;
}

const hogeStr = toEventTypeName(hoge);
console.log(hogeStr)
console.log(toEventTypeName(fuga))



// type WithSuffix<T> = T extends `${infer S}Suffix` ? T : never;





