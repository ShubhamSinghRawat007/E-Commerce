import React from 'react';

const isImageUrl = (url) => {
  return typeof url === 'string' && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
};

const renderCellContent = (cell) => {
  // If it's an image URL
  if (isImageUrl(cell)) {
    return (
      <img
        src={cell}
        alt="img"
        className="w-30 h-40 object-cover rounded border"
        loading="lazy"
      />
    );
  }

  // If it's an array, check for image URLs
  if (Array.isArray(cell)) {
    const imageUrls = cell.filter(isImageUrl);
    if (imageUrls.length > 0) {
      return (
        <div className="flex gap-2 flex-wrap">
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`img-${idx}`}
              className="w-12 h-12 object-cover rounded border"
              loading="lazy"
            />
          ))}
        </div>
      );
    }
    // If array has no image URLs, render as text
    return <span>{cell.join(', ')}</span>;
  }

  // If it's a number or other primitive
  if (typeof cell === 'number') {
    return cell.toLocaleString();
  }

  return String(cell);
};

const InsightsDataTable = ({ Data }) => {
  if (!Data || Data.length === 0) {
    return <div className="text-center text-gray-500">No data available.</div>;
  }

  const columns = Object.keys(Data[0]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 capitalize"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-sm text-gray-800 break-all">
                  {renderCellContent(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsightsDataTable;
