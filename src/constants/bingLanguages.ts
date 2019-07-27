export enum BING_LANGUAGES {
  de = 'de',
  it = 'it',
  fr = 'fr',
  ru = 'ru',
  ja = 'ja',
  zh = 'zh-Hans',
  en = 'en',
}

export const BING_LANGUAGE_MAP = {
  [BING_LANGUAGES.de]: '德语',
  [BING_LANGUAGES.it]: '意大利语',
  [BING_LANGUAGES.fr]: '法语',
  [BING_LANGUAGES.ru]: '俄语',
  [BING_LANGUAGES.ja]: '日语',
  [BING_LANGUAGES.zh]: '中文',
  [BING_LANGUAGES.en]: '英语',
}

export const BING_VOICE_MAP = {
  'ar': ['ar-SA', 'Male', 'ar-SA-Naayf'],
  'bg': ['bg-BG', 'Male', 'bg-BG-Ivan'],
  'ca': ['ca-ES', 'Female', 'ca-ES-HerenaRUS'],
  'cs': ['cs-CZ', 'Male', 'cs-CZ-Jakub'],
  'da': ['da-DK', 'Female', 'da-DK-HelleRUS'],
  'de': ['de-DE', 'Female', 'de-DE-Hedda'],
  'el': ['el-GR', 'Male', 'el-GR-Stefanos'],
  'en': ['en-US', 'Female', 'en-US-JessaRUS'],
  'es': ['es-ES', 'Female', 'es-ES-Laura-Apollo'],
  'fi': ['fi-FI', 'Female', 'fi-FI-HeidiRUS'],
  'fr': ['fr-FR', 'Female', 'fr-FR-Julie-Apollo'],
  'he': ['he-IL', 'Male', 'he-IL-Asaf'],
  'hi': ['hi-IN', 'Female', 'hi-IN-Kalpana-Apollo'],
  'hr': ['hr-HR', 'Male', 'hr-HR-Matej'],
  'hu': ['hu-HU', 'Male', 'hu-HU-Szabolcs'],
  'id': ['id-ID', 'Male', 'id-ID-Andika'],
  'it': ['it-IT', 'Male', 'it-IT-Cosimo-Apollo'],
  'ja': ['ja-JP', 'Female', 'ja-JP-Ayumi-Apollo'],
  'ko': ['ko-KR', 'Female', 'ko-KR-HeamiRUS'],
  'ms': ['ms-MY', 'Male', 'ms-MY-Rizwan'],
  'nl': ['nl-NL', 'Female', 'nl-NL-HannaRUS'],
  'no': ['nb-NO', 'Female', 'nb-NO-HuldaRUS'],
  'pl': ['pl-PL', 'Female', 'pl-PL-PaulinaRUS'],
  'pt': ['pt-PT', 'Female', 'pt-PT-HeliaRUS'],
  'ro': ['ro-RO', 'Male', 'ro-RO-Andrei'],
  'ru': ['ru-RU', 'Female', 'ru-RU-Irina-Apollo'],
  'sk': ['sk-SK', 'Male', 'sk-SK-Filip'],
  'sl': ['sl-SL', 'Male', 'sl-SI-Lado'],
  'sv': ['sv-SE', 'Female', 'sv-SE-HedvigRUS'],
  'ta': ['ta-IN', 'Female', 'ta-IN-Valluvar'],
  'te': ['te-IN', 'Male', 'te-IN-Chitra'],
  'th': ['th-TH', 'Male', 'th-TH-Pattara'],
  'tr': ['tr-TR', 'Female', 'tr-TR-SedaRUS'],
  'vi': ['vi-VN', 'Male', 'vi-VN-An'],
  'zh-Hans': ['zh-CN', 'Female', 'zh-CN-HuihuiRUS'],
  'zh-Hant': ['zh-HK', 'Female', 'zh-HK-Tracy-Apollo'],
}

export const bingLanguagesOptions = Object
  .entries(BING_LANGUAGE_MAP)
  .map(([k, v]) => ({
    text: v,
    key: k,
  }))

