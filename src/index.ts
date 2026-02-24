import fs from "fs";

const countLines = (str: string): number => {
  const strLength = str.split("\n").length;
  return str.endsWith("\n") ? strLength - 1 : strLength;
}

const countWords = (str: string): number => {
  const matches = str.match(/\S+/g);
  return matches ? matches.length : 0;
}

const countCharacters = (str: string): number => [...str].length;

async function readStdin(): Promise<string> {
  process.stdin.setEncoding("utf8");

  let data = "";
  for await (const chunk of process.stdin) {
    data += chunk
  };

  return data;
} 

async function main() {
  const args = process.argv.slice(2);
  const matchFlags = ["-c", "-l", "-w", "-m"];
  const flags = args.filter((arg) => matchFlags.includes(arg));
  const fileName = args.find((arg) => !arg.startsWith("-"));

  const useStdin = !fileName || fileName === "-";
  
  let fileContent: string;
  let sourceName: string;

  if (useStdin) {
    fileContent = await readStdin();
    sourceName = "";
  } else {
    let fileBuffer: Buffer;

    try {
      fileBuffer = fs.readFileSync(fileName);
      fileContent = fileBuffer.toString("utf8");
      sourceName = fileName;
    } catch (err) {
      console.error(`Error reading file ${err}`);
      process.exit(1);
    }
  }

  const bytesCount = Buffer.byteLength(fileContent);
  const linesCount = countLines(fileContent);
  const wordsCount = countWords(fileContent);
  const characterCount = countCharacters(fileContent);

  if (flags.includes("-c")) console.log(`${bytesCount} ${sourceName}`);
  if (flags.includes("-l")) console.log(`${linesCount} ${sourceName}`);
  if (flags.includes("-w")) console.log(`${wordsCount} ${sourceName}`);
  if (flags.includes("-m")) console.log(`${characterCount} ${sourceName}`);

  if (flags.length === 0) 
    console.log(`${linesCount} ${wordsCount} ${bytesCount} ${sourceName}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
