import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export const pieData = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
    }
];

export const pieData2 = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

export const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Ags","Sep","Okt","Nov","Des"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43,20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => 'rgba(235,219,52,1)'
        },
        {
            data: [20, 45, 28, 76, 12, 43,20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => 'rgba(74,209,29,1)'
        }
    ],
};