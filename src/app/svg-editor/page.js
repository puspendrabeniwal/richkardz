'use client'

import React, { useEffect, useRef } from 'react';
import Header from "@/app/components0/Header0/page";
import Footer from "@/app/components0/Footer0/page";
const SvgEditor = ()=>{
    return (
      <iframe
      src="https://unpkg.com/svgedit@3.2.0/editor/svg-editor.html" // Adjust the path to your SVG-edit installation
      title="SVG Editor"
      width="100%"
      height="100%"
      frameBorder="0"
    ></iframe>
    )
}
export default SvgEditor;