/**
 * translate content provider. recieve word as string and traslate into html
 */
declare type Provider = (word: string) => Promise<string>
