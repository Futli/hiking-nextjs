import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styles from './chart.module.scss';

export default function Chart({ className, data }) {
  return (
    <div className={className || ''}>
      <h2 className={styles.title}>График высот</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer className={styles.chart} width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              left: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3"  />
            <XAxis dataKey="xLabel" tickLine={false} />
            <YAxis dataKey="value" axisLine={false} tickLine={false} orientation="right" unit=" м" />
            <Area dataKey="value" isAnimationActive={false} stroke="none" fillOpacity={0.8} fill="#64d941" />
            <Tooltip isAnimationActive={false} formatter={(value) => [`${value} м`, 'Высота']} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
