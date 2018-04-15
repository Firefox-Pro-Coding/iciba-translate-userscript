TODOs
--------------
- [ ] complete readme
- [ ] add css post processer to add !important to all rules
- [ ] add a plug-in translator provider system


## plugin translator provider system
translator provider must have these properties
1. name
2. icon
3. translator method
4. settings

translator export as a class extends TranslatorProvider
```typescript
abstract class AbstractTranslatorProvider {
  abstract public uniqName: string
  abstract public icon: string // base64 value?

  // setting descripter
  abstract private setting: Setting

  // handle loads settings
  abstract loadSetting(setting: Setting): void

  // read current settings
  abstract getSetting(): Setting

  // translate the word
  abstract translate(word: string): Promise<string>
}
```
