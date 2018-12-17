const classifyFunctions = [
  (value: string) => _hasJong(value) ? '을' : '를', // 을/를 구분,
  (value: string) => _hasJong(value) ? '은' : '는', // 은/는 구분,
  (value: string) => _hasJong(value) ? '이' : '가', // 이/가 구분,
  (value: string) => _hasJong(value) ? '과' : '와', // 과/와 구분,
];
const formats = {
  '을/를': classifyFunctions[0],
  '을': classifyFunctions[0],
  '를': classifyFunctions[0],
  '을를': classifyFunctions[0],
  '은/는': classifyFunctions[1],
  '은': classifyFunctions[1],
  '는': classifyFunctions[1],
  '은는': classifyFunctions[1],
  '이/가': classifyFunctions[2],
  '이': classifyFunctions[2],
  '가': classifyFunctions[2],
  '이가': classifyFunctions[2],
  '와/과': classifyFunctions[3],
  '와': classifyFunctions[3],
  '과': classifyFunctions[3],
  '와과': classifyFunctions[3],
};

function _hasJong(value: string) { //value의 마지막 글자가 받침을 가지는지 확인
  const charCode = value.charCodeAt(value.length - 1);
  return (charCode - 0xac00) % 28 > 0;
}

const josa = {
  c(word, format) {
    if (typeof formats[format] === 'undefined') { throw new Error('Invalid format!'); }
    return formats[format](word);
  },
  r(word, format) {
    return word + josa.c(word, format);
  }
};

export default function combineJosa(what, josas) {
  return josa.r(what, josas);
}
