# wc-tool

A TypeScript implementation of the Unix `wc` (word count) command-line tool.

## Features

- Count bytes (`-c`)
- Count lines (`-l`)
- Count words (`-w`)
- Count characters (`-m`)
- Support for multiple flags
- Default mode (no flags = lines, words, bytes)
- File input
- Stdin support (pipes)
- Explicit stdin with `-` flag

## Installation

```bash
npm install
```

## Usage

### Basic usage

```bash
# Count bytes
npx tsx src/index.ts -c test.txt

# Count lines
npx tsx src/index.ts -l test.txt

# Count words
npx tsx src/index.ts -w test.txt

# Count characters
npx tsx src/index.ts -m test.txt
```

### Multiple flags

```bash
# Count multiple metrics
npx tsx src/index.ts -c -l test.txt
npx tsx src/index.ts -l -w -c test.txt
```

### Default mode

```bash
# No flags shows lines, words, and bytes
npx tsx src/index.ts test.txt
```

### Pipe support

```bash
# Read from stdin
cat test.txt | npx tsx src/index.ts -l

# Multiple flags with pipe
cat test.txt | npx tsx src/index.ts -c -l -w
```

### Explicit stdin

```bash
# Use - to specify stdin
cat test.txt | npx tsx src/index.ts -l -
```

## Examples

```bash
$ npx tsx src/index.ts -l test.txt
7145 test.txt

$ npx tsx src/index.ts -c -l -w test.txt
342190 test.txt
7145 test.txt
58164 test.txt

$ cat test.txt | npx tsx src/index.ts -l
7145

$ npx tsx src/index.ts test.txt
7145 58164 342190 test.txt
```

## Flags

| Flag | Description |
|------|-------------|
| `-c` | Count bytes |
| `-l` | Count lines |
| `-w` | Count words |
| `-m` | Count characters |

## Implementation Details

- Written in TypeScript
- Uses Node.js fs module for file operations
- Handles Unicode characters correctly using spread operator
- Regex-based word counting for efficiency
- Async/await for stdin stream handling
- Follows Unix command-line conventions

## Project Structure

```
wc-tool/
├── src/
│   └── index.ts
├── test.txt
├── package.json
├── tsconfig.json
└── README.md
```

## About

This project was built as a learning exercise to understand:
- Command-line argument parsing
- File I/O in Node.js
- Streams and async/await
- Unicode handling
- Unix command-line conventions

Based on the [Build Your Own wc Tool](https://codingchallenges.fyi/challenges/challenge-wc) challenge from Coding Challenges.
