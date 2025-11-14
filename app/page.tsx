import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PrimeReciprocalPattern = {
  base: number;
  size: number;
  multiplier: number;
}

type PrimeReciprocalsInfo = {
  prime: number;
  reciprocal: string;
  patterns: PrimeReciprocalPattern[];
}

const primes: PrimeReciprocalsInfo[] = [{
  prime: 7,
  reciprocal: "0.142857",
  patterns: [{
    base: 14,
    size: 2,
    multiplier: 2,
  }, {
    base: 142,
    size: 3,
    multiplier: 6,
  }, {
    base: 1428,
    size: 4,
    multiplier: 4,
  }, {
    base: 14285,
    size: 5,
    multiplier: 5,
  }, {
    base: 142857,
    size: 6,
    multiplier: 1,
  }, {
    base: 1428571,
    size: 7,
    multiplier: 3,
  }, {
    base: 14285714,
    size: 8,
    multiplier: 2,
  }, {
    base: 142857142,
    size: 9,
    multiplier: 6,
  }],
}, {
  prime: 11,
  reciprocal: "0.0909090909090909",
  patterns: [{
    base: 9,
    size: 2,
    multiplier: 1,
  }],
}, {
  prime: 17,
  reciprocal: "0.058823529411764705",
  patterns: [{
    base: 588,
    size: 4,
    multiplier: 4,
  }, {
    base: 5882352,
    size: 8,
    multiplier: 16,
  }, {
    base: 58823529411,
    size: 12,
    multiplier: 13,
  }],
}]

const renormalize = (nums: number[], size: number) => {
  const max = Math.pow(10, size);
  for (let i = nums.length - 1; i >= 0; i--) {
    while (nums[i] >= max) {
      const remainder = nums[i] - (nums[i] % max);
      nums[i - 1] += Math.floor(remainder / max);
      nums[i] -= remainder;
    }
  }
}

const calculatePatternSequence = (pattern: PrimeReciprocalPattern): number[] => {
  const nums: number[] = [];
  for (let i = 0; i < 8; i++) {
    const num = pattern.base * Math.pow(pattern.multiplier, i);
    nums.push(num);
    renormalize(nums, pattern.size);
  }
  return nums;
}

const PrimeSection = ({ primeInfo }: { primeInfo: PrimeReciprocalsInfo }) => {
  return (
    <Card className="bg-card space-y-4 px-4 gap-0">
      <div className="text-lg font-semibold">
        1 / {primeInfo.prime} = {primeInfo.reciprocal}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Base</TableHead>
            <TableHead>Size (digits)</TableHead>
            <TableHead>Multiplier</TableHead>
            <TableHead>Sequence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {primeInfo.patterns.map((pattern, index) => {
            const sequence = calculatePatternSequence(pattern);
            return (
              <TableRow key={index}>
                <TableCell className="font-mono">
                  {pattern.base.toString().padStart(pattern.size, '0')}
                </TableCell>
                <TableCell>{pattern.size}</TableCell>
                <TableCell className="font-mono">{pattern.multiplier}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 font-mono text-sm">
                    <span>0.</span>
                    {sequence.map((num, idx) => (
                      <span key={idx} className="underline">
                        {num.toString().padStart(pattern.size, '0')}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="container bg-background mx-auto flex flex-col gap-6 p-4 pt-6">
      {primes.map((prime, index) => (
        <PrimeSection key={index} primeInfo={prime}/>
      ))}
    </div>
  );
}
