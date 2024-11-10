import { execSync } from "child_process";
import * as console from "node:console";
import * as fs from "node:fs";

const SIZE_FACTOR = 2;
const SUPER_SAMPLING_FACTOR = 12;
const DPI = 72;
const DENSITY = DPI * SUPER_SAMPLING_FACTOR;
const RESIZE = ((1 / SUPER_SAMPLING_FACTOR) * SIZE_FACTOR * 100).toFixed(0);
const QUALITY = 80;

function getBookInfo(path: string): Record<string, string> {
  const result: Record<string, string> = {};
  const pdfInfo = execSync(`pdfinfo ${path}`);
  pdfInfo
    .toString()
    .split("\n")
    .forEach((s) => {
      const line = s.trim();
      if (!line) return;

      const splitPoint = line.indexOf(":");
      if (splitPoint === -1) {
        console.warn("Unable to parse line:", line);
        return;
      }

      const key = line.slice(0, splitPoint).trim().toLowerCase();
      result[key] = line.slice(splitPoint + 1).trim();
    });
  console.info("Parsed book info:", result);
  return result;
}

function convertPageToImage(pdfPath: string, page: number) {
  const command = [
    "convert",
    "-density",
    DENSITY.toString(),
    "-resize",
    `${RESIZE}%`,
    "-quality",
    QUALITY.toString(),
    `${pdfPath}[${page - 1}]`,
    `./public/page-${page}.jpg`,
  ].join(" ");
  console.info("\t", command);

  execSync(command);
}

function getPageText(pdfPath: string, page: number): string {
  const command = [
    "pdftotext",
    "-f",
    page.toString(),
    "-l",
    page.toString(),
    pdfPath,
    "-",
  ].join(" ");

  console.info("\t", command);
  return execSync(command).toString();
}

function main(): void {
  const pdfPath = process.argv.at(2);
  if (!pdfPath) {
    console.error("Must provide path to pdf file as argument:", process.argv);
    process.exit(1);
  }
  const bookInfo = getBookInfo(pdfPath);
  const nrPages = parseInt(bookInfo.pages ?? "0", 10);

  if (nrPages <= 0) {
    console.error(
      "Unable to parse book info, could not find number of pages",
      bookInfo,
    );
    process.exit(1);
  }
  const textPerPage: Record<string, string> = {};
  for (let page = 1; page <= nrPages; page += 1) {
    console.info("Processing page:", page);
    convertPageToImage(pdfPath, page);
    textPerPage[page.toString()] = getPageText(pdfPath, page);
  }

  fs.writeFileSync(
    "./src/assets/book.json",
    JSON.stringify(textPerPage),
    "utf-8",
  );
}

main();
