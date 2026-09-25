import { readFile } from "node:fs/promises";
import path from "node:path";
import TempleWebsite from "@/components/TempleWebsite";

export default async function Page() {
  const [chalisaHindi, chalisaRoman] = await Promise.all([
    readFile(path.join(process.cwd(), "hanuman-chalisha-hindi.txt"), "utf8"),
    readFile(path.join(process.cwd(), "hanuman-chalisa-roman.txt"), "utf8"),
  ]);
  return (
    <TempleWebsite
      chalisa={{ hi: chalisaHindi, en: chalisaRoman }}
      buildYear={new Date().getFullYear()}
    />
  );
}
