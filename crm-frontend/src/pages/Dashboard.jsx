import CreateLeadModal from "../components/CreateLeadModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import LeadsTable from "../components/LeadsTable";

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
  const [user, setUser] = useState({ email: "demo@crmpro.com", name: "Disha" });
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { logout } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleLeadCreated = (newLead) => {
    setLeads([...leads, newLead]); // append new lead
  };

  // Enhanced stats with more detailed data and better colors
  const stats = [
    { 
      title: "Total Revenue", 
      value: "$2,435,890", 
      change: "+12.5%", 
      icon: DollarSign, 
      trend: "up", 
      color: "emerald",
      subtext: "vs last month",
      chart: [65, 78, 85, 92, 98, 105, 112],
      gradient: "from-emerald-500 via-green-500 to-teal-500"
    },
    { 
      title: "Active Leads", 
      value: "1,247", 
      change: "+8.3%", 
      icon: Users, 
      trend: "up", 
      color: "blue",
      subtext: "424 new this week",
      chart: [45, 52, 48, 61, 67, 74, 82],
      gradient: "from-blue-500 via-indigo-500 to-purple-500"
    },
    { 
      title: "Conversion Rate", 
      value: "24.8%", 
      change: "-2.1%", 
      icon: Target, 
      trend: "down", 
      color: "purple",
      subtext: "industry avg: 22%",
      chart: [28, 26, 29, 25, 23, 24, 25],
      gradient: "from-purple-500 via-violet-500 to-indigo-500"
    },
    { 
      title: "Deals Closed", 
      value: "156", 
      change: "+18.2%", 
      icon: CheckCircle, 
      trend: "up", 
      color: "orange",
      subtext: "$890K total value",
      chart: [12, 15, 18, 22, 28, 31, 35],
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    }
  ];

  const activities = [
    { id: 1, type: "call", description: "Called John Anderson about Q4 proposal", time: "2 hours ago", status: "completed", priority: "high", avatar: "JA", amount: "$45K" },
    { id: 2, type: "email", description: "Sent pricing details to Sarah Williams", time: "4 hours ago", status: "completed", priority: "medium", avatar: "SW", amount: "$25K" },
    { id: 3, type: "meeting", description: "Product demo with Emily Chen", time: "Tomorrow 2:00 PM", status: "scheduled", priority: "high", avatar: "EC", amount: "$30K" },
    { id: 4, type: "follow-up", description: "Follow up with Mike Johnson on contract", time: "Today 5:00 PM", status: "pending", priority: "medium", avatar: "MJ", amount: "$18K" },
    { id: 5, type: "call", description: "Initial call with Lisa Parker", time: "30 minutes ago", status: "completed", priority: "low", avatar: "LP", amount: "$12K" }
  ];

  const notifications = [
    { id: 1, title: "New lead assigned", message: "Sarah Williams has been assigned to you", time: "5 min ago", type: "info", priority: "high" },
    { id: 2, title: "Deal closed", message: "TechCorp deal worth $25,000 closed", time: "1 hour ago", type: "success", priority: "high" },
    { id: 3, title: "Follow-up reminder", message: "Call John Anderson today", time: "2 hours ago", type: "warning", priority: "medium" },
    { id: 4, title: "Meeting scheduled", message: "Product demo at 3 PM tomorrow", time: "3 hours ago", type: "info", priority: "medium" }
  ];

  // Mock leads data with more comprehensive information
  useEffect(() => {
    setTimeout(() => {
      setLeads([
        { 
          id: 1, 
          name: "Sarah Williams", 
          status: "hot", 
          company: "TechCorp", 
          email: "sarah@techcorp.com", 
          value: "$25,000", 
          lastContact: "2 hours ago", 
          avatar: "SW", 
          phone: "+1-555-0123",
          source: "Website",
          assignedTo: "John Doe",
          nextAction: "Send proposal",
          probability: 85
        },
        { 
          id: 2, 
          name: "John Anderson", 
          status: "warm", 
          company: "InnovateLab", 
          email: "john@innovatelab.com", 
          value: "$18,500", 
          lastContact: "1 day ago", 
          avatar: "JA", 
          phone: "+1-555-0124",
          source: "Referral",
          assignedTo: "Jane Smith",
          nextAction: "Schedule demo",
          probability: 65
        },
        { 
          id: 3, 
          name: "Emily Chen", 
          status: "cold", 
          company: "StartupXYZ", 
          email: "emily@startupxyz.com", 
          value: "$12,000", 
          lastContact: "3 days ago", 
          avatar: "EC", 
          phone: "+1-555-0125",
          source: "LinkedIn",
          assignedTo: "Bob Wilson",
          nextAction: "Follow up call",
          probability: 30
        },
        { 
          id: 4, 
          name: "Mike Johnson", 
          status: "hot", 
          company: "BigCorp", 
          email: "mike@bigcorp.com", 
          value: "$45,000", 
          lastContact: "4 hours ago", 
          avatar: "MJ", 
          phone: "+1-555-0126",
          source: "Trade Show",
          assignedTo: "Alice Brown",
          nextAction: "Contract review",
          probability: 90
        },
        { 
          id: 5, 
          name: "Lisa Parker", 
          status: "warm", 
          company: "FinanceFlow", 
          email: "lisa@financeflow.com", 
          value: "$32,000", 
          lastContact: "6 hours ago", 
          avatar: "LP", 
          phone: "+1-555-0127",
          source: "Cold Email",
          assignedTo: "David Lee",
          nextAction: "Pricing discussion",
          probability: 70
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      hot: "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25",
      warm: "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25",
      cold: "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
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
      high: "text-red-500 bg-red-100 dark:bg-red-900/30",
      medium: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
      low: "text-green-500 bg-green-100 dark:bg-green-900/30"
    };
    return colors[priority] || "text-gray-500";
  };

  const getNotificationIcon = (type) => {
    const colors = {
      info: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      error: "bg-red-500"
    };
    return colors[type] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 animate-pulse shadow-2xl">
              <BarChart3 className="w-14 h-14 text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Loading Dashboard</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Preparing your professional CRM workspace...</p>
          <div className="mt-6 flex justify-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Enhanced Professional Header */}
      <header className={`${darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/50'} backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300 shadow-lg`}>
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} tracking-tight`}>CRMPro Dashboard</h1>
              {user && (
                <div className="flex items-center space-x-2">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium`}>Welcome back, {user.name}</p>
                  <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-bold">PREMIUM</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search leads, companies, deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 pr-6 py-3 w-96 ${darkMode ? 'bg-gray-700/70 border-gray-600 text-white placeholder-gray-400' : 'bg-white/70 border-gray-300 text-gray-800'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm shadow-lg`}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 ${darkMode ? 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70' : 'bg-white/70 text-gray-600 hover:bg-white/90'} rounded-xl transition-all backdrop-blur-sm border ${darkMode ? 'border-gray-600' : 'border-gray-300'} shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              <Filter className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all shadow-xl transform hover:scale-105 font-semibold"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add Lead
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 ${darkMode ? 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70' : 'bg-white/70 text-gray-600 hover:bg-white/90'} rounded-xl transition-all backdrop-blur-sm border ${darkMode ? 'border-gray-600' : 'border-gray-300'} shadow-lg hover:shadow-xl transform hover:scale-105 relative`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </span>
              </button>
              
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-96 ${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} border rounded-2xl shadow-2xl backdrop-blur-xl z-50`}>
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">4 New</span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b last:border-b-0 ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 ${getNotificationIcon(notification.type)}`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{notification.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{notification.message}</p>
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1 block`}>{notification.time}</span>
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
              className={`p-3 ${darkMode ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-gray-700/20 text-gray-700 hover:bg-gray-700/30'} rounded-xl transition-all backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-xl text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <button 
                onClick={logout} 
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-xl transform hover:scale-105 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Panel */}
        {showFilters && (
          <div className={`px-8 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-gray-50/70'} backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg`}>
                  <option>All Status</option>
                  <option>Hot</option>
                  <option>Warm</option>
                  <option>Cold</option>
                </select>
                <select className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg`}>
                  <option>All Companies</option>
                  <option>TechCorp</option>
                  <option>InnovateLab</option>
                  <option>StartupXYZ</option>
                </select>
                <select className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg`}>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Quarter</option>
                  <option>Last Quarter</option>
                </select>
              </div>
              <button 
                onClick={() => setShowFilters(false)}
                className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Enhanced Stats Cards with Better Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl p-6 backdrop-blur-xl border hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-bold px-3 py-1 rounded-full ${stat.trend === "up" ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{stat.value}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3 font-semibold`}>{stat.title}</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{stat.subtext}</p>
                
                {/* Enhanced Mini Chart */}
                <div className="mt-4 flex items-end space-x-1 h-8">
                  {stat.chart.map((value, idx) => (
                    <div
                      key={idx}
                      className={`bg-gradient-to-t ${stat.gradient} rounded-sm opacity-70 hover:opacity-100 transition-opacity`}
                      style={{ height: `${(value / Math.max(...stat.chart)) * 100}%`, width: '10px' }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Quick Actions */}
        <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl p-8 backdrop-blur-xl border shadow-xl`}> 
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: Plus, label: "Add Lead", color: "from-blue-500 to-blue-600", onClick: () => setIsLeadModalOpen(true) },
              { icon: Upload, label: "Import Data", color: "from-green-500 to-green-600", onClick: () => toast("Import feature coming soon 🚧") },
              { icon: Download, label: "Export Report", color: "from-purple-500 to-purple-600", onClick: () => toast("Export feature coming soon 🚧") },
              { icon: FileText, label: "Generate Report", color: "from-orange-500 to-orange-600", onClick: () => toast("Report generation coming soon 🚧") },
              { icon: MessageSquare, label: "Send Campaign", color: "from-pink-500 to-pink-600", onClick: () => toast("Campaign feature coming soon 🚧") },
              { icon: RefreshCw, label: "Sync Data", color: "from-indigo-500 to-indigo-600", onClick: () => toast("Data sync coming soon 🚧") }
            ].map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`p-6 ${darkMode ? 'bg-gray-700/70 hover:bg-gray-600/70 text-gray-200' : 'bg-white/70 hover:bg-white/90 text-gray-700'} rounded-2xl transition-all hover:shadow-xl transform hover:scale-105 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} group`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Enhanced Leads Section - Takes more space */}
          <div className="xl:col-span-8">
            <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl border backdrop-blur-xl overflow-hidden shadow-xl`}>
              <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Leads</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{leads.length} leads found • Updated just now</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1 shadow-inner">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-lg text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-lg text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsLeadModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add Lead
                  </button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {leads.map((lead) => (
                    <div key={lead.id} className={`${darkMode ? 'bg-gray-700/70 hover:bg-gray-600/70 border-gray-600' : 'bg-white/70 hover:bg-white/90 border-gray-300'} rounded-2xl p-6 transition-all hover:shadow-xl border group relative overflow-hidden`}>
                      <div className={`absolute inset-0 ${getStatusColor(lead.status)} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                              {lead.avatar}
                            </div>
                            <div>
                              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} text-lg`}>{lead.name}</h3>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{lead.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white bg-gray-600/50' : 'text-gray-600 hover:text-gray-800 bg-white/50'} transition-colors rounded-lg`}>
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white bg-gray-600/50' : 'text-gray-600 hover:text-gray-800 bg-white/50'} transition-colors rounded-lg`}>
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${getStatusColor(lead.status)}`}>
                              {lead.status.toUpperCase()}
                            </span>
                            <span className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{lead.value}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Source:</span> {lead.source}</p>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Probability:</span> {lead.probability}%</p>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Assigned:</span> {lead.assignedTo}</p>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold">Last contact:</span> {lead.lastContact}</p>
                          </div>
                          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600/50' : 'bg-gray-100/50'}`}>
                            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-semibold">Next Action:</span> {lead.nextAction}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <button className={`py-3 px-4 ${darkMode ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/50' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200'} rounded-xl text-sm font-semibold transition-all flex items-center justify-center border`}>
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </button>
                          <button className={`py-3 px-4 ${darkMode ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50' : 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200'} rounded-xl text-sm font-semibold transition-all flex items-center justify-center border`}>
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-h-[500px] overflow-auto custom-scrollbar">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} sticky top-0 backdrop-blur-sm`}>
                      <tr>
                        <th className={`px-6 py-4 text-left text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider`}>Lead</th>
                        <th className={`px-6 py-4 text-left text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider`}>Status</th>
                        <th className={`px-6 py-4 text-left text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider`}>Company</th>
                        <th className={`px-6 py-4 text-left text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider`}>Value</th>
                        <th className={`px-6 py-4 text-left text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider`}>Probability</th>
                        <th className={`px-6 py-4 text-left text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wider`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
                      {leads.map((lead) => (
                        <tr key={lead.id} className={`${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-white/60'} transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                                {lead.avatar}
                              </div>
                              <div className="ml-4">
                                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{lead.email}</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last contact: {lead.lastContact}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${getStatusColor(lead.status)}`}>
                              {lead.status.toUpperCase()}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap`}>
                            <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lead.company}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Source: {lead.source}</div>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            {lead.value}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2`}>
                                <div 
                                  className={`h-2 rounded-full ${lead.probability >= 70 ? 'bg-green-500' : lead.probability >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${lead.probability}%` }}
                                ></div>
                              </div>
                              <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lead.probability}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <button className={`p-2 ${darkMode ? 'text-blue-400 hover:text-blue-300 bg-blue-500/20 hover:bg-blue-500/30' : 'text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200'} transition-colors rounded-lg`}>
                                <Phone className="w-4 h-4" />
                              </button>
                              <button className={`p-2 ${darkMode ? 'text-purple-400 hover:text-purple-300 bg-purple-500/20 hover:bg-purple-500/30' : 'text-purple-600 hover:text-purple-800 bg-purple-100 hover:bg-purple-200'} transition-colors rounded-lg`}>
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className={`p-2 ${darkMode ? 'text-gray-400 hover:text-gray-300 bg-gray-500/20 hover:bg-gray-500/30' : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'} transition-colors rounded-lg`}>
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

            {/* Enhanced LeadsTable Component */}
            <div className={`mt-8 ${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl border backdrop-blur-xl overflow-hidden shadow-xl`}>
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Complete Leads Database</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium mt-1`}>Comprehensive view of all lead information and analytics</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className={`px-4 py-2 ${darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-purple-100 text-purple-600 border-purple-200'} border rounded-xl hover:shadow-lg transition-all font-semibold`}>
                      <Download className="w-4 h-4 inline mr-2" />
                      Export
                    </button>
                    <button className={`px-4 py-2 ${darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-blue-100 text-blue-600 border-blue-200'} border rounded-xl hover:shadow-lg transition-all font-semibold`}>
                      <RefreshCw className="w-4 h-4 inline mr-2" />
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50/50 border-gray-200'} rounded-2xl border p-6`}>
                  <LeadsTable darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Sidebar */}
          <div className="xl:col-span-4 space-y-8">
            {/* Enhanced Recent Activities */}
            <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl p-6 backdrop-blur-xl border shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activities</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Latest team actions</p>
                </div>
                <button className={`text-sm ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} font-semibold transition-colors hover:underline`}>
                  View All
                </button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className={`flex items-start space-x-4 p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50 border-gray-600' : 'bg-white/50 hover:bg-white/80 border-gray-300'} transition-all border group`}>
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>{activity.description}</p>
                            <div className="flex items-center justify-between">
                              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{activity.time}</p>
                              <span className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{activity.amount}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                              {activity.avatar}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            activity.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : activity.status === 'scheduled' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {activity.status.toUpperCase()}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(activity.priority)}`}>
                            {activity.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Performance Metrics */}
            <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl p-6 backdrop-blur-xl border shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Performance Metrics</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your monthly progress</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white bg-gray-600/50' : 'text-gray-600 hover:text-gray-800 bg-white/50'} transition-colors rounded-lg`}>
                    <BarChart className="w-4 h-4" />
                  </button>
                  <button className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white bg-gray-600/50' : 'text-gray-600 hover:text-gray-800 bg-white/50'} transition-colors rounded-lg`}>
                    <LineChart className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Calls Made", current: 47, target: 60, color: "from-blue-500 to-purple-600", percentage: 78 },
                  { label: "Emails Sent", current: 123, target: 150, color: "from-green-500 to-blue-600", percentage: 82 },
                  { label: "Meetings Booked", current: 12, target: 25, color: "from-purple-500 to-pink-600", percentage: 48 },
                  { label: "Deals Closed", current: 8, target: 15, color: "from-orange-500 to-red-500", percentage: 53 }
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{metric.label}</span>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{metric.current} / {metric.target}</span>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{metric.percentage}% of goal</p>
                      </div>
                    </div>
                    <div className={`w-full h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden shadow-inner`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                        style={{ width: `${metric.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>0</span>
                      <span className={`text-xs font-bold ${metric.percentage >= 70 ? 'text-green-500' : metric.percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {metric.percentage}%
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{metric.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Team Leaderboard */}
            <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl p-6 backdrop-blur-xl border shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Team Leaderboard</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Top performers this month</p>
                </div>
                <button className={`text-sm ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} font-semibold transition-colors hover:underline`}>
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", deals: 23, avatar: "SJ", rank: 1, revenue: "$145K", growth: "+15%" },
                  { name: "Mike Chen", deals: 19, avatar: "MC", rank: 2, revenue: "$128K", growth: "+12%" },
                  { name: "Emily Davis", deals: 16, avatar: "ED", rank: 3, revenue: "$112K", growth: "+8%" },
                  { name: "Alex Rodriguez", deals: 14, avatar: "AR", rank: 4, revenue: "$98K", growth: "+5%" }
                ].map((performer, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50 border-gray-600' : 'bg-white/50 hover:bg-white/80 border-gray-300'} transition-all border group`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                      performer.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                      performer.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                      performer.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                      'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                    }`}>
                      {performer.rank}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                      {performer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{performer.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${performer.rank <= 3 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                            {performer.growth}
                          </span>
                          {performer.rank === 1 && <Star className="w-4 h-4 text-yellow-500" />}
                          {performer.rank <= 3 && <TrendingUp className="w-4 h-4 text-green-500" />}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-3">
                          <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>{performer.deals} deals</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className={`text-xs font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{performer.revenue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900/70 to-blue-800/70 border-blue-700/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'} rounded-2xl p-6 border backdrop-blur-xl shadow-xl relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'} shadow-lg`} />
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${darkMode ? 'bg-blue-800/50 text-blue-300' : 'bg-blue-200 text-blue-700'}`}>Today</span>
                  </div>
                  <h4 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>8</h4>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Tasks Due</p>
                  <div className="mt-3">
                    <div className={`w-full h-2 ${darkMode ? 'bg-blue-800/30' : 'bg-blue-200'} rounded-full`}>
                      <div className="w-3/4 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} mt-1`}>6 completed</p>
                  </div>
                </div>
              </div>
              
              <div className={`${darkMode ? 'bg-gradient-to-br from-purple-900/70 to-purple-800/70 border-purple-700/50' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'} rounded-2xl p-6 border backdrop-blur-xl shadow-xl relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className={`w-10 h-10 ${darkMode ? 'text-purple-400' : 'text-purple-600'} shadow-lg`} />
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${darkMode ? 'bg-purple-800/50 text-purple-300' : 'bg-purple-200 text-purple-700'}`}>This Week</span>
                  </div>
                  <h4 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>5</h4>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Meetings</p>
                  <div className="mt-3">
                    <div className={`w-full h-2 ${darkMode ? 'bg-purple-800/30' : 'bg-purple-200'} rounded-full`}>
                      <div className="w-4/5 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'} mt-1`}>4 confirmed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Analytics Card */}
            <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-white/70 border-white/50'} rounded-3xl p-6 backdrop-blur-xl border shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Weekly Overview</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Key metrics summary</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Users className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-xs font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+12%</span>
                  </div>
                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>24</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>New Leads</p>
                </div>
                
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-xs font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+8%</span>
                  </div>
                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>$89K</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Pipeline</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateLeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          onLeadCreated={() => toast.success("Lead added successfully! 🎉")}
        />
      </div>

      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLeadCreated={handleLeadCreated}
      />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#f1f5f9'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6b7280' : '#cbd5e1'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#9ca3af' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
}