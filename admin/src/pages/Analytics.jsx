import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fastapiURL, backendUrl } from '../App';
import SecondaryNavbar from '../component/ChartBar';
import { assets } from '../assets/assets';
import ChartDataTable from '../component/ChartDataTable';

const Analytics = ({ token }) => {
  const [charts, setCharts] = useState([]);
  const [active, setActive] = useState('');
  const [chartImage, setChartImage] = useState('');
  const [chartData, setChartData] = useState([]);

  const fetchAllCharts = async () => {
    try {
      if (!token) return;
      const response = await axios.get(`${backendUrl}/api/charts/all`, { headers: { token } });
      if (response.data.success) {
        setCharts(response.data.charts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getChart = async (id) => {
    try {
      const response = await axios.post(
        `${fastapiURL}/visualize`,
        { _id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {

        setChartImage("data:image/jpeg;base64," + response.data.image);
        setChartData(response.data.data || []); // Optional: if you return structured data too
        toast.success("Visualization loaded");
        
      } else {
        toast.error(response.data.message);
      }
      setActive(id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCharts();
  }, []);

  return (
    <>
      <SecondaryNavbar charts={charts} getChart={getChart} active={active} />
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-6">Analytics Dashboard</h2>

        {!chartImage ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <h3 className="text-3xl lg:text-5xl font-semibold mb-4">Visualize the Business</h3>
              <img src={assets.insights} alt="Insights" className="mx-auto max-w-sm" />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <img src={chartImage} alt="Chart" className="mx-auto max-w-2xl mb-6" />
            <ChartDataTable chartData={chartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;