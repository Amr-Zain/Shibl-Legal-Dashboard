const StatCard = ({
  value,
  label,
  icon,
  colorClass,
  subValue,
  isPending = false,
}: {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
  subValue?: string;
  isPending?: boolean;
}) => (
  <div className="flex flex-col sm:flex-row gap-4 items-center p-8 bg-white shadow rounded-lg">
    <div
      className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full ${colorClass}`}
    >
      {icon}
    </div>
    <div>
      {isPending ? <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
      : (
        <>
          <span className="block text-2xl font-bold text-center">{value}</span>
          {subValue && (
            <span className="inline-block text-xl text-gray-500 font-semibold text-center">
              {subValue}
            </span>
          )}
        </>
      )}
      <span className="block text-gray-500">{label}</span>
    </div>
  </div>
);
export default StatCard;
