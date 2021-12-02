<h1 align="center">Water UI</h1>

<p align="center">一个基于tailwindcss的组件库</p>

## 文档

> 暂无

## 安装

```bash
npm install @waterui/react
# or
yarn add @waterui/react
```

## 使用
```tsx
import React from 'react'
import { Button, Form, Input } from '@waterui/react'
import '@waterui/react/dist/waterui.css'

function App() {
  return (
    <div>
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button>submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
```
