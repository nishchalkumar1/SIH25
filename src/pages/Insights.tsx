import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';

const temperatureDepthData = [
  { depth: 0, temperature: 18.5 },
  { depth: 50, temperature: 17.2 },
  { depth: 100, temperature: 15.8 },
  { depth: 200, temperature: 12.4 },
  { depth: 500, temperature: 8.9 },
  { depth: 1000, temperature: 4.2 },
  { depth: 1500, temperature: 2.8 },
  { depth: 2000, temperature: 1.9 },
];

const salinityData = [
  { depth: 0, salinity: 35.2, pressure: 0 },
  { depth: 50, salinity: 35.4, pressure: 5 },
  { depth: 100, salinity: 35.6, pressure: 10 },
  { depth: 200, salinity: 35.8, pressure: 20 },
  { depth: 500, salinity: 34.9, pressure: 50 },
  { depth: 1000, salinity: 34.7, pressure: 100 },
  { depth: 1500, salinity: 34.6, pressure: 150 },
  { depth: 2000, salinity: 34.8, pressure: 200 },
];

const pressureData = [
  { depth: 0, pressure: 0 },
  { depth: 100, pressure: 10.1 },
  { depth: 200, pressure: 20.3 },
  { depth: 500, pressure: 50.8 },
  { depth: 1000, pressure: 101.3 },
  { depth: 1500, pressure: 151.9 },
  { depth: 2000, pressure: 202.6 },
];

const Insights: React.FC = () => {
  const [activeChart, setActiveChart] = useState('temperature');
  const [timeRange, setTimeRange] = useState('6m');
  const [location, setLocation] = useState('global');

  const chartData = {
    temperature: temperatureDepthData,
    salinity: salinityData,
    pressure: pressureData,
  };

  const exportData = (format: string) => {
    // Mock export functionality
    console.log(`Exporting data in ${format} format`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-[#001f3f] text-white">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Ocean Data Insights</h1>
          <p className="text-slate-400">Deep dive into oceanographic parameters</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-[#00bcd4]" />
              <span className="font-semibold">Filters:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Parameter</label>
                <select
                  value={activeChart}
                  onChange={(e) => setActiveChart(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-[#00bcd4] focus:outline-none"
                >
                  <option value="temperature">Temperature</option>
                  <option value="salinity">Salinity</option>
                  <option value="pressure">Pressure</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-[#00bcd4] focus:outline-none"
                >
                  <option value="1m">Last Month</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-[#00bcd4] focus:outline-none"
                >
                  <option value="global">Global</option>
                  <option value="atlantic">Atlantic Ocean</option>
                  <option value="pacific">Pacific Ocean</option>
                  <option value="indian">Indian Ocean</option>
                </select>
              </div>
            </div>

            <div className="ml-auto flex gap-2">
              <button
                onClick={() => exportData('csv')}
                className="flex items-center gap-2 px-4 py-2 bg-[#00bcd4] text-white rounded-lg hover:bg-[#00acc1] transition-colors"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                CSV
              </button>
              <button
                onClick={() => exportData('netcdf')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                NetCDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
        >
          <h3 className="text-2xl font-semibold mb-6 capitalize">
            {activeChart} vs Depth Profile
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'salinity' ? (
                <ScatterChart data={chartData[activeChart as keyof typeof chartData]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="salinity" 
                    stroke="#9CA3AF" 
                    label={{ value: 'Salinity (PSU)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    dataKey="depth"
                    stroke="#9CA3AF"
                    reversed
                    label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Scatter dataKey="salinity" fill="#00bcd4" />
                </ScatterChart>
              ) : (
                <LineChart data={chartData[activeChart as keyof typeof chartData]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey={activeChart === 'pressure' ? 'pressure' : activeChart}
                    stroke="#9CA3AF"
                  />
                  <YAxis 
                    dataKey="depth"
                    stroke="#9CA3AF"
                    reversed
                    label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={activeChart === 'pressure' ? 'pressure' : activeChart}
                    stroke={activeChart === 'temperature' ? '#ff7043' : '#00bcd4'}
                    strokeWidth={3}
                    dot={{ fill: activeChart === 'temperature' ? '#ff7043' : '#00bcd4', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Temperature Range',
              value: '1.9°C - 18.5°C',
              description: 'Surface to 2000m depth',
              color: 'from-red-500 to-orange-500',
            },
            {
              title: 'Salinity Variation',
              value: '34.6 - 35.8 PSU',
              description: 'Practical Salinity Units',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'Max Pressure',
              value: '202.6 dbar',
              description: 'At 2000m depth',
              color: 'from-purple-500 to-pink-500',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} mb-4 flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white/30 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
              <div className="text-2xl font-bold text-[#00bcd4] mb-2">{stat.value}</div>
              <p className="text-sm text-slate-400">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;