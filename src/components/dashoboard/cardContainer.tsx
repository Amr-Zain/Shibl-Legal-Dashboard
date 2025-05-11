const ChartContainer = ({
  title,
  children,
  className
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={"flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg"+className}>
    <div className="px-6 py-5 font-semibold border-b border-gray-100">
      {title}
    </div>
    <div className="p-4 flex-grow min-h-[300px]">{children}</div>
  </div>
);
export default ChartContainer;
