import React from "react";
import Item from "./Item";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function ItemList({ items, loading }) {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
          sx={{ padding: "5vh 5vw", textAlign: "-webkit-center" }}
        >
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id} padding="0 1vw">
              <Item key={item} item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
