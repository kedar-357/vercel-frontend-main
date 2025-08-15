import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Lightbulb } from "lucide-react";
import { 
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart as RechartsBar,
  Bar,
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,        
  Legend,
  ResponsiveContainer 
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "sonner";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  
  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ['analytics', selectedPeriod],
    queryFn: async () => {
      const response = await api.get(`/api/jobs/analytics?period=${selectedPeriod}`);
      return response.data;
    }
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load analytics data");
    }
  }, [error]);

  // Generate insights based on the data
  const generateInsights = (data: any) => {
    if (!data) return [];
    
    const insights = [];
    const { summary, statusDistribution } = data;

    // Interview rate insight
    const interviewRate = parseFloat(summary.interviewRate);
    if (interviewRate > 30) {
      insights.push({
        title: "Strong interview conversion rate",
        description: "Your application-to-interview rate is above average. Keep up the good work!"
      });
    } else if (interviewRate < 15) {
      insights.push({
        title: "Consider improving application targeting",
        description: "Your interview rate is below average. Consider focusing on roles that better match your skills."
      });
    }

    // Offer rate insight
    const offerRate = parseFloat(summary.offerRate);
    if (offerRate > 20) {
      insights.push({
        title: "Excellent offer conversion rate",
        description: "You're converting interviews to offers at a high rate. Your interview skills are strong!"
      });
    } else if (offerRate < 5) {
      insights.push({
        title: "Interview preparation opportunity",
        description: "Consider practicing common interview questions and improving your interview skills."
      });
    }

    // Response time insight
    const avgResponseTime = parseInt(summary.avgResponseTime);
    if (avgResponseTime > 14) {
      insights.push({
        title: "Long response times",
        description: "Companies are taking longer to respond. Consider following up after 1-2 weeks."
      });
    }

    // Status distribution insights
    const appliedCount = statusDistribution.find((s: any) => s.name === "Applied")?.value || 0;
    const interviewCount = statusDistribution.find((s: any) => s.name === "Interview")?.value || 0;
    if (interviewCount > 0 && appliedCount > 0) {
      const interviewRatio = interviewCount / appliedCount;
      if (interviewRatio > 0.4) {
        insights.push({
          title: "High interview conversion",
          description: "You're getting interviews for a large portion of your applications. Your resume is working well!"
        });
      }
    }

    return insights;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-t-jobwise-medium rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <motion.h1 
          className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Analytics Dashboard
        </motion.h1>
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Track your application progress and gain insights to improve your job search
        </motion.p>
      </div>

      {/* Time Period Selector */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
  <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-jobwise-medium/30 backdrop-blur-sm rounded-xl p-1 border border-white/10">
    <TabsTrigger
      value="last30days"
      className="
        w-full
        rounded-xl
        px-3 py-2
        font-medium
        text-white
        transition-all duration-300
        data-[state=active]:bg-jobwise-light
        data-[state=active]:text-jobwise-dark
        data-[state=active]:shadow-md
        focus-visible:outline-none
      "
    >
      Last 30 Days
    </TabsTrigger>
    <TabsTrigger
      value="last90days"
      className="
        w-full
        rounded-xl
        px-3 py-2
        font-medium
        text-white
        transition-all duration-300
        data-[state=active]:bg-jobwise-light
        data-[state=active]:text-jobwise-dark
        data-[state=active]:shadow-md
        focus-visible:outline-none
      "
    >
      Last 90 Days
    </TabsTrigger>
    <TabsTrigger
      value="alltime"
      className="
        w-full
        rounded-xl
        px-3 py-2
        font-medium
        text-white
        transition-all duration-300
        data-[state=active]:bg-jobwise-light
        data-[state=active]:text-jobwise-dark
        data-[state=active]:shadow-md
        focus-visible:outline-none
      "
    >
      All Time
    </TabsTrigger>
  </TabsList>
</Tabs>

      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {analyticsData?.summary && [
          { 
            title: "Total Applications", 
            value: analyticsData.summary.totalApplications, 
            icon: "📋",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/30"
          },
          { 
            title: "Interview Rate", 
            value: analyticsData.summary.interviewRate, 
            icon: "💼",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/30"
          },
          { 
            title: "Offer Rate", 
            value: analyticsData.summary.offerRate, 
            icon: "🎯",
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/30"
          },
          { 
            title: "Avg. Response Time", 
            value: analyticsData.summary.avgResponseTime, 
            icon: "⏱️",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/30"
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Card className={`glass-card border ${card.border} hover:shadow-xl transition-all duration-300 h-full overflow-hidden`}>
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-transparent -translate-x-12 translate-y-12"></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                    <span className={`text-2xl ${card.color}`}>{card.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-300">{card.title}</p>
                    <h3 className="text-3xl font-bold text-white">{card.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Application Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="glass-card border border-white/10 h-full hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-400" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={analyticsData?.statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData?.statusDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} Applications`, ""]}
                      contentStyle={{ backgroundColor: 'rgba(30, 30, 60, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}
                      itemStyle={{ color: 'white' }}
                    />
                    <Legend 
                      wrapperStyle={{ color: 'white' }}
                      formatter={(value) => <span className="text-white">{value}</span>}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="glass-card border border-white/10 h-full hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <LineChart className="h-5 w-5 text-purple-400" />
                Applications Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLine data={analyticsData?.timeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <YAxis 
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      formatter={(value) => [`${value} Applications`, ""]}
                      contentStyle={{ backgroundColor: 'rgba(30, 30, 60, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}
                      itemStyle={{ color: 'white' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="Applications" 
                      stroke="#818cf8" 
                      strokeWidth={3}
                      activeDot={{ r: 8, fill: "#6366f1" }} 
                      dot={{ r: 4, fill: "#818cf8" }}
                    />
                  </RechartsLine>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications by Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="glass-card border border-white/10 h-full hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart className="h-5 w-5 text-green-400" />
                Applications by Role
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBar data={analyticsData?.roleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <YAxis 
                      tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(30, 30, 60, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}
                      itemStyle={{ color: 'white' }}
                    />
                    <Legend 
                      wrapperStyle={{ color: 'white' }}
                      formatter={(value) => <span className="text-white">{value}</span>}
                    />
                    <Bar dataKey="applied" name="Applied" fill="#818cf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interview" name="Interview" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="offered" name="Offered" fill="#34d399" radius={[4, 4, 0, 0]} />
                  </RechartsBar>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="glass-card border border-white/10 h-full hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                Insights & Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="space-y-4">
                {generateInsights(analyticsData).length > 0 ? (
                  generateInsights(analyticsData).map((insight, index) => (
                    <motion.div 
                      key={index} 
                      className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="font-bold text-amber-300 flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                        {insight.title}
                      </h3>
                      <p className="text-gray-200">{insight.description}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Lightbulb className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                    <p className="text-gray-300">No specific insights available for your current data. Keep applying to see more insights!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
