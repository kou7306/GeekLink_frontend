"use client";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CreateGroup from "@/components/groupChat/CreateGroup";
import { Box } from "@mui/material";
import Link from "next/link";
import Loading from "../loading";

interface Group {
  id: String;
  owner_id: String;
  member_ids: String[];
  name: String;
  description: String;
}

const Page = () => {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/group/group-list`
        );
        const data = await response.json();
        setGroups(data.group);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      <CreateGroup />
      <Grid container spacing={5} justifyContent="center" mr={3}>
        {groups?.map((group) => (
          <Grid item xs={12} sm={6} md={5} key={group.id.toString()}>
            <Link
              href={`/group/${group.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "15px",
                      }}
                    >
                      {group.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        marginBottom: "20px",
                        lineHeight: 1.6,
                      }}
                    >
                      {group.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        fontWeight: "bold",
                      }}
                    >
                      メンバー数：{group.member_ids.length}人
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page;
