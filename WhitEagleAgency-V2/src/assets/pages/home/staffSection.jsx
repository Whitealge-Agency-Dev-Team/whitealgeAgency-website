import Box from "@mui/material/Box";
import StaffCard from "./StaffCard";
import StaffJSON from "./staff.json";

export default function StaffSection() {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto", // Permite scroll horizontal en mobile si hay muchas cartas
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        gap: 3,
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4 },
      }}
    >
      {StaffJSON.map((member, index) => (
        <StaffCard
          key={index}
          name={member.name}
          assets={member.assets}
          image={member.image}
        />
      ))}
    </Box>
  );
}
