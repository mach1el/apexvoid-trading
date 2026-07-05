const fs = require('fs');
const path = require('path');

const files = [
  "volatility/what-is-volatility.mdx",
  "volatility/atr-explained.mdx",
  "volatility/volatility-regimes.mdx",
  "divergence/regular-vs-hidden.mdx",
  "divergence/trading-divergence-safely.mdx",
  "support-resistance/supply-and-demand-zones.mdx",
  "wyckoff/distribution-schematic.mdx",
  "gold-context/why-gold-moves.mdx",
  "gold-context/the-economic-calendar.mdx",
  "gold-context/dxy-and-real-yields.mdx",
  "gold-context/risk-on-risk-off.mdx"
];

const getChart = (file) => {
  if (file.includes('divergence')) return 'DIV';
  if (file.includes('wyckoff')) return 'WYCK';
  if (file.includes('support-resistance')) return 'SR';
  if (file.includes('gold-context')) return 'NEWS';
  if (file.includes('volatility')) return 'ATR';
  return null;
};

const baseDir = path.join(__dirname, 'src/features/kb/content');

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  
  const chart = getChart(file);
  
  if (chart) {
    // Add import if not exists
    const importPath = file.split('/').length === 2 ? '../chartRegistry' : '../../chartRegistry';
    if (!content.includes('chartRegistry')) {
      content = content.replace(/(import .* from .*[\r\n]+)/, `$1import { chartRegistry } from '${importPath}';\n`);
    }
    // Replace <AnnotatedChart ... />
    content = content.replace(/<AnnotatedChart[\s\S]*?(?:\/>|<\/AnnotatedChart>)/, `<AnnotatedChart chartData={chartRegistry.${chart}} />`);
  } else {
    // Just remove chartData={[...]} entirely
    content = content.replace(/chartData=\{\[[\s\S]*?\]\}/, '');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
