"use client";
import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Container, Box, Alert } from "@mui/material";
import { blenderModels } from "@/constants/blenderModels";
import AvatarViewer from "@/components/rpg/AvatarViewer";

interface ShopPageClientProps {
  userId: string;
  userCoin: {
    coin: string;
  };
  userItems: {
    items: string[];
  };
}

const ShopPageClient: React.FC<ShopPageClientProps> = ({ userId, userCoin, userItems }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [currentCoin, setCurrentCoin] = useState(parseInt(userCoin.coin));
  const [purchasedItems, setPurchasedItems] = useState<string[]>(userItems.items);

  // fee > 0 のアイテムのみを表示
  const shopItems = blenderModels.filter((item) => item.fee > 0);

  const handlePurchase = async (itemId: string, itemFee: number) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`http://localhost:8080/rpg/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: userId,
          item: itemId,
          coin: (-itemFee).toString(), // 負の値で送信
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "購入が完了しました！", type: "success" });
        setCurrentCoin((prev) => prev - itemFee);
        setPurchasedItems((prev) => [...prev, itemId]);
      } else {
        setMessage({ text: data.result || "購入に失敗しました", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "エラーが発生しました", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginY: 4 }}>
        ショップ
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: "yellow" }}>
        所持コイン: {currentCoin}
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ marginBottom: 2 }}>
          {message.text}
        </Alert>
      )}

      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={4}>
          {shopItems.map((item) => {
            const isPurchased = purchasedItems.includes(item.id);
            const canAfford = currentCoin >= item.fee;

            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    opacity: isPurchased ? 0.7 : 1,
                    position: "relative",
                  }}
                >
                  <Box sx={{ height: "250px", position: "relative" }}>
                    <AvatarViewer modelPath={item.avatarPath} size={{ width: "100%", height: "100%" }} />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="yellow" sx={{ marginBottom: 1 }}>
                        {item.fee} コイン
                      </Typography>
                    </Box>

                    {isPurchased ? (
                      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                        購入済み
                      </Typography>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handlePurchase(item.id, item.fee)}
                        disabled={loading || !canAfford}
                        sx={{
                          backgroundColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "#64b5f6",
                          },
                        }}
                      >
                        {!canAfford ? "コイン不足" : loading ? "購入中..." : "購入"}
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

export default ShopPageClient;
