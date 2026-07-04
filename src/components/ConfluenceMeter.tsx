import type { ReactNode } from 'react';

interface ConfluenceMeterProps {
  grade: 'A' | 'B' | 'C';
  score: number;
  maxScore?: number;
  children: ReactNode;
}

const gradeColors: Record<string, string> = {
  A: 'text-ok border-ok',
  B: 'text-accent border-accent',
  C: 'text-warn border-warn',
};

const barColors: Record<string, string> = {
  A: 'bg-ok',
  B: 'bg-accent',
  C: 'bg-warn',
};

export function ConfluenceMeter({ grade, score, maxScore = 5, children }: ConfluenceMeterProps) {
  const pct = (score / maxScore) * 100;
  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="m-0 text-text font-semibold">Confluence Score</h4>
        <div className={`w-10 h-10 flex items-center justify-center text-2xl font-bold border-2 rounded-full ${gradeColors[grade]}`}>
          {grade}
        </div>
      </div>
      <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden mb-2">
        <div
          className={`h-full transition-all duration-300 ${barColors[grade]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-right text-text-muted text-sm font-mono m-0 mb-4">
        {score} / {maxScore} factors present
      </p>
      <div className="[&_ul]:m-0 [&_ul]:pl-5 [&_li]:text-text-muted [&_li]:mb-1">
        {children}
      </div>
    </div>
  );
}
