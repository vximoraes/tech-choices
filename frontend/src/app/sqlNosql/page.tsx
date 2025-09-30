"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
    { name: "MySQL", type: "SQL", votos: 10 },
    { name: "MongoDB", type: "NoSQL", votos: 5 },
]

const colors = ["#00608C", "#13924F"]

const chartConfig = {
    votes: {
        label: "Votos",
        color: "#2563eb",
    },
} satisfies ChartConfig

export function Component() {
    return (
        <div className="w-full h-screen p-10">
            <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votos" radius={4}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Bar>
                </BarChart>
            </ResponsiveContainer>
            </ChartContainer>
        </div>
    )
}

export default function sqlNosqlPage() {
        return (
            <>
                <h1>Mysql || MongoDB</h1>
                <Component />
            </>
        )
        
}
