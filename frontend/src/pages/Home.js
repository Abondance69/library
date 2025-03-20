import React from "react";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:px-8 md:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
