import {
  type,
  array,
  string,
  number,
  intersection,
  boolean,
  partial,
  TypeOf,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export interface GoogleDictPlayAudioPayload {
  url: string
}

export const corpus = excess(type({
  name: string,
  language: string,
}), 'corpus')
export type Corpus = TypeOf<typeof corpus>

export const note = excess(type({
  text: string,
  type: string,
}), 'note')
export type Note = TypeOf<typeof note>

export const referencedTarget = excess(type({
  id: string,
}), 'referencedTarget')
export type ReferencedTarget = TypeOf<typeof referencedTarget>

export const usageOverTimeImageItem = excess(type({
  width: number,
  height: number,
  url: string,
}), 'usageOverTimeImageItem')
export type UsageOverTimeImageItem = TypeOf<typeof usageOverTimeImageItem>

export const usageOverTimeImage = excess(type({
  desktop: usageOverTimeImageItem,
  mobile: usageOverTimeImageItem,
  tablet: usageOverTimeImageItem,
}), 'usageOverTimeImage')
export type UsageOverTimeImage = TypeOf<typeof usageOverTimeImage>

export const partsOfSpeech = excess(intersection([
  type({
    value: string,
  }),
  partial({
    qualifier: string,
  }),
]), 'partsOfSpeech')
export type PartsOfSpeech = TypeOf<typeof partsOfSpeech>

export const phonetic = excess(intersection([
  type({
    text: string,
  }),
  partial({
    oxfordAudio: string,
  }),
]), 'phonetic')
export type Phonetic = TypeOf<typeof phonetic>

export const fragment = excess(intersection([
  type({
    text: string,
  }),
  partial({
    isEntryLink: boolean,
  }),
]), 'fragment')
export type Fragment = TypeOf<typeof fragment>

export const snippet = excess(intersection([
  type({
    definition: string,
    lemma: string,
  }),
  partial({
    example: string,
    audio: string,
    partOfSpeech: string,
  }),
]), 'snippet')
export type Snippet = TypeOf<typeof snippet>

export const nym = excess(intersection([
  type({
    nym: string,
    numEntries: number,
  }),
  partial({
    snippet,
    isCore: boolean,
  }),
]), 'nym')
export type Nym = TypeOf<typeof nym>

export const thesaurus = excess(intersection([
  type({
    nyms: array(nym),
  }),
  partial({
    register: string,
  }),
]), 'thesaurus')
export type Thesaurus = TypeOf<typeof thesaurus>

export const thesaurusEntry = excess(intersection([
  type({
    headword: string,
    corpus: string,
    corpusInfo: corpus,
    entrySeqNo: number,
    sourceId: string,
    targetId: string,
  }),
  partial({
    examples: array(string),
    synonyms: array(thesaurus),
    antonyms: array(thesaurus),
  }),
]), 'thesaurusEntry')
export type ThesaurusEntry = TypeOf<typeof thesaurusEntry>

export const definitionClass = excess(type({
  fragments: array(fragment),
  text: string,
}), 'definitionClass')
export type DefinitionClass = TypeOf<typeof definitionClass>

export const etymology = excess(intersection([
  type({
    etymology: definitionClass,
  }),
  partial({
    images: usageOverTimeImage,
  }),
]), 'etymology')
export type Etymology = TypeOf<typeof etymology>

export const labelSet = partial({
  geographics: array(string),
  registers: array(string),
  subjects: array(string),
}, 'labelSet')
export type LabelSet = TypeOf<typeof labelSet>

export const senseExampleGroup = excess(intersection([
  type({
    examples: array(string),
  }),
  partial({
    registers: array(string),
  }),
]), 'senseExampleGroup')
export type SenseExampleGroup = TypeOf<typeof senseExampleGroup>

export const exampleGroup = excess(intersection([
  type({
    examples: array(string),
  }),
  partial({
    registers: array(string),
  }),
]), 'exampleGroup')
export type ExampleGroup = TypeOf<typeof exampleGroup>

export const morphUnit = excess(type({
  wordForm: string,
  formType: excess(type({
    posTag: string,
    description: string,
  })),
}), 'morphUnit')
export type MorphUnit = TypeOf<typeof morphUnit>

export const relevantTopics = excess(type({
  clusterName: string,
  name: string,
}), 'relevantTopics')
export type RelevantTopics = TypeOf<typeof relevantTopics>

export const subSense = excess(intersection([
  type({
    definition: definitionClass,
    sourceId: string,
  }),
  partial({
    conciseDefinition: string,
    domainClasses: array(string),
    etymology,
    exampleGroups: array(exampleGroup),
    labelSet,
    morphUnits: array(morphUnit),
    relevantTopics: array(relevantTopics),
    semanticClasses: array(string),
    thesaurusEntries: array(thesaurusEntry),
  }),
]), 'subSense')
export type SubSense = TypeOf<typeof subSense>

export const relatedEntities = excess(type({
  relationType: string,
  targetMid: string,
}), 'relatedEntities')
export type RelatedEntities = TypeOf<typeof relatedEntities>

export const kgMapping = excess(intersection([
  type({
    relatedEntities: array(relatedEntities),
  }),
  partial({
  }),
]), 'kgMapping')
export type KgMapping = TypeOf<typeof kgMapping>

export const sense = excess(intersection([
  type({
    definition: definitionClass,
    sourceId: string,
  }),
  partial({
    kgMapping,
    conciseDefinition: string,
    domainClasses: array(string),
    etymology,
    exampleGroups: array(senseExampleGroup),
    labelSet,
    note,
    relevantTopics: array(relevantTopics),
    semanticClasses: array(string),
    subsenses: array(subSense),
    thesaurusEntries: array(thesaurusEntry),
  }),
]), 'sense')
export type Sense = TypeOf<typeof sense>

export const senseFamily = excess(intersection([
  type({
    senses: array(sense),
  }),
  partial({
    partsOfSpeech: array(partsOfSpeech),
    labelSet,
    note,
    morphUnits: array(morphUnit),
    partsOfSpeechs: array(partsOfSpeech),
    phonetics: array(phonetic),
  }),
]), 'senseFamily')
export type SenseFamily = TypeOf<typeof senseFamily>

export const subEntry = excess(intersection([
  type({
    type: string,
    lemma: string,
    senseFamily,
  }),
  partial({
    conciseLemma: string,
    triggeringPhrases: array(string),
  }),
]), 'subEntry')
export type SubEntry = TypeOf<typeof subEntry>

export const subentrySnippets = excess(intersection([
  type({
    type: string,
    snippet,
  }),
  partial({
  }),
]), 'subentrySnippets')
export type SubentrySnippets = TypeOf<typeof subentrySnippets>

export const entry = excess(intersection([
  type({
    entrySeqNo: number,
    headword: string,
    locale: string,
  }),
  partial({
    corpus,
    etymology,
    headwordMatchesUserQuery: boolean,
    homographIndex: number,
    labelSet,
    note,
    phonetics: array(phonetic),
    referencedTargets: array(referencedTarget),
    senseFamilies: array(senseFamily),
    senseFamily,
    sourceId: string,
    subentries: array(subEntry),
    subentrySnippets: array(subentrySnippets),
    syllabifiedHeadword: string,
  }),
]), 'entry')
export type Entry = TypeOf<typeof entry>

export const similarTerms = excess(intersection([
  type({
    term: string,
    snippet,
  }),
  partial({
  }),
]), 'similarTerms')
export type SimilarTerms = TypeOf<typeof similarTerms>

export const dictionaryData = excess(intersection([
  type({
    entries: array(entry),
    queryTerm: string,
  }),
  partial({
    usageOverTimeImage,
    similarTerms: array(similarTerms),
  }),
]), 'dictionaryData')
export type DictionaryData = TypeOf<typeof dictionaryData>

export const codec = excess(intersection([
  type({
    status: number,
  }),
  partial({
    dictionaryData: array(dictionaryData),
  }),
]), 'codec')
export type Codec = TypeOf<typeof codec>
