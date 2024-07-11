"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const XlsxXlsReader = () => {
    const [data, setData] = useState(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetname = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetname];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  return (
    <div className="">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      {data && data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default XlsxXlsReader