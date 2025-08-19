import CreateLeadModal from "../components/CreateLeadModal";

import { useState, useEffect } from "react";
import { 
  BarChart3, Users, DollarSign, TrendingUp, Phone, Mail, Calendar, 
  Plus, Search, Filter, MoreHorizontal, Activity, Target, Clock, 
  CheckCircle, User, Bell, Settings, ArrowUpRight, ArrowDownRight,
  Moon, Sun, Grid3x3, LayoutGrid, List, Eye, Edit, Trash2, Star,
  Zap, MessageSquare, FileText, Download, Upload, RefreshCw,
  ChevronDown, X, Maximize2, BarChart, PieChart, LineChart
} from "lucide-react";

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ email: "demo@crmpro.com", name: "" });
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleLeadCreated = (newLead) => {
  setLeads([...leads, newLead]); // append new lead
};

  // Enhanced stats with more detailed data
  const stats = [
    { 
      title: "Total Revenue", 
      value: "$2,435,890", 
      change: "+12.5%", 
      icon: DollarSign, 
      trend: "up", 
      color: "emerald",
      subtext: "vs last month",
      chart: [65, 78, 85, 92, 98, 105, 112]
    },
    { 
      title: "Active Leads", 
      value: "1,247", 
      change: "+8.3%", 
      icon: Users, 
      trend: "up", 
      color: "blue",
      subtext: "424 new this week",
      chart: [45, 52, 48, 61, 67, 74, 82]
    },
    { 
      title: "Conversion Rate", 
      value: "24.8%", 
      change: "-2.1%", 
      icon: Target, 
      trend: "down", 
      color: "purple",
      subtext: "industry avg: 22%",
      chart: [28, 26, 29, 25, 23, 24, 25]
    },
    { 
      title: "Deals Closed", 
      value: "156", 
      change: "+18.2%", 
      icon: CheckCircle, 
      trend: "up", 
      color: "orange",
      subtext: "$890K total value",
      chart: [12, 15, 18, 22, 28, 31, 35]
    }
  ];

  const activities = [
    { id: 1, type: "call", description: "Called John Anderson about Q4 proposal", time: "2 hours ago", status: "completed", priority: "high", avatar: "JA" },
    { id: 2, type: "email", description: "Sent pricing details to Sarah Williams", time: "4 hours ago", status: "completed", priority: "medium", avatar: "SW" },
    { id: 3, type: "meeting", description: "Product demo with Emily Chen", time: "Tomorrow 2:00 PM", status: "scheduled", priority: "high", avatar: "EC" },
    { id: 4, type: "follow-up", description: "Follow up with Mike Johnson on contract", time: "Today 5:00 PM", status: "pending", priority: "medium", avatar: "MJ" }
  ];

  const notifications = [
    { id: 1, title: "New lead assigned", message: "Sarah Williams has been assigned to you", time: "5 min ago", type: "info" },
    { id: 2, title: "Deal closed", message: "TechCorp deal worth $25,000 closed", time: "1 hour ago", type: "success" },
    { id: 3, title: "Follow-up reminder", message: "Call John Anderson today", time: "2 hours ago", type: "warning" }
  ];

  // Mock leads data
  useEffect(() => {
    setTimeout(() => {
      setLeads([
        { id: 1, name: "Sarah Williams", status: "hot", company: "TechCorp", email: "sarah@techcorp.com", value: "$25,000", lastContact: "2 hours ago", avatar: "SW", phone: "+1-555-0123" },
        { id: 2, name: "John Anderson", status: "warm", company: "InnovateLab", email: "john@innovatelab.com", value: "$18,500", lastContact: "1 day ago", avatar: "JA", phone: "+1-555-0124" },
        { id: 3, name: "Emily Chen", status: "cold", company: "StartupXYZ", email: "emily@startupxyz.com", value: "$12,000", lastContact: "3 days ago", avatar: "EC", phone: "+1-555-0125" },
        { id: 4, name: "Mike Johnson", status: "hot", company: "BigCorp", email: "mike@bigcorp.com", value: "$45,000", lastContact: "4 hours ago", avatar: "MJ", phone: "+1-555-0126" }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      hot: darkMode ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-red-500 to-red-600",
      warm: darkMode ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gradient-to-r from-yellow-500 to-yellow-600",
      cold: darkMode ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gradient-to-r from-blue-500 to-blue-600"
    };
    return colors[status?.toLowerCase()] || "bg-gray-500";
  };

  const getActivityIcon = (type) => {
    const icons = {
      call: Phone,
      email: Mail,
      meeting: Calendar,
      'follow-up': Clock
    };
    return icons[type] || Activity;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-red-500",
      medium: "text-yellow-500",
      low: "text-green-500"
    };
    return colors[priority] || "text-gray-500";
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 animate-pulse shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white animate-bounce" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Loading Dashboard</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fetching your CRM data...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
      {/* Enhanced Header */}
      <header className={`${darkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/20'} backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300`}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} tracking-tight`}>CRMPro Dashboard</h1>
              {user && <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>Welcome back, {user.name}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search leads, companies, deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 pr-4 py-3 w-96 ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-200 text-gray-800'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm`}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 ${darkMode ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50' : 'bg-white/50 text-gray-600 hover:bg-white/80'} rounded-xl transition-all backdrop-blur-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
            + Add Lead
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 ${darkMode ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50' : 'bg-white/50 text-gray-600 hover:bg-white/80'} rounded-xl transition-all backdrop-blur-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-2xl backdrop-blur-xl z-50`}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b last:border-b-0 ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{notification.title}</h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{notification.message}</p>
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 ${darkMode ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-gray-700/20 text-gray-700 hover:bg-gray-700/30'} rounded-xl transition-all backdrop-blur-sm`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg transform hover:scale-105">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'} backdrop-blur-sm`}>
            <div className="flex items-center space-x-4">
              <select className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option>All Status</option>
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
              </select>
              <select className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option>All Companies</option>
                <option>TechCorp</option>
                <option>InnovateLab</option>
              </select>
              <select className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
              </select>
              <button 
                onClick={() => setShowFilters(false)}
                className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${darkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/20'} rounded-3xl p-6 backdrop-blur-xl border hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{stat.value}</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3`}>{stat.title}</p>
              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-xs`}>{stat.subtext}</p>
              
              {/* Mini Chart */}
              <div className="mt-4 flex items-end space-x-1 h-6">
                {stat.chart.map((value, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-t from-${stat.color}-500 to-${stat.color}-400 rounded-sm opacity-60`}
                    style={{ height: `${(value / Math.max(...stat.chart)) * 100}%`, width: '8px' }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={`${darkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/20'} rounded-3xl p-6 backdrop-blur-xl border`}>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Plus, label: "Add Lead", color: "blue" },
              { icon: Upload, label: "Import", color: "green" },
              { icon: Download, label: "Export", color: "purple" },
              { icon: FileText, label: "Report", color: "orange" },
              { icon: MessageSquare, label: "Message", color: "pink" },
              { icon: RefreshCw, label: "Sync", color: "indigo" }
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 ${darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-white/50 hover:bg-white/80 text-gray-700'} rounded-2xl transition-all hover:shadow-lg transform hover:scale-105 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <action.icon className={`w-6 h-6 mx-auto mb-2 text-${action.color}-500`} />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Leads Section */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/20'} rounded-3xl border backdrop-blur-xl overflow-hidden`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Leads</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{leads.length} leads found</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105">
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Lead
                  </button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className={`${darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/50 hover:bg-white/80'} rounded-2xl p-4 transition-all hover:shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white text-sm">
                            {lead.avatar}
                          </div>
                          <div>
                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{lead.name}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lead.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className={`p-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className={`p-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </span>
                          <span className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{lead.value}</span>
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last contact: {lead.lastContact}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className={`flex-1 py-2 px-3 ${darkMode ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg text-sm font-medium transition-colors flex items-center justify-center`}>
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </button>
                        <button className={`flex-1 py-2 px-3 ${darkMode ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'} rounded-lg text-sm font-medium transition-colors flex items-center justify-center`}>
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
                      <tr>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Lead</th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Company</th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Value</th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {leads.map((lead) => (
                        <tr key={lead.id} className={`${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-white/40'} transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white text-sm">
                                {lead.avatar}
                              </div>
                              <div className="ml-4">
                                <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lead.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(lead.status)}`}>
                              {lead.status.toUpperCase()}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {lead.company}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            {lead.value}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'} transition-colors`}>
                                <Phone className="w-4 h-4" />
                              </button>
                              <button className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-900'} transition-colors`}>
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Activities Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className={`${darkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/20'} rounded-3xl p-6 backdrop-blur-xl border`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activities</h3>
                <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} font-medium transition-colors`}>
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className={`flex items-start space-x-4 p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/50 hover:bg-white/80'} transition-all border ${darkMode ? 'border-gray-600' : 'border-gray-200'} group`}>
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{activity.description}</p>
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                            {activity.avatar}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                          <span className={`text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                            {activity.priority}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            activity.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : activity.status === 'scheduled' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Chart */}
            <div className={`${darkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/20'} rounded-3xl p-6 backdrop-blur-xl border`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Performance</h3>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                    <BarChart className="w-4 h-4" />
                  </button>
                  <button className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                    <LineChart className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calls Made</span>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>47</span>
                </div>
                <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Emails Sent</span>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>123</span>
                </div>
                <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div className="w-5/6 h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Meetings Booked</span>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>12</span>
                </div>
                <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div className="w-1/2 h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Team Leaderboard */}
            <div className={`${darkMode ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/20'} rounded-3xl p-6 backdrop-blur-xl border`}>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Top Performers</h3>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", deals: 23, avatar: "SJ", rank: 1 },
                  { name: "Mike Chen", deals: 19, avatar: "MC", rank: 2 },
                  { name: "Emily Davis", deals: 16, avatar: "ED", rank: 3 }
                ].map((performer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      performer.rank === 1 ? 'bg-yellow-500 text-white' :
                      performer.rank === 2 ? 'bg-gray-400 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {performer.rank}
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                      {performer.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{performer.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{performer.deals} deals closed</p>
                    </div>
                    {performer.rank === 1 && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateLeadModal
       isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
       onLeadCreated={handleLeadCreated}
      />
    </div>
  );
}