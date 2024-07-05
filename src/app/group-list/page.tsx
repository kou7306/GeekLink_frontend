"use client";
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Group {
  id: String
  owner_id: String
  member_ids: String[]
  name: String
  description: String
}

const Page = () => {
  const [groups, setGroups] = useState<Group[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group/group-list`);
        const data = await response.json();
        console.log(data.group);
        setGroups(data.group);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {groups?.map((group) => (
          <div key={group.id.toString()} className="flex justify-center">
            <a href={`/group/${group.id}`} className="block w-full max-w-xs">
              <Card className="w-full h-72 flex flex-col justify-between bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <CardContent className="flex flex-col justify-between h-full">
                  <div>
                    <Typography variant="h5" component="div" className="text-xl font-semibold mb-8">
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-gray-600 mb-4">
                      概要：{group.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-gray-600">
                      メンバー数：{group.member_ids.length}人
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
