import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Check,
  AlertCircle,
  Download,
  FileText,
  DollarSign,
  Calendar,
  Shield,
  RefreshCw,
  Settings,
  Building2,
  Wallet
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  email?: string;
  bankName?: string;
  isDefault: boolean;
  expiryDate?: string;
  brand?: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

export function PaymentTab() {
  const [loading, setLoading] = React.useState(false);
  const [autoRenew, setAutoRenew] = React.useState(true);
  const [paymentReminders, setPaymentReminders] = React.useState(true);
  const [selectedMethod, setSelectedMethod] = React.useState("card-1");
  
  const [paymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: 'card-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/24',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryDate: '08/25',
      isDefault: false
    },
    {
      id: 'paypal-1',
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false
    }
  ]);

  const [transactions] = React.useState<Transaction[]>([
    {
      id: 'tx-1',
      date: '2024-03-15',
      description: 'Pro Subscription - Monthly',
      amount: 29.99,
      status: 'completed',
      method: 'Visa •••• 4242'
    },
    {
      id: 'tx-2',
      date: '2024-03-10',
      description: 'JavaScript Masterclass Course',
      amount: 89.99,
      status: 'completed',
      method: 'Mastercard •••• 5555'
    },
    {
      id: 'tx-3',
      date: '2024-02-15',
      description: 'Pro Subscription - Monthly',
      amount: 29.99,
      status: 'completed',
      method: 'Visa •••• 4242'
    },
    {
      id: 'tx-4',
      date: '2024-02-01',
      description: 'React Advanced Course',
      amount: 79.99,
      status: 'completed',
      method: 'PayPal'
    }
  ]);

  const handleAddPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "Redirecting to secure payment setup...",
    });
  };

  const handleRemoveMethod = (id: string) => {
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account.",
    });
  };

  const handleSetDefault = (id: string) => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been changed.",
    });
  };

  const handleDownloadInvoice = (transactionId: string) => {
    toast({
      title: "Downloading invoice",
      description: `Invoice for transaction ${transactionId} is being downloaded.`,
    });
  };

  const getCardIcon = (brand?: string) => {
    switch(brand?.toLowerCase()) {
      case 'visa':
        return <CreditCard className="h-8 w-12 text-blue-600" />;
      case 'mastercard':
        return <CreditCard className="h-8 w-12 text-red-600" />;
      default:
        return <CreditCard className="h-8 w-12 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your payment methods for purchases and subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label 
                          htmlFor={method.id} 
                          className="flex items-center justify-between w-full cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            {method.type === 'card' && getCardIcon(method.brand)}
                            {method.type === 'paypal' && (
                              <div className="h-8 w-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                                PP
                              </div>
                            )}
                            {method.type === 'bank' && <Building2 className="h-8 w-12 text-muted-foreground" />}
                            
                            <div>
                              <p className="font-medium">
                                {method.type === 'card' && `${method.brand} •••• ${method.last4}`}
                                {method.type === 'paypal' && `PayPal (${method.email})`}
                                {method.type === 'bank' && `${method.bankName} •••• ${method.last4}`}
                              </p>
                              {method.expiryDate && (
                                <p className="text-sm text-muted-foreground">
                                  Expires {method.expiryDate}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {method.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                            {!method.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSetDefault(method.id);
                                }}
                              >
                                Set as default
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveMethod(method.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddPaymentMethod}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Payment Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Payment Security
                </CardTitle>
                <CardDescription>
                  Enhanced security for your transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">3D Secure Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Extra verification for online payments
                    </p>
                  </div>
                  <Badge variant="default">
                    <Check className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified for all transactions
                    </p>
                  </div>
                  <Switch
                    checked={paymentReminders}
                    onCheckedChange={setPaymentReminders}
                  />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Security Notice</p>
                      <p className="text-sm text-muted-foreground">
                        We use industry-standard encryption to protect your payment information. 
                        Your card details are never stored on our servers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  View your past transactions and download invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              transaction.status === 'completed' ? 'default' :
                              transaction.status === 'pending' ? 'secondary' :
                              'destructive'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadInvoice(transaction.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>

            {/* Spending Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Spending Overview
                </CardTitle>
                <CardDescription>
                  Your spending summary for this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subscriptions</span>
                    <span className="font-medium">$29.99</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Courses</span>
                    <span className="font-medium">$169.98</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total this month</span>
                    <span className="font-bold text-lg">$199.97</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Current Subscription
                </CardTitle>
                <CardDescription>
                  Manage your subscription plan and billing cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="p-6 border rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">FormAcad Pro</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Unlimited access to all courses and features
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <div>
                          <p className="text-2xl font-bold">$29.99</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Plan
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Next billing date</p>
                      <p className="font-medium">April 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member since</p>
                      <p className="font-medium">January 15, 2024</p>
                    </div>
                  </div>
                </div>

                {/* Auto-renewal */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Auto-renewal</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically renew your subscription
                    </p>
                  </div>
                  <Switch
                    checked={autoRenew}
                    onCheckedChange={setAutoRenew}
                  />
                </div>

                {/* Included Features */}
                <div className="space-y-3">
                  <h4 className="font-medium">Included in your plan</h4>
                  <div className="space-y-2">
                    {[
                      'Unlimited course access',
                      'Downloadable resources',
                      'Certificate of completion',
                      'Priority support',
                      'Offline viewing',
                      'Early access to new courses'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="flex-1 text-destructive hover:text-destructive">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Preferences</CardTitle>
                <CardDescription>
                  Configure your billing and invoice settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    placeholder="Enter billing email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name (Optional)</Label>
                  <Input
                    id="company-name"
                    placeholder="Enter company name for invoices"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID (Optional)</Label>
                  <Input
                    id="tax-id"
                    placeholder="Enter tax identification number"
                  />
                </div>

                <Button className="w-full">
                  Update Billing Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}