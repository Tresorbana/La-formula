import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import translations from '@/translations';

// Debug mode - set to true to see detailed logs
const DEBUG = true;

const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[LanguageContext] ${message}`, data || '');
  }
};

const debugError = (message: string, error?: any) => {
  if (DEBUG) {
    console.error(`[LanguageContext] ERROR: ${message}`, error || '');
  }
};

type Language = 'en' | 'es';

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use a ref to track if this is the initial render
  const isInitialRender = React.useRef(true);
  const [lang, setLang] = useState<Language>('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Force a re-render when the language changes
  const [_, forceUpdate] = React.useState({});

  // Initialize language from URL
  useEffect(() => {
    try {
      const path = location.pathname;
      debugLog('Initializing language from path', { path });
      
      // Only infer Spanish when URL explicitly uses /spanish; otherwise keep current language
      let newLang: Language = lang;
      if (path.startsWith('/spanish')) {
        newLang = 'es';
      }
      
      // Only update if the language is actually changing
      if (newLang !== lang) {
        debugLog(`Setting language to ${newLang === 'es' ? 'Spanish' : 'English'}`);
        setLang(newLang);
        
        // Force a re-render of components that use the language
        forceUpdate({});
      }
      
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to initialize language';
      debugError(errorMessage, err);
      setError(errorMessage);
    }
  }, [location, lang]);

  const setLanguage = React.useCallback((newLang: Language) => {
    try {
      debugLog('Changing language to', newLang);
      setIsLoading(true);
      setError(null);
      
      // Only update if the language is actually changing
      if (newLang !== lang) {
        setLang(newLang);
        
        // Force a re-render of components that use the language
        forceUpdate({});
      }
      
      // Update URL and navigate without page reload
      // Preserve the current page path when switching languages
      let currentPath = location.pathname;
      
      // Remove /spanish prefix if switching to English
      if (newLang === 'en' && currentPath.startsWith('/spanish')) {
        currentPath = currentPath.replace('/spanish', '') || '/';
      }
      // Add /spanish prefix if switching to Spanish
      else if (newLang === 'es' && !currentPath.startsWith('/spanish')) {
        currentPath = '/spanish' + currentPath;
      }
      
      const newUrl = currentPath + location.search + location.hash;
      debugLog('Navigating to', newUrl);
      
      navigate(newUrl, { replace: true });
      
      // Log the language change for debugging
      debugLog('Language changed successfully', { 
        previousLang: lang, 
        newLang,
        url: window.location.href
      });
    } catch (err) {
      const errorMessage = `Failed to change language to ${newLang}`;
      debugError(errorMessage, err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [lang, location.search, location.hash, location.pathname, navigate]);

  // Translation function that handles dot notation keys in the translations object
  const t = (key: string): string => {
    try {
      if (!key) {
        debugError('Translation key is empty');
        return '';
      }

      debugLog(`Looking up translation for key: ${key} in language: ${lang}`);
      
      // Check if language exists
      if (!translations[lang]) {
        debugError(`No translations found for language: ${lang}`);
        return `[${key}]`;
      }

      // Direct access to translations
      const translation = translations[lang];
      
      // Check if the key exists directly (for backward compatibility)
      if (key in translation) {
        const value = translation[key];
        debugLog(`Found direct translation for '${key}':`, value);
        return value as string;
      }
      
      // Try to find a matching key (case insensitive)
      const lowerKey = key.toLowerCase();
      const matchingKey = Object.keys(translation).find(k => k.toLowerCase() === lowerKey);
      
      if (matchingKey) {
        const value = translation[matchingKey];
        debugLog(`Found matching key for '${key}':`, { matchingKey, value });
        return value as string;
      }
      
      // Try to find a key that ends with the requested key (for nested keys)
      const nestedMatchingKey = Object.keys(translation).find(
        k => k.toLowerCase().endsWith(`.${lowerKey}`) || k.toLowerCase() === lowerKey
      );
      
      if (nestedMatchingKey) {
        const value = translation[nestedMatchingKey];
        debugLog(`Found nested matching key for '${key}':`, { nestedMatchingKey, value });
        return value as string;
      }
      
      // Try fallback language
      const fallbackLang = lang === 'en' ? 'es' : 'en';
      debugLog(`Key '${key}' not found in ${lang}, trying fallback language: ${fallbackLang}`);
      
      if (translations[fallbackLang]) {
        // Try direct match first
        if (key in translations[fallbackLang]) {
          const fallbackValue = translations[fallbackLang][key];
          debugLog(`Found fallback for '${key}' in ${fallbackLang}:`, fallbackValue);
          return fallbackValue as string;
        }
        
        // Try to find a matching key in fallback language
        const fallbackMatchingKey = Object.keys(translations[fallbackLang]).find(
          k => k.toLowerCase() === lowerKey || k.toLowerCase().endsWith(`.${lowerKey}`)
        );
        
        if (fallbackMatchingKey) {
          const fallbackValue = translations[fallbackLang][fallbackMatchingKey];
          debugLog(`Found matching fallback for '${key}' in ${fallbackLang}:`, { 
            fallbackMatchingKey, 
            fallbackValue 
          });
          return fallbackValue as string;
        }
      }
      
      debugError(`Translation key '${key}' not found in any language`);
      return `[${key}]`;
      
    } catch (error) {
      debugError(`Error accessing translation key '${key}'`, error);
      return `[${key}]`;
    }
  };

  // Log the current language state when it changes
  useEffect(() => {
    // Log available translations on initial load
    if (DEBUG) {
      console.group('Available Translations:');
      console.log('Current language:', lang);
      console.log('Available languages:', Object.keys(translations));
      
      // Log all English keys and values
      console.group('English Translations:');
      Object.entries(translations['en'] || {}).forEach(([key, value]) => {
        console.log(`${key}:`, value);
      });
      console.groupEnd();
      
      // Log all Spanish keys and values
      console.group('Spanish Translations:');
      Object.entries(translations['es'] || {}).forEach(([key, value]) => {
        console.log(`${key}:`, value);
      });
      console.groupEnd();
      
      console.groupEnd();
    }

    debugLog('Language state updated', { 
      currentLanguage: lang,
      isLoading,
      error,
      currentPath: window.location.pathname,
      availableLanguages: Object.keys(translations),
      sampleTranslation: translations[lang]?.['header.title'] || 'No translation found'
    });
  }, [lang, isLoading, error]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    lang,
    setLanguage,
    t
  }), [lang, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
