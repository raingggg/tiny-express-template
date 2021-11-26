const path = require('path');
const { readdir, writeFile } = require('fs/promises');
const translateOpen = require('google-translate-open-api');
const translate = translateOpen.default;

const translateAll = async (startLocale) => {
  const localePath = path.resolve(__dirname, '../locales');
  let files = await readdir(path.resolve(localePath));
  files = files.filter(f => f.endsWith('.json'));
  console.log('locales', files.map(k => k.replace('.json', '')));

  const en = files.find(f => f === 'en.json');
  const enFile = require(path.resolve(localePath, en));
  const keys = Object.keys(enFile).sort();

  for (let i = 0; i < files.length; i++) {
    const objContent = {};
    const fileName = files[i];
    const locale = fileName.replace('.json', '');
    if (startLocale && locale < startLocale) continue;

    console.log('\nlocale', locale);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const val = enFile[key];
      if (fileName === en) {
        objContent[key] = val;
      } else {
        const res = await translate(val, { client: "dict-chrome-ex", from: 'en', to: locale });
        objContent[key] = res.data.sentences.map(s => s.trans).join('');
        console.log(key, [val, objContent[key]]);
      }
    }

    await writeFile(path.resolve(localePath, fileName), JSON.stringify(objContent, null, 2));
  }
};

translateAll();
// translateAll('ja');