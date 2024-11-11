"use client";

import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Key, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// Simulated data
const initialApiKeys = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_51NxXa...",
    created: "2023-10-01",
    lastUsed: "2023-10-15",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "sk_test_51NxXa...",
    created: "2023-09-15",
    lastUsed: "2023-10-14",
  },
];

const usageData = {
  currentMonth: {
    requests: 15234,
    cost: 76.17,
    quota: 20000,
  },
  history: [
    { month: "Jun", requests: 12000 },
    { month: "Jul", requests: 13500 },
    { month: "Aug", requests: 14200 },
    { month: "Sep", requests: 15100 },
    { month: "Oct", requests: 15234 },
  ],
};

const sampleCode = {
  curl: `curl -X POST ${process.env.NEXT_PUBLIC_FRONTEND_APP_URL}/v1/check-image \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/image.jpg",
    "check_type": "content"
  }'`,
  python: `import requests

response = requests.post(
    '${process.env.NEXT_PUBLIC_FRONTEND_APP_URL}/v1/check-image',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'image_url': 'https://example.com/image.jpg',
        'check_type': 'content'
    }
)

result = response.json()
print(result)`,
  node: `const axios = require('axios');

const checkImage = async () => {
  try {
    const response = await axios.post(
      '${process.env.NEXT_PUBLIC_FRONTEND_APP_URL}/v1/check-image',
      {
        image_url: 'https://example.com/image.jpg',
        check_type: 'content'
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}`,
};

export default function ApiPage() {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);

  const handleAddKey = () => {
    const newKey = {
      id: String(apiKeys.length + 1),
      name: `API Key ${apiKeys.length + 1}`,
      key: `sk_test_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "-",
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  return (
    <div className="overflow-x-hidden">
      <div className="max-w-[calc(100vw-2rem)] mx-auto p-6 flex flex-col gap-4">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">API Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API keys and monitor usage
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Current month statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Requests</span>
                  <span className="font-medium">
                    {usageData.currentMonth.requests.toLocaleString()} /{" "}
                    {usageData.currentMonth.quota.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{
                      width: `${(usageData.currentMonth.requests / usageData.currentMonth.quota) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Cost</CardTitle>
              <CardDescription>Based on usage this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${usageData.currentMonth.cost.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                $0.005 per request
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Trend</CardTitle>
              <CardDescription>Last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[80px] flex items-end gap-2">
                {usageData.history.map((month) => (
                  <div
                    key={month.month}
                    className="flex-1 bg-primary"
                    style={{
                      height: `${(month.requests / 20000) * 100}%`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {usageData.history.map((month) => (
                  <div key={month.month} className="text-xs">
                    {month.month}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API keys for authentication
                </CardDescription>
              </div>
              <Button onClick={handleAddKey}>
                <Plus className="mr-2 h-4 w-4" />
                Add Key
              </Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {key.key}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() => navigator.clipboard.writeText(key.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeKey(key.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>
              Examples of how to use the CloudCheck API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Key className="h-4 w-4" />
              <AlertTitle>Authentication</AlertTitle>
              <AlertDescription>
                All API requests require authentication using your API key in
                the Authorization header.
              </AlertDescription>
            </Alert>

            <div className="mt-6 overflow-x-auto">
              <Tabs defaultValue="curl" className="w-full">
                <TabsList>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="node">Node.js</TabsTrigger>
                </TabsList>
                <TabsContent value="curl">
                  <CodeBlock code={sampleCode.curl} language="bash" />
                </TabsContent>
                <TabsContent value="python">
                  <CodeBlock code={sampleCode.python} language="python" />
                </TabsContent>
                <TabsContent value="node">
                  <CodeBlock code={sampleCode.node} language="javascript" />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
