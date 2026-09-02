import { get_encoding } from "tiktoken";

// map token ID into token
// ex: 904 -> hello
const encoding = get_encoding("cl100k_base");
const tokens = encoding.encode("Hello AI guys");
console.log(tokens);
