// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { Card, Grid, Typography } from "@mui/material";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "ATTENDANCE",
//     },
//   },
// };

// export const options1 = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "MARKS",
//     },
//   },
// };
// const AdminBarCharts = ({ graph, marksGraph }) => {
//   const labels = graph.map((d) => d.name);

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: "Attendance",
//         data: graph.map((d) => d.count),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   const labelsMarks = marksGraph.map((d) => d.rollNumber);

//   const dataMarks = {
//     labels: labelsMarks,
//     datasets: [
//       {
//         label: "Marks",
//         data: marksGraph.map((d) => d.totalMarks),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };
//   return (
//     <>
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         <Grid item xs={6}>
//           <Typography
//             style={{
//               fontSize: "25px",
//               fontWeight: "bold",
//               color: "#4195dd",
//               display: "flex",
//               justifyContent: "center",
//               marginBottom: "1rem",
//             }}
//           >
//             Attendance
//           </Typography>
//           <Card variant="outlined" sx={{ p: 2, ml: "2rem" }}>
//             <Bar options={options} data={data} />
//           </Card>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography
//             style={{
//               fontSize: "25px",
//               fontWeight: "bold",
//               color: "#4195dd",
//               display: "flex",
//               justifyContent: "center",
//               marginBottom: "1rem",
//             }}
//           >
//             Marks
//           </Typography>
//           <Card variant="outlined" sx={{ p: 2, ml: "2rem", mt: "1rem" }}>
//             <Bar options={options1} data={dataMarks} />
//           </Card>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default AdminBarCharts;
