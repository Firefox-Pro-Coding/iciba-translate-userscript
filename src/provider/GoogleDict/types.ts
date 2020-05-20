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

export const note = excess(type({
  text: string,
  type: string,
}))
export type Note = TypeOf<typeof note>

export const referencedTarget = excess(type({
  id: string,
}))
export type ReferencedTarget = TypeOf<typeof referencedTarget>

export const usageOverTimeImageItem = excess(type({
  width: number,
  height: number,
  url: string,
}))
export type UsageOverTimeImageItem = TypeOf<typeof usageOverTimeImageItem>

export const usageOverTimeImage = excess(type({
  desktop: usageOverTimeImageItem,
  mobile: usageOverTimeImageItem,
  tablet: usageOverTimeImageItem,
}))
export type UsageOverTimeImage = TypeOf<typeof usageOverTimeImage>

export const partsOfSpeech = excess(intersection([
  type({
    value: string,
  }),
  partial({
    qualifier: string,
  }),
]))
export type PartsOfSpeech = TypeOf<typeof partsOfSpeech>

export const phonetic = excess(intersection([
  type({
    text: string,
  }),
  partial({
    oxfordAudio: string,
  }),
]))
export type Phonetic = TypeOf<typeof phonetic>

export const fragment = excess(intersection([
  type({
    text: string,
  }),
  partial({
    isEntryLink: boolean,
  }),
]))
export type Fragment = TypeOf<typeof fragment>

export const nym = excess(intersection([
  type({
    nym: string,
    numEntries: number,
  }),
  partial({
    isCore: boolean,
  }),
]))
export type Nym = TypeOf<typeof nym>

export const thesaurus = excess(intersection([
  type({
    nyms: array(nym),
  }),
  partial({
    register: string,
  }),
]))
export type Thesaurus = TypeOf<typeof thesaurus>

export const thesaurusEntry = excess(intersection([
  type({
    headword: string,
  }),
  partial({
    examples: array(string),
    synonyms: array(thesaurus),
    antonyms: array(thesaurus),
  }),
]))
export type ThesaurusEntry = TypeOf<typeof thesaurusEntry>

export const definitionClass = excess(type({
  fragments: array(fragment),
  text: string,
}))
export type DefinitionClass = TypeOf<typeof definitionClass>

export const etymology = excess(intersection([
  type({
    etymology: definitionClass,
  }),
  partial({
    images: usageOverTimeImage,
  }),
]))
export type Etymology = TypeOf<typeof etymology>

export const labelSet = partial({
  geographics: array(string),
  registers: array(string),
  subjects: array(string),
})
export type LabelSet = TypeOf<typeof labelSet>

export const senseExampleGroup = excess(intersection([
  type({
    examples: array(string),
  }),
  partial({
    registers: array(string),
  }),
]))
export type SenseExampleGroup = TypeOf<typeof senseExampleGroup>

export const exampleGroup = excess(intersection([
  type({
    examples: array(string),
  }),
  partial({
    registers: array(string),
  }),
]))
export type ExampleGroup = TypeOf<typeof exampleGroup>

export const morphUnit = excess(type({
  wordForm: string,
  formType: excess(type({
    posTag: string,
    description: string,
  })),
}))
export type MorphUnit = TypeOf<typeof morphUnit>

export const subSense = excess(intersection([
  type({
    definition: definitionClass,
  }),
  partial({
    conciseDefinition: string,
    domainClasses: array(string),
    exampleGroups: array(exampleGroup),
    etymology,
    labelSet,
    morphUnits: array(morphUnit),
    semanticClasses: array(string),
    thesaurusEntries: array(thesaurusEntry),
  }),
]))
export type SubSense = TypeOf<typeof subSense>

export const sense = excess(intersection([
  type({
    definition: definitionClass,
  }),
  partial({
    conciseDefinition: string,
    domainClasses: array(string),
    exampleGroups: array(senseExampleGroup),
    labelSet,
    note,
    semanticClasses: array(string),
    subsenses: array(subSense),
    thesaurusEntries: array(thesaurusEntry),
    etymology,
  }),
]))
export type Sense = TypeOf<typeof sense>

export const senseFamily = excess(intersection([
  type({
    senses: array(sense),
  }),
  partial({
    labelSet,
    note,
    morphUnits: array(morphUnit),
    partsOfSpeechs: array(partsOfSpeech),
    phonetics: array(phonetic),
  }),
]))
export type SenseFamily = TypeOf<typeof senseFamily>

export const subEntry = excess(intersection([
  type({
    type: string,
    lemma: string,
    senseFamily,
  }),
  partial({
    triggeringPhrases: array(string),
  }),
]))
export type SubEntry = TypeOf<typeof subEntry>

export const entry = excess(intersection([
  type({
    entrySeqNo: number,
    headword: string,
    locale: string,
  }),
  partial({
    etymology,
    headwordMatchesUserQuery: boolean,
    homographIndex: number,
    note,
    labelSet,
    phonetics: array(phonetic),
    referencedTargets: array(referencedTarget),
    senseFamilies: array(senseFamily),
    senseFamily,
    subentries: array(subEntry),
    syllabifiedHeadword: string,
  }),
]))
export type Entry = TypeOf<typeof entry>

export const dictionaryData = excess(intersection([
  type({
    entries: array(entry),
    queryTerm: string,
  }),
  partial({
    usageOverTimeImage,
  }),
]))
export type DictionaryData = TypeOf<typeof dictionaryData>

export const codec = excess(type({
  dictionaryData: array(dictionaryData),
}))
export type Codec = TypeOf<typeof codec>
