// i18n.js
export const supportedLangs = ['en','ru','ar','de','es','fr','hi','ja','pt','zh'];

export const i18n = VueI18n.createI18n({
  legacy:false,
  locale:'en',
  fallbackLocale:'en',
  messages:{}
});

export async function loadMessages(){
  for(const l of supportedLangs){
    try{
      const r = await fetch(`./messages/${l}.json`);
      if(!r.ok) continue;
      i18n.global.setLocaleMessage(l, await r.json());
    }catch(e){
      console.warn(`i18n: ${l} load fail`,e);
    }
  }
}
