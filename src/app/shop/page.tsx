"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

// Example utility function to fetch shop items
const getShopItems = async () => {
  // This should be replaced with your API call
  return [
    { id: 1, name: "Item 1", image: "/img/sword.png", price: 100 },
    { id: 2, name: "Item 2", image: "/img/sword.png", price: 200 },
    { id: 3, name: "Item 3", image: "/img/sword.png", price: 150 },
    { id: 4, name: "Item 4", image: "/img/sword.png", price: 250 },
    { id: 5, name: "Item 5", image: "/img/sword.png", price: 300 },
    { id: 6, name: "Item 6", image: "/img/sword.png", price: 180 },
  ];
};

const ShopPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getShopItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch shop items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginY: 4 }}>
        ショップ
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={8}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="70"
                  image={item.image}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center items horizontally
                    textAlign: "center", // Center text within the content
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography
                    variant="body2"
                    color="yellow"
                    sx={{ marginBottom: 1 }}
                  >
                    {item.price} コイン {/* Display the price with currency */}
                  </Typography>
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: "primary.main", // Light blue background
                      color: "white", // White text
                      "&:hover": {
                        backgroundColor: "#64b5f6", // Slightly darker on hover
                      },
                      marginTop: 1, // Add space between text and button
                    }}
                  >
                    購入
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ShopPage;
