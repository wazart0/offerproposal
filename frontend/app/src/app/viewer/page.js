'use client'

import React, { useState, useEffect } from 'react'
import Image from "next/image";

import AnyChart from 'anychart-react'
import anychart from 'anychart'




export default function View() {
  const [data, setData] = useState(null)

  useEffect(() => {
    
    let stage = anychart.graphics.create();
    let chart1 = anychart.line([1, 2, 3]);
    let chart2 = anychart.column();

    chart1.bounds(0, 0, '100%', '50%');
    chart2.column([3, 2, 1]);
    chart2.line([3, 5, 6]);
    chart2.bounds(0, '50%', '100%', '50%');

    setData({
      'stage': stage,
      'chart1': chart1,
      'chart2': chart2
    })
    
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      test

      
      <AnyChart
        instance={data?.stage}
        width={800}
        height={600}
        charts={[data?.chart1, data?.chart2]}
      />
                                                  

      test

    </main>
  );
}