// [
//   {
//     "text": "English (detected)",
//     "key": "auto-detect"
//   },
//   {
//     "text": "Afrikaans",
//     "key": "af"
//   },
//   {
//     "text": "Arabic",
//     "key": "ar"
//   },
//   {
//     "text": "Bangla",
//     "key": "bn-BD"
//   },
//   {
//     "text": "Bosnian (Latin)",
//     "key": "bs-Latn"
//   },
//   {
//     "text": "Bulgarian",
//     "key": "bg"
//   },
//   {
//     "text": "Cantonese (Traditional)",
//     "key": "yue"
//   },
//   {
//     "text": "Catalan",
//     "key": "ca"
//   },
//   {
//     "text": "Chinese Simplified",
//     "key": "zh-Hans"
//   },
//   {
//     "text": "Chinese Traditional",
//     "key": "zh-Hant"
//   },
//   {
//     "text": "Croatian",
//     "key": "hr"
//   },
//   {
//     "text": "Czech",
//     "key": "cs"
//   },
//   {
//     "text": "Danish",
//     "key": "da"
//   },
//   {
//     "text": "Dutch",
//     "key": "nl"
//   },
//   {
//     "text": "English",
//     "key": "en"
//   },
//   {
//     "text": "Estonian",
//     "key": "et"
//   },
//   {
//     "text": "Fijian",
//     "key": "fj"
//   },
//   {
//     "text": "Filipino",
//     "key": "fil"
//   },
//   {
//     "text": "Finnish",
//     "key": "fi"
//   },
//   {
//     "text": "French",
//     "key": "fr"
//   },
//   {
//     "text": "German",
//     "key": "de"
//   },
//   {
//     "text": "Greek",
//     "key": "el"
//   },
//   {
//     "text": "Haitian Creole",
//     "key": "ht"
//   },
//   {
//     "text": "Hebrew",
//     "key": "he"
//   },
//   {
//     "text": "Hindi",
//     "key": "hi"
//   },
//   {
//     "text": "Hmong Daw",
//     "key": "mww"
//   },
//   {
//     "text": "Hungarian",
//     "key": "hu"
//   },
//   {
//     "text": "Icelandic",
//     "key": "is"
//   },
//   {
//     "text": "Indonesian",
//     "key": "id"
//   },
//   {
//     "text": "Italian",
//     "key": "it"
//   },
//   {
//     "text": "Japanese",
//     "key": "ja"
//   },
//   {
//     "text": "Kiswahili",
//     "key": "sw"
//   },
//   {
//     "text": "Klingon",
//     "key": "tlh"
//   },
//   {
//     "text": "Korean",
//     "key": "ko"
//   },
//   {
//     "text": "Latvian",
//     "key": "lv"
//   },
//   {
//     "text": "Lithuanian",
//     "key": "lt"
//   },
//   {
//     "text": "Malagasy",
//     "key": "mg"
//   },
//   {
//     "text": "Malay (Latin)",
//     "key": "ms"
//   },
//   {
//     "text": "Maltese",
//     "key": "mt"
//   },
//   {
//     "text": "Norwegian Bokmål",
//     "key": "no"
//   },
//   {
//     "text": "Persian",
//     "key": "fa"
//   },
//   {
//     "text": "Polish",
//     "key": "pl"
//   },
//   {
//     "text": "Portuguese",
//     "key": "pt"
//   },
//   {
//     "text": "Querétaro Otomi",
//     "key": "otq"
//   },
//   {
//     "text": "Romanian",
//     "key": "ro"
//   },
//   {
//     "text": "Russian",
//     "key": "ru"
//   },
//   {
//     "text": "Samoan",
//     "key": "sm"
//   },
//   {
//     "text": "Serbian (Cyrillic)",
//     "key": "sr-Cyrl"
//   },
//   {
//     "text": "Serbian (Latin)",
//     "key": "sr-Latn"
//   },
//   {
//     "text": "Slovak",
//     "key": "sk"
//   },
//   {
//     "text": "Slovenian",
//     "key": "sl"
//   },
//   {
//     "text": "Spanish",
//     "key": "es"
//   },
//   {
//     "text": "Swedish",
//     "key": "sv"
//   },
//   {
//     "text": "Tahitian",
//     "key": "ty"
//   },
//   {
//     "text": "Tamil",
//     "key": "ta"
//   },
//   {
//     "text": "Telugu",
//     "key": "te"
//   },
//   {
//     "text": "Thai",
//     "key": "th"
//   },
//   {
//     "text": "Tongan",
//     "key": "to"
//   },
//   {
//     "text": "Turkish",
//     "key": "tr"
//   },
//   {
//     "text": "Ukrainian",
//     "key": "uk"
//   },
//   {
//     "text": "Urdu",
//     "key": "ur"
//   },
//   {
//     "text": "Vietnamese",
//     "key": "vi"
//   },
//   {
//     "text": "Welsh",
//     "key": "cy"
//   },
//   {
//     "text": "Yucatec Maya",
//     "key": "yua"
//   }
// ]
