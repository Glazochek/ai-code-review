interface LanguageOption {
    id: string;
    name: string;
  }

  const LANGUAGES: LanguageOption[] = [
    { id: 'typescript', name: 'TypeScript' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'csharp', name: 'C#' },
    { id: 'php', name: 'PHP' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'swift', name: 'Swift' },
    { id: 'go', name: 'Go' },
  ];

  interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
  }

  export const LanguageSelector = ({
    selectedLanguage,
    onLanguageChange
  }: LanguageSelectorProps) => {
    return (
      <select
        className="language-selector"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {LANGUAGES.map(lang => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    );
  };