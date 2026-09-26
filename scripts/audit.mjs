import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] ?? process.env.AUDIT_URL ?? "http://localhost:3000";
const dir = mkdtempSync(join(tmpdir(), "lighthouse-"));
const output = join(dir, "report.json");

console.log(`Auditing ${url} in a clean Chrome profile with extensions disabled...`);

try {
  execFileSync(
    "npx",
    [
      "--yes",
      "lighthouse@13",
      url,
      "--quiet",
      "--output=json",
      `--output-path=${output}`,
      `--chrome-flags=--headless=new --no-sandbox --disable-extensions --user-data-dir=${join(dir, "profile")}`,
    ],
    { stdio: "inherit" },
  );

  const report = JSON.parse(readFileSync(output, "utf8"));
  const scores = Object.entries(report.categories).filter(([id]) => id !== "agentic-browsing");

  console.log();
  for (const [, category] of scores) {
    const value = Math.round(category.score * 100);
    console.log(
      `${category.title.padEnd(16)} ${String(value).padStart(3)} ${value >= 90 ? "" : "  below 90"}`,
    );
  }

  const failing = scores.flatMap(([, category]) =>
    category.auditRefs
      .filter(
        (ref) =>
          ref.weight > 0 &&
          report.audits[ref.id].score !== null &&
          report.audits[ref.id].score < 0.9,
      )
      .map((ref) => `${category.title}: ${report.audits[ref.id].title}`),
  );

  if (failing.length) {
    console.log("\nAudits below 90:");
    for (const line of failing) console.log(`  ${line}`);
  }

  const metrics = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
  ];
  console.log(
    "\n" +
      metrics
        .map((id) => `${report.audits[id].title}: ${report.audits[id].displayValue}`)
        .join("\n"),
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
