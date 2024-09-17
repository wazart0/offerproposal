'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from "next/image";

import { marked } from 'marked';
import customHeadingId from "marked-custom-heading-id";
import mermaid from 'mermaid';
// import markedCodeFormat from 'marked-code-format'
import 'github-markdown-css'

import AnyChart from 'anychart-react'
import anychart from 'anychart'

import Navbar from "../components/navbar";


// const md = markdownit('commonmark')

// Custom renderer for Mermaid
// const renderer = new marked.Renderer();
// renderer.code = function (code, language) {
//   if (language === 'mermaid') {
//     var log = '<div class="mermaid">\n' + code + '\n</div>'
//     // console.log(log)
//     return log
//   } else {
//     return '<pre class="' + language + '"><code>' + code + '</code></pre>';
//   }
// };

marked.use(customHeadingId());

// marked.use(
//   markedCodeFormat({
//     /* Prettier options */
//   })
// )

// marked.setOptions({
//   renderer,
//   // other options if needed
// });

export default () => {
  const searchParams = useSearchParams()
  const offerToken = searchParams.get('offer'); // default value is null

  const [data, setData] = useState(null)
  const [doc, setDoc] = useState(null)
  const [isLoading, setLoading] = useState(true)



  useEffect(() => {
    anychart.licenseKey("wazartur@gmail.com-68513cef-36eabd66");

    fetch('http://localhost:11001/offer?token=' + offerToken)
    .then((res) => res.json())
    .then((response) => {

    
      var gantt_data = null
      var html = null
      for (var i = 0; i < response.length; i++) {
        var item = response[i]
        if (item.type == 'gantt') {
          gantt_data = item.data
          break
        }
        if (item.type == 'markdown') {
          html = marked.parse(item.data);
        }
      }

      // create a data tree
      var treeData = anychart.data.tree(gantt_data, "as-table");
      var chart = anychart.ganttProject();    
      // set the data
      chart.data(treeData);
      chart.fitAll();
  
      setData(chart)
      setDoc(html)
      setLoading(false)
    })
    
  }, [])

  // useEffect(() => {
  //   console.log('mermaid render')
  //   if (doc) {
  //     mermaid.initialize({ startOnLoad: true });
  //     mermaid.contentLoaded();
  //   }
  // }, [doc]);

  if (isLoading) return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Loading...</h1>
      </div>
    </main>
  )

  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-5">
      
      <Navbar />

      test

      
      <AnyChart
        instance={data}
        width={800}
        height={300}
      />

      <div className="markdown-body" dangerouslySetInnerHTML={{__html: doc}} />                               

      test

    </main>
  );
}
