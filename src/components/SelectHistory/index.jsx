import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import './index.css'
import usePersistCallback from '../../hooks/usePersistCallback'

const SelectHistory = () => {
  const [options, setOptions] = useState([]);

  const handleChange = (v) => {
    window.api.selectValue(v)
  }

  const receiveFn = usePersistCallback(data => {
    // clipboard changed
    const exiOption = options.find(option => option.value === data)
    if (!exiOption) {
      const newOptions = [...options, {
        value: data,
        label: data,
      }]
      setOptions(newOptions)
    } else {
      // 如果存在就移到最前面
      const idx = options.findIndex(option => option.value === data)
      const newOptions = [...options]
      newOptions.splice(idx, 1)
      newOptions.push({
        value: data,
        label: data,
      })
      setOptions(newOptions)
    }
  })

  useEffect(() => {
    window.api.clipboardTextChange(receiveFn)
  }, [])

  return <div id="container">
    <Select
      defaultValue=""
      onChange={handleChange}
      options={options}
    />
  </div>;
}

export default SelectHistory;