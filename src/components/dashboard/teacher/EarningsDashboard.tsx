import { useState } from "react";
import { DollarSign, TrendingUp, CreditCard, Download, Calendar, ArrowUpRight, Wallet, PiggyBank, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EarningsDashboard() {
  const [timeRange, setTimeRange] = useState("30d");

  const earningsData = {
    totalEarnings: 24350,
    thisMonth: 8420,
    pending: 2150,
    available: 21200,
    avgPerStudent: 32.50,
    growth: 15.7
  };

  const recentTransactions = [
    { id: 1, type: "course_sale", course: "React Development", amount: 99, date: "2024-01-10", student: "John Doe", status: "completed" },
    { id: 2, type: "course_sale", course: "JavaScript Fundamentals", amount: 79, date: "2024-01-10", student: "Jane Smith", status: "completed" },
    { id: 3, type: "payout", course: "Monthly Payout", amount: -5000, date: "2024-01-09", student: "Bank Transfer", status: "processing" },
    { id: 4, type: "course_sale", course: "TypeScript Advanced", amount: 129, date: "2024-01-09", student: "Mike Johnson", status: "completed" },
    { id: 5, type: "refund", course: "React Development", amount: -99, date: "2024-01-08", student: "Sarah Williams", status: "completed" },
  ];

  const earningsByCourse = [
    { name: "Complete React Development", sales: 287, revenue: 28413, avg: 99 },
    { name: "JavaScript Fundamentals", sales: 193, revenue: 15247, avg: 79 },
    { name: "TypeScript Advanced Patterns", sales: 145, revenue: 18705, avg: 129 },
  ];

  const monthlyEarnings = [
    { month: "Jul", amount: 12400 },
    { month: "Aug", amount: 15200 },
    { month: "Sep", amount: 18600 },
    { month: "Oct", amount: 21300 },
    { month: "Nov", amount: 19800 },
    { month: "Dec", amount: 24350 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-success/10 via-primary/5 to-accent/5 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Earnings & Payouts</h1>
          <p className="text-lg text-muted-foreground">Track your revenue and manage your payments</p>
        </div>
      </div>

      {/* Time Range */}
      <Tabs value={timeRange} onValueChange={setTimeRange}>
        <TabsList>
          <TabsTrigger value="7d">7 Days</TabsTrigger>
          <TabsTrigger value="30d">30 Days</TabsTrigger>
          <TabsTrigger value="90d">90 Days</TabsTrigger>
          <TabsTrigger value="1y">1 Year</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-success/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <Badge variant="default" className="bg-success/10 text-success flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +{earningsData.growth}%
              </Badge>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-foreground">${earningsData.totalEarnings.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">This Month</p>
            <p className="text-3xl font-bold text-foreground">${earningsData.thisMonth.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-warning/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <PiggyBank className="w-6 h-6 text-warning" />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-foreground">${earningsData.pending.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-accent/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Available</p>
            <p className="text-3xl font-bold text-foreground">${earningsData.available.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Monthly Earnings Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-4">
            {monthlyEarnings.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex flex-col gap-2">
                  <div className="relative h-64 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-success/40 to-success/20 rounded-t-lg relative overflow-hidden group cursor-pointer hover:from-success/50 hover:to-success/30 transition-all"
                      style={{ height: `${(data.amount / 25000) * 100}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium text-foreground bg-background/90 px-3 py-1.5 rounded-lg shadow-lg">
                          ${data.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earnings by Course */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Revenue by Course
            </span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earningsByCourse.map((course) => (
              <div key={course.name} className="p-6 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{course.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">${course.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Avg: ${course.avg}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    transaction.type === "course_sale" ? "bg-success/10" :
                    transaction.type === "payout" ? "bg-primary/10" :
                    "bg-destructive/10"
                  }`}>
                    <DollarSign className={`w-5 h-5 ${
                      transaction.type === "course_sale" ? "text-success" :
                      transaction.type === "payout" ? "text-primary" :
                      "text-destructive"
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{transaction.course}</p>
                    <p className="text-sm text-muted-foreground">{transaction.student} • {transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                  <p className={`text-xl font-bold ${
                    transaction.amount > 0 ? "text-success" : "text-destructive"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout Actions */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-8 text-center">
          <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Ready to cash out?</h3>
          <p className="text-muted-foreground mb-6">You have ${earningsData.available.toLocaleString()} available for withdrawal</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-success hover:bg-success/90">
              <CreditCard className="w-5 h-5 mr-2" />
              Request Payout
            </Button>
            <Button size="lg" variant="outline">
              View Payout History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
