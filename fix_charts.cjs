const fs = require('fs');
const path = require('path');

const mappings = {
  "BOS": "price-action/bos.mdx",
  "CHoCH": "price-action/choch.mdx",
  "OB": "order-block/what-is-ob.mdx",
  "FVG": "smc/fvg.mdx",
  "SWEEP": "smc/liquidity-sweep.mdx",
  "PD": "smc/premium-discount-eq.mdx",
  "PB": "strategies/trend-following-pullback.mdx",
  "BRT": "strategies/breakout-retest.mdx",
  "MOM": "strategies/momentum-continuation.mdx",
  "MR": "strategies/mean-reversion.mdx",
  "SCALE": "risk-management/scaling-into-a-zone.mdx",
  "EMA": "momentum/ema-50-and-the-stack.mdx",
  "CROSS": "momentum/golden-and-death-cross.mdx",
  "WYCK": "wyckoff/accumulation-schematic.mdx",
  "SR": "support-resistance/role-reversal-flip.mdx",
  "ATR": "volatility/atr-based-stops.mdx",
  "DIV": "divergence/what-divergence-is.mdx",
  "NEWS": "gold-context/trading-around-news.mdx"
};

const baseDir = path.join(__dirname, 'src/features/kb/content');

for (const [key, relativePath] of Object.entries(mappings)) {
  const filePath = path.join(baseDir, relativePath);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not exists
  const importPath = relativePath.split('/').length === 2 ? '../chartRegistry' : '../../chartRegistry';
  if (!content.includes('chartRegistry')) {
    content = content.replace(/(import .* from .*[\r\n]+)/, `$1import { chartRegistry } from '${importPath}';\n`);
  }

  // Replace <AnnotatedChart ... /> block with the specific chartData
  // We need to match <AnnotatedChart ... /> potentially multiline
  content = content.replace(/<AnnotatedChart[\s\S]*?(?:\/>|<\/AnnotatedChart>)/, `<AnnotatedChart chartData={chartRegistry.${key}} />`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${key} in ${relativePath}`);
}
