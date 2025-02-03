"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import { Search, Zap } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function TableData() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Zap className="text-yellow-500" size={24} />
        <h2 className="ml-2 text-xl sm:text-2xl font-bold text-black">
          Arc Tech Labs - Assignment
        </h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4 w-full">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      {/* Table Container - Makes table horizontally scrollable on small screens */}
      <div className="overflow-x-auto">
        <TableContainer
          component={Paper}
          className="bg-white shadow-md rounded-lg"
        >
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="font-semibold">ID</TableCell>
                <TableCell className="font-semibold">Title</TableCell>
                <TableCell className="font-semibold hidden sm:table-cell">
                  Body
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {loading ? (
                <TableRow className="hover:bg-gray-100">
                  <TableCell className="font-mono text-yellow-500">
                    <Skeleton
                      variant="rectangular"
                      className="w-full"
                      height={118}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      className="w-full"
                      height={118}
                    />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-gray-600">
                    <Skeleton
                      variant="rectangular"
                      className="w-full"
                      height={118}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(0, 10).map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-100">
                    <TableCell className="font-mono text-yellow-500">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-600">
                      {item.body.slice(0, 50)}...
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
