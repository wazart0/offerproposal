'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from "next/image";

import { marked } from 'marked';
import customHeadingId from "marked-custom-heading-id";
import markedAdmonition, { setConfig } from 'marked-admonition-extension';
import mermaid from 'mermaid';
import extendedTables from "marked-extended-tables/src/index.js";
import markedAlert from 'marked-alert'
import markedFootnote from 'marked-footnote';

import {markedEmoji} from "marked-emoji";
import {Octokit} from "@octokit/rest";

import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

// import markedCodeFormat from 'marked-code-format'
import 'github-markdown-css'
import 'marked-admonition-extension/dist/index.css';
import 'highlight.js/styles/github.css';

import AnyChart from 'anychart-react'
import anychart from 'anychart'

import Navbar from "../components/navbar";



// marked.use(
//   markedCodeFormat({
//     /* Prettier options */
//   })
// )



// marked.use({
//   extensions: [{
//       name: 'code',
//       renderer(token) {
//         // console.log(token)
//         if (token.lang == 'mermaid') return `<pre className="language-mermaid">${token.text}</pre>`;
//         return `<pre><code className="language-${token.lang}">${token.text}</code></pre>`;
//       }
//    }]
//  })


// const octokit = new Octokit();
// const res = await octokit.rest.emojis.get();
const emojis = {
  "warning": '⚠️',
  // "tada": "https://...",
}

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false
});

marked.use(customHeadingId());
marked.use(markedAdmonition);
marked.use(extendedTables())
marked.use(markedAlert())
marked.use(markedFootnote())

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
)

marked.use(markedEmoji({
	emojis,
	renderer: (token) => token.emoji//`<img alt="${token.name}" src="${token.emoji}" class="marked-emoji-img">`
}));

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

      
    console.log('data retrieved')
    
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



  useEffect(() => {
    if (doc) {
      console.log('run mermaid renderer')
      // console.log(doc)
      mermaid.initialize({ startOnLoad: false });
      mermaid.run({
        nodes: document.querySelectorAll('.language-mermaid'),
      });
      // mermaid.contentLoaded();
    }
  }, [doc]);



  if (isLoading) return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Loading...</h1>
      </div>
    </main>
  )

  const mermaid_test = '---\ntitle: Node\n---\nflowchart LR\n    id'

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      
      <Navbar />

      test


      
      <AnyChart
        instance={data}
        width={800}
        height={300}
      />

      <div className="markdown-body" dangerouslySetInnerHTML={{__html: doc}} />                               

      test

      <pre className="language-mermaid">{mermaid_test}</pre>

    </main>
  );
}
