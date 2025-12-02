import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function StaffCard({ name, assets, image }) {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
        minWidth: 200,
        maxWidth: 320,
        mx: "auto",
        my: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Roboto Slab",
          fontWeight: 700,
          color: "#1257A2",
          mb: 1,
          textAlign: "center",
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontFamily: "Roboto Slab",
          color: "#2B2E34",
          textAlign: "center",
        }}
      >
        {assets}
      </Typography>
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: { xs: 80, sm: 120 },
          height: { xs: 80, sm: 120 },
          borderRadius: "50%",
          objectFit: "cover",
          mt: 1,
          boxShadow: 3,
        }}
      />
    </Box>
  );
}
