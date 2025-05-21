
const ChartDataTable = ({ chartData }) => {
  if (!chartData) return null

  const keys = Object.keys(chartData)

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Data Values</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key} className="border px-4 py-2 capitalize">
                  {key.replace("_", " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartData[keys[0]].map((_, idx) => (
              <tr key={idx}>
                {keys.map((key) => (
                  <td key={key} className="border px-4 py-2">
                    {chartData[key][idx]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ChartDataTable;
