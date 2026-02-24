import fs from "fs";

const args = process.argv.slice(2);
const matchFlags = ["-c", "-l", "-w", "-m"];

const flags = args.filter((arg) => matchFlags.includes(arg));
const fileName = args.find((arg) => !arg.startsWith("-"));

if (!fileName) {
  console.error("Error: No file specified");
  process.exit(1);
}

const countLines = (str: string): number => {
  const strLength = str.split("\n").length;
  return str.endsWith("\n") ? strLength - 1 : strLength;
}

const countWords = (str: string): number => {
  const matches = str.match(/\S+/g);
  return matches ? matches.length : 0;
}

try {
  const fileBuffer = fs.readFileSync(fileName)
  const fileString = fileBuffer.toString("utf8");

  const bytesCount = fileBuffer.byteLength;
  const linesCount = countLines(fileString);
  const wordsCount = countWords(fileString);

  if (flags.includes("-c")) console.log(`${bytesCount} ${fileName}`);
  if (flags.includes("-l")) console.log(`${linesCount} ${fileName}`);
  if (flags.includes("-w")) console.log(`${wordsCount} ${fileName}`);

} catch (err) {
  console.error(`Error reading file ${err}`);
  process.exit(1);
}


