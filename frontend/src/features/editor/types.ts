export interface CodeEditorProps {
    value: string
    onChange?: (value: string) => void
    readOnly?: boolean
    theme?: string
    language?: string
  }