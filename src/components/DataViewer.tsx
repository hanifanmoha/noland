'use client'

import { JSONTree } from 'react-json-tree'

const mock = {
  widget: {
    debug: 'on',
    window: {
      title: 'Sample Konfabulator Widget',
      name: 'main_window',
      width: 500,
      height: 500,
    },
    image: {
      src: 'Images/Sun.png',
      name: 'sun1',
      hOffset: 250,
      vOffset: 250,
      alignment: 'center',
    },
    text: {
      data: 'Click Here',
      size: 36,
      style: 'bold',
      name: 'text1',
      hOffset: 250,
      vOffset: 100,
      alignment: 'center',
      onMouseUp: 'sun1.opacity = (sun1.opacity / 100) * 90;',
    },
  },
}

const DataViewer = () => {
  return (
    <div
      style={{
        backgroundColor: `rgb(0, 43, 54)`,
        padding: 20,
        minHeight: '100%',
        fontSize: 16,
      }}
    >
      <JSONTree data={mock} shouldExpandNodeInitially={() => true} />
    </div>
  )
}

export default DataViewer
