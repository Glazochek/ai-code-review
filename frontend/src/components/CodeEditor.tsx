import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  theme?: string
  language?: string
}

export const CodeEditor = ({
  value,
  onChange,
  readOnly,
  theme = 'vs-dark',
  language = 'typescript'
}: CodeEditorProps) => {
  return (
    <Editor
      height="80vh"
      defaultLanguage={language}
      language={language}
      theme={theme}
      value={value}
      onChange={(value) => onChange?.(value || '')}
      options={{
        readOnly,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        automaticLayout: true,
      }}
    />
  )
}