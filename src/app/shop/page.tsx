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
import { buyItem } from "@/utils/buyItem";

const getShopItems = async () => {
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
  const [items, setItems] = useState<
    { id: number; name: string; image: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [soldOutItems, setSoldOutItems] = useState<number[]>([]);

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

  const handlePurchase = async (itemId: number, itemPrice: number) => {
    setLoading(true);
    setPurchaseMessage("");

    try {
      await buyItem(itemId.toString(), itemPrice.toString());
      setPurchaseMessage("購入が完了しました！");
      setSoldOutItems((prev) => [...prev, itemId]);
    } catch (error) {
      console.error("Failed to purchase item:", error);
      setPurchaseMessage("購入に失敗しました。再試行してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginY: 4 }}>
        ショップ
      </Typography>
      {purchaseMessage && (
        <Typography
          variant="body2"
          color={purchaseMessage.includes("失敗") ? "error" : "success"}
          sx={{ marginBottom: 2 }}
        >
          {purchaseMessage}
        </Typography>
      )}
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={8}>
          {items.map((item) => {
            const isSoldOut = soldOutItems.includes(item.id);
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    opacity: isSoldOut ? 0.5 : 1,
                    position: "relative",
                  }}
                >
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
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography
                      variant="body2"
                      color="yellow"
                      sx={{ marginBottom: 1 }}
                    >
                      {item.price} コイン
                    </Typography>
                    {isSoldOut ? (
                      <Typography
                        variant="h5" // Increase the font size
                        color="error"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontWeight: "bold",
                          fontSize: "1.5rem",
                          padding: "8px 16px",
                          borderRadius: "4px",
                        }}
                      >
                        Sold Out
                      </Typography>
                    ) : (
                      <Button
                        size="small"
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#64b5f6",
                          },
                          marginTop: 1,
                        }}
                        onClick={() => handlePurchase(item.id, item.price)}
                        disabled={loading || isSoldOut}
                      >
                        {loading ? "購入中..." : "購入"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default ShopPage;
