import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA40FF"];

function ExpensePieChart({ data }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 300,
        height: "auto",
        maxWidth: 400,
        position: "relative",
        zIndex: 10, // Ensure it’s above other elements
      }}
    >
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            labelLine={false} // Optional: Cleaner labels
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            wrapperStyle={{ zIndex: 1000 }}
          />
          <Legend wrapperStyle={{ zIndex: 1000, paddingTop: "20px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
