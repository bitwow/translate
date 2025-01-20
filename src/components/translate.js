import React, { useEffect, useState } from "react";
import axios from "axios";

const doTranslation = async (input, languageCode, cancelToken) => {
  try {
    const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
    const key = 'key=dict.1.1.20250120T021027Z.0073b55e878d348a.e44d8d34ce9d8622c98a145c966025c581f5dfd8'
    const lang = 'lang=ru-en'
    const text = `text=${input}`

    const { data } = await axios.get(
      `${url}?${key}&${lang}&${text}`,
    );

    return data.def[0].tr[0].text;
  } catch (err) {
    return "";
  }
};

export default ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken).then(setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};
