import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  type ChartOptions
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

  useEffect(() => {
    const chartInstance = chartRef.current;
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
      <div className="hidden md:block h-80">
        <Bar 
          ref={chartRef}
          data={data} 
          options={options} 
        />
      </div>
    </div>
  );
};

export default RevenueChart;